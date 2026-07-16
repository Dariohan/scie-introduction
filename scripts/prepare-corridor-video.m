#import <AVFoundation/AVFoundation.h>
#import <Foundation/Foundation.h>
#import <ImageIO/ImageIO.h>

// One-off macOS media preparation utility; not part of the website runtime.
// Compile with:
// clang -fobjc-arc -framework Foundation -framework AVFoundation -framework CoreMedia \
//   -framework CoreGraphics -framework ImageIO scripts/prepare-corridor-video.m \
//   -o /private/tmp/prepare-corridor-video
// Optional fourth argument: 960x540 (for the mobile source).

static void fail(NSString *message) {
  fprintf(stderr, "%s\n", message.UTF8String);
  exit(1);
}

int main(int argc, const char *argv[]) {
  @autoreleasepool {
    if (argc < 4) {
      fail(@"Usage: prepare-corridor-video <input.mov> <output.mp4> <poster.jpg>");
    }

    NSString *inputPath = [NSString stringWithUTF8String:argv[1]];
    NSString *outputPath = [NSString stringWithUTF8String:argv[2]];
    NSString *posterPath = [NSString stringWithUTF8String:argv[3]];
    NSString *presetName = argc > 4 && strcmp(argv[4], "960x540") == 0
      ? AVAssetExportPreset960x540
      : AVAssetExportPreset1280x720;
    AVURLAsset *asset = [AVURLAsset URLAssetWithURL:[NSURL fileURLWithPath:inputPath]
                                            options:nil];

    __block NSArray<AVAssetTrack *> *videoTracks = nil;
    __block NSError *trackLoadError = nil;
    dispatch_semaphore_t trackSemaphore = dispatch_semaphore_create(0);
    [asset loadTracksWithMediaType:AVMediaTypeVideo
                completionHandler:^(NSArray<AVAssetTrack *> *tracks, NSError *error) {
      videoTracks = tracks;
      trackLoadError = error;
      dispatch_semaphore_signal(trackSemaphore);
    }];
    dispatch_semaphore_wait(trackSemaphore, DISPATCH_TIME_FOREVER);
    if (trackLoadError) fail(trackLoadError.localizedDescription);
    AVAssetTrack *sourceTrack = [videoTracks firstObject];
    if (!sourceTrack) fail(@"The source file does not contain a video track.");

    Float64 durationSeconds = CMTimeGetSeconds(asset.duration);
    if (!isfinite(durationSeconds) || durationSeconds <= 0) {
      fail([NSString stringWithFormat:@"Unexpected source duration: %.3f seconds.", durationSeconds]);
    }

    // A video-only composition removes audio and Apple-specific metadata tracks,
    // keeping muted autoplay lightweight and predictable across browsers.
    AVMutableComposition *composition = [AVMutableComposition composition];
    AVMutableCompositionTrack *targetTrack = [composition
      addMutableTrackWithMediaType:AVMediaTypeVideo
      preferredTrackID:kCMPersistentTrackID_Invalid];
    if (!targetTrack) fail(@"Could not create the destination video track.");

    NSError *insertError = nil;
    if (![targetTrack insertTimeRange:CMTimeRangeMake(kCMTimeZero, asset.duration)
                              ofTrack:sourceTrack
                               atTime:kCMTimeZero
                                error:&insertError]) {
      fail(insertError.localizedDescription);
    }
    targetTrack.preferredTransform = sourceTrack.preferredTransform;

    NSURL *outputURL = [NSURL fileURLWithPath:outputPath];
    [[NSFileManager defaultManager] removeItemAtURL:outputURL error:nil];
    AVAssetExportSession *exporter = [[AVAssetExportSession alloc]
      initWithAsset:composition
      presetName:presetName];
    if (!exporter) fail(@"Could not create an H.264 export session.");
    exporter.outputURL = outputURL;
    exporter.outputFileType = AVFileTypeMPEG4;
    exporter.shouldOptimizeForNetworkUse = YES;
    exporter.metadata = @[];

    dispatch_semaphore_t exportSemaphore = dispatch_semaphore_create(0);
    [exporter exportAsynchronouslyWithCompletionHandler:^{
      dispatch_semaphore_signal(exportSemaphore);
    }];
    dispatch_semaphore_wait(exportSemaphore, DISPATCH_TIME_FOREVER);
    if (exporter.status != AVAssetExportSessionStatusCompleted) {
      fail(exporter.error.localizedDescription ?: @"Video export failed.");
    }

    AVURLAsset *outputAsset = [AVURLAsset URLAssetWithURL:outputURL options:nil];
    AVAssetImageGenerator *generator = [[AVAssetImageGenerator alloc] initWithAsset:outputAsset];
    generator.appliesPreferredTrackTransform = YES;
    generator.maximumSize = CGSizeMake(1600, 900);
    generator.requestedTimeToleranceBefore = CMTimeMakeWithSeconds(0.15, 600);
    generator.requestedTimeToleranceAfter = CMTimeMakeWithSeconds(0.15, 600);

    NSError *imageError = nil;
    CMTime posterTime = CMTimeMakeWithSeconds(MIN(1.2, durationSeconds * 0.2), 600);
    CGImageRef image = [generator copyCGImageAtTime:posterTime actualTime:nil error:&imageError];
    if (!image) fail(imageError.localizedDescription ?: @"Could not create the video poster.");

    NSURL *posterURL = [NSURL fileURLWithPath:posterPath];
    [[NSFileManager defaultManager] removeItemAtURL:posterURL error:nil];
    CGImageDestinationRef destination = CGImageDestinationCreateWithURL(
      (__bridge CFURLRef)posterURL,
      CFSTR("public.jpeg"),
      1,
      nil
    );
    if (!destination) {
      CGImageRelease(image);
      fail(@"Could not create the poster destination.");
    }
    NSDictionary *properties = @{(__bridge NSString *)kCGImageDestinationLossyCompressionQuality: @0.88};
    CGImageDestinationAddImage(destination, image, (__bridge CFDictionaryRef)properties);
    BOOL posterWritten = CGImageDestinationFinalize(destination);
    CFRelease(destination);
    CGImageRelease(image);
    if (!posterWritten) fail(@"Could not write the video poster.");

    NSDictionary *attributes = [[NSFileManager defaultManager]
      attributesOfItemAtPath:outputPath error:nil];
    printf(
      "Prepared corridor media: %.3f seconds, %.1f KB -> %s\n",
      CMTimeGetSeconds(outputAsset.duration),
      (double)[attributes fileSize] / 1024.0,
      outputPath.UTF8String
    );
  }
  return 0;
}

#import <AVFoundation/AVFoundation.h>
#import <Foundation/Foundation.h>

// One-off macOS asset preparation utility; it is not part of the website runtime.
// Compile with:
// clang -fobjc-arc -framework Foundation -framework AVFoundation -framework CoreMedia \
//   scripts/optimize-emblem-video.m -o /private/tmp/optimize-emblem-video

static void fail(NSString *message) {
  fprintf(stderr, "%s\n", message.UTF8String);
  exit(1);
}

int main(int argc, const char *argv[]) {
  @autoreleasepool {
    NSString *inputPath = argc > 1
      ? [NSString stringWithUTF8String:argv[1]]
      : @"public/media/emblem-study.mp4";
    NSString *outputPath = argc > 2
      ? [NSString stringWithUTF8String:argv[2]]
      : @"/private/tmp/emblem-study-optimized.mp4";

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
    if (!isfinite(durationSeconds) || durationSeconds <= 9.0) {
      fail([NSString stringWithFormat:@"Unexpected source duration: %.3f seconds.", durationSeconds]);
    }

    AVMutableComposition *composition = [AVMutableComposition composition];
    AVMutableCompositionTrack *targetTrack = [composition
      addMutableTrackWithMediaType:AVMediaTypeVideo
      preferredTrackID:kCMPersistentTrackID_Invalid];
    if (!targetTrack) fail(@"Could not create the destination video track.");

    CMTimeScale timescale = 600;
    CMTimeRange firstRange = CMTimeRangeFromTimeToTime(
      kCMTimeZero,
      CMTimeMakeWithSeconds(5.10, timescale)
    );
    CMTimeRange secondRange = CMTimeRangeFromTimeToTime(
      CMTimeMakeWithSeconds(8.90, timescale),
      asset.duration
    );
    NSError *insertError = nil;
    if (![targetTrack insertTimeRange:firstRange
                               ofTrack:sourceTrack
                                atTime:kCMTimeZero
                                 error:&insertError]) {
      fail(insertError.localizedDescription);
    }
    if (![targetTrack insertTimeRange:secondRange
                               ofTrack:sourceTrack
                                atTime:firstRange.duration
                                 error:&insertError]) {
      fail(insertError.localizedDescription);
    }
    targetTrack.preferredTransform = sourceTrack.preferredTransform;

    NSURL *outputURL = [NSURL fileURLWithPath:outputPath];
    [[NSFileManager defaultManager] removeItemAtURL:outputURL error:nil];
    AVAssetExportSession *exporter = [[AVAssetExportSession alloc]
      initWithAsset:composition
      presetName:AVAssetExportPreset1280x720];
    if (!exporter) fail(@"Could not create an H.264 export session.");
    exporter.outputURL = outputURL;
    exporter.outputFileType = AVFileTypeMPEG4;
    exporter.shouldOptimizeForNetworkUse = YES;
    exporter.metadata = @[];

    AVMutableVideoComposition *videoComposition = [AVMutableVideoComposition videoComposition];
    videoComposition.renderSize = sourceTrack.naturalSize;
    videoComposition.frameDuration = CMTimeMake(1, 30);
    AVMutableVideoCompositionInstruction *instruction =
      [AVMutableVideoCompositionInstruction videoCompositionInstruction];
    instruction.timeRange = CMTimeRangeMake(kCMTimeZero, composition.duration);
    AVMutableVideoCompositionLayerInstruction *layerInstruction =
      [AVMutableVideoCompositionLayerInstruction
        videoCompositionLayerInstructionWithAssetTrack:targetTrack];
    instruction.layerInstructions = @[layerInstruction];
    videoComposition.instructions = @[instruction];
    exporter.videoComposition = videoComposition;

    dispatch_semaphore_t semaphore = dispatch_semaphore_create(0);
    [exporter exportAsynchronouslyWithCompletionHandler:^{
      dispatch_semaphore_signal(semaphore);
    }];
    dispatch_semaphore_wait(semaphore, DISPATCH_TIME_FOREVER);

    if (exporter.status != AVAssetExportSessionStatusCompleted) {
      fail(exporter.error.localizedDescription ?: @"Video export failed.");
    }

    NSDictionary *attributes = [[NSFileManager defaultManager]
      attributesOfItemAtPath:outputPath
      error:nil];
    unsigned long long size = [attributes fileSize];
    AVURLAsset *outputAsset = [AVURLAsset URLAssetWithURL:outputURL options:nil];
    printf(
      "Optimized video: %.3f seconds, %.1f KB -> %s\n",
      CMTimeGetSeconds(outputAsset.duration),
      (double)size / 1024.0,
      outputPath.UTF8String
    );
  }
  return 0;
}

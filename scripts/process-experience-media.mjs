import { access, mkdir, stat } from "node:fs/promises";
import { basename, join, resolve } from "node:path";
import process from "node:process";
import sharp from "sharp";

const sourceDirectory = resolve(process.argv[2] ?? "");
const mediaDirectory = resolve("public/media");
const mobileDirectory = join(mediaDirectory, "mobile");

const selections = [
  ["漂亮校园.jpeg", "scie-leafy-passage.webp"],
  ["学院.jpg", "scie-metal-house.webp"],
  ["学术表现.jpeg", "scie-student-display-wall.webp"],
  ["奶茶.jpeg", "scie-milk-tea.webp"],
  ["IMG_0576.jpeg", "scie-four-houses.webp"],
  ["IMG_4392.jpeg", "scie-mun-context.webp"],
  ["IMG_0745.JPG", "scie-sports-sprint.webp"],
  ["IMG_0704.jpeg", "scie-sports-day.webp"],
];

if (!process.argv[2]) {
  throw new Error(
    "Usage: node scripts/process-experience-media.mjs <new-photo-resource-directory>",
  );
}

await access(sourceDirectory);
await mkdir(mobileDirectory, { recursive: true });

for (const [sourceName, outputName] of selections) {
  const sourcePath = join(sourceDirectory, sourceName);
  const desktopPath = join(mediaDirectory, outputName);
  const mobilePath = join(mobileDirectory, outputName);

  await access(sourcePath);

  // Re-encoding strips EXIF/GPS metadata. rotate() applies any source orientation
  // before the metadata is discarded.
  await sharp(sourcePath)
    .rotate()
    .resize({ width: 2400, height: 2400, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 82, effort: 6, smartSubsample: true })
    .toFile(desktopPath);

  await sharp(sourcePath)
    .rotate()
    .resize({ width: 1080, height: 1350, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 78, effort: 6, smartSubsample: true })
    .toFile(mobilePath);

  const [desktopMetadata, mobileMetadata, desktopStat, mobileStat] = await Promise.all([
    sharp(desktopPath).metadata(),
    sharp(mobilePath).metadata(),
    stat(desktopPath),
    stat(mobilePath),
  ]);

  console.log(
    [
      basename(sourcePath),
      outputName,
      `${desktopMetadata.width}x${desktopMetadata.height}`,
      `${Math.round(desktopStat.size / 1024)} KiB`,
      `${mobileMetadata.width}x${mobileMetadata.height}`,
      `${Math.round(mobileStat.size / 1024)} KiB`,
    ].join(" | "),
  );
}

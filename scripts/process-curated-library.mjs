import { access, mkdir, stat } from "node:fs/promises";
import { basename, join, resolve } from "node:path";
import process from "node:process";
import sharp from "sharp";

const sourceDirectory = resolve(process.argv[2] ?? "");
const mediaDirectory = resolve("public/media");
const mobileDirectory = join(mediaDirectory, "mobile");

const selections = [
  ["超美景色-建议封面.jpeg", "scie-campus-hero.webp"],
  ["shenzhen2.jpg", "scie-shenzhen-origin.webp"],
  ["远舟-校园标志建筑.jpeg", "scie-antuoshan-landmark.webp"],
  ["house.jpeg", "scie-house-community.webp"],
  ["第二版本星光大道.jpeg", "scie-starlight-avenue.webp"],
  ["走廊.jpeg", "scie-green-facade.webp"],
  ["校园景色2.jpeg", "scie-green-corridor.webp"],
  ["校园风景.jpeg", "scie-campus-evening.webp"],
  ["花1.jpeg", "scie-bougainvillea-light.webp"],
  ["篮球场.jpeg", "scie-basketball-court.webp"],
  ["校园景色3.jpeg", "scie-reeds-sky.webp"],
  ["校园景色1.jpeg", "scie-campus-walkway.webp"],
  ["shenzhen.jpeg", "scie-shenzhen-night.webp"],
  ["houseEvent3.jpeg", "scie-house-quiz.webp"],
  ["sgt校园艺术表演.jpeg", "scie-expression-stage.webp"],
  ["FashionShow2.jpeg", "scie-expression-fashion.webp"],
  ["讲座.jpeg", "scie-expression-dialogue.webp"],
  ["维港.jpeg", "scie-victoria-harbour.webp"],
  ["school-community.jpeg", "scie-community-portrait.webp"],
  ["美食节.jpeg", "scie-food-festival.webp"],
  ["露营.JPG", "scie-life-camp.webp"],
  ["studentlife.jpeg", "scie-life-creativity.webp"],
  ["FashionShow-streetism.jpeg", "scie-life-fashion.webp"],
  ["house-event.jpeg", "scie-life-house.webp"],
  ["schoolcat.jpeg", "scie-life-cat.webp"],
  ["chritsmas-tree-decoration.jpeg", "scie-life-christmas.webp"],
];

if (!process.argv[2]) {
  throw new Error("Usage: node scripts/process-curated-library.mjs <image-library-directory>");
}

await access(sourceDirectory);
await mkdir(mobileDirectory, { recursive: true });

for (const [sourceName, outputName] of selections) {
  const sourcePath = join(sourceDirectory, sourceName);
  const desktopPath = join(mediaDirectory, outputName);
  const mobilePath = join(mobileDirectory, outputName);

  await access(sourcePath);

  await sharp(sourcePath)
    .rotate()
    .resize({ width: 2400, withoutEnlargement: true })
    .webp({ quality: 82, effort: 6, smartSubsample: true })
    .toFile(desktopPath);

  await sharp(sourcePath)
    .rotate()
    .resize({ width: 1080, withoutEnlargement: true })
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

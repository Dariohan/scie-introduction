import { mkdir, rename } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const sourceRoot = process.argv[2] ? path.resolve(process.argv[2]) : null;
if (!sourceRoot) {
  throw new Error("请传入原始素材文件夹路径，例如：node scripts/process-media.mjs /路径/到/素材文件夹");
}
const outputRoot = new URL("../public/media/", import.meta.url).pathname;
const responsiveRoot = path.join(outputRoot, "mobile");

const media = {
  "campus-lunch-bowl.jpg": "cuisine/IMG_6883.jpeg",
  "campus-dessert-moment.jpg": "cuisine/IMG_6916.jpeg",
  "campus-tree-canopy.jpg": "beautiful-school/IMG_9075.jpeg",
  "campus-bougainvillea.jpg": "beautiful-school/IMG_7384.jpeg",
  "campus-green-facade.jpg": "beautiful-school/IMG_0401.jpeg",
  "campus-sunset.jpg": "beautiful-school/IMG_0790.jpeg",
  "campus-court-at-dusk.jpg": "beautiful-school/IMG_7398.jpeg",
  "campus-green-corridor.jpg": "beautiful-school/IMG_0411.jpeg",
  "campus-starlight-stairs.jpg": "校园标志建筑/星光大道.jpeg",
  "campus-christmas.jpg": "wonderful-activities/IMG_1371.jpeg",
  "student-market-fair.jpg": "wonderful-activities/IMG_1546.jpeg",
  "campus-fireworks.jpg": "wonderful-activities/IMG_0119.JPG",
  "student-theatre.jpg": "wonderful-activities/IMG_9010.jpeg",
  "student-community.jpg": "wonderful-activities/IMG_0568.jpeg",
  "student-camp-stage.jpg": "wonderful-activities/IMG_0287.JPG",
  "student-dance.jpg": "校园生活和学院/IMG_8782.jpeg",
  "student-forum.jpg": "校园生活和学院/IMG_0721.jpeg",
  "campus-cat.jpg": "校园生活和学院/IMG_7163.jpeg",
  "teacher-student-workshop.jpg": "校园生活和学院/IMG_2886.jpeg",
};

for (const [outputName, sourceName] of Object.entries(media)) {
  const output = path.join(outputRoot, outputName);
  const temporary = `${output}.processing`;

  await sharp(path.join(sourceRoot, sourceName))
    .rotate()
    .resize({
      width: 2200,
      height: 2200,
      fit: "inside",
      withoutEnlargement: true,
    })
    .jpeg({
      quality: 82,
      progressive: true,
      chromaSubsampling: "4:4:4",
      mozjpeg: true,
    })
    .toFile(temporary);

  await rename(temporary, output);
}

await mkdir(responsiveRoot, { recursive: true });

for (const outputName of Object.keys(media)) {
  await sharp(path.join(outputRoot, outputName))
    .resize({ width: 960, withoutEnlargement: true })
    .jpeg({ quality: 76, progressive: true, mozjpeg: true })
    .toFile(path.join(responsiveRoot, outputName));
}

const checks = [];
for (const outputName of Object.keys(media)) {
  const output = path.join(outputRoot, outputName);
  const metadata = await sharp(output).metadata();
  const { channels } = await sharp(output).stats();
  checks.push({
    file: outputName,
    width: metadata.width,
    height: metadata.height,
    variation: Math.round(channels.reduce((total, channel) => total + channel.stdev, 0)),
  });
}

console.log(JSON.stringify(checks, null, 2));

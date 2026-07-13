import sharp from "sharp";

const width = 1200;
const height = 630;

const sharedDefs = `
  <defs>
    <linearGradient id="shade" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#070b0a" stop-opacity="0.94"/>
      <stop offset="0.64" stop-color="#070b0a" stop-opacity="0.62"/>
      <stop offset="1" stop-color="#070b0a" stop-opacity="0.18"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#shade)"/>
  <rect x="72" y="188" width="52" height="4" rx="2" fill="#b9ff66"/>
`;

const chineseOverlay = Buffer.from(`
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  ${sharedDefs}
  <text x="145" y="198" fill="#d9e0d8" font-family="PingFang SC, Microsoft YaHei, sans-serif" font-size="24" letter-spacing="8">中国 · 深圳 · 福田</text>
  <text x="72" y="318" fill="#ffffff" font-family="Songti SC, STSong, serif" font-size="82" font-weight="600" letter-spacing="-2">深圳国际交流书院</text>
  <text x="72" y="406" fill="#b9ff66" font-family="Songti SC, STSong, serif" font-size="54" letter-spacing="5">立足深圳 · 连接世界</text>
  <text x="74" y="495" fill="#d9e0d8" fill-opacity="0.78" font-family="PingFang SC, Microsoft YaHei, sans-serif" font-size="25" letter-spacing="3">认识世界，理解世界，然后用自己的方式改变世界。</text>
  <text x="1048" y="568" fill="#ffffff" fill-opacity="0.72" font-family="SFMono-Regular, monospace" font-size="20" letter-spacing="4">2003</text>
</svg>`);

const englishOverlay = Buffer.from(`
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  ${sharedDefs}
  <text x="145" y="198" fill="#d9e0d8" font-family="Helvetica, Arial, sans-serif" font-size="22" letter-spacing="6">FUTIAN · SHENZHEN · CHINA</text>
  <text x="72" y="305" fill="#ffffff" font-family="Georgia, Times New Roman, serif" font-size="67" font-weight="600" letter-spacing="-1">Shenzhen College of</text>
  <text x="72" y="378" fill="#ffffff" font-family="Georgia, Times New Roman, serif" font-size="67" font-weight="600" letter-spacing="-1">International Education</text>
  <text x="74" y="446" fill="#b9ff66" font-family="Helvetica, Arial, sans-serif" font-size="25" font-weight="700" letter-spacing="3">ROOTED IN SHENZHEN · CONNECTED TO THE WORLD</text>
  <text x="74" y="505" fill="#d9e0d8" fill-opacity="0.78" font-family="Helvetica, Arial, sans-serif" font-size="23" letter-spacing="1">Learn to understand the world — and prepare to change it.</text>
  <text x="1048" y="568" fill="#ffffff" fill-opacity="0.72" font-family="SFMono-Regular, monospace" font-size="20" letter-spacing="4">2003</text>
</svg>`);

const emblem = await sharp("public/media/scie-emblem-fallback.jpg")
  .resize(116, 116, { fit: "cover" })
  .composite([
    {
      input: Buffer.from(
        '<svg width="116" height="116"><circle cx="58" cy="58" r="58" fill="white"/></svg>',
      ),
      blend: "dest-in",
    },
  ])
  .png()
  .toBuffer();

async function createSocialImage(outputPath, overlay) {
  await sharp("public/media/scie-campus-hero.webp")
    .resize(width, height, { fit: "cover", position: "centre" })
    .modulate({ saturation: 0.82, brightness: 0.78 })
    .composite([
      { input: overlay },
      { input: emblem, left: 1012, top: 68 },
    ])
    .png({ compressionLevel: 9, palette: false })
    .toFile(outputPath);

  const metadata = await sharp(outputPath).metadata();
  console.log(`${outputPath}: ${metadata.width}x${metadata.height} ${metadata.format}`);
}

await Promise.all([
  createSocialImage("public/og.png", chineseOverlay),
  createSocialImage("public/og-en.png", englishOverlay),
]);

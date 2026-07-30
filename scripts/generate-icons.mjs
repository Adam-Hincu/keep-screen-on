import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

const publicDir = join(import.meta.dirname, "..", "public");
const svg = readFileSync(join(publicDir, "favicon.svg"));
const svgWidth = 512;

async function renderIcon(size, { palette = false } = {}) {
  // Dense SVG rasterization + single Lanczos downscale for smooth edges.
  const supersample = Math.max(8, Math.ceil(2048 / size));
  const renderSize = size * supersample;
  const density = (renderSize / svgWidth) * 72;

  let pipeline = sharp(svg, { density })
    .ensureAlpha()
    .resize(size, size, {
      fit: "fill",
      kernel: sharp.kernel.lanczos3,
    });

  if (palette) {
    pipeline = pipeline.png({
      compressionLevel: 9,
      effort: 10,
      adaptiveFiltering: true,
      palette: true,
      colors: 128,
      quality: 100,
      dither: 0,
    });
  } else {
    // Full 32-bit PNG — keeps anti-aliased edges uncompressed-looking.
    pipeline = pipeline.png({
      compressionLevel: 9,
      effort: 10,
      adaptiveFiltering: true,
    });
  }

  return pipeline.toBuffer();
}

function createIco(pngBuffers) {
  const count = pngBuffers.length;
  let offset = 6 + count * 16;

  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(count, 4);

  const entries = [];
  const images = [];

  for (const png of pngBuffers) {
    const width = png.readUInt32BE(16);
    const height = png.readUInt32BE(20);
    const entry = Buffer.alloc(16);

    entry.writeUInt8(width >= 256 ? 0 : width, 0);
    entry.writeUInt8(height >= 256 ? 0 : height, 1);
    entry.writeUInt8(0, 2);
    entry.writeUInt8(0, 3);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(png.length, 8);
    entry.writeUInt32LE(offset, 12);

    entries.push(entry);
    images.push(png);
    offset += png.length;
  }

  return Buffer.concat([header, ...entries, ...images]);
}

const appleTouchIcon = await renderIcon(180);
writeFileSync(join(publicDir, "apple-touch-icon.png"), appleTouchIcon);

const faviconSizes = [16, 32, 48];
const faviconPngs = await Promise.all(
  faviconSizes.map((size) => renderIcon(size)),
);
const faviconIco = createIco(faviconPngs);
writeFileSync(join(publicDir, "favicon.ico"), faviconIco);

console.log(
  `apple-touch-icon.png: ${appleTouchIcon.length} bytes\n` +
    faviconSizes
      .map((size, index) => `favicon ${size}x${size}: ${faviconPngs[index].length} bytes`)
      .join("\n") +
    `\nfavicon.ico: ${faviconIco.length} bytes`,
);

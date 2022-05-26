/* eslint-disable comma-dangle */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable quotes */
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const target = path.resolve(__dirname, "src/public/images/heros");
const destination = path.resolve(__dirname, "dist/images/heros");

if (!fs.existsSync(destination)) {
  fs.mkdirSync(destination, { recursive: true });
}

fs.readdirSync(target).forEach((image) => {
  // merubah ukuran gambar lebar 800px, dengan prefix -large.jpg
  sharp(`${target}/${image}`)
    .resize(800)
    .toFile(
      path.resolve(
        __dirname,
        `${destination}/${image.split(".").slice(0, -1).join(".")}-large.jpg`
      )
    );

  // merubah ukuran gambar lebar 480px, dengan prefix -small.jpg
  sharp(`${target}/${image}`)
    .resize(480)
    .toFile(
      path.resolve(
        __dirname,
        `${destination}/${image.split(".").slice(0, -1).join(".")}-small.jpg`
      )
    );
});

const fs = require('fs');
try {
  fs.copyFileSync('/home/surendra/.gemini/antigravity/brain/d11bd2e6-f94b-41ff-9aaf-2e2dd090c3d9/media__1782559457179.png', './public/logodark2.png');
  console.log("Image copied successfully!");
} catch (e) {
  console.error("Failed to copy image", e);
}

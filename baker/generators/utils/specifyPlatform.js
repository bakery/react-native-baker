/**
 * specifyPlatform
 *
 * Attach platform specifier to a .js file name (ios|android|<empty>)
 */

function specifyPlatform(filePath, platform) {
  const rx = /(.+)\.js$/ig;
  const parts = rx.exec(filePath);

  if (parts && parts.length === 2) {
    return platform && platform !== '' ?
      `${parts[1]}.${platform}.js` :
      `${parts[1]}.js`;
  } else {
    // XX: bail
    return filePath;
  }
}

module.exports = specifyPlatform;

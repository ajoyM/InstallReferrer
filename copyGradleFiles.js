module.exports = function (context) {
    var fs = require('fs');
    fs.copyFileSync("build-extras.gradle", "platforms/android/app/build-extras.gradle");
    fs.copyFileSync("build.gradle", "platforms/android/build.gradle");
     
}

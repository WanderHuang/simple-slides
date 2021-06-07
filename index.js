const childProcess = require("child_process");
const fs = require("fs");
const path = require("path");
const config = require("./pandoc.config.json");

console.log("Building all");

const cwd = process.cwd();

if (!fs.existsSync(path.resolve(cwd, "./dist"))) {
  childProcess.execSync("mkdir dist")
}

let dir = fs.readdirSync(".");
let md = dir
  .filter((p) => path.extname(p) === ".md")
  .filter((file) => path.basename(file) !== "readme.md");

let rule = getRules(config);

md.forEach((file) => {
  let name = path.basename(file);
  name = path.parse(name);
  name = name.name;
  console.log("name", name);
  childProcess.execSync(
    `pandoc ${name}.md -o ./dist/${name}.html -t revealjs -s ${rule} --css common.css`
  );
});

let style = fs.readFileSync("common.css");

fs.writeFileSync("./dist/common.css", style)
copyImages();

/**
 * @param config.incremental {boolean} 是否渐进显示列表
 * @param config.theme {string} 主题色。选项black | white | league | beige | sky | night | serif | simple | solarized
 * @param config.transition {string} 过渡效果 选项none | fade | slide | convex | concave | zoom
 * @param config.highlight 代码高亮效果 选项pygments | tango | espresso | zenburn | kate | monochrome | breezedark | haddock
 */
function getRules(config) {
  let rule = "";
  // 渐进显示
  if (config.incremental) {
    rule += " -i";
  }
  // 主题
  rule += " -V theme=" + (config.theme || "black");

  rule += " -V transition=" + (config.transition || "fade");

  rule += " --highlight=" + (config.highlight || "monochrome")

  rule += " -V width=" + (config.width || 1400)

  rule += " -V height=" + (config.height || 700)

  return rule
}

function copyImages() {
  if (fs.existsSync(path.resolve(cwd, "./dist/images"))) {
    childProcess.execSync("rm -rf ./dist/images/");
  }

  childProcess.execSync("cp -R ./images/ ./dist/images/")
}


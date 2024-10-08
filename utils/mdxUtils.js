const fs = require("fs");
const path = require("path");

// // Recursive function that calls itself to fetches all the files, including those in subdirectories
// const getAllDirectoryFiles = function (dirPath, arrayOfFiles) {
//     let files = fs.readdirSync(dirPath);

//     arrayOfFiles = arrayOfFiles || [];

//     files.forEach(function (file) {
//         if (fs.statSync(dirPath + "/" + file).isDirectory()) {
//             arrayOfFiles = getAllDirectoryFiles(
//                 dirPath + "/" + file,
//                 arrayOfFiles
//             );
//         } else {
//             arrayOfFiles.push(file);
//         }
//     });

//     return arrayOfFiles;
// };

// PRACTICES_PATH is useful when you want to get the path to a specific file
const PRACTICES_PATH = path.join(process.cwd(), "posts", "practices");

const practiceFilePaths = fs
  .readdirSync(PRACTICES_PATH)
  // Only include MDX files
  .filter((path) => /\.mdx?$/.test(path));

const NOTES_PATH = path.join(process.cwd(), "posts", "notes");

const noteFilePaths = fs
  .readdirSync(NOTES_PATH)
  .filter((path) => /\.mdx?$/.test(path));

const PATTERNS_PATH = path.join(process.cwd(), "posts", "patterns");

const patternFilePaths = fs
  .readdirSync(PATTERNS_PATH)
  .filter((path) => /\.mdx?$/.test(path));

const PROJECTS_PATH = path.join(process.cwd(), "posts", "projects");

const projectFilePaths = fs
  .readdirSync(PROJECTS_PATH)
  .filter((path) => /\.mdx?$/.test(path));

module.exports = {
  practiceFilePaths,
  noteFilePaths,
  projectFilePaths,
  patternFilePaths,
  PATTERNS_PATH,
  PRACTICES_PATH,
  NOTES_PATH,
  PROJECTS_PATH,
};

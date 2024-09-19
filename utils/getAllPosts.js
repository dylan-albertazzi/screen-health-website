import fs from "fs";
import matter from "gray-matter";
import path from "path";

import { NOTES_PATH, PRACTICES_PATH, PATTERNS_PATH } from "./mdxUtils.js";

// Get Post based on Slug
export const getPostdata = async (slug) => {
  const essays = fs.readdirSync(PRACTICES_PATH);
  const notes = fs.readdirSync(NOTES_PATH);
  const patterns = fs.readdirSync(PATTERNS_PATH);

  let post;
  if (essays.includes(slug + ".mdx")) {
    post = fs.readFileSync(path.join(PRACTICES_PATH, slug + ".mdx"), "utf8");
  } else if (notes.includes(slug + ".mdx")) {
    post = fs.readFileSync(path.join(NOTES_PATH, slug + ".mdx"), "utf8");
  } else if (patterns.includes(slug + ".mdx")) {
    post = fs.readFileSync(path.join(PATTERNS_PATH, slug + ".mdx"), "utf8");
  }

  return post;
};

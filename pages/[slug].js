import fs from "fs";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import { components } from "../utils/components";
import path from "path";
import { getHeadings } from "../utils/getHeadings";
import { linkify } from "../utils/linkify";
import PostLinks from "../links.json";
import EssayTemplate from "../templates/EssayTemplate";
import NoteTemplate from "../templates/NoteTemplate";
import ProjectTemplate from "../templates/ProjectTemplate";
import PatternTemplate from "../templates/PatternTemplate";

import {
  projectFilePaths,
  noteFilePaths,
  practiceFilePaths,
  patternFilePaths,
  PRACTICES_PATH,
  PATTERNS_PATH,
  NOTES_PATH,
  PROJECTS_PATH,
} from "../utils/mdxUtils";
// Custom components/renderers to pass to MDX.
// Since the MDX files aren't loaded by webpack, they have no knowledge of how
// to handle import statements. Instead, you must include components in scope
// here.



export default function PostPage({
  source,
  frontMatter,
  slug,
  headings,
  backlinks,
  toc,
  // ogImage,
}) {
  if (frontMatter.type === "note") {
    return (
      <NoteTemplate
        slug={slug}
        source={source}
        toc={toc}
        frontMatter={frontMatter}
        components={components}
        backlinks={backlinks}
        headings={headings}
        // ogImage={ogImage}
      />
    );
  } else if (frontMatter.type === "essay") {
    return (
      <EssayTemplate
        slug={slug}
        source={source}
        toc={toc}
        frontMatter={frontMatter}
        components={components}
        backlinks={backlinks}
        headings={headings}
        // ogImage={ogImage}
      />
    );
  } else if (frontMatter.type === "project") {
    return (
      <ProjectTemplate
        slug={slug}
        source={source}
        frontMatter={frontMatter}
        components={components}
        // ogImage={ogImage}
      />
    );
  } else if (frontMatter.type === "pattern") {
    return (
      <PatternTemplate
        slug={slug}
        source={source}
        frontMatter={frontMatter}
        components={components}
        // ogImage={ogImage}
      />
    );
  }
}

// const getOgImagePath = (properties) => {
//   let url = "/og-image?";
//   Object.keys(properties).forEach((property) => {
//     if (properties[property]) {
//       url += `${property}=${encodeURIComponent(properties[property])}&`;
//     }
//   });
//   return url;
// };

export const getStaticProps = async ({ params }) => {
  const essays = fs.readdirSync(PRACTICES_PATH);
  const notes = fs.readdirSync(NOTES_PATH);
  const projects = fs.readdirSync(PROJECTS_PATH);
  const patterns = fs.readdirSync(PATTERNS_PATH);

  // const type = essays.find((e) => e.includes(params.slug)) ? "post" : "note";

  let type;

  if (projects.find((file) => file.includes(params.slug))) {
    type = "project";
  } else if (essays.find((file) => file.includes(params.slug))) {
    type = "essay";
  } else if (notes.find((file) => file.includes(params.slug))) {
    type = "note";
  } else if (patterns.find((file) => file.includes(params.slug))) {
    type = "pattern";
  }

  // switch case statement to determine which file to load
  let filePath;
  switch (type) {
    case "essay":
      filePath = path.join(PRACTICES_PATH, `${params.slug}.mdx`);
      break;
    case "note":
      filePath = path.join(NOTES_PATH, `${params.slug}.mdx`);
      break;
    case "project":
      filePath = path.join(PROJECTS_PATH, `${params.slug}.mdx`);
      break;
    case "pattern":
      filePath = path.join(PATTERNS_PATH, `${params.slug}.mdx`);
      break;
  }

  const source = fs.readFileSync(filePath);
  const { content, data } = matter(source);

  const toc = data?.toc || null;

  const headings = await getHeadings(content);

  const ogObject = {
    title: data.title,
    subtitle: data.description,
    postType: data.type,
    growthStage: data.growthStage,
    cover: data.cover,
  };
  // const ogImagePath = getOgImagePath(ogObject);
  // const ogImage = await getOgImage(ogImagePath, data.title);

  const contentWithBidirectionalLinks = linkify(content, data.title);

  const mdxSource = await serialize(contentWithBidirectionalLinks, {
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [
        require("rehype-slug"),
        // require("rehype-autolink-headings"),
      ],
    },
    scope: data,
  });

  // Get backlinks
  const backlinks =
    PostLinks.find((post) => post.ids[0] === data.title)?.inboundLinks || [];

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
      headings,
      slug: params.slug,
      toc,
      backlinks,
      // ogImage,
    },
  };
};

export const getStaticPaths = async () => {
  // Get slugs for all file paths passed in
  const getSlugParams = (filePaths) =>
    filePaths
      // Remove the .mdx extension
      .map((path) => path.replace(/\.mdx?$/, ""))
      .map((slug) => ({ params: { slug } }));

  const notePaths = getSlugParams(noteFilePaths);
  const essayPaths = getSlugParams(practiceFilePaths);
  const projectPaths = getSlugParams(projectFilePaths);
  const patternPaths = getSlugParams(patternFilePaths);

  // Combine all paths into one array
  const paths = notePaths.concat(essayPaths, projectPaths, patternPaths);

  return {
    paths,
    fallback: false,
  };
};

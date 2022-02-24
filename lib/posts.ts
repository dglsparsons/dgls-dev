import { bundleMDX } from "mdx-bundler";
import fs from "fs";
import matter from "gray-matter";
import path from "path";
import readingTime, { ReadTimeResults } from "reading-time";
import { getAllFilesRecursively } from "./utils/files";
// Remark packages
import remarkGfm from "remark-gfm";
import remarkFootnotes from "remark-footnotes";
import remarkMath from "remark-math";
import { remarkCodeTitles } from "./remark-code-title";
import { remarkImgToJsx } from "./remark-img-to-jsx";
// Rehype packages
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeKatex from "rehype-katex";
import rehypePrismPlus from "rehype-prism-plus";
import rehypePresetMinify from "rehype-preset-minify";

const root = process.cwd();

function stripFileSuffix(slug: string): string {
  return slug.replace(/\.(mdx|md)/, "");
}

export async function getPostBySlug(slug: string): Promise<PostContent> {
  return getFileBySlug("posts", slug);
}

export interface PostMetadata {
  readingTime: ReadTimeResults;
  layout: string;
  slug: string;
  date: string;
  title: string;
  tags: string[];
  draft: boolean;
  lastmod: string | null;
  description: string;
  fileName: string;
}

export interface PostContent {
  mdxSource: string;
  metadata: PostMetadata;
}

export async function getFileBySlug(
  type: string,
  slug: string
): Promise<PostContent> {
  const mdxPath = path.join(root, type, `${slug}.mdx`);
  const mdPath = path.join(root, type, `${slug}.md`);
  const source = fs.existsSync(mdxPath)
    ? fs.readFileSync(mdxPath, "utf8")
    : fs.readFileSync(mdPath, "utf8");

  // https://github.com/kentcdodds/mdx-bundler#nextjs-esbuild-enoent
  if (process.platform === "win32") {
    process.env.ESBUILD_BINARY_PATH = path.join(
      root,
      "node_modules",
      "esbuild",
      "esbuild.exe"
    );
  } else {
    process.env.ESBUILD_BINARY_PATH = path.join(
      root,
      "node_modules",
      "esbuild",
      "bin",
      "esbuild"
    );
  }

  // Parsing frontmatter here to pass it in as options to rehype plugin
  const { data: frontmatter } = matter(source);
  const { code } = await bundleMDX({
    source,
    // mdx imports can be automatically source from the components directory
    cwd: path.join(root, "components"),
    xdmOptions(options) {
      // this is the recommended way to add custom remark/rehype plugins:
      // The syntax might look weird, but it protects you in case we add/remove
      // plugins in the future.
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        remarkGfm,
        remarkCodeTitles,
        [remarkFootnotes, { inlineNotes: true }],
        remarkMath,
        remarkImgToJsx,
      ];
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        rehypeSlug,
        rehypeAutolinkHeadings,
        rehypeKatex,
        [rehypePrismPlus, { ignoreMissing: true }],
        rehypePresetMinify,
      ];
      return options;
    },
    esbuildOptions: (options) => {
      options.loader = {
        ...options.loader,
        ".js": "jsx",
        ".ts": "tsx",
      };
      return options;
    },
  });

  return {
    mdxSource: code,
    metadata: {
      fileName: fs.existsSync(mdxPath) ? `${slug}.mdx` : `${slug}.md`,
      readingTime: readingTime(code),
      layout: frontmatter.layout ?? "PostLayout",
      slug: slug,
      title: frontmatter.title ?? "",
      tags: frontmatter.tags ?? [],
      draft: frontmatter.draft ?? false,
      lastmod: frontmatter.lastmod ?? null,
      description: frontmatter.description ?? "",
      date: new Date(frontmatter.date ?? Date.now()).toISOString(),
    },
  };
}

export interface Post {
  slug: string;
  date: string;
  title: string;
  description: string;
  tags: string[];
}

export async function getAllPosts() {
  const prefixPaths = path.join(root, "posts");

  const files = getAllFilesRecursively(prefixPaths);

  const posts: Post[] = [];

  files.forEach((file) => {
    // Replace is needed to work on Windows
    const fileName = file.slice(prefixPaths.length + 1).replace(/\\/g, "/");
    // Remove Unexpected File
    if (path.extname(fileName) !== ".md" && path.extname(fileName) !== ".mdx") {
      return;
    }
    const source = fs.readFileSync(file, "utf8");
    const { data: frontmatter } = matter(source);
    if (frontmatter.draft !== true) {
      posts.push({
        title: frontmatter.title ?? "",
        description: frontmatter.description ?? "",
        tags: (frontmatter.tags ?? []) as string[],
        slug: stripFileSuffix(fileName),
        date: new Date(frontmatter.date ?? Date.now()).toISOString(),
      });
    }
  });

  return posts.sort((a, b) => {
    if (a.date > b.date) return -1;
    if (a.date < b.date) return 1;
    return 0;
  });
}

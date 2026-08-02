import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const outputDirectory = path.resolve("dist/client");
const basePath = process.argv[2] ?? "/KO";
const extensions = new Set([".css", ".html", ".js", ".json", ".mjs"]);
const generatedFontDirectory = path.resolve(".vinext/fonts").replaceAll("\\", "/");
const rootFontPath = /(?<![A-Za-z0-9._/-])\/assets\/_vinext_fonts/g;

if (!/^\/[A-Za-z0-9._/-]*$/.test(basePath) || basePath.endsWith("/")) {
  throw new Error(`Invalid GitHub Pages base path: ${basePath}`);
}

let replacements = 0;

async function rewriteDirectory(directory) {
  const entries = await readdir(directory, { withFileTypes: true });

  for (const entry of entries) {
    const filePath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      await rewriteDirectory(filePath);
      continue;
    }

    if (!entry.isFile() || !extensions.has(path.extname(entry.name))) {
      continue;
    }

    const source = await readFile(filePath, "utf8");
    const rootOccurrences = source.match(rootFontPath)?.length ?? 0;
    const generatedOccurrences =
      source.split(generatedFontDirectory).length - 1;
    const occurrences = rootOccurrences + generatedOccurrences;

    if (occurrences === 0) {
      continue;
    }

    await writeFile(
      filePath,
      source
        .replaceAll(
          generatedFontDirectory,
          `${basePath}/assets/_vinext_fonts`,
        )
        .replaceAll(rootFontPath, `${basePath}/assets/_vinext_fonts`),
    );
    replacements += occurrences;
  }
}

await rewriteDirectory(outputDirectory);

if (replacements === 0) {
  throw new Error("No generated vinext font paths were found to rewrite.");
}

console.log(`Rewrote ${replacements} generated font asset paths for ${basePath}.`);

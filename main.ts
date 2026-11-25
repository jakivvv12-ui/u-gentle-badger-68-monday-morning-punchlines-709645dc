import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "My coffee filed for overtime on Monday mornings. It's the only one of us who shows up before I do.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  throw new Error("MAKEFUN_OUTPUT_DIR is not set");
}

// Validate: 1-200 characters, not only whitespace, single line.
const len = [...ENTRY].length;
if (len < 1 || len > 200) {
  throw new Error(`entry must be 1-200 characters, got ${len}`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("entry must be a single line");
}

mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");

// Round-trip check.
const back = readFileSync(outPath, "utf8");
if (back !== ENTRY) {
  throw new Error("round-trip mismatch");
}
console.log(`wrote ${outPath} (${Buffer.byteLength(ENTRY, "utf8")} bytes)`);

import { readFileSync } from "node:fs";
import { execSync } from "node:child_process";
import { resolve } from "node:path";

const checks = [
  {
    file: "out/partners/index.html",
    mustInclude: ["B5 Research", "CoreBiz"],
  },
  {
    file: "out/cases/index.html",
    mustInclude: ["EU Fintech Discovery Reset", "SaaS Delivery Platform Upgrade"],
  },
  {
    file: "out/ru/partners/index.html",
    mustInclude: ["Партнеры", "Проверено"],
  },
  {
    file: "out/ru/cases/index.html",
    mustInclude: ["Публичные кейсы"],
  },
  {
    file: "out/ru/index.html",
    mustNotInclude: ["Static delivery optimized", "Directory", "Outcomes"],
  },
];

let failed = false;

for (const check of checks) {
  const path = resolve(process.cwd(), check.file);
  let content = "";

  try {
    content = readFileSync(path, "utf8");
  } catch (error) {
    console.error(`Missing file: ${check.file}`);
    failed = true;
    continue;
  }

  for (const snippet of check.mustInclude ?? []) {
    if (!content.includes(snippet)) {
      console.error(`Missing "${snippet}" in ${check.file}`);
      failed = true;
    }
  }

  for (const snippet of check.mustNotInclude ?? []) {
    if (content.includes(snippet)) {
      console.error(`Forbidden "${snippet}" found in ${check.file}`);
      failed = true;
    }
  }
}

// Scan all RU-exported HTML files for obvious EN section labels.
try {
  const ruHtmlList = execSync("find out/ru -name '*.html' -print", {
    encoding: "utf8",
  })
    .trim()
    .split("\n")
    .filter(Boolean);

  const forbidden = ["Directory", "Outcomes"];
  for (const file of ruHtmlList) {
    const html = readFileSync(resolve(process.cwd(), file), "utf8");
    for (const snippet of forbidden) {
      if (html.includes(snippet)) {
        console.error(`Forbidden "${snippet}" found in ${file}`);
        failed = true;
      }
    }
  }
} catch {
  console.error("Failed to scan out/ru HTML files.");
  failed = true;
}

if (failed) {
  process.exit(1);
}

console.log("Static HTML assertions passed.");

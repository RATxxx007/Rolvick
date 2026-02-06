import { readFileSync } from "node:fs";
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
    mustInclude: ["Каталог партнеров"],
  },
  {
    file: "out/ru/cases/index.html",
    mustInclude: ["Публичные кейсы"],
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

  for (const snippet of check.mustInclude) {
    if (!content.includes(snippet)) {
      console.error(`Missing "${snippet}" in ${check.file}`);
      failed = true;
    }
  }
}

if (failed) {
  process.exit(1);
}

console.log("Static HTML assertions passed.");

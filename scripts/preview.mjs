import { createServer } from "node:http";
import { existsSync } from "node:fs";
import { resolve } from "node:path";

import handler from "serve-handler";

const outputDir = resolve(process.cwd(), "out");

if (!existsSync(outputDir)) {
  console.error("Run pnpm build first (it generates ./out).\n");
  process.exit(1);
}

const port = 4173;
const rawBasePath = process.env.BASE_PATH || "";
const normalizedBasePath = rawBasePath
  ? `/${rawBasePath.replace(/^\/+|\/+$/g, "")}`
  : "";

const server = createServer((request, response) => {
  if (normalizedBasePath && request.url) {
    const url = new URL(request.url, "http://localhost");

    if (url.pathname === normalizedBasePath) {
      url.pathname = "/";
      request.url = `${url.pathname}${url.search}`;
    } else if (url.pathname.startsWith(`${normalizedBasePath}/`)) {
      url.pathname = url.pathname.slice(normalizedBasePath.length) || "/";
      request.url = `${url.pathname}${url.search}`;
    }
  }

  return handler(request, response, {
    public: outputDir,
    cleanUrls: false,
  });
});

server.listen(port, () => {
  console.log(`Preview URL: http://localhost:${port}`);
  console.log(`BASE_PATH: ${rawBasePath || "(empty)"}`);
  console.log("Stop server: Ctrl+C");
});

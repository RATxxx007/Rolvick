const runtimeBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? process.env.BASE_PATH ?? "";

export function withBasePath(path: string): string {
  if (!path.startsWith("/")) {
    throw new Error("withBasePath expects an absolute path like /contact");
  }

  return runtimeBasePath ? `${runtimeBasePath}${path}` : path;
}

export function getBasePath(): string {
  return runtimeBasePath;
}

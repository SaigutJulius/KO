const siteBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function withBasePath(path: string): string {
  if (!siteBasePath || !path.startsWith("/")) return path;
  return `${siteBasePath}${path}`;
}

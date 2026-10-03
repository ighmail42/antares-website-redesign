/**
 * Where the content files live, so the editor at /admin can link an editor
 * straight to the right file on GitHub and fetch the latest version.
 *
 * Change these if the repository moves.
 */
export const contentRepo = {
  owner: "team6962",
  name: "antares-website-redesign",
  branch: "main",
  /** Folder holding the JSON files, relative to the repository root. */
  dir: "content/data",
};

export function fileUrl(id: string): string {
  return `https://github.com/${contentRepo.owner}/${contentRepo.name}/blob/${contentRepo.branch}/${contentRepo.dir}/${id}.json`;
}

export function editUrl(id: string): string {
  return `https://github.com/${contentRepo.owner}/${contentRepo.name}/edit/${contentRepo.branch}/${contentRepo.dir}/${id}.json`;
}

/** Raw file, for pulling the newest version into the editor. */
export function rawUrl(id: string): string {
  return `https://raw.githubusercontent.com/${contentRepo.owner}/${contentRepo.name}/${contentRepo.branch}/${contentRepo.dir}/${id}.json`;
}

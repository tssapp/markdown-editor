const ghUrl = "https://github.com/tssapp/markdown-editor";

export const version: string = import.meta.env.VITE_VERSION || "unset_version";
export const sha: string = import.meta.env.VITE_GIT_SHA || "unset_sha";

export const github = {
  sha: `${ghUrl}/commit/${sha}`,
  version: `${ghUrl}/releases/tag/${version}`,
  url: ghUrl,
};

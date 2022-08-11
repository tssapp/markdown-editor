export const sha = import.meta.env.SNOWPACK_PUBLIC_GIT_SHA || "arandomsha";
export const title = import.meta.env.SNOWPACK_PUBLIC_TITLE || "Boilerplate";
export const basename = import.meta.env.SNOWPACK_PUBLIC_URL;

const ghUrl = "https://github.com/tssapp/markdown-editor";

export const github = { sha: `${ghUrl}/commit/${sha}`, url: ghUrl };
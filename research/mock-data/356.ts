
import Component from "../components/356";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"name":"Node.js Gitignore Template (Sample)","source":"# Node.js Gitignore Template (Sample)\n# Dependencies\nnode_modules/\n# Build output\nbuild/\ndist/\n# Logs\nnpm-debug.log*\n# Environment variables\n.env\n# Editor directories\n.vscode/\n.idea/\n.DS_Store"};
}

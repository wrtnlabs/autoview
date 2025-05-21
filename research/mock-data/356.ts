
import Component from "../components/356";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"name":"Node.js (Sample Gitignore Template)","source":"# Sample Node.js .gitignore\n# Logs\nlogs/\nnpm-debug.log*\nyarn-debug.log*\n# Dependency directories\nnode_modules/\n# Build output\ndist/\nbuild/\n# Environment variables\n.env\n# Coverage directory\ncoverage/\n# macOS files\n.DS_Store\n"};
}


import Component from "../components/356";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"name":"Node.gitignore (Sample)","source":"# Node.js dependencies\nnode_modules/\n\n# Environment variables\n.env\n\n# Build outputs\ndist/\nbuild/\n\n# Logs\nnpm-debug.log*\nyarn-debug.log*\nyarn-error.log*\n\n# Coverage directories\ncoverage/\n\n# Temporary files\n*.tmp\n"};
}

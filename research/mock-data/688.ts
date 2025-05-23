
import Component from "../components/688";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":3,"devcontainers":[{"path":".devcontainer/devcontainer-nodejs.json","name":"Node.js Devcontainer (Sample)","display_name":"Node.js Sample Environment"},{"path":".devcontainer/devcontainer-python.json","name":"Python Devcontainer (Test)"},{"path":".devcontainer/devcontainer-dotnet.json"}]};
}

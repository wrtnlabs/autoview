
import Component from "../components/688";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":4,"devcontainers":[{"path":".devcontainer/devcontainer.json","name":"nodejs-ts-sample","display_name":"Node.js & TypeScript (Sample)"},{"path":"frontend/.devcontainer/devcontainer.json","name":"frontend-node-sample"},{"path":"backend/.devcontainer/devcontainer.json","display_name":"Python 3 (Sample Container)"},{"path":"infra/.devcontainer/docker-compose.yml"}]};
}

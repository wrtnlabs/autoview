
import Component from "../components/688";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"total_count":3,"devcontainers":[{"path":".devcontainer/devcontainer.json","name":"Node.js & TypeScript DevContainer (Test)","display_name":"Node.js (TS) Sample"},{"path":".devcontainer/python-devcontainer.json","display_name":"Python DevContainer Sample"},{"path":".github/codespaces/container-compose.yml","name":"Docker Compose DevContainer Sample"}]};
}

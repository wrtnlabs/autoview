import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export interface actions_workflow_access_to_repository {
        /**
         * Defines the level of access that workflows outside of the repository have to actions and reusable workflows within the
         * repository.
         *
         * `none` means the access is only possible from workflows in this repository. `user` level access allows sharing across user owned private repositories only. `organization` level access allows sharing across the organization.
        */
        access_level: "none" | "user" | "organization";
    }
}
export type AutoViewInput = AutoViewInputSubTypes.actions_workflow_access_to_repository;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const level = value.access_level;
  let label: string;
  let description: string;
  let Icon: React.ElementType;
  let bgColor: string;
  let textColor: string;

  switch (level) {
    case "none":
      label = "No Access";
      description =
        "Workflows outside this repository cannot access actions or reusable workflows.";
      Icon = LucideReact.XCircle;
      bgColor = "bg-red-100";
      textColor = "text-red-600";
      break;
    case "user":
      label = "User-level Access";
      description =
        "Accessible by workflows in user-owned private repositories.";
      Icon = LucideReact.User;
      bgColor = "bg-blue-100";
      textColor = "text-blue-600";
      break;
    case "organization":
      label = "Organization-level Access";
      description = "Accessible by workflows across the organization.";
      Icon = LucideReact.Users;
      bgColor = "bg-green-100";
      textColor = "text-green-600";
      break;
    default:
      label = "Unknown";
      description = "Unknown access level.";
      Icon = LucideReact.AlertTriangle;
      bgColor = "bg-gray-100";
      textColor = "text-gray-600";
      break;
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm max-w-sm mx-auto">
      <h3 className="text-base font-medium text-gray-900 mb-2">
        Workflow Access Level
      </h3>
      <div className="flex items-center gap-2">
        <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${bgColor}`}>
          <Icon size={16} className={`${textColor}`} aria-label={label} />
          <span className={`text-sm font-semibold ${textColor}`}>{label}</span>
        </div>
      </div>
      <p className="mt-2 text-sm text-gray-500">{description}</p>
    </div>
  );
}

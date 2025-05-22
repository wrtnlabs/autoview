import * as LucideReact from "lucide-react";
import React, { JSX } from "react";

export namespace AutoViewInputSubTypes {
  export type actions_workflow_access_to_repository = {
    /**
     * Defines the level of access that workflows outside of the repository have to actions and reusable workflows within the
     * repository.
     *
     * `none` means the access is only possible from workflows in this repository. `user` level access allows sharing across user owned private repositories only. `organization` level access allows sharing across the organization.
     */
    access_level: "none" | "user" | "organization";
  };
}
export type AutoViewInput =
  AutoViewInputSubTypes.actions_workflow_access_to_repository;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const accessMap = {
    none: {
      label: "No Outside Access",
      description: "Access only from workflows in this repository.",
      Icon: LucideReact.XCircle,
      colorIcon: "text-red-500",
      colorText: "text-red-600",
    },
    user: {
      label: "User-Level Access",
      description:
        "Allows sharing across user-owned private repositories only.",
      Icon: LucideReact.User,
      colorIcon: "text-blue-500",
      colorText: "text-blue-600",
    },
    organization: {
      label: "Organization-Wide Access",
      description: "Allows sharing across the organization.",
      Icon: LucideReact.Users,
      colorIcon: "text-green-500",
      colorText: "text-green-600",
    },
  } as const;

  const { label, description, Icon, colorIcon, colorText } =
    accessMap[value.access_level];

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilize semantic HTML elements where appropriate.
  //    (e.g., return <div className="p-4 bg-white rounded-lg shadow-md">...</div>;)
  return (
    <div className="p-4 bg-white rounded-lg shadow-md flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left gap-4">
      <div
        className={`w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 ${colorIcon}`}
      >
        <Icon size={24} strokeWidth={2} aria-hidden="true" />
      </div>
      <div className="flex-1">
        <h3 className="text-sm font-semibold text-gray-500 uppercase">
          Workflow Access
        </h3>
        <p className={`mt-1 text-lg font-medium ${colorText}`}>{label}</p>
        <p className="mt-2 text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
}

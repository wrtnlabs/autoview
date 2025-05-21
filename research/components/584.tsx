import React from "react";
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
export type AutoViewInput = AutoViewInputSubTypes.actions_workflow_access_to_repository;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  // Map raw access levels to user-friendly labels and styling classes
  const accessLevelConfig: Record<
    AutoViewInput["access_level"],
    { label: string; colorClass: string }
  > = {
    none: {
      label: "No External Access",
      colorClass: "bg-red-100 text-red-800",
    },
    user: {
      label: "User-Level Access",
      colorClass: "bg-blue-100 text-blue-800",
    },
    organization: {
      label: "Organization-Level Access",
      colorClass: "bg-green-100 text-green-800",
    },
  };

  const { label, colorClass } = accessLevelConfig[value.access_level];

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilize semantic HTML elements where appropriate.
  return (
    <div className="max-w-xs mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">
        Workflow Access Level
      </h2>
      <span
        className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${colorClass}`}
      >
        {label}
      </span>
    </div>
  );
  // 3. Return the React element.
  //    All displayed data is appropriately transformed and formatted.
}

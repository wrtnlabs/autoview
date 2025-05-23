import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Secrets for a GitHub Codespace.
     *
     * @title Codespaces Secret
    */
    export interface codespaces_org_secret {
        /**
         * The name of the secret
        */
        name: string;
        /**
         * The date and time at which the secret was created, in ISO 8601 format':' YYYY-MM-DDTHH:MM:SSZ.
        */
        created_at: string;
        /**
         * The date and time at which the secret was created, in ISO 8601 format':' YYYY-MM-DDTHH:MM:SSZ.
        */
        updated_at: string;
        /**
         * The type of repositories in the organization that the secret is visible to
        */
        visibility: "all" | "private" | "selected";
        /**
         * The API URL at which the list of repositories this secret is visible to can be retrieved
        */
        selected_repositories_url?: string;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.codespaces_org_secret;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { name, created_at, updated_at, visibility, selected_repositories_url } = value;
  const formattedCreatedAt = new Date(created_at).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
  const formattedUpdatedAt = new Date(updated_at).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });

  // Map visibility to labels, icons, and colors
  const visibilityMap: Record<
    AutoViewInput["visibility"],
    { label: string; icon: JSX.Element; colorClass: string }
  > = {
    all: {
      label: "All repositories",
      icon: <LucideReact.Globe size={16} className="text-blue-500" />,
      colorClass: "text-blue-500",
    },
    private: {
      label: "Private",
      icon: <LucideReact.Lock size={16} className="text-red-500" />,
      colorClass: "text-red-500",
    },
    selected: {
      label: "Selected repositories",
      icon: <LucideReact.ListChecks size={16} className="text-yellow-500" />,
      colorClass: "text-yellow-500",
    },
  };
  const vis = visibilityMap[visibility];

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md w-full bg-white rounded-lg shadow-md p-4 space-y-4">
      {/* Secret Name */}
      <div className="flex items-center space-x-2">
        <LucideReact.Key size={20} className="text-gray-700" />
        <h2 className="text-lg font-semibold text-gray-800 truncate">{name}</h2>
      </div>

      {/* Visibility */}
      <div className="flex items-center space-x-1 text-sm">
        {vis.icon}
        <span className={`font-medium ${vis.colorClass}`}>{vis.label}</span>
      </div>

      {/* Selected repositories URL (if applicable) */}
      {visibility === "selected" && selected_repositories_url && (
        <div className="text-sm text-gray-600">
          <span className="font-medium">Repos URL:</span>
          <span className="ml-1 break-all">{selected_repositories_url}</span>
        </div>
      )}

      {/* Created & Updated timestamps */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600">
        <div className="flex items-center space-x-1">
          <LucideReact.Calendar size={16} />
          <span>Created:</span>
          <span className="ml-1">{formattedCreatedAt}</span>
        </div>
        <div className="flex items-center space-x-1">
          <LucideReact.Edit2 size={16} />
          <span>Updated:</span>
          <span className="ml-1">{formattedUpdatedAt}</span>
        </div>
      </div>
    </div>
  );
}

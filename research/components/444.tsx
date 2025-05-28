import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Secrets for GitHub Dependabot for an organization.
     *
     * @title Dependabot Secret for an Organization
    */
    export interface organization_dependabot_secret {
        /**
         * The name of the secret.
        */
        name: string;
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
        /**
         * Visibility of a secret
        */
        visibility: "all" | "private" | "selected";
        selected_repositories_url?: string & tags.Format<"uri">;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.organization_dependabot_secret;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formattedCreatedAt = new Date(value.created_at).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
  const formattedUpdatedAt = new Date(value.updated_at).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });

  const visibilityMap: Record<
    AutoViewInputSubTypes.organization_dependabot_secret["visibility"],
    { label: string; icon: JSX.Element }
  > = {
    all: {
      label: "All Repositories",
      icon: (
        <LucideReact.Globe
          size={16}
          className="text-green-500 mr-1"
          aria-hidden="true"
        />
      ),
    },
    private: {
      label: "Private",
      icon: (
        <LucideReact.Lock
          size={16}
          className="text-red-500 mr-1"
          aria-hidden="true"
        />
      ),
    },
    selected: {
      label: "Selected",
      icon: (
        <LucideReact.List
          size={16}
          className="text-yellow-500 mr-1"
          aria-hidden="true"
        />
      ),
    },
  };

  const visibilityInfo = visibilityMap[value.visibility];

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-gray-800 max-w-sm w-full">
      <div className="flex items-center mb-3">
        <LucideReact.Tag
          size={20}
          className="text-blue-500 mr-2"
          aria-hidden="true"
        />
        <h2
          className="text-lg font-semibold truncate"
          title={value.name}
        >
          {value.name}
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-600">
        <div className="flex items-center">
          <LucideReact.Calendar
            size={16}
            className="text-gray-400 mr-1"
            aria-hidden="true"
          />
          <span>Created: {formattedCreatedAt}</span>
        </div>
        <div className="flex items-center">
          <LucideReact.RefreshCw
            size={16}
            className="text-gray-400 mr-1"
            aria-hidden="true"
          />
          <span>Updated: {formattedUpdatedAt}</span>
        </div>
        <div className="flex items-center">
          {visibilityInfo.icon}
          <span>{visibilityInfo.label}</span>
        </div>
        {value.visibility === "selected" && value.selected_repositories_url && (
          <div className="flex items-center col-span-full">
            <LucideReact.Link
              size={16}
              className="text-gray-400 mr-1"
              aria-hidden="true"
            />
            <span
              className="truncate"
              title={value.selected_repositories_url}
            >
              {value.selected_repositories_url}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

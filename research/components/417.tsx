import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Organization variable for GitHub Actions.
     *
     * @title Actions Variable for an Organization
    */
    export interface organization_actions_variable {
        /**
         * The name of the variable.
        */
        name: string;
        /**
         * The value of the variable.
        */
        value: string;
        /**
         * The date and time at which the variable was created, in ISO 8601 format':' YYYY-MM-DDTHH:MM:SSZ.
        */
        created_at: string;
        /**
         * The date and time at which the variable was last updated, in ISO 8601 format':' YYYY-MM-DDTHH:MM:SSZ.
        */
        updated_at: string;
        /**
         * Visibility of a variable
        */
        visibility: "all" | "private" | "selected";
        selected_repositories_url?: string & tags.Format<"uri">;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.organization_actions_variable;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Data transformation and derived constants
  const formattedCreatedAt = new Date(value.created_at).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
  const formattedUpdatedAt = new Date(value.updated_at).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
  // Mask the variable value for security (showing just first/last chars if long)
  const maskedValue =
    value.value.length > 6
      ? `${value.value.slice(0, 3)}••••${value.value.slice(-3)}`
      : '••••••';
  // Visibility icons and labels
  const visibilityIcons: Record<AutoViewInput['visibility'], JSX.Element> = {
    all: <LucideReact.Users size={16} className="text-blue-500" />,
    private: <LucideReact.Lock size={16} className="text-red-500" />,
    selected: <LucideReact.CheckSquare size={16} className="text-green-500" />,
  };
  const visibilityLabels: Record<AutoViewInput['visibility'], string> = {
    all: 'All',
    private: 'Private',
    selected: 'Selected',
  };
  const visibilityIcon = visibilityIcons[value.visibility];
  const visibilityLabel = visibilityLabels[value.visibility];
  // Shortened display for the selected repositories URL
  let repoDisplay = value.selected_repositories_url ?? '';
  if (repoDisplay) {
    try {
      const url = new URL(repoDisplay);
      repoDisplay = url.host + url.pathname;
    } catch {
      // leave original if parsing fails
    }
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full bg-white rounded-lg shadow-md p-4 space-y-4">
      <header className="flex items-center text-gray-800">
        <LucideReact.Tag size={20} className="mr-2 text-gray-600" />
        <h2 className="text-lg font-semibold truncate">{value.name}</h2>
      </header>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center text-gray-600">
            <LucideReact.Key size={16} className="mr-2" />
            <span className="font-medium">Value</span>
          </div>
          <span className="font-mono text-gray-800">{maskedValue}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center text-gray-600">
            <LucideReact.Calendar size={16} className="mr-2" />
            <span className="font-medium">Created</span>
          </div>
          <time className="text-gray-800">{formattedCreatedAt}</time>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center text-gray-600">
            <LucideReact.Calendar size={16} className="mr-2" />
            <span className="font-medium">Updated</span>
          </div>
          <time className="text-gray-800">{formattedUpdatedAt}</time>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center text-gray-600">
            {visibilityIcon}
            <span className="ml-2 font-medium">Visibility</span>
          </div>
          <span className="text-gray-800">{visibilityLabel}</span>
        </div>

        {value.visibility === 'selected' && repoDisplay && (
          <div className="flex items-start justify-between">
            <div className="flex items-center text-gray-600">
              <LucideReact.Link size={16} className="mr-2" />
              <span className="font-medium">Repositories</span>
            </div>
            <span className="break-all text-blue-600 font-mono">{repoDisplay}</span>
          </div>
        )}
      </div>
    </div>
  );
}

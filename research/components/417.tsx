import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * Organization variable for GitHub Actions.
     *
     * @title Actions Variable for an Organization
    */
    export type organization_actions_variable = {
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
    };
}
export type AutoViewInput = AutoViewInputSubTypes.organization_actions_variable;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const maskedValue = (() => {
    const val = value.value;
    if (val.length <= 10) return val;
    return `${val.slice(0, 4)}...${val.slice(-4)}`;
  })();

  const formatOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  const formattedCreatedAt = new Date(value.created_at).toLocaleString(undefined, formatOptions);
  const formattedUpdatedAt = new Date(value.updated_at).toLocaleString(undefined, formatOptions);
  const visibilityLabel = value.visibility.charAt(0).toUpperCase() + value.visibility.slice(1);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-800 mb-4 truncate">{value.name}</h2>
      <dl className="space-y-4">
        <div className="flex justify-between">
          <dt className="text-sm font-medium text-gray-600">Value</dt>
          <dd className="text-sm text-gray-900 font-mono break-all">{maskedValue}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-sm font-medium text-gray-600">Visibility</dt>
          <dd className="text-sm text-gray-900">{visibilityLabel}</dd>
        </div>
        {value.visibility === "selected" && value.selected_repositories_url && (
          <div className="flex flex-col">
            <dt className="text-sm font-medium text-gray-600">Repositories URL</dt>
            <dd className="text-sm text-blue-600 truncate break-all">{value.selected_repositories_url}</dd>
          </div>
        )}
        <div className="flex justify-between">
          <dt className="text-sm font-medium text-gray-600">Created At</dt>
          <dd className="text-sm text-gray-900">{formattedCreatedAt}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-sm font-medium text-gray-600">Updated At</dt>
          <dd className="text-sm text-gray-900">{formattedUpdatedAt}</dd>
        </div>
      </dl>
    </div>
  );
}

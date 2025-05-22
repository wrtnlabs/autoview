import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * Set secrets for Dependabot.
   *
   * @title Dependabot Secret
   */
  export type dependabot_secret = {
    /**
     * The name of the secret.
     */
    name: string;
    created_at: string & tags.Format<"date-time">;
    updated_at: string & tags.Format<"date-time">;
  };
}
export type AutoViewInput = AutoViewInputSubTypes.dependabot_secret;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Data transformation: format created_at and updated_at into readable strings
  const createdDate = new Date(value.created_at);
  const updatedDate = new Date(value.updated_at);

  const formattedCreated = createdDate.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const formattedUpdated = updatedDate.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  // 2. Compose the visual structure using JSX and Tailwind CSS
  return (
    <div className="max-w-sm w-full p-4 bg-white rounded-lg shadow-md">
      {/* Secret Name */}
      <div className="flex items-center space-x-2 mb-3">
        <LucideReact.Key size={20} className="text-gray-500" />
        <h3
          className="text-lg font-semibold text-gray-800 truncate"
          title={value.name}
        >
          {value.name}
        </h3>
      </div>

      {/* Timestamps */}
      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex items-center space-x-1">
          <LucideReact.Calendar size={16} className="text-gray-400" />
          <span>Created: {formattedCreated}</span>
        </div>
        <div className="flex items-center space-x-1">
          <LucideReact.RefreshCw size={16} className="text-gray-400" />
          <span>Updated: {formattedUpdated}</span>
        </div>
      </div>
    </div>
  );
}

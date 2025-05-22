import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * Set secrets for GitHub Actions.
   *
   * @title Actions Secret
   */
  export type actions_secret = {
    /**
     * The name of the secret.
     */
    name: string;
    created_at: string & tags.Format<"date-time">;
    updated_at: string & tags.Format<"date-time">;
  };
}
export type AutoViewInput = AutoViewInputSubTypes.actions_secret;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formattedCreatedAt = React.useMemo(() => {
    const date = new Date(value.created_at);
    return date.toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  }, [value.created_at]);

  const formattedUpdatedAt = React.useMemo(() => {
    const date = new Date(value.updated_at);
    return date.toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  }, [value.updated_at]);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilize semantic HTML elements where appropriate.
  return (
    <div className="max-w-xs p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-3">
        <LucideReact.Key
          className="mr-2 text-gray-500"
          size={20}
          aria-hidden="true"
        />
        <h3 className="text-lg font-medium text-gray-800 truncate">
          {value.name}
        </h3>
      </div>
      <div className="space-y-2">
        <div className="flex items-center text-sm text-gray-600">
          <LucideReact.Calendar
            className="mr-2 text-gray-400"
            size={16}
            aria-hidden="true"
          />
          <span className="mr-1">Created:</span>
          <span className="font-medium">{formattedCreatedAt}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <LucideReact.Calendar
            className="mr-2 text-gray-400"
            size={16}
            aria-hidden="true"
          />
          <span className="mr-1">Updated:</span>
          <span className="font-medium">{formattedUpdatedAt}</span>
        </div>
      </div>
    </div>
  );
}

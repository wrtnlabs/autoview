import { tags } from "typia";
import React from "react";
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
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const createdDate = new Date(value.created_at);
  const updatedDate = new Date(value.updated_at);

  // Format absolute creation date (e.g., "January 15, 2024")
  const formattedCreated = createdDate.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Derive a human‐friendly "time ago" string for the last update
  function getRelativeTime(from: Date): string {
    const seconds = Math.floor((Date.now() - from.getTime()) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days >= 2) return `${days} days ago`;
    if (days === 1) return `1 day ago`;
    if (hours >= 2) return `${hours} hours ago`;
    if (hours === 1) return `1 hour ago`;
    if (minutes >= 2) return `${minutes} minutes ago`;
    if (minutes === 1) return `1 minute ago`;
    return "just now";
  }
  const updatedRelative = getRelativeTime(updatedDate);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-900 truncate">{value.name}</h3>
      <dl className="mt-3 text-sm text-gray-600 space-y-2">
        <div className="flex items-baseline">
          <dt className="font-medium">Created:</dt>
          <dd className="ml-2">{formattedCreated}</dd>
        </div>
        <div className="flex items-baseline">
          <dt className="font-medium">Last Updated:</dt>
          <dd className="ml-2">{updatedRelative}</dd>
        </div>
      </dl>
    </div>
  );
}

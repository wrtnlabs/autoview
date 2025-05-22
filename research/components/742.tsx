import { tags } from "typia";
import React from "react";
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
  const createdDate = new Date(value.created_at);
  const updatedDate = new Date(value.updated_at);

  const formattedCreated = createdDate.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedUpdated = updatedDate.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-sm mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 truncate">{value.name}</h2>
      <ul className="mt-3 space-y-2 text-sm text-gray-600">
        <li className="flex items-center">
          <span className="font-medium text-gray-700 mr-1">Created:</span>
          <time dateTime={value.created_at}>{formattedCreated}</time>
        </li>
        <li className="flex items-center">
          <span className="font-medium text-gray-700 mr-1">Updated:</span>
          <time dateTime={value.updated_at}>{formattedUpdated}</time>
        </li>
      </ul>
    </div>
  );
}

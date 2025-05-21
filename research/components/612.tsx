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
  const formattedCreatedAt = new Date(value.created_at).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
  const formattedUpdatedAt = new Date(value.updated_at).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm max-w-sm w-full">
      <h2 className="text-lg font-semibold text-gray-900 truncate">
        {value.name}
      </h2>
      <dl className="mt-3 space-y-2">
        <div className="flex justify-between">
          <dt className="text-sm font-medium text-gray-500">Created At</dt>
          <dd className="text-sm text-gray-700">{formattedCreatedAt}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-sm font-medium text-gray-500">Updated At</dt>
          <dd className="text-sm text-gray-700">{formattedUpdatedAt}</dd>
        </div>
      </dl>
    </div>
  );
}

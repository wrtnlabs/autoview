import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * Set repository secrets for GitHub Codespaces.
     *
     * @title Codespaces Secret
    */
    export type repo_codespaces_secret = {
        /**
         * The name of the secret.
        */
        name: string;
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
    };
}
export type AutoViewInput = AutoViewInputSubTypes.repo_codespaces_secret;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const createdDate = new Date(value.created_at);
  const updatedDate = new Date(value.updated_at);

  const formatOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };

  const formattedCreatedAt = createdDate.toLocaleString(undefined, formatOptions);
  const formattedUpdatedAt = updatedDate.toLocaleString(undefined, formatOptions);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  return (
    <div className="w-full max-w-sm bg-white rounded-lg shadow-md p-4">
      <h3 className="text-gray-900 text-lg font-semibold truncate">{value.name}</h3>
      <dl className="mt-3 space-y-2 text-gray-700 text-sm">
        <div className="flex justify-between">
          <dt className="font-medium">Created</dt>
          <dd className="text-right">{formattedCreatedAt}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="font-medium">Updated</dt>
          <dd className="text-right">{formattedUpdatedAt}</dd>
        </div>
      </dl>
    </div>
  );
}

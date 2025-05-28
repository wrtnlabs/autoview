import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Set secrets for Dependabot.
     *
     * @title Dependabot Secret
    */
    export interface dependabot_secret {
        /**
         * The name of the secret.
        */
        name: string;
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.dependabot_secret;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const createdDate: string = new Date(value.created_at).toLocaleString();
  const updatedDate: string = new Date(value.updated_at).toLocaleString();

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-sm w-full">
      <div className="flex items-center mb-3">
        <LucideReact.Key size={20} className="text-gray-600 mr-2" aria-label="Secret Name" />
        <h2 className="text-lg font-semibold text-gray-800 truncate">{value.name}</h2>
      </div>
      <div className="flex flex-col space-y-2 text-sm text-gray-500">
        <div className="flex items-center">
          <LucideReact.Calendar size={16} className="text-gray-400 mr-1" aria-label="Created at" />
          <span className="font-medium">Created:</span>
          <span className="ml-1">{createdDate}</span>
        </div>
        <div className="flex items-center">
          <LucideReact.Clock size={16} className="text-gray-400 mr-1" aria-label="Last updated" />
          <span className="font-medium">Updated:</span>
          <span className="ml-1">{updatedDate}</span>
        </div>
      </div>
    </div>
  );
}

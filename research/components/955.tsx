import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Interaction limit settings.
     *
     * @title Interaction Limits
    */
    export interface interaction_limit_response {
        limit: AutoViewInputSubTypes.interaction_group;
        origin: string;
        expires_at: string & tags.Format<"date-time">;
    }
    /**
     * The type of GitHub user that can comment, open issues, or create pull requests while the interaction limit is in effect.
    */
    export type interaction_group = "existing_users" | "contributors_only" | "collaborators_only";
}
export type AutoViewInput = AutoViewInputSubTypes.interaction_limit_response;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { limit, origin, expires_at } = value;
  const limitLabels: Record<AutoViewInputSubTypes.interaction_group, string> = {
    existing_users: "Existing Users",
    contributors_only: "Contributors Only",
    collaborators_only: "Collaborators Only",
  };
  const displayLimit = limitLabels[limit];
  const formattedExpiry = new Date(expires_at).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
  const truncatedOrigin =
    origin.length > 50 ? origin.slice(0, 50).trimEnd() + "…" : origin;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full sm:max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="flex items-center text-lg font-semibold text-gray-800 mb-4">
        <LucideReact.Shield className="mr-2 text-blue-500" size={20} />
        Interaction Limit
      </h2>
      <dl className="space-y-3">
        <div className="flex items-center">
          <LucideReact.Users className="text-gray-500 mr-2" size={16} />
          <dt className="font-medium text-gray-700">Limit:</dt>
          <dd className="ml-1 text-gray-900">{displayLimit}</dd>
        </div>
        <div className="flex items-center">
          <LucideReact.Link className="text-gray-500 mr-2" size={16} />
          <dt className="font-medium text-gray-700">Origin:</dt>
          <dd
            className="ml-1 text-gray-900 truncate max-w-xs"
            title={origin}
          >
            {truncatedOrigin}
          </dd>
        </div>
        <div className="flex items-center">
          <LucideReact.Calendar className="text-gray-500 mr-2" size={16} />
          <dt className="font-medium text-gray-700">Expires:</dt>
          <dd className="ml-1 text-gray-900">
            <time dateTime={expires_at}>{formattedExpiry}</time>
          </dd>
        </div>
      </dl>
    </div>
  );
}

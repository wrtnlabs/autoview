import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace IApiReposInteractionLimits {
        export type GetResponse = AutoViewInputSubTypes.interaction_limit_response | {};
    }
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
export type AutoViewInput = AutoViewInputSubTypes.IApiReposInteractionLimits.GetResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const data = value as AutoViewInputSubTypes.interaction_limit_response;
  const hasData = typeof data.limit === 'string';

  // Map raw enum to human-readable label
  const groupLabels: Record<AutoViewInputSubTypes.interaction_group, string> = {
    existing_users: 'Existing Users',
    contributors_only: 'Contributors Only',
    collaborators_only: 'Collaborators Only',
  };

  // Format the expiration date if available
  const formattedExpires = hasData
    ? new Date(data.expires_at).toLocaleString(undefined, {
        dateStyle: 'medium',
        timeStyle: 'short',
      })
    : '';

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (!hasData) {
    // Visual for empty state
    return (
      <div className="p-4 bg-white rounded-lg shadow-md flex flex-col items-center justify-center text-gray-500">
        <LucideReact.AlertCircle size={24} className="mb-2" />
        <span className="text-sm">No interaction limits set.</span>
      </div>
    );
  }

  // 3. Return the React element.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md w-full mx-auto">
      <div className="flex items-center mb-4">
        <LucideReact.Users className="text-gray-600" size={20} />
        <h2 className="ml-2 text-lg font-semibold text-gray-800">Interaction Limits</h2>
      </div>
      <dl className="space-y-3 text-gray-700">
        <div className="flex items-center">
          <LucideReact.Users className="text-blue-500" size={16} />
          <span className="ml-2 font-medium">Allowed Group:</span>
          <span className="ml-1 truncate">{groupLabels[data.limit]}</span>
        </div>
        <div className="flex items-center">
          <LucideReact.Globe className="text-green-500" size={16} />
          <span className="ml-2 font-medium">Origin:</span>
          <span className="ml-1 truncate">{data.origin}</span>
        </div>
        <div className="flex items-center">
          <LucideReact.Calendar className="text-gray-500" size={16} />
          <span className="ml-2 font-medium">Expires At:</span>
          <span className="ml-1">{formattedExpires}</span>
        </div>
      </dl>
    </div>
  );
}

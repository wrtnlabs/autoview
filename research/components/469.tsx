import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  export namespace IApiOrgsInteractionLimits {
    export type GetResponse =
      | AutoViewInputSubTypes.interaction_limit_response
      | {};
  }
  /**
   * Interaction limit settings.
   *
   * @title Interaction Limits
   */
  export type interaction_limit_response = {
    limit: AutoViewInputSubTypes.interaction_group;
    origin: string;
    expires_at: string & tags.Format<"date-time">;
  };
  /**
   * The type of GitHub user that can comment, open issues, or create pull requests while the interaction limit is in effect.
   */
  export type interaction_group =
    | "existing_users"
    | "contributors_only"
    | "collaborators_only";
}
export type AutoViewInput =
  AutoViewInputSubTypes.IApiOrgsInteractionLimits.GetResponse;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const hasLimit = value && "limit" in value && value.limit !== undefined;

  // Map each interaction group to a human-readable label and a semantically appropriate icon
  const limitMeta: Record<
    AutoViewInputSubTypes.interaction_group,
    { label: string; icon: JSX.Element }
  > = {
    existing_users: {
      label: "Existing users",
      icon: <LucideReact.Users size={20} className="text-blue-500" />,
    },
    contributors_only: {
      label: "Contributors only",
      icon: <LucideReact.UserCheck size={20} className="text-yellow-500" />,
    },
    collaborators_only: {
      label: "Collaborators only",
      icon: <LucideReact.User size={20} className="text-green-500" />,
    },
  };

  // Format the expiration date into a more readable string
  const formattedExpiresAt = hasLimit
    ? new Date(value.expires_at).toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : "";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
      <h2 className="text-lg font-medium text-gray-900 mb-4">
        Interaction Limit
      </h2>
      {!hasLimit ? (
        <div className="flex items-center gap-2 text-gray-500">
          <LucideReact.AlertCircle size={24} />
          <span>No interaction limits set.</span>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            {limitMeta[value.limit].icon}
            <span className="text-gray-800 font-medium">
              {limitMeta[value.limit].label}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <LucideReact.Code size={16} className="text-gray-500" />
            <span className="text-gray-600 truncate">{value.origin}</span>
          </div>
          <div className="flex items-center gap-2">
            <LucideReact.Calendar size={16} className="text-gray-500" />
            <span className="text-gray-600">{formattedExpiresAt}</span>
          </div>
        </div>
      )}
    </div>
  );
}

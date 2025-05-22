import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  export namespace IApiUserInteractionLimits {
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
  AutoViewInputSubTypes.IApiUserInteractionLimits.GetResponse;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Data presence check
  const hasLimits =
    typeof value === "object" && "limit" in value && !!value.limit;

  // Fallback UI when no interaction limits are set
  if (!hasLimits) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-md text-center">
        <LucideReact.AlertCircle
          size={48}
          className="mx-auto text-gray-300"
          aria-label="No data"
        />
        <p className="mt-4 text-gray-500">No Interaction Limits Set</p>
      </div>
    );
  }

  // 2. Derived display values
  const groupLabels: Record<AutoViewInputSubTypes.interaction_group, string> = {
    existing_users: "Existing Users",
    contributors_only: "Contributors Only",
    collaborators_only: "Collaborators Only",
  };

  const groupIcons: Record<
    AutoViewInputSubTypes.interaction_group,
    JSX.Element
  > = {
    existing_users: (
      <LucideReact.Users size={20} className="text-blue-500 flex-shrink-0" />
    ),
    contributors_only: (
      <LucideReact.UserCheck
        size={20}
        className="text-yellow-500 flex-shrink-0"
      />
    ),
    collaborators_only: (
      <LucideReact.UserPlus
        size={20}
        className="text-green-500 flex-shrink-0"
      />
    ),
  };

  const limit = (value as AutoViewInputSubTypes.interaction_limit_response)
    .limit;
  const origin = (value as AutoViewInputSubTypes.interaction_limit_response)
    .origin;
  const expiresAt = (value as AutoViewInputSubTypes.interaction_limit_response)
    .expires_at;

  const groupLabel = groupLabels[limit];
  const groupIcon = groupIcons[limit];

  const expiresDate = new Date(expiresAt);
  const formattedExpires = expiresDate.toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });

  // 3. Visual structure
  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-sm mx-auto">
      <header className="flex items-center gap-2">
        <LucideReact.Lock size={24} className="text-indigo-500" />
        <h2 className="text-lg font-semibold text-gray-800">
          Interaction Limits
        </h2>
      </header>

      <div className="mt-4 space-y-4">
        <div className="flex items-center gap-2">
          {groupIcon}
          <div className="text-gray-700">
            <span className="font-medium">Allowed Group:</span> {groupLabel}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <LucideReact.Globe
            size={20}
            className="text-gray-500 flex-shrink-0"
          />
          <div className="text-gray-700 truncate">{origin}</div>
        </div>

        <div className="flex items-center gap-2">
          <LucideReact.Calendar
            size={20}
            className="text-gray-500 flex-shrink-0"
          />
          <div className="text-gray-700">
            <span className="font-medium">Expires:</span> {formattedExpires}
          </div>
        </div>
      </div>
    </div>
  );
}

import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  export namespace IApiReposInteractionLimits {
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
  AutoViewInputSubTypes.IApiReposInteractionLimits.GetResponse;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // Type guard: check if value is an interaction_limit_response
  const isLimitResponse = (
    v: AutoViewInput,
  ): v is AutoViewInputSubTypes.interaction_limit_response =>
    typeof (v as any).limit === "string";

  // Mapping for human-readable labels
  const groupLabels = {
    existing_users: "Existing Users",
    contributors_only: "Contributors Only",
    collaborators_only: "Collaborators Only",
  } as const;

  // Mapping for icons per group
  const groupIcons = {
    existing_users: <LucideReact.Users className="text-gray-500" size={20} />,
    contributors_only: (
      <LucideReact.UserCheck className="text-blue-500" size={20} />
    ),
    collaborators_only: (
      <LucideReact.UserCheck className="text-purple-500" size={20} />
    ),
  } as const;

  // Empty state when no limits are defined
  if (!isLimitResponse(value)) {
    return (
      <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-sm border border-gray-200">
        <LucideReact.AlertCircle
          size={48}
          className="text-gray-300 mb-2"
          aria-label="No data"
        />
        <span className="text-sm text-gray-500">
          No interaction limits set.
        </span>
      </div>
    );
  }

  // Format expiration date
  const expiresDate = new Date(value.expires_at);
  const formattedExpires = expiresDate.toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });

  // Derive display values
  const group = value.limit;
  const label = groupLabels[group];
  const icon = groupIcons[group];

  // Main visual structure
  return (
    <div className="p-4 bg-white rounded-lg shadow-md border border-gray-200 max-w-sm mx-auto">
      <div className="flex items-center mb-3">
        {icon}
        <span className="ml-2 font-medium text-gray-800">{label}</span>
      </div>
      <div className="flex items-center mb-2 text-gray-600">
        <LucideReact.Link size={16} className="flex-shrink-0" />
        <span className="ml-1 break-all">{value.origin}</span>
      </div>
      <div className="flex items-center text-gray-600">
        <LucideReact.Calendar size={16} className="flex-shrink-0" />
        <span className="ml-1">{formattedExpires}</span>
      </div>
    </div>
  );
}

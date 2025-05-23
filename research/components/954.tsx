import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace IApiUserInteractionLimits {
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
export type AutoViewInput = AutoViewInputSubTypes.IApiUserInteractionLimits.GetResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const hasLimit =
    value &&
    typeof value === "object" &&
    "limit" in value &&
    typeof (value as any).limit === "string";

  // Mapping for human-readable labels
  const limitLabels: Record<AutoViewInputSubTypes.interaction_group, string> = {
    existing_users: "Existing Users",
    contributors_only: "Contributors Only",
    collaborators_only: "Collaborators Only",
  };

  // Icon selector based on limit type
  function getLimitIcon(group: AutoViewInputSubTypes.interaction_group): JSX.Element {
    switch (group) {
      case "existing_users":
        return <LucideReact.Users size={20} className="text-blue-500" aria-label="Existing Users" />;
      case "contributors_only":
        return <LucideReact.UserCheck size={20} className="text-green-500" aria-label="Contributors Only" />;
      case "collaborators_only":
        return <LucideReact.UserPlus size={20} className="text-purple-500" aria-label="Collaborators Only" />;
    }
  }

  // Format expiration date
  let formattedExpiry = "";
  if (hasLimit) {
    const resp = value as AutoViewInputSubTypes.interaction_limit_response;
    const date = new Date(resp.expires_at);
    formattedExpiry = date.toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (!hasLimit) {
    // Empty or no data state
    return (
      <div className="py-6 px-4 flex flex-col items-center text-gray-400">
        <LucideReact.AlertCircle size={24} />
        <span className="mt-2 text-sm">No interaction limits set.</span>
      </div>
    );
  }

  // Safe cast now that we know the shape
  const { limit, origin } = value as AutoViewInputSubTypes.interaction_limit_response;

  // 3. Return the React element.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-sm w-full mx-auto">
      <div className="flex items-center gap-2">
        {getLimitIcon(limit)}
        <h2 className="text-lg font-semibold text-gray-800">
          {limitLabels[limit]}
        </h2>
      </div>
      <div className="mt-3 flex items-center text-gray-600 gap-1">
        <LucideReact.Globe size={16} className="text-gray-400" aria-label="Origin" />
        <span className="truncate">{origin}</span>
      </div>
      <div className="mt-2 flex items-center text-gray-600 gap-1">
        <LucideReact.Calendar size={16} className="text-gray-400" aria-label="Expires At" />
        <span className="truncate">Expires: {formattedExpiry}</span>
      </div>
    </div>
  );
}

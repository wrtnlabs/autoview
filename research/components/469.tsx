import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace IApiOrgsInteractionLimits {
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
export type AutoViewInput = AutoViewInputSubTypes.IApiOrgsInteractionLimits.GetResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const isConfigured = "limit" in value;
  if (!isConfigured) {
    return (
      <div className="p-4 bg-gray-100 rounded-lg flex items-center gap-2 text-gray-600">
        <LucideReact.AlertCircle size={24} className="flex-shrink-0" />
        <span>No interaction limits configured.</span>
      </div>
    );
  }

  const resp = value as AutoViewInputSubTypes.interaction_limit_response;
  const limitLabels: Record<AutoViewInputSubTypes.interaction_group, string> = {
    existing_users: "Existing Users",
    contributors_only: "Contributors Only",
    collaborators_only: "Collaborators Only",
  };
  const limitIcons: Record<AutoViewInputSubTypes.interaction_group, JSX.Element> = {
    existing_users: <LucideReact.Users size={16} className="text-gray-500" />,
    contributors_only: <LucideReact.UserCheck size={16} className="text-gray-500" />,
    collaborators_only: <LucideReact.UserPlus size={16} className="text-gray-500" />,
  };
  const formattedExpires = new Date(resp.expires_at).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-3">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <LucideReact.Settings size={20} className="text-gray-600" />
        <span>Interaction Limits</span>
      </h3>

      <div className="flex items-center gap-2">
        {limitIcons[resp.limit]}
        <span className="text-gray-700 font-medium">{limitLabels[resp.limit]}</span>
      </div>

      <div className="flex items-center gap-1 text-gray-600 text-sm">
        <LucideReact.Globe size={16} />
        <span>{resp.origin}</span>
      </div>

      <div className="flex items-center gap-1 text-gray-600 text-sm">
        <LucideReact.Calendar size={16} />
        <span>Expires at {formattedExpires}</span>
      </div>
    </div>
  );
}

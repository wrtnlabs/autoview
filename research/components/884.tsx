import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * The status of a commit.
     *
     * @title Status
    */
    export interface status {
        url: string;
        avatar_url: string | null;
        id: number & tags.Type<"int32">;
        node_id: string;
        state: string;
        description: string | null;
        target_url: string | null;
        context: string;
        created_at: string;
        updated_at: string;
        creator: AutoViewInputSubTypes.nullable_simple_user;
    }
    /**
     * A GitHub user.
     *
     * @title Simple User
    */
    export type nullable_simple_user = {
        name?: string | null;
        email?: string | null;
        login: string;
        id: number & tags.Type<"int32">;
        node_id: string;
        avatar_url: string & tags.Format<"uri">;
        gravatar_id: string | null;
        url: string & tags.Format<"uri">;
        html_url: string & tags.Format<"uri">;
        followers_url: string & tags.Format<"uri">;
        following_url: string;
        gists_url: string;
        starred_url: string;
        subscriptions_url: string & tags.Format<"uri">;
        organizations_url: string & tags.Format<"uri">;
        repos_url: string & tags.Format<"uri">;
        events_url: string;
        received_events_url: string & tags.Format<"uri">;
        type: string;
        site_admin: boolean;
        starred_at?: string;
        user_view_type?: string;
    } | null;
}
export type AutoViewInput = AutoViewInputSubTypes.status;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const stateMap: Record<
    string,
    { label: string; icon: React.ElementType; color: string }
  > = {
    success: { label: "Success", icon: LucideReact.CheckCircle, color: "text-green-500" },
    failure: { label: "Failure", icon: LucideReact.XCircle, color: "text-red-500" },
    pending: { label: "Pending", icon: LucideReact.Clock, color: "text-amber-500" },
    error: { label: "Error", icon: LucideReact.AlertTriangle, color: "text-red-500" },
  };

  const key = value.state.toLowerCase();
  const { label: stateLabel, icon: StateIcon, color: stateColor } =
    stateMap[key] || {
      label: value.state,
      icon: LucideReact.HelpCircle,
      color: "text-gray-500",
    };

  const createdAt = new Date(value.created_at).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
  const updatedAt = new Date(value.updated_at).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });

  const creator = value.creator;
  const displayName =
    creator && creator.name
      ? creator.name
      : creator && creator.login
      ? creator.login
      : "Unknown";

  const avatarFallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    displayName,
  )}&background=0D8ABC&color=fff`;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-4 space-y-4">
      {/* Status Header */}
      <div className="flex items-center gap-2">
        <StateIcon className={stateColor} size={20} strokeWidth={1.5} />
        <span className={`font-semibold ${stateColor}`}>{stateLabel}</span>
        <span className="ml-auto text-xs text-gray-500 truncate">{value.context}</span>
      </div>

      {/* Creator Info */}
      <div className="flex items-center gap-3">
        <img
          src={value.avatar_url || avatarFallback}
          alt={`${displayName} avatar`}
          className="w-10 h-10 rounded-full object-cover bg-gray-100"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = avatarFallback;
          }}
        />
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-900">{displayName}</span>
          {creator && creator.html_url && (
            <div className="flex items-center text-xs text-gray-500 gap-1 max-w-xs truncate">
              <LucideReact.Link size={14} />
              <span className="truncate">{creator.html_url}</span>
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      {value.description && (
        <p className="text-gray-700 text-sm line-clamp-3">{value.description}</p>
      )}

      {/* Metadata */}
      <div className="flex flex-wrap text-gray-500 text-xs gap-4">
        <div className="flex items-center gap-1">
          <LucideReact.Calendar size={14} />
          <span>{createdAt}</span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.RefreshCcw size={14} />
          <span>{updatedAt}</span>
        </div>
        {value.target_url && (
          <div className="flex items-center gap-1 w-full md:w-auto truncate max-w-full">
            <LucideReact.Link size={14} />
            <span className="truncate">{value.target_url}</span>
          </div>
        )}
      </div>
    </div>
  );
}

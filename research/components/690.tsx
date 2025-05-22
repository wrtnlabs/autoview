import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  export namespace IApiReposCodespaces_New {
    export type GetResponse = {
      billable_owner?: AutoViewInputSubTypes.simple_user;
      defaults?: {
        location: string;
        devcontainer_path: string | null;
      };
    };
  }
  /**
   * A GitHub user.
   *
   * @title Simple User
   */
  export type simple_user = {
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
  };
}
export type AutoViewInput =
  AutoViewInputSubTypes.IApiReposCodespaces_New.GetResponse;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const owner = value.billable_owner;
  const defaults = value.defaults;
  const ownerDisplayName = owner
    ? owner.name && owner.name.trim().length > 0
      ? owner.name
      : owner.login
    : "";
  const avatarFallbackName = encodeURIComponent(ownerDisplayName || "User");
  const devcontainerPath = defaults?.devcontainer_path ?? "—";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-gray-800 space-y-4">
      {/* Billable Owner Section */}
      {owner ? (
        <div className="flex items-center space-x-4">
          <div className="relative">
            <img
              src={owner.avatar_url}
              alt={`${ownerDisplayName}'s avatar`}
              className="w-12 h-12 rounded-full object-cover border border-gray-200"
              onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = `https://ui-avatars.com/api/?name=${avatarFallbackName}&background=0D8ABC&color=fff`;
              }}
            />
            <LucideReact.User
              className="absolute bottom-0 right-0 bg-white rounded-full p-px text-gray-500"
              size={16}
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-lg font-semibold text-gray-900 truncate">
              {ownerDisplayName}
            </div>
            <div className="flex items-center text-sm text-gray-500 space-x-1 truncate">
              <LucideReact.Link size={14} />
              <span className="truncate">{owner.login}</span>
            </div>
            {owner.email && (
              <div className="flex items-center text-sm text-gray-500 space-x-1 mt-1 truncate">
                <LucideReact.Mail size={14} />
                <span className="truncate">{owner.email}</span>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex items-center text-gray-500">
          <LucideReact.AlertCircle size={20} className="mr-2" />
          <span className="text-sm">No billable owner configured</span>
        </div>
      )}

      {/* Defaults Section */}
      {defaults ? (
        <div className="grid grid-cols-1 gap-2">
          <div className="flex items-center text-sm text-gray-700 space-x-2">
            <LucideReact.MapPin size={16} className="text-gray-500" />
            <span className="font-medium">Location:</span>
            <span className="truncate">{defaults.location}</span>
          </div>
          <div className="flex items-center text-sm text-gray-700 space-x-2">
            <LucideReact.Folder size={16} className="text-gray-500" />
            <span className="font-medium">Devcontainer Path:</span>
            <span className="truncate">{devcontainerPath}</span>
          </div>
        </div>
      ) : (
        <div className="flex items-center text-gray-500">
          <LucideReact.AlertCircle size={20} className="mr-2" />
          <span className="text-sm">No defaults configured</span>
        </div>
      )}
    </div>
  );
}

import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace IApiReposCodespaces_New {
        export interface GetResponse {
            billable_owner?: AutoViewInputSubTypes.simple_user;
            defaults?: {
                location: string;
                devcontainer_path: string | null;
            };
        }
    }
    /**
     * A GitHub user.
     *
     * @title Simple User
    */
    export interface simple_user {
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
    }
}
export type AutoViewInput = AutoViewInputSubTypes.IApiReposCodespaces_New.GetResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const owner = value.billable_owner;
  const defaults = value.defaults;

  // Empty state when no data is present
  if (!owner && !defaults) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-400">
        <LucideReact.AlertCircle size={48} className="mb-2" />
        <span className="text-sm">No data available</span>
      </div>
    );
  }

  // Prepare owner display values
  const ownerName = owner?.name ?? owner?.login ?? "";
  const avatarFallbackUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    ownerName
  )}&background=0D8ABC&color=fff`;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full sm:max-w-md bg-white shadow-md rounded-lg p-4 space-y-6">
      {/* Billable Owner Section */}
      {owner && (
        <section>
          <h2 className="flex items-center text-lg font-semibold text-gray-800 mb-3">
            <LucideReact.User size={20} className="text-gray-500 mr-2" />
            <span>Billable Owner</span>
          </h2>
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
              <img
                src={owner.avatar_url}
                alt={`Avatar of ${ownerName}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const img = e.currentTarget as HTMLImageElement;
                  img.onerror = null;
                  img.src = avatarFallbackUrl;
                }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-1">
                <span className="font-medium text-gray-900 truncate">
                  {ownerName}
                </span>
                {owner.site_admin && (
                  <LucideReact.CheckCircle
                    size={16}
                    className="text-blue-500"
                    aria-label="Site Admin"
                  />
                )}
              </div>
              {owner.email && (
                <div className="flex items-center text-gray-600 space-x-1 mt-1 truncate">
                  <LucideReact.Mail size={16} className="flex-shrink-0" />
                  <span className="truncate">{owner.email}</span>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Defaults Section */}
      {defaults && (
        <section>
          <h2 className="flex items-center text-lg font-semibold text-gray-800 mb-3">
            <LucideReact.Cog size={20} className="text-gray-500 mr-2" />
            <span>Defaults</span>
          </h2>
          <div className="space-y-2">
            <div className="flex items-center text-gray-700">
              <LucideReact.MapPin
                size={16}
                className="text-gray-500 mr-2 flex-shrink-0"
              />
              <span className="truncate">{defaults.location}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <LucideReact.Folder
                size={16}
                className="text-gray-500 mr-2 flex-shrink-0"
              />
              {defaults.devcontainer_path ? (
                <span className="truncate">{defaults.devcontainer_path}</span>
              ) : (
                <span className="text-gray-400 italic">Not specified</span>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

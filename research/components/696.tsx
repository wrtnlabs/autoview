import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Collaborator
     *
     * @title Collaborator
    */
    export interface collaborator {
        login: string;
        id: number & tags.Type<"int32">;
        email?: string | null;
        name?: string | null;
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
        permissions?: {
            pull: boolean;
            triage?: boolean;
            push: boolean;
            maintain?: boolean;
            admin: boolean;
        };
        role_name: string;
        user_view_type?: string;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.collaborator[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // If no collaborators, show a friendly empty state
  if (!value || value.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-gray-500">
        <LucideReact.MessageSquare size={48} />
        <p className="mt-4 text-lg">No collaborators available.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {value.map((collaborator) => {
        // Derive a display name: prefer real name, fallback to login
        const displayName =
          collaborator.name && collaborator.name.trim() !== ""
            ? collaborator.name
            : collaborator.login;

        // Prepare fallback avatar URL using initials
        const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
          displayName,
        )}&background=0D8ABC&color=fff`;

        return (
          <div
            key={collaborator.id}
            className="flex p-4 bg-white rounded-lg shadow-sm"
          >
            {/* Avatar */}
            <div className="flex-shrink-0 mr-4">
              <img
                src={collaborator.avatar_url}
                alt={displayName}
                className="w-12 h-12 rounded-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = fallbackAvatar;
                }}
              />
            </div>

            {/* Main Info */}
            <div className="flex-1 overflow-hidden">
              {/* Name and Admin Badge */}
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-semibold text-gray-900 truncate">
                  {displayName}
                </h3>
                {collaborator.site_admin && (
                  <LucideReact.CheckCircle
                    size={16}
                    className="text-green-500"
                    aria-label="Site Administrator"
                  />
                )}
              </div>

              {/* Username */}
              <div className="mt-1 flex items-center text-sm text-gray-600 space-x-1 truncate">
                <LucideReact.User size={14} className="text-gray-400" />
                <span className="truncate">@{collaborator.login}</span>
              </div>

              {/* Email */}
              {collaborator.email && (
                <div className="mt-1 flex items-center text-sm text-gray-600 space-x-1 truncate">
                  <LucideReact.Mail size={14} className="text-gray-400" />
                  <span className="truncate">{collaborator.email}</span>
                </div>
              )}

              {/* Profile URL */}
              <div className="mt-1 flex items-center text-sm text-gray-600 space-x-1 truncate">
                <LucideReact.Link size={14} className="text-gray-400" />
                <span className="truncate">{collaborator.html_url}</span>
              </div>

              {/* Role Name */}
              {collaborator.role_name && (
                <div className="mt-1 text-sm text-gray-600">
                  Role: {collaborator.role_name}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * The Relationship a User has with a role.
     *
     * @title A Role Assignment for a User
    */
    export interface user_role_assignment {
        /**
         * Determines if the user has a direct, indirect, or mixed relationship to a role
        */
        assignment?: "direct" | "indirect" | "mixed";
        /**
         * Team the user has gotten the role through
        */
        inherited_from?: AutoViewInputSubTypes.team_simple[];
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
    /**
     * Groups of organization members that gives permissions on specified repositories.
     *
     * @title Team Simple
    */
    export interface team_simple {
        /**
         * Unique identifier of the team
        */
        id: number & tags.Type<"int32">;
        node_id: string;
        /**
         * URL for the team
        */
        url: string;
        members_url: string;
        /**
         * Name of the team
        */
        name: string;
        /**
         * Description of the team
        */
        description: string | null;
        /**
         * Permission that the team will have for its repositories
        */
        permission: string;
        /**
         * The level of privacy this team should have
        */
        privacy?: string;
        /**
         * The notification setting the team has set
        */
        notification_setting?: string;
        html_url: string & tags.Format<"uri">;
        repositories_url: string & tags.Format<"uri">;
        slug: string;
        /**
         * Distinguished Name (DN) that team maps to within LDAP environment
        */
        ldap_dn?: string;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.user_role_assignment[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // Handle empty state
  if (!value || value.length === 0) {
    return (
      <div className="flex flex-col items-center p-4 text-gray-500">
        <LucideReact.AlertCircle className="mb-2 text-gray-400" size={24} />
        <span>No role assignments available.</span>
      </div>
    );
  }

  // Mapping for assignment badge colors
  const assignmentColors: Record<"direct" | "indirect" | "mixed", string> = {
    direct: "bg-green-100 text-green-800",
    indirect: "bg-amber-100 text-amber-800",
    mixed: "bg-blue-100 text-blue-800",
  };

  return (
    <div className="space-y-4">
      {value.map((user, idx) => {
        // Display name fallback
        const displayName = user.name?.trim() || user.login;
        // Avatar fallback URL
        const avatarFallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(
          displayName,
        )}&background=0D8ABC&color=fff`;
        // Assignment type and styling
        const assignmentType = (user.assignment || "direct") as "direct" | "indirect" | "mixed";
        const assignmentLabel = assignmentType.charAt(0).toUpperCase() + assignmentType.slice(1);
        const assignmentClass = assignmentColors[assignmentType];

        return (
          <div
            key={idx}
            className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm"
          >
            {/* Avatar */}
            <img
              src={user.avatar_url}
              alt={`${displayName} avatar`}
              className="flex-none w-12 h-12 rounded-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = avatarFallback;
              }}
            />

            {/* User Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-900 truncate">
                  {displayName}
                </h3>
                {user.site_admin && (
                  <LucideReact.ShieldCheck
                    className="text-blue-500"
                    size={16}
                    aria-label="Site Admin"
                  />
                )}
              </div>
              {/* Secondary text: email or login */}
              <p className="mt-1 text-xs text-gray-500 truncate">
                {user.email?.trim() || `@${user.login}`}
              </p>

              {/* Assignment and Teams */}
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${assignmentClass}`}
                >
                  {assignmentLabel}
                </span>
                {user.inherited_from && user.inherited_from.length > 0 && (
                  <div className="inline-flex items-center text-xs text-gray-600">
                    <LucideReact.Users className="mr-1" size={14} />
                    <span className="truncate">
                      {user.inherited_from.map((team) => team.name).join(", ")}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

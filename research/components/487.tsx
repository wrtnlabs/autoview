import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Organization roles
     *
     * @title Organization Role
    */
    export interface organization_role {
        /**
         * The unique identifier of the role.
        */
        id: number & tags.Type<"int32">;
        /**
         * The name of the role.
        */
        name: string;
        /**
         * A short description about who this role is for or what permissions it grants.
        */
        description?: string | null;
        /**
         * The system role from which this role inherits permissions.
        */
        base_role?: "read" | "triage" | "write" | "maintain" | "admin" | null;
        /**
         * Source answers the question, "where did this role come from?"
        */
        source?: "Organization" | "Enterprise" | "Predefined" | null;
        /**
         * A list of permissions included in this role.
        */
        permissions: string[];
        organization: AutoViewInputSubTypes.nullable_simple_user;
        /**
         * The date and time the role was created.
        */
        created_at: string;
        /**
         * The date and time the role was last updated.
        */
        updated_at: string;
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
export type AutoViewInput = AutoViewInputSubTypes.organization_role;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

  const formattedCreatedAt = formatDate(value.created_at);
  const formattedUpdatedAt = formatDate(value.updated_at);

  const maxPermissionsToShow = 5;
  const displayedPermissions = value.permissions.slice(0, maxPermissionsToShow);
  const remainingPermissionsCount = value.permissions.length - displayedPermissions.length;

  const org = value.organization;
  const orgLogin = org?.login ?? '';
  const avatarPlaceholder = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    orgLogin,
  )}&background=random`;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-md mx-auto">
      {/* Role Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800 truncate">{value.name}</h2>
        {value.base_role && (
          <div className="flex items-center text-sm text-indigo-600 bg-indigo-100 px-2 py-0.5 rounded">
            <LucideReact.Shield size={16} className="mr-1" />
            <span className="uppercase">{value.base_role}</span>
          </div>
        )}
      </div>

      {/* Description */}
      {value.description && (
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{value.description}</p>
      )}

      {/* Metadata Grid */}
      <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-500">
        {/* Source */}
        <div className="flex items-center">
          <LucideReact.Tag size={16} className="mr-1" />
          <span>{value.source ?? '—'}</span>
        </div>
        {/* Organization */}
        <div className="flex items-center">
          <LucideReact.User size={16} className="mr-1" />
          <span>{orgLogin || '—'}</span>
        </div>
        {/* Created At */}
        <div className="flex items-center">
          <LucideReact.Calendar size={16} className="mr-1" />
          <span>{formattedCreatedAt}</span>
        </div>
        {/* Updated At */}
        <div className="flex items-center">
          <LucideReact.Calendar size={16} className="mr-1" />
          <span>{formattedUpdatedAt}</span>
        </div>
      </div>

      {/* Organization Avatar */}
      {org && (
        <div className="flex items-center mb-4">
          <img
            src={org.avatar_url}
            alt={`${orgLogin} avatar`}
            className="w-8 h-8 rounded-full object-cover mr-2"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = avatarPlaceholder;
            }}
          />
          <span className="text-gray-700 text-sm">{org.name ?? orgLogin}</span>
        </div>
      )}

      {/* Permissions */}
      <div>
        <h3 className="text-gray-800 font-medium text-sm mb-2">Permissions</h3>
        {value.permissions.length === 0 ? (
          <div className="text-gray-400 text-sm">No permissions assigned</div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {displayedPermissions.map((perm) => (
              <span
                key={perm}
                className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded"
              >
                {perm}
              </span>
            ))}
            {remainingPermissionsCount > 0 && (
              <span className="text-gray-500 text-xs self-center">
                +{remainingPermissionsCount} more
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

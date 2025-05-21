import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * Organization roles
     *
     * @title Organization Role
    */
    export type organization_role = {
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
    };
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
  const {
    name,
    description,
    base_role,
    source,
    permissions,
    organization,
    created_at,
    updated_at,
  } = value;

  const formattedCreatedAt = new Date(created_at).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const formattedUpdatedAt = new Date(updated_at).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const permissionsToShow = permissions.slice(0, 3);
  const extraPermissionsCount = permissions.length - permissionsToShow.length;
  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-full">
      <h2 className="text-lg font-semibold text-gray-900 truncate">{name}</h2>

      {description && (
        <p className="mt-2 text-gray-700 text-sm line-clamp-2">{description}</p>
      )}

      <div className="mt-3 flex flex-wrap gap-2">
        {base_role && (
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
            {capitalize(base_role)} Role
          </span>
        )}
        {source && (
          <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
            {source}
          </span>
        )}
        {permissionsToShow.map((perm) => (
          <span
            key={perm}
            className="bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded"
          >
            {perm}
          </span>
        ))}
        {extraPermissionsCount > 0 && (
          <span className="bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded">
            +{extraPermissionsCount} more
          </span>
        )}
      </div>

      <div className="mt-4 flex flex-col sm:flex-row sm:justify-between text-xs text-gray-500">
        <span>Created: {formattedCreatedAt}</span>
        <span className="mt-1 sm:mt-0">Updated: {formattedUpdatedAt}</span>
      </div>

      {organization && (
        <div className="mt-4 flex items-center">
          <img
            src={organization.avatar_url}
            alt={`${organization.login} avatar`}
            className="w-6 h-6 rounded-full mr-2"
          />
          <span className="text-sm text-gray-600 truncate">
            {organization.login}
          </span>
        </div>
      )}
    </div>
  );
}

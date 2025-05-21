import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    export namespace IApiOrgsOrganizationRoles {
        export type GetResponse = {
            /**
             * The total number of organization roles available to the organization.
            */
            total_count?: number & tags.Type<"int32">;
            /**
             * The list of organization roles available to the organization.
            */
            roles?: AutoViewInputSubTypes.organization_role[];
        };
    }
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
export type AutoViewInput = AutoViewInputSubTypes.IApiOrgsOrganizationRoles.GetResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const roles = value.roles ?? [];
  const totalRoles = value.total_count ?? roles.length;

  const formatDate = (iso: string): string => {
    const date = new Date(iso);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilize semantic HTML elements where appropriate.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Organization Roles{" "}
        <span className="text-gray-600">({totalRoles})</span>
      </h2>
      {roles.length === 0 ? (
        <p className="text-gray-500">No roles available.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {roles.map((role) => {
            const baseRole = role.base_role
              ? role.base_role.charAt(0).toUpperCase() + role.base_role.slice(1)
              : "None";
            const source = role.source ?? "Unknown";
            const permissionsCount = role.permissions?.length ?? 0;
            const org = role.organization;

            return (
              <li key={role.id} className="py-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex-1">
                    <h3 className="text-md font-medium text-gray-900">
                      {role.name}
                    </h3>
                    {role.description && (
                      <p className="mt-1 text-gray-600 line-clamp-2">
                        {role.description}
                      </p>
                    )}
                    <div className="mt-2 flex flex-wrap items-center space-x-2 text-sm">
                      <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded">
                        {baseRole}
                      </span>
                      <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded">
                        {source}
                      </span>
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-800 rounded">
                        {permissionsCount} permissions
                      </span>
                    </div>
                  </div>
                  {org && (
                    <div className="mt-3 sm:mt-0 flex items-center space-x-2">
                      <img
                        src={org.avatar_url}
                        alt={org.login}
                        className="w-8 h-8 rounded-full"
                      />
                      <span className="text-sm text-gray-700">
                        {org.login}
                      </span>
                    </div>
                  )}
                </div>
                <div className="mt-3 text-sm text-gray-500 flex flex-wrap space-x-4">
                  <span>Created: {formatDate(role.created_at)}</span>
                  <span>Updated: {formatDate(role.updated_at)}</span>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

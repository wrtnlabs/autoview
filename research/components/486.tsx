import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace IApiOrgsOrganizationRoles {
        export interface GetResponse {
            /**
             * The total number of organization roles available to the organization.
            */
            total_count?: number & tags.Type<"int32">;
            /**
             * The list of organization roles available to the organization.
            */
            roles?: AutoViewInputSubTypes.organization_role[];
        }
    }
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
export type AutoViewInput = AutoViewInputSubTypes.IApiOrgsOrganizationRoles.GetResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const totalCount = value.total_count ?? (value.roles?.length ?? 0);
  const roles = value.roles ?? [];

  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 space-y-6">
      {/* Total roles header */}
      <div className="flex items-center text-gray-700">
        <LucideReact.Users className="mr-2" size={20} />
        <span className="text-lg font-semibold">
          {totalCount} Role{totalCount !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Empty state */}
      {roles.length === 0 ? (
        <div className="flex flex-col items-center text-gray-400">
          <LucideReact.AlertCircle size={48} className="mb-2" />
          <p>No roles available.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {roles.map((role) => (
            <div
              key={role.id}
              className="bg-white rounded-lg shadow p-4 flex flex-col"
            >
              {/* Role name */}
              <h3 className="text-gray-800 font-semibold">{role.name}</h3>

              {/* Description */}
              {role.description && (
                <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                  {role.description}
                </p>
              )}

              {/* Base role & source badges */}
              <div className="mt-3 flex flex-wrap gap-2">
                {role.base_role && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                    {role.base_role}
                  </span>
                )}
                {role.source && (
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                    {role.source}
                  </span>
                )}
              </div>

              {/* Permissions count */}
              <div className="mt-3 flex items-center text-gray-500 text-sm">
                <LucideReact.Lock size={14} className="mr-1" />
                <span>
                  {role.permissions.length} permission
                  {role.permissions.length !== 1 ? "s" : ""}
                </span>
              </div>

              {/* Organization avatar & login */}
              <div className="mt-4 flex items-center">
                <img
                  src={
                    role.organization?.avatar_url ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      role.organization?.login ?? ""
                    )}&background=random`
                  }
                  alt={role.organization?.login ?? "avatar"}
                  className="w-8 h-8 rounded-full object-cover mr-2"
                  onError={(
                    e: React.SyntheticEvent<HTMLImageElement, Event>
                  ) => {
                    e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      role.organization?.login ?? ""
                    )}&background=random`;
                  }}
                />
                <span className="text-gray-700 text-sm">
                  {role.organization?.login}
                </span>
              </div>

              {/* Created & updated dates */}
              <div className="mt-3 text-gray-500 text-xs flex flex-col gap-1">
                <div className="flex items-center">
                  <LucideReact.Calendar size={12} className="mr-1" />
                  <span>
                    Created:{" "}
                    {role.created_at ? formatDate(role.created_at) : "—"}
                  </span>
                </div>
                <div className="flex items-center">
                  <LucideReact.RefreshCw size={12} className="mr-1" />
                  <span>
                    Updated:{" "}
                    {role.updated_at ? formatDate(role.updated_at) : "—"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
  const formattedCreatedAt = new Date(value.created_at).toLocaleString(
    undefined,
    {
      dateStyle: "medium",
      timeStyle: "short",
    },
  );
  const formattedUpdatedAt = new Date(value.updated_at).toLocaleString(
    undefined,
    {
      dateStyle: "medium",
      timeStyle: "short",
    },
  );
  const baseRole = value.base_role
    ? value.base_role.charAt(0).toUpperCase() + value.base_role.slice(1)
    : "None";
  const source = value.source ?? "Unknown";
  const org = value.organization;
  const orgFallbackAvatar = org
    ? `https://ui-avatars.com/api/?name=${encodeURIComponent(
        org.name ?? org.login,
      )}&background=0D8ABC&color=fff`
    : "";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilize semantic HTML elements where appropriate.
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow space-y-6">
      {/* Role Name */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900">{value.name}</h2>
        {value.description && (
          <p className="mt-2 text-sm text-gray-600 line-clamp-3">
            {value.description}
          </p>
        )}
      </div>

      {/* Core Attributes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
        {/* Base Role */}
        <div className="flex items-center">
          <LucideReact.Tag size={16} className="text-gray-500" />
          <span className="ml-2 font-medium">Base Role:</span>
          <span className="ml-auto">{baseRole}</span>
        </div>
        {/* Source */}
        <div className="flex items-center">
          <LucideReact.Layers size={16} className="text-gray-500" />
          <span className="ml-2 font-medium">Source:</span>
          <span className="ml-auto">{source}</span>
        </div>
        {/* Created At */}
        <div className="flex items-center">
          <LucideReact.Calendar size={16} className="text-gray-500" />
          <span className="ml-2 font-medium">Created:</span>
          <span className="ml-auto">{formattedCreatedAt}</span>
        </div>
        {/* Updated At */}
        <div className="flex items-center">
          <LucideReact.Calendar size={16} className="text-gray-500" />
          <span className="ml-2 font-medium">Updated:</span>
          <span className="ml-auto">{formattedUpdatedAt}</span>
        </div>
      </div>

      {/* Organization */}
      {org && (
        <div className="flex items-center space-x-4">
          <img
            src={org.avatar_url}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = orgFallbackAvatar;
            }}
            alt={org.login + " avatar"}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex-1 text-sm">
            <div className="font-medium text-gray-800">{org.login}</div>
            <div className="flex items-center text-gray-500 truncate">
              <LucideReact.Link size={14} />
              <span className="ml-1 truncate">{org.html_url}</span>
            </div>
          </div>
        </div>
      )}

      {/* Permissions */}
      <div>
        <h3 className="text-sm font-medium text-gray-800 mb-2">Permissions</h3>
        <div className="flex flex-wrap">
          {value.permissions.map((perm) => (
            <span
              key={perm}
              className="inline-block bg-blue-100 text-blue-800 text-xs font-medium mr-2 mb-2 px-2.5 py-0.5 rounded"
            >
              {perm}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
  // 3. Return the React element.
  //    Ensure all displayed data is appropriately filtered, transformed, and formatted according to the guidelines.
}

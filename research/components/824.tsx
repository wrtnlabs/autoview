import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Projects are a way to organize columns and cards of work.
     *
     * @title Project
    */
    export interface project {
        owner_url: string & tags.Format<"uri">;
        url: string & tags.Format<"uri">;
        html_url: string & tags.Format<"uri">;
        columns_url: string & tags.Format<"uri">;
        id: number & tags.Type<"int32">;
        node_id: string;
        /**
         * Name of the project
        */
        name: string;
        /**
         * Body of the project
        */
        body: string | null;
        number: number & tags.Type<"int32">;
        /**
         * State of the project; either 'open' or 'closed'
        */
        state: string;
        creator: AutoViewInputSubTypes.nullable_simple_user;
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
        /**
         * The baseline permission that all organization members have on this project. Only present if owner is an organization.
        */
        organization_permission?: "read" | "write" | "admin" | "none";
        /**
         * Whether or not this project can be seen by everyone. Only present if owner is an organization.
        */
        "private"?: boolean;
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
export type AutoViewInput = AutoViewInputSubTypes.project;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const {
    name,
    body,
    state,
    number,
    creator,
    created_at,
    updated_at,
    organization_permission,
    private: isPrivate,
  } = value;

  const formattedCreatedAt = new Date(created_at).toLocaleString();
  const formattedUpdatedAt = new Date(updated_at).toLocaleString();
  const stateIcon =
    state === "open" ? (
      <LucideReact.CheckCircle className="text-green-500" size={16} />
    ) : (
      <LucideReact.XCircle className="text-red-500" size={16} />
    );
  const stateLabel = state.charAt(0).toUpperCase() + state.slice(1);
  const projectNumber = `#${number}`;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {stateIcon}
          <h2 className="text-lg font-semibold text-gray-900 truncate">{name}</h2>
          <span className="text-sm text-gray-500">{projectNumber}</span>
          {isPrivate && (
            <LucideReact.Lock
              className="text-gray-500"
              size={16}
              aria-label="Private"
            />
          )}
        </div>
        {organization_permission && (
          <span className="px-2 py-0.5 text-xs font-medium text-gray-700 bg-gray-100 rounded">
            {organization_permission.charAt(0).toUpperCase() +
              organization_permission.slice(1)}
          </span>
        )}
      </div>

      {body && (
        <p className="mt-2 text-sm text-gray-700 line-clamp-2">{body}</p>
      )}

      <div className="mt-4 space-y-1 text-xs text-gray-500">
        <div className="flex items-center space-x-1">
          <LucideReact.Calendar size={14} className="text-gray-400" />
          <span>Created: {formattedCreatedAt}</span>
        </div>
        <div className="flex items-center space-x-1">
          <LucideReact.Calendar size={14} className="text-gray-400" />
          <span>Updated: {formattedUpdatedAt}</span>
        </div>
        <div className="flex items-center space-x-1">
          {stateIcon}
          <span>Status: {stateLabel}</span>
        </div>
      </div>

      {creator && (
        <div className="mt-4 flex items-center space-x-2">
          <img
            src={creator.avatar_url}
            alt={creator.login}
            className="w-6 h-6 rounded-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                creator.login
              )}&background=0D8ABC&color=fff`;
            }}
          />
          <div className="text-sm text-gray-800 truncate">
            {creator.name || creator.login}
          </div>
        </div>
      )}
    </div>
  );
}

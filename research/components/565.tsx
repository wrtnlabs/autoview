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
  const projectState =
    value.state === "open"
      ? { label: "Open", icon: <LucideReact.CheckCircle className="text-green-500" size={16} /> }
      : { label: "Closed", icon: <LucideReact.XCircle className="text-red-500" size={16} /> };

  const privacy =
    value["private"]
      ? { label: "Private", icon: <LucideReact.Lock className="text-gray-500" size={16} /> }
      : { label: "Public", icon: <LucideReact.Unlock className="text-gray-500" size={16} /> };

  const createdDate = new Date(value.created_at).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const updatedDate = new Date(value.updated_at).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const creator = value.creator;
  const creatorName = creator?.name ?? creator?.login ?? "Unknown";
  const avatarUrl = creator?.avatar_url;
  const placeholderAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    creatorName,
  )}&background=0D8ABC&color=fff`;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
        <div className="flex items-center">
          <h2 className="text-lg font-semibold text-gray-800">
            {value.name}
            <span className="ml-2 text-sm text-gray-500">#{value.number}</span>
          </h2>
          {value.organization_permission && (
            <span className="ml-3 px-2 py-0.5 text-xs font-medium text-indigo-800 bg-indigo-100 rounded">
              {value.organization_permission.charAt(0).toUpperCase() +
                value.organization_permission.slice(1)}
            </span>
          )}
        </div>
        <div className="mt-2 sm:mt-0 flex items-center gap-4">
          <div className="flex items-center gap-1">
            {projectState.icon}
            <span className="text-sm text-gray-600">{projectState.label}</span>
          </div>
          <div className="flex items-center gap-1">
            {privacy.icon}
            <span className="text-sm text-gray-600">{privacy.label}</span>
          </div>
        </div>
      </div>

      <p className="mt-3 text-gray-700 line-clamp-3">
        {value.body ?? "No description provided."}
      </p>

      <div className="mt-4 border-t border-gray-200 pt-4 flex flex-col sm:flex-row sm:justify-between sm:items-center text-sm text-gray-600">
        <div className="flex items-center gap-2">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={creatorName}
              className="w-6 h-6 rounded-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = placeholderAvatar;
              }}
            />
          ) : (
            <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
              <LucideReact.User className="text-gray-400" size={16} />
            </div>
          )}
          <span>{creatorName}</span>
        </div>
        <div className="mt-2 sm:mt-0 flex items-center gap-4">
          <div className="flex items-center gap-1">
            <LucideReact.Calendar className="text-gray-400" size={16} />
            <span>Created: {createdDate}</span>
          </div>
          <div className="flex items-center gap-1">
            <LucideReact.Calendar className="text-gray-400" size={16} />
            <span>Updated: {updatedDate}</span>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <a
          href={value.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-blue-600 hover:underline"
        >
          <LucideReact.Link size={16} className="mr-1" />
          View on GitHub
        </a>
      </div>
    </div>
  );
}

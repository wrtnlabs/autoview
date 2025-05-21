import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * The status of a commit.
     *
     * @title Status
    */
    export type status = {
        url: string;
        avatar_url: string | null;
        id: number & tags.Type<"int32">;
        node_id: string;
        state: string;
        description: string | null;
        target_url: string | null;
        context: string;
        created_at: string;
        updated_at: string;
        creator: AutoViewInputSubTypes.nullable_simple_user;
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
export type AutoViewInput = AutoViewInputSubTypes.status;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const createdDate = new Date(value.created_at);
  const updatedDate = new Date(value.updated_at);
  const formattedCreated = createdDate.toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
  const formattedUpdated = updatedDate.toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  const stateLower = value.state.toLowerCase();
  let stateBgColor = 'bg-gray-100';
  let stateTextColor = 'text-gray-700';
  if (stateLower === 'success') {
    stateBgColor = 'bg-green-100';
    stateTextColor = 'text-green-800';
  } else if (stateLower === 'failure' || stateLower === 'error') {
    stateBgColor = 'bg-red-100';
    stateTextColor = 'text-red-800';
  } else if (stateLower === 'pending' || stateLower === 'queued') {
    stateBgColor = 'bg-yellow-100';
    stateTextColor = 'text-yellow-800';
  } else {
    stateBgColor = 'bg-blue-100';
    stateTextColor = 'text-blue-800';
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <article className="p-4 bg-white rounded-lg shadow-md max-w-md w-full mx-auto">
      <div className="flex items-center space-x-4">
        {value.creator && value.creator.avatar_url ? (
          <img
            src={value.creator.avatar_url}
            alt={`${value.creator.login} avatar`}
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500 text-sm uppercase">
              {value.creator?.login?.[0] ?? '?'}
            </span>
          </div>
        )}
        <div className="flex flex-col">
          <h2 className="text-lg font-semibold text-gray-900">
            {value.creator?.login ?? 'Unknown'}
          </h2>
          {value.creator?.name && (
            <p className="text-sm text-gray-500">{value.creator.name}</p>
          )}
        </div>
      </div>

      <div className="mt-4 flex items-center space-x-2">
        <span
          className={`px-2 py-1 text-xs font-medium rounded-full ${stateBgColor} ${stateTextColor}`}
        >
          {value.state}
        </span>
        <span className="text-sm text-gray-500 capitalize">{value.context}</span>
      </div>

      {value.description && (
        <p className="mt-2 text-sm text-gray-700 line-clamp-3">
          {value.description}
        </p>
      )}

      {value.target_url && (
        <p className="mt-2 text-sm text-gray-500 truncate">{value.target_url}</p>
      )}

      <div className="mt-4 text-xs text-gray-500 space-x-2">
        <time dateTime={value.created_at}>{formattedCreated}</time>
        <span>•</span>
        <time dateTime={value.updated_at}>{formattedUpdated}</time>
      </div>
    </article>
  );
}

import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * Project cards represent a scope of work.
     *
     * @title Project Card
    */
    export type project_card = {
        url: string & tags.Format<"uri">;
        /**
         * The project card's ID
        */
        id: number & tags.Type<"int32">;
        node_id: string;
        note: string | null;
        creator: AutoViewInputSubTypes.nullable_simple_user;
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
        /**
         * Whether or not the card is archived
        */
        archived?: boolean;
        column_name?: string;
        project_id?: string;
        column_url: string & tags.Format<"uri">;
        content_url?: string & tags.Format<"uri">;
        project_url: string & tags.Format<"uri">;
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
export type AutoViewInput = AutoViewInputSubTypes.project_card;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const createdAt = new Date(value.created_at);
  const updatedAt = new Date(value.updated_at);

  const formattedCreatedAt = createdAt.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  const formattedUpdatedAt = updatedAt.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const creator = value.creator;
  const creatorName = creator
    ? creator.name ?? creator.login
    : 'Unknown User';

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-sm w-full bg-white rounded-lg shadow-md p-4 flex flex-col space-y-3">
      {/* Card Note */}
      {value.note ? (
        <p className="text-gray-900 font-medium text-base line-clamp-2">
          {value.note}
        </p>
      ) : (
        <p className="text-gray-500 italic text-sm">No description.</p>
      )}

      {/* Tags: Column & Archived Status */}
      <div className="flex flex-wrap gap-2">
        {value.column_name && (
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded">
            {value.column_name}
          </span>
        )}
        {value.archived && (
          <span className="bg-red-100 text-red-800 text-xs font-semibold px-2 py-1 rounded">
            Archived
          </span>
        )}
      </div>

      {/* Creator Info & Timestamps */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {creator && (
            <img
              src={creator.avatar_url}
              alt={creatorName}
              className="w-8 h-8 rounded-full object-cover"
            />
          )}
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-700">
              {creatorName}
            </span>
            <span className="text-xs text-gray-500">
              Created: {formattedCreatedAt}
            </span>
          </div>
        </div>
        <span className="text-xs text-gray-400">Updated: {formattedUpdatedAt}</span>
      </div>
    </div>
  );
}

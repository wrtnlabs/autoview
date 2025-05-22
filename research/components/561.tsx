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
export type AutoViewInput = AutoViewInputSubTypes.project_card[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const cards = value;
  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (!cards || cards.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No project cards to display.
      </div>
    );
  }

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((card) => {
        const isArchived = card.archived ?? false;
        const noteText =
          card.note && card.note.trim() !== ''
            ? card.note
            : 'No description provided.';
        const created = formatDate(card.created_at);
        const updated = formatDate(card.updated_at);
        const creator = card.creator;
        const creatorName = creator ? creator.login : 'Unknown';
        const avatarUrl = creator?.avatar_url;

        return (
          <div
            key={card.node_id}
            className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="p-4 flex items-center space-x-3">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={creatorName}
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gray-200" />
              )}
              <div className="text-sm font-medium text-gray-700">
                {creatorName}
              </div>
              <span
                className={`ml-auto inline-block px-2 py-0.5 text-xs font-medium rounded ${
                  isArchived
                    ? 'bg-red-100 text-red-800'
                    : 'bg-green-100 text-green-800'
                }`}
              >
                {isArchived ? 'Archived' : 'Active'}
              </span>
            </div>

            {card.column_name && (
              <div className="px-4">
                <span className="inline-block text-xs uppercase text-gray-500">
                  {card.column_name}
                </span>
              </div>
            )}

            <div className="px-4 mt-2">
              <p className="text-gray-800 text-base line-clamp-2">
                {noteText}
              </p>
            </div>

            <div className="mt-auto px-4 py-3 bg-gray-50 text-xs text-gray-500 flex justify-between">
              <span>Created: {created}</span>
              <span>Updated: {updated}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

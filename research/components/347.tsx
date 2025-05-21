import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * A comment made to a gist.
     *
     * @title Gist Comment
    */
    export type gist_comment = {
        id: number & tags.Type<"int32">;
        node_id: string;
        url: string & tags.Format<"uri">;
        /**
         * The comment text.
        */
        body: string;
        user: AutoViewInputSubTypes.nullable_simple_user;
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
        author_association: AutoViewInputSubTypes.author_association;
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
    /**
     * How the author is associated with the repository.
     *
     * @title author_association
    */
    export type author_association = "COLLABORATOR" | "CONTRIBUTOR" | "FIRST_TIMER" | "FIRST_TIME_CONTRIBUTOR" | "MANNEQUIN" | "MEMBER" | "NONE" | "OWNER";
}
export type AutoViewInput = AutoViewInputSubTypes.gist_comment[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const commentCount: number = value.length;

  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });

  const associationMap: Record<AutoViewInputSubTypes.author_association, string> = {
    OWNER: 'Owner',
    COLLABORATOR: 'Collaborator',
    CONTRIBUTOR: 'Contributor',
    FIRST_TIMER: 'First Timer',
    FIRST_TIME_CONTRIBUTOR: 'First Time Contributor',
    MANNEQUIN: 'Mannequin',
    MEMBER: 'Member',
    NONE: 'None',
  };

  const badgeColors: Record<AutoViewInputSubTypes.author_association, string> = {
    OWNER: 'bg-green-100 text-green-800',
    COLLABORATOR: 'bg-blue-100 text-blue-800',
    CONTRIBUTOR: 'bg-blue-100 text-blue-800',
    FIRST_TIMER: 'bg-purple-100 text-purple-800',
    FIRST_TIME_CONTRIBUTOR: 'bg-purple-100 text-purple-800',
    MANNEQUIN: 'bg-indigo-100 text-indigo-800',
    MEMBER: 'bg-teal-100 text-teal-800',
    NONE: 'bg-gray-100 text-gray-800',
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Comments ({commentCount})
      </h2>
      {commentCount === 0 ? (
        <p className="text-gray-600">No comments to display.</p>
      ) : (
        <div className="space-y-4">
          {value.map((comment) => {
            const { id, body, user, created_at, author_association } = comment;
            const displayDate: string = formatDate(created_at);
            const displayAssociation: string =
              associationMap[author_association];
            const badgeClass: string = badgeColors[author_association];

            return (
              <div key={id} className="p-4 bg-white rounded-lg shadow">
                <div className="flex items-start">
                  <img
                    className="w-10 h-10 rounded-full object-cover"
                    src={user?.avatar_url ?? ''}
                    alt={user?.login ?? 'avatar'}
                  />
                  <div className="ml-3 flex-1">
                    <div className="flex items-center">
                      <p className="text-sm font-medium text-gray-900">
                        {user?.login ?? 'Unknown User'}
                      </p>
                      <span
                        className={`ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${badgeClass}`}
                      >
                        {displayAssociation}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">{displayDate}</p>
                  </div>
                </div>
                <p className="mt-3 text-gray-700 text-sm line-clamp-3">
                  {body}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

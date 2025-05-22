import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * Legacy Review Comment
     *
     * @title Legacy Review Comment
    */
    export type review_comment = {
        url: string & tags.Format<"uri">;
        pull_request_review_id: (number & tags.Type<"int32">) | null;
        id: number & tags.Type<"int32">;
        node_id: string;
        diff_hunk: string;
        path: string;
        position: (number & tags.Type<"int32">) | null;
        original_position: number & tags.Type<"int32">;
        commit_id: string;
        original_commit_id: string;
        in_reply_to_id?: number & tags.Type<"int32">;
        user: AutoViewInputSubTypes.nullable_simple_user;
        body: string;
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
        html_url: string & tags.Format<"uri">;
        pull_request_url: string & tags.Format<"uri">;
        author_association: AutoViewInputSubTypes.author_association;
        _links: {
            self: AutoViewInputSubTypes.link;
            html: AutoViewInputSubTypes.link;
            pull_request: AutoViewInputSubTypes.link;
        };
        body_text?: string;
        body_html?: string;
        reactions?: AutoViewInputSubTypes.reaction_rollup;
        /**
         * The side of the first line of the range for a multi-line comment.
        */
        side?: "LEFT" | "RIGHT";
        /**
         * The side of the first line of the range for a multi-line comment.
        */
        start_side?: "LEFT" | "RIGHT" | null;
        /**
         * The line of the blob to which the comment applies. The last line of the range for a multi-line comment
        */
        line?: number & tags.Type<"int32">;
        /**
         * The original line of the blob to which the comment applies. The last line of the range for a multi-line comment
        */
        original_line?: number & tags.Type<"int32">;
        /**
         * The first line of the range for a multi-line comment.
        */
        start_line?: (number & tags.Type<"int32">) | null;
        /**
         * The original first line of the range for a multi-line comment.
        */
        original_start_line?: (number & tags.Type<"int32">) | null;
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
    /**
     * Hypermedia Link
     *
     * @title Link
    */
    export type link = {
        href: string;
    };
    /**
     * @title Reaction Rollup
    */
    export type reaction_rollup = {
        url: string & tags.Format<"uri">;
        total_count: number & tags.Type<"int32">;
        "+1": number & tags.Type<"int32">;
        "-1": number & tags.Type<"int32">;
        laugh: number & tags.Type<"int32">;
        confused: number & tags.Type<"int32">;
        heart: number & tags.Type<"int32">;
        hooray: number & tags.Type<"int32">;
        eyes: number & tags.Type<"int32">;
        rocket: number & tags.Type<"int32">;
    };
}
export type AutoViewInput = AutoViewInputSubTypes.review_comment[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const totalComments = value.length;

  const formatDate = (iso: string) => {
    const date = new Date(iso);
    return date.toLocaleString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">
        {totalComments} Comment{totalComments !== 1 ? 's' : ''}
      </h2>

      {totalComments === 0 ? (
        <div className="text-gray-500 text-center py-4">
          No comments available.
        </div>
      ) : (
        value.map((comment, idx) => {
          const user = comment.user;
          const created = formatDate(comment.created_at);
          const edited = comment.updated_at !== comment.created_at ? ' · edited' : '';
          const snippet = comment.body_text ?? comment.body;
          const reactions = comment.reactions;

          return (
            <div
              key={idx}
              className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
            >
              <div className="flex items-start">
                <img
                  src={user?.avatar_url || ''}
                  alt={user?.login || 'User avatar'}
                  className="w-10 h-10 rounded-full flex-shrink-0"
                />
                <div className="ml-3 flex-1">
                  <div className="flex flex-wrap items-center space-x-2">
                    <span className="font-semibold text-gray-900">
                      {user?.login || 'Unknown'}
                    </span>
                    {comment.author_association &&
                      comment.author_association !== 'NONE' && (
                        <span className="px-1.5 py-0.5 bg-blue-100 text-blue-800 text-xs rounded">
                          {comment.author_association.toLowerCase()}
                        </span>
                      )}
                    <span className="text-gray-500 text-xs">
                      {created}
                      {edited}
                    </span>
                  </div>

                  <div className="mt-1 text-gray-600 text-xs">
                    <span className="truncate">{comment.path}</span>
                    {comment.line != null && (
                      <span> · Line {comment.line}</span>
                    )}
                  </div>

                  <p className="mt-2 text-gray-800 text-sm line-clamp-3">
                    {snippet}
                  </p>

                  {reactions && reactions.total_count > 0 && (
                    <div className="mt-3 flex flex-wrap items-center space-x-4 text-gray-600 text-sm">
                      <div className="flex items-center space-x-1">
                        <span>👍</span>
                        <span>{reactions['+1']}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span>👎</span>
                        <span>{reactions['-1']}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span>💬</span>
                        <span>{reactions.total_count}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

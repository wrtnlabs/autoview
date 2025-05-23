import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Legacy Review Comment
     *
     * @title Legacy Review Comment
    */
    export interface review_comment {
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
    export interface link {
        href: string;
    }
    /**
     * @title Reaction Rollup
    */
    export interface reaction_rollup {
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
    }
}
export type AutoViewInput = AutoViewInputSubTypes.review_comment[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // Helper to format ISO date to readable string
  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  // Helper to humanize author_association
  const humanizeAssociation = (assoc: AutoViewInputSubTypes.author_association): string =>
    assoc
      .toLowerCase()
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  // Placeholder avatar for failed images or missing user
  const placeholderAvatar = (login?: string) =>
    `https://ui-avatars.com/api/?name=${encodeURIComponent(login || "Unknown")}&background=cccccc&color=555555`;

  // Main render
  return (
    <ul className="space-y-6">
      {value.map((comment) => {
        const user = comment.user;
        const avatarUrl = user?.avatar_url || placeholderAvatar(user?.login || "Unknown");
        const displayName = user?.name ?? user?.login ?? "Unknown";
        const filePath = comment.path;
        const lineNumber = comment.line ?? comment.position ?? comment.original_position;
        const bodyText = comment.body_text || comment.body || "";
        const reactions = comment.reactions;
        return (
          <li
            key={comment.id}
            className="p-4 bg-white rounded-lg shadow-sm flex flex-col space-y-3"
          >
            {/* Header: Avatar, User, Association, Date */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img
                  src={avatarUrl}
                  alt={`${displayName}'s avatar`}
                  className="w-10 h-10 rounded-full object-cover"
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement;
                    target.src = placeholderAvatar(user?.login);
                  }}
                />
                <div className="flex flex-col">
                  <span className="font-medium text-gray-800">{displayName}</span>
                  <span className="text-xs text-gray-500">
                    {humanizeAssociation(comment.author_association)}
                  </span>
                </div>
              </div>
              <time
                dateTime={comment.created_at}
                className="text-xs text-gray-400 whitespace-nowrap"
              >
                {formatDate(comment.created_at)}
              </time>
            </div>

            {/* File and Line Info */}
            <div className="flex items-center text-sm text-gray-600 space-x-1">
              <LucideReact.FileText size={16} className="text-gray-400" />
              <span className="truncate">
                {filePath}
                {lineNumber != null ? ` :${lineNumber}` : ""}
              </span>
            </div>

            {/* Comment Body */}
            <div className="text-gray-700 text-sm line-clamp-3 whitespace-pre-wrap">
              {bodyText}
            </div>

            {/* Reactions */}
            {reactions && reactions.total_count > 0 && (
              <div className="flex items-center space-x-1 text-sm text-gray-500">
                <LucideReact.Heart size={16} className="text-red-500" />
                <span>{reactions.total_count}</span>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

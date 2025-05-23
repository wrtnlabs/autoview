import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * A comment made to a gist.
     *
     * @title Gist Comment
    */
    export interface gist_comment {
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
}
export type AutoViewInput = AutoViewInputSubTypes.gist_comment[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const comments = value;
  const totalComments = comments.length;

  const associationColors: Record<AutoViewInputSubTypes.author_association, { bg: string; text: string }> = {
    OWNER: { bg: "bg-blue-100", text: "text-blue-800" },
    COLLABORATOR: { bg: "bg-green-100", text: "text-green-800" },
    MEMBER: { bg: "bg-teal-100", text: "text-teal-800" },
    CONTRIBUTOR: { bg: "bg-indigo-100", text: "text-indigo-800" },
    FIRST_TIMER: { bg: "bg-yellow-100", text: "text-yellow-800" },
    FIRST_TIME_CONTRIBUTOR: { bg: "bg-yellow-100", text: "text-yellow-800" },
    MANNEQUIN: { bg: "bg-gray-100", text: "text-gray-800" },
    NONE: { bg: "bg-gray-100", text: "text-gray-800" },
  };

  const formatDate = (iso: string): string => {
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })
      + " " + d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">Comments ({totalComments})</h2>
      </div>
      {totalComments === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-gray-400">
          <LucideReact.AlertCircle size={24} />
          <span className="mt-2 text-sm">No comments available</span>
        </div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {comments.map((comment) => {
            const author = comment.user
              ? comment.user.name ?? comment.user.login
              : "Unknown User";
            const avatarSrc =
              comment.user?.avatar_url ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(author)}&background=random`;
            const assoc = comment.author_association;
            const colors = associationColors[assoc];

            return (
              <li key={comment.id} className="py-4 flex space-x-3">
                <img
                  src={avatarSrc}
                  alt={author}
                  className="h-10 w-10 rounded-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(author)}&background=random`;
                  }}
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">{author}</h3>
                    <div className="flex items-center text-sm text-gray-500 space-x-1">
                      <LucideReact.Calendar size={16} className="text-gray-400" />
                      <span>{formatDate(comment.created_at)}</span>
                    </div>
                  </div>
                  <p className="mt-1 text-gray-700 text-sm line-clamp-3 whitespace-pre-wrap">
                    {comment.body}
                  </p>
                  <div className="mt-2 flex items-center space-x-2">
                    <span
                      className={`px-2 py-0.5 text-xs font-medium rounded ${colors.bg} ${colors.text}`}
                    >
                      {assoc.toLowerCase().replace(/_/g, " ")}
                    </span>
                    <div className="flex items-center text-gray-400 text-sm truncate">
                      <LucideReact.Link size={14} />
                      <span className="ml-1 truncate">{comment.url}</span>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

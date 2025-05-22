import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
  export type author_association =
    | "COLLABORATOR"
    | "CONTRIBUTOR"
    | "FIRST_TIMER"
    | "FIRST_TIME_CONTRIBUTOR"
    | "MANNEQUIN"
    | "MEMBER"
    | "NONE"
    | "OWNER";
}
export type AutoViewInput = AutoViewInputSubTypes.gist_comment[];

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Data aggregation and helper functions
  const comments = Array.isArray(value)
    ? [...value].sort(
        (a, b) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
      )
    : [];

  const formatDate = (iso: string): string => {
    const d = new Date(iso);
    return (
      d.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      }) +
      ", " +
      d.toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
      })
    );
  };

  const getBadgeColor = (
    assoc: AutoViewInputSubTypes.author_association,
  ): string => {
    switch (assoc) {
      case "OWNER":
        return "bg-blue-100 text-blue-800";
      case "COLLABORATOR":
        return "bg-green-100 text-green-800";
      case "CONTRIBUTOR":
        return "bg-indigo-100 text-indigo-800";
      case "FIRST_TIMER":
      case "FIRST_TIME_CONTRIBUTOR":
        return "bg-purple-100 text-purple-800";
      case "MEMBER":
        return "bg-teal-100 text-teal-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS
  return (
    <div className="p-4">
      {comments.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-center text-gray-500">
          <LucideReact.AlertCircle size={48} className="mb-2" />
          <span>No comments available.</span>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md divide-y divide-gray-200">
          {comments.map((comment) => {
            const {
              id,
              body,
              user,
              created_at,
              updated_at,
              author_association,
            } = comment;
            const isEdited =
              new Date(updated_at).getTime() > new Date(created_at).getTime();
            const badgeColor = getBadgeColor(author_association);
            const assocLabel = author_association
              .toLowerCase()
              .replace(/_/g, " ")
              .replace(/\b\w/g, (c) => c.toUpperCase());

            return (
              <div key={id} className="flex items-start p-4">
                {user ? (
                  <img
                    src={user.avatar_url}
                    alt={user.login}
                    className="h-10 w-10 rounded-full object-cover bg-gray-100"
                    onError={(e) => {
                      e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        user.login,
                      )}&background=ccc&color=fff`;
                    }}
                  />
                ) : (
                  <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <LucideReact.User size={20} className="text-gray-400" />
                  </div>
                )}
                <div className="ml-3 flex-1">
                  <div className="flex items-center">
                    <span className="font-medium text-gray-900">
                      {user?.login ?? "Unknown User"}
                    </span>
                    <span className="ml-2 flex items-center text-xs text-gray-500">
                      <LucideReact.Calendar size={14} className="mr-1" />
                      {formatDate(created_at)}
                    </span>
                    {isEdited && (
                      <span className="ml-2 text-xs text-gray-400">
                        (edited)
                      </span>
                    )}
                    <span
                      className={`ml-auto inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${badgeColor}`}
                    >
                      {assocLabel}
                    </span>
                  </div>
                  <p className="mt-2 text-gray-700 text-sm line-clamp-3 whitespace-pre-wrap">
                    {body}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

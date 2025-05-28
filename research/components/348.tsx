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
export type AutoViewInput = AutoViewInputSubTypes.gist_comment;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants.
  const createdDate = new Date(value.created_at);
  const formattedCreated = createdDate.toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
  const isEdited = value.updated_at !== value.created_at;
  const updatedDate = isEdited ? new Date(value.updated_at) : null;
  const formattedUpdated = updatedDate
    ? updatedDate.toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : "";

  const user = value.user;
  const userLogin = user?.login ?? "unknown";
  const displayName = user?.name ?? userLogin;
  const avatarUrl =
    user?.avatar_url ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      displayName
    )}&background=random`;

  function getAssociationClasses(
    assoc: AutoViewInputSubTypes.author_association
  ): string {
    switch (assoc) {
      case "OWNER":
        return "bg-blue-100 text-blue-800";
      case "COLLABORATOR":
        return "bg-green-100 text-green-800";
      case "MEMBER":
        return "bg-blue-100 text-blue-800";
      case "CONTRIBUTOR":
        return "bg-indigo-100 text-indigo-800";
      case "FIRST_TIMER":
      case "FIRST_TIME_CONTRIBUTOR":
        return "bg-yellow-100 text-yellow-800";
      case "MANNEQUIN":
        return "bg-purple-100 text-purple-800";
      case "NONE":
      default:
        return "bg-gray-100 text-gray-800";
    }
  }
  const assocClasses = getAssociationClasses(value.author_association);
  const assocLabel = value.author_association.replace(/_/g, " ");

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-start space-x-4">
        <img
          src={avatarUrl}
          alt={`${displayName} avatar`}
          onError={(e) => {
            const img = e.currentTarget as HTMLImageElement;
            img.onerror = null;
            img.src =
              "https://ui-avatars.com/api/?name=User&background=ccc&color=fff";
          }}
          className="w-10 h-10 rounded-full object-cover bg-gray-200 flex-shrink-0"
        />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-900">
                {displayName}
              </p>
              <p className="text-xs text-gray-500">@{userLogin}</p>
            </div>
            <span
              className={`text-xs font-medium px-2 py-1 rounded ${assocClasses}`}
            >
              {assocLabel}
            </span>
          </div>
          <p className="mt-2 text-gray-800 text-sm line-clamp-3 whitespace-pre-wrap">
            {value.body}
          </p>
          <div className="mt-3 flex items-center space-x-4 text-xs text-gray-500">
            <div className="flex items-center">
              <LucideReact.Calendar size={14} className="mr-1" />
              <span>{formattedCreated}</span>
            </div>
            {isEdited && (
              <div className="flex items-center">
                <LucideReact.Edit2 size={14} className="mr-1" />
                <span>Edited {formattedUpdated}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

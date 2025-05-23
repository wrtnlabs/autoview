import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Commit Comment
     *
     * @title Commit Comment
    */
    export interface commit_comment {
        html_url: string & tags.Format<"uri">;
        url: string & tags.Format<"uri">;
        id: number & tags.Type<"int32">;
        node_id: string;
        body: string;
        path: string | null;
        position: (number & tags.Type<"int32">) | null;
        line: (number & tags.Type<"int32">) | null;
        commit_id: string;
        user: AutoViewInputSubTypes.nullable_simple_user;
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
        author_association: AutoViewInputSubTypes.author_association;
        reactions?: AutoViewInputSubTypes.reaction_rollup;
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
export type AutoViewInput = AutoViewInputSubTypes.commit_comment;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const userName = value.user?.name?.trim() || value.user?.login || "Unknown User";
  const avatarSrc =
    value.user?.avatar_url ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=0D8ABC&color=fff`;
  const formattedCreated = new Date(value.created_at).toLocaleString();
  const isEdited = value.updated_at !== value.created_at;
  const formattedUpdated = isEdited ? new Date(value.updated_at).toLocaleString() : "";
  const affiliation = value.author_association.replace(/_/g, " ").toLowerCase();

  // Prepare reactions for display if present
  const reactions = value.reactions;
  const reactionItems: { icon: JSX.Element; count: number; key: string }[] = [];
  if (reactions) {
    if (reactions["+1"] > 0)
      reactionItems.push({ icon: <LucideReact.ThumbsUp size={16} />, count: reactions["+1"], key: "+1" });
    if (reactions["-1"] > 0)
      reactionItems.push({ icon: <LucideReact.ThumbsDown size={16} />, count: reactions["-1"], key: "-1" });
    if (reactions.laugh > 0)
      reactionItems.push({ icon: <LucideReact.Smile size={16} />, count: reactions.laugh, key: "laugh" });
    if (reactions.confused > 0)
      reactionItems.push({ icon: <LucideReact.Frown size={16} />, count: reactions.confused, key: "confused" });
    if (reactions.heart > 0)
      reactionItems.push({ icon: <LucideReact.Heart size={16} />, count: reactions.heart, key: "heart" });
    if (reactions.hooray > 0)
      reactionItems.push({ icon: <LucideReact.PartyPopper size={16} />, count: reactions.hooray, key: "hooray" });
    if (reactions.eyes > 0)
      reactionItems.push({ icon: <LucideReact.Eye size={16} />, count: reactions.eyes, key: "eyes" });
    if (reactions.rocket > 0)
      reactionItems.push({ icon: <LucideReact.Rocket size={16} />, count: reactions.rocket, key: "rocket" });
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-md p-4">
      {/* Header: Avatar, Username, Date, Affiliation */}
      <div className="flex items-center space-x-3">
        <img
          src={avatarSrc}
          alt={userName}
          className="w-10 h-10 rounded-full object-cover bg-gray-100"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
              userName
            )}&background=64748b&color=fff`;
          }}
        />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">{userName}</p>
          <div className="flex items-center text-xs text-gray-500 space-x-2">
            <LucideReact.Calendar size={14} />
            <time dateTime={value.created_at}>{formattedCreated}</time>
            <span>·</span>
            <span className="capitalize">{affiliation}</span>
            {isEdited && (
              <span
                className="ml-1 flex items-center text-gray-400"
                title={`Updated at ${formattedUpdated}`}
              >
                <LucideReact.Edit2 size={14} />
              </span>
            )}
          </div>
        </div>
      </div>

      {/* File path and position if available */}
      {value.path && (
        <div className="mt-3 flex items-center text-xs text-gray-500 space-x-1">
          <LucideReact.FileText size={14} />
          <span className="truncate">
            {value.path}
            {value.line != null ? ` :${value.line}` : ""}
          </span>
        </div>
      )}

      {/* Comment Body */}
      <div className="mt-4 text-gray-700 text-sm whitespace-pre-wrap line-clamp-5">
        {value.body}
      </div>

      {/* Reactions */}
      {reactionItems.length > 0 && (
        <div className="mt-4 flex flex-wrap items-center gap-4 text-gray-500 text-sm">
          {reactionItems.map((r) => (
            <div key={r.key} className="flex items-center space-x-1">
              {React.cloneElement(r.icon, { className: "text-gray-500" })}
              <span>{r.count}</span>
            </div>
          ))}
          <span className="text-xs">{reactions?.total_count} total</span>
        </div>
      )}
    </div>
  );
}

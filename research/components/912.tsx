import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * A reply to a discussion within a team.
     *
     * @title Team Discussion Comment
    */
    export type team_discussion_comment = {
        author: AutoViewInputSubTypes.nullable_simple_user;
        /**
         * The main text of the comment.
        */
        body: string;
        body_html: string;
        /**
         * The current version of the body content. If provided, this update operation will be rejected if the given version does not match the latest version on the server.
        */
        body_version: string;
        created_at: string & tags.Format<"date-time">;
        last_edited_at: (string & tags.Format<"date-time">) | null;
        discussion_url: string & tags.Format<"uri">;
        html_url: string & tags.Format<"uri">;
        node_id: string;
        /**
         * The unique sequence number of a team discussion comment.
        */
        number: number & tags.Type<"int32">;
        updated_at: string & tags.Format<"date-time">;
        url: string & tags.Format<"uri">;
        reactions?: AutoViewInputSubTypes.reaction_rollup;
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
export type AutoViewInput = AutoViewInputSubTypes.team_discussion_comment;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const author = value.author;
  const authorName = author?.name?.trim() || author?.login || "Unknown User";
  const avatarUrl = author?.avatar_url;
  const formattedCreatedAt = new Date(value.created_at).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
  const formattedEditedAt = value.last_edited_at
    ? new Date(value.last_edited_at).toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : null;

  const reactions = value.reactions;
  const reactionMap: Record<keyof NonNullable<typeof reactions>, string> = {
    "+1": "👍",
    "-1": "👎",
    laugh: "😄",
    confused: "😕",
    heart: "❤️",
    hooray: "🎉",
    eyes: "👀",
    rocket: "🚀",
    total_count: "",
    url: "",
  };
  const reactionEntries: { emoji: string; count: number }[] = [];

  if (reactions) {
    (Object.keys(reactions) as Array<keyof typeof reactions>).forEach((key) => {
      if (key === "url" || key === "total_count") return;
      const count = reactions[key] as number;
      if (count > 0) {
        reactionEntries.push({ emoji: reactionMap[key], count });
      }
    });
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  return (
    <article className="bg-white p-4 rounded-lg shadow-sm max-w-full">
      <header className="flex items-center space-x-3">
        {avatarUrl && (
          <img
            src={avatarUrl}
            alt={`${authorName}'s avatar`}
            className="w-10 h-10 rounded-full flex-shrink-0"
          />
        )}
        <div className="flex flex-col">
          <span className="text-gray-900 font-semibold text-sm">{authorName}</span>
          <div className="text-gray-500 text-xs">
            <span>#{value.number}</span>
            <span className="mx-1">·</span>
            <time dateTime={value.created_at}>{formattedCreatedAt}</time>
            {formattedEditedAt && (
              <>
                <span className="mx-1">·</span>
                <span>(edited)</span>
              </>
            )}
          </div>
        </div>
      </header>

      <section
        className="mt-3 text-gray-800 text-sm leading-relaxed prose max-w-none"
        dangerouslySetInnerHTML={{ __html: value.body_html }}
      />

      {reactionEntries.length > 0 && (
        <footer className="mt-4 flex flex-wrap items-center space-x-4 text-sm text-gray-600">
          {reactionEntries.map(({ emoji, count }, idx) => (
            <div
              key={idx}
              className="flex items-center space-x-1 bg-gray-100 px-2 py-1 rounded-full"
            >
              <span>{emoji}</span>
              <span>{count}</span>
            </div>
          ))}
        </footer>
      )}
    </article>
  );
}

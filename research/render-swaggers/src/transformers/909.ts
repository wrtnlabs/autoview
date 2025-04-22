import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * A team discussion is a persistent record of a free-form conversation within a team.
     *
     * @title Team Discussion
    */
    export type team_discussion = {
        author: Schema.nullable_simple_user;
        /**
         * The main text of the discussion.
        */
        body: string;
        body_html: string;
        /**
         * The current version of the body content. If provided, this update operation will be rejected if the given version does not match the latest version on the server.
        */
        body_version: string;
        comments_count: number & tags.Type<"int32">;
        comments_url: string & tags.Format<"uri">;
        created_at: string & tags.Format<"date-time">;
        last_edited_at: (string & tags.Format<"date-time">) | null;
        html_url: string & tags.Format<"uri">;
        node_id: string;
        /**
         * The unique sequence number of a team discussion.
        */
        number: number & tags.Type<"int32">;
        /**
         * Whether or not this discussion should be pinned for easy retrieval.
        */
        pinned: boolean;
        /**
         * Whether or not this discussion should be restricted to team members and organization owners.
        */
        "private": boolean;
        team_url: string & tags.Format<"uri">;
        /**
         * The title of the discussion.
        */
        title: string;
        updated_at: string & tags.Format<"date-time">;
        url: string & tags.Format<"uri">;
        reactions?: Schema.reaction_rollup;
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
type IAutoViewTransformerInputType = Schema.team_discussion;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Format creation date for display
  const createdAt = new Date(input.created_at).toLocaleString();

  // Prepare author avatar and name (handle null author)
  const author = input.author;
  const avatarProps: IAutoView.IAutoViewAvatarProps = {
    type: "Avatar",
    src: author?.avatar_url ?? "",
    name: author?.name ?? author?.login ?? "Unknown",
    size: 40,
    variant: "blue",
  };

  // Build header of the card with avatar, title, and subtitle
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: input.title,
    description: `By ${author?.login ?? "Unknown"} on ${createdAt}`,
    startElement: avatarProps,
  };

  // Use the Markdown component to render the discussion body
  const markdownBody: IAutoView.IAutoViewMarkdownProps = {
    type: "Markdown",
    content: input.body,
  };

  // If reactions are provided, transform them into a DataList
  const reactionListItems: IAutoView.IAutoViewDataListItemProps[] = [];
  if (input.reactions) {
    // Only keep actual reaction counts (skip url and total_count)
    const reactionEntries: [keyof Omit<typeof input.reactions, "url" | "total_count">, number][] = [
      ["+1", input.reactions["+1"]],
      ["-1", input.reactions["-1"]],
      ["laugh", input.reactions.laugh],
      ["confused", input.reactions.confused],
      ["heart", input.reactions.heart],
      ["hooray", input.reactions.hooray],
      ["eyes", input.reactions.eyes],
      ["rocket", input.reactions.rocket],
    ];
    for (const [key, count] of reactionEntries) {
      if (count > 0) {
        reactionListItems.push({
          type: "DataListItem",
          label: {
            type: "Text",
            content: key,
          },
          value: {
            type: "Text",
            content: count.toString(),
          },
        });
      }
    }
  }

  // If we have any reactions, wrap them in a DataList component
  let reactionsDataList: IAutoView.IAutoViewDataListProps | null = null;
  if (reactionListItems.length > 0) {
    reactionsDataList = {
      type: "DataList",
      childrenProps: reactionListItems,
    };
  }

  // Compose card content: first the body, then optionally the reactions
  const contentChildren: IAutoView.IAutoViewPresentationComponentProps[] = [markdownBody];
  if (reactionsDataList) {
    contentChildren.push(reactionsDataList);
  }
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: contentChildren,
  };

  // Build a footer with a comment button indicating the number of comments
  const commentButton: IAutoView.IAutoViewButtonProps = {
    type: "Button",
    variant: "text",
    color: "primary",
    startElement: {
      type: "Icon",
      id: "comment",
      size: 20,
      color: "gray",
    },
    // Show "No comments" if zero
    label: input.comments_count > 0
      ? `${input.comments_count} comments`
      : "No comments",
  };
  const footer: IAutoView.IAutoViewCardFooterProps = {
    type: "CardFooter",
    childrenProps: [commentButton],
  };

  // Finally, compose a vertical card with header, content, and footer
  const card: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [header, content, footer],
  };

  return card;
}

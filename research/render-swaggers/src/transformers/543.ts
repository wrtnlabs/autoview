import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * A reply to a discussion within a team.
     *
     * @title Team Discussion Comment
    */
    export type team_discussion_comment = {
        author: Schema.nullable_simple_user;
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
type IAutoViewTransformerInputType = Schema.team_discussion_comment;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



// Transforms a team discussion comment into a visual card representation.
function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // HEADER: show author avatar or fallback icon, plus timestamps
  const author = input.author;
  const headerStart = author
    ? ({
        type: "Avatar" as const,
        src: author.avatar_url,
        name: author.login,
        size: 32,
        variant: "primary",
      } as IAutoView.IAutoViewAvatarProps)
    : ({
        type: "Icon" as const,
        id: "user-secret",
        size: 32,
        color: "gray",
      } as IAutoView.IAutoViewIconProps);

  const createdAt = new Date(input.created_at).toLocaleString();
  const editedAt =
    input.last_edited_at != null
      ? ` (edited at ${new Date(input.last_edited_at).toLocaleString()})`
      : "";

  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    startElement: headerStart,
    title: author?.login ?? "Unknown user",
    description: `Posted at ${createdAt}${editedAt}`,
  };

  // CONTENT: render the comment body using Markdown for better readability
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: [
      {
        type: "Markdown",
        content: input.body,
      } as IAutoView.IAutoViewMarkdownProps,
    ],
  };

  // FOOTER: display reaction counts as chips, skipping zero-count reactions
  let footer: IAutoView.IAutoViewCardFooterProps | undefined;
  if (input.reactions) {
    // Map each reaction key to a FontAwesome icon name
    const iconMap: Record<string, string> = {
      "+1": "thumbs-up",
      "-1": "thumbs-down",
      laugh: "laugh",
      confused: "meh",
      heart: "heart",
      hooray: "tada",
      eyes: "eye",
      rocket: "rocket",
    };

    const chips: IAutoView.IAutoViewChipProps[] = [];
    (Object.keys(iconMap) as Array<keyof typeof iconMap>).forEach((key) => {
      // @ts-ignore: dynamic access to reaction properties
      const count = input.reactions?.[key] as number;
      if (count > 0) {
        chips.push({
          type: "Chip",
          label: count.toString(),
          variant: "outlined",
          startElement: {
            type: "Icon",
            id: iconMap[key],
            size: 16,
            color: "gray",
          },
        });
      }
    });

    if (chips.length > 0) {
      footer = {
        type: "CardFooter",
        childrenProps: [
          {
            type: "ChipGroup",
            childrenProps: chips,
          } as IAutoView.IAutoViewChipGroupProps,
        ],
      };
    }
  }

  // ASSEMBLE: create a vertical card with header, body, and optional footer
  const cardChildren: Array<
    | IAutoView.IAutoViewCardHeaderProps
    | IAutoView.IAutoViewCardContentProps
    | IAutoView.IAutoViewCardFooterProps
  > = [header, content];
  if (footer) {
    cardChildren.push(footer);
  }

  return {
    type: "VerticalCard",
    childrenProps: cardChildren,
  } as IAutoView.IAutoViewVerticalCardProps;
}

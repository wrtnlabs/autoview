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



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Safely extract author info, falling back to "Unknown" if null
  const author = input.author ?? {
    login: "Unknown",
    avatar_url: "",
    name: null,
  };

  // Format timestamp for display (fallback to raw string)
  const createdAt = input.created_at;
  const formattedDate = new Date(createdAt).toLocaleString();

  // Build the CardHeader: avatar + author name + comment number + timestamp
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    // Display author's name if available, otherwise fallback to login
    title: author.name ?? author.login,
    description: `Comment #${input.number}`,
    // Avatar on the left
    startElement: {
      type: "Avatar",
      src: author.avatar_url,
      name: author.login,
      size: 40,
    },
    // Timestamp on the right
    endElement: {
      type: "Text",
      variant: "caption",
      color: "gray",
      content: formattedDate,
    },
  };

  // Build the CardContent: render the body as markdown
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: {
      type: "Markdown",
      content: input.body,
    },
  };

  // Prepare reaction chips if any reactions are present
  const reactions = input.reactions;
  let footerChildren: IAutoView.IAutoViewPresentationComponentProps;

  if (reactions && reactions.total_count > 0) {
    // Map reaction keys to FontAwesome icon IDs
    const iconMap: Record<string, string> = {
      "+1": "thumbs-up",
      "-1": "thumbs-down",
      laugh: "laugh",
      confused: "confused",
      heart: "heart",
      hooray: "hooray",
      eyes: "eye",
      rocket: "rocket",
    };
    // Build an array of chips for each reaction with a positive count
    const chips: IAutoView.IAutoViewChipProps[] = (Object.keys(iconMap) as Array<keyof typeof iconMap>)
      .filter((key) => (reactions as any)[key] > 0)
      .map((key) => ({
        type: "Chip",
        label: `${key} ${(reactions as any)[key]}`,
        variant: "outlined",
        size: "small",
        // Use the corresponding icon for the reaction
        startElement: {
          type: "Icon",
          id: iconMap[key],
          size: 16,
          color: "gray",
        },
      }));

    footerChildren = {
      type: "ChipGroup",
      childrenProps: chips,
      maxItems: 8,
    };
  } else {
    // No reactions: display a placeholder text
    footerChildren = {
      type: "Text",
      variant: "caption",
      color: "gray",
      content: "No reactions",
    };
  }

  // Build the CardFooter
  const footer: IAutoView.IAutoViewCardFooterProps = {
    type: "CardFooter",
    childrenProps: footerChildren,
  };

  // Assemble the vertical card containing header, content, and footer
  const card: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [header, content, footer],
  };

  return card;
}

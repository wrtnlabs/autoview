import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Reactions to conversations provide a way to help people express their feelings more simply and effectively.
     *
     * @title Reaction
    */
    export type reaction = {
        id: number & tags.Type<"int32">;
        node_id: string;
        user: Schema.nullable_simple_user;
        /**
         * The reaction to use
        */
        content: "+1" | "-1" | "laugh" | "confused" | "heart" | "hooray" | "rocket" | "eyes";
        created_at: string & tags.Format<"date-time">;
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
}
type IAutoViewTransformerInputType = Schema.reaction;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Map GitHub reaction content to FontAwesome icon identifiers
  const contentIconMap: Record<IAutoViewTransformerInputType["content"], string> = {
    "+1": "thumbs-up",
    "-1": "thumbs-down",
    laugh: "laugh",
    confused: "confused",
    heart: "heart",
    hooray: "tada",    // celebration emoji
    rocket: "rocket",
    eyes: "eyes",
  };

  // Fallback icon if content is unexpected
  const iconId = contentIconMap[input.content] ?? "question";

  // Choose a color for each icon to make it visually distinct
  const iconColorMap: Record<string, IAutoView.IAutoViewIconProps["color"]> = {
    "thumbs-up": "green",
    "thumbs-down": "red",
    laugh: "yellow",
    confused: "orange",
    heart: "pink",
    tada: "violet",
    rocket: "teal",
    eyes: "gray",
    question: "gray",
  };
  const iconColor = iconColorMap[iconId] ?? "gray";

  // Safely format the creation date; if invalid, use the raw string
  const createdAt = (() => {
    const date = new Date(input.created_at);
    return isNaN(date.getTime())
      ? input.created_at
      : date.toLocaleString();
  })();

  // Build an avatar component if user data exists
  const avatarProps: IAutoView.IAutoViewAvatarProps | undefined = input.user
    ? {
        type: "Avatar",
        src: input.user.avatar_url,
        name: input.user.login,
      }
    : undefined;

  // Create the card header with avatar, username, timestamp, and reaction icon
  const headerProps: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: input.user?.login ?? "Unknown User",
    description: createdAt,
    startElement: avatarProps,
    endElement: {
      type: "Icon",
      id: iconId,
      color: iconColor,
      size: 24,
    },
  };

  // Prepare a Markdown block summarizing the reaction details
  const markdownLines: string[] = [
    "### Reaction Details",
    `- **ID**: \`${input.id}\``,
    `- **Node ID**: \`${input.node_id}\``,
    `- **Content**: ${input.content}`,
  ];
  if (input.user) {
    markdownLines.push(
      `- **Profile**: [${input.user.login}](${input.user.html_url})`
    );
  }
  const markdownContent = markdownLines.join("\n");

  const contentProps: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    // Use Markdown for rich text instead of plain strings
    childrenProps: {
      type: "Markdown",
      content: markdownContent,
    },
  };

  // Assemble a vertical card containing the header and the markdown content
  return {
    type: "VerticalCard",
    childrenProps: [headerProps, contentProps],
  } as IAutoView.IAutoViewVerticalCardProps;
}

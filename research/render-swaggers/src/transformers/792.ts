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
  // Map GitHub reaction content to FontAwesome icon names.
  const reactionIconMap: Record<string, string> = {
    "+1": "thumbs-up",
    "-1": "thumbs-down",
    laugh: "face-laugh",
    confused: "face-confused",
    heart: "heart",
    hooray: "hands-clapping",
    rocket: "rocket",
    eyes: "eyes",
  };

  // Choose a color based on the reaction sentiment.
  const reactionColorMap: Record<string, IAutoView.IAutoViewIconProps["color"]> = {
    "+1": "green",
    "-1": "red",
    laugh: "yellow",
    confused: "orange",
    heart: "pink",
    hooray: "blue",
    rocket: "teal",
    eyes: "cyan",
  };

  // Safely extract user info or fallback to generic.
  const user = input.user;
  const userName = user?.login ?? "Unknown User";
  const avatarSrc = user?.avatar_url;

  // Format the creation date for display; use locale-friendly string.
  const createdDate = (() => {
    try {
      const d = new Date(input.created_at);
      return isNaN(d.getTime()) ? input.created_at : d.toLocaleString();
    } catch {
      return input.created_at;
    }
  })();

  // Build the card header showing the user avatar, name, and reaction icon.
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: userName,
    description: `Reacted ${createdDate}`,
    startElement: {
      type: "Avatar",
      src: avatarSrc,
      name: userName,
      size: 40,
      variant: "primary",
    },
    endElement: {
      type: "Icon",
      id: reactionIconMap[input.content] || "question",
      color: reactionColorMap[input.content] || "gray",
      size: 24,
    },
  };

  // Present the node_id and raw content in a small markdown block.
  const contentMarkdown = {
    type: "Markdown" as const,
    content: `**Node ID:** \`${input.node_id}\`  
**Reaction:** \`${input.content}\``,
  };

  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: [contentMarkdown],
  };

  // Wrap everything in a vertical card for mobile responsiveness.
  return {
    type: "VerticalCard",
    childrenProps: [header, content],
  };
}

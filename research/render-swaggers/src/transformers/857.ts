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
  // Extract user data, handling case where user may be null
  const user = input.user;
  const userName = user?.name ?? user?.login ?? "Unknown User";
  const avatarUrl = user?.avatar_url;

  // Map each reaction content to an icon name and a color
  const reactionMapping: Record<string, { icon: string; color: IAutoView.IAutoViewIconProps["color"] }> = {
    "+1":    { icon: "thumbs-up",    color: "green" },
    "-1":    { icon: "thumbs-down",  color: "red" },
    laugh:   { icon: "laugh",        color: "yellow" },
    confused:{ icon: "meh",          color: "orange" },
    heart:   { icon: "heart",        color: "pink" },
    hooray:  { icon: "grin-stars",   color: "violet" },
    rocket:  { icon: "rocket",       color: "cyan" },
    eyes:    { icon: "eye",          color: "gray" },
  };

  // Fallback to a question icon if content is unrecognized
  const { icon, color } =
    reactionMapping[input.content] ?? { icon: "question-circle", color: "darkGray" };

  // Format creation date for display
  const formattedDate = (() => {
    try {
      // Display in local date-time format
      return new Date(input.created_at).toLocaleString();
    } catch {
      return input.created_at; // Fallback to raw string
    }
  })();

  // Build the card header, showing avatar, user name, and reaction icon
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: userName,
    startElement: avatarUrl
      ? {
          type: "Avatar",
          src: avatarUrl,
          name: userName,
          size: 40,
          variant: "gray",
        }
      : undefined,
    endElement: {
      type: "Icon",
      id: icon,
      color,
      size: 20,
    },
  };

  // Build the card footer, showing the timestamp
  const footer: IAutoView.IAutoViewCardFooterProps = {
    type: "CardFooter",
    childrenProps: {
      type: "Text",
      variant: "caption",
      color: "tertiary",
      content: formattedDate,
    },
  };

  // Wrap header and footer in a vertical card for a clean, responsive layout
  const card: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [header, footer],
  };

  return card;
}

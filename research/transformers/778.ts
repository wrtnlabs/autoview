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
type IAutoViewTransformerInputType = Schema.reaction[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // If there are no reactions, display a friendly markdown message
  if (!input || input.length === 0) {
    return {
      type: "Markdown",
      content: "### No reactions yet\nBe the first to react! 🎉"
    };
  }

  // Map each reaction to a ListItemProps
  const listItems: IAutoView.IAutoViewListItemProps[] = input.map(reaction => {
    // 1. Determine which icon and color to use for this reaction content
    //    Using FontAwesome icon names (kebab-case, without prefix)
    let iconId: string;
    let iconColor:
      | "red"
      | "orange"
      | "yellow"
      | "lime"
      | "green"
      | "teal"
      | "cyan"
      | "blue"
      | "indigo"
      | "violet"
      | "pink"
      | "gray"
      | "darkGray";
    switch (reaction.content) {
      case "+1":
        iconId = "thumbs-up";
        iconColor = "green";
        break;
      case "-1":
        iconId = "thumbs-down";
        iconColor = "red";
        break;
      case "laugh":
        iconId = "face-laugh";
        iconColor = "yellow";
        break;
      case "confused":
        iconId = "face-confused";
        iconColor = "orange";
        break;
      case "heart":
        iconId = "heart";
        iconColor = "red";
        break;
      case "hooray":
        iconId = "hands-clapping";
        iconColor = "violet";
        break;
      case "rocket":
        iconId = "rocket";
        iconColor = "teal";
        break;
      case "eyes":
        iconId = "eye";
        iconColor = "cyan";
        break;
      default:
        iconId = "smile";
        iconColor = "gray";
    }

    // 2. Build the startElement: user's avatar or a generic user icon if missing
    const startElement: IAutoView.IAutoViewAvatarProps | IAutoView.IAutoViewIconProps = reaction.user
      ? {
          type: "Avatar",
          src: reaction.user.avatar_url,
          name: reaction.user.login,
          variant: "primary",
          size: 40
        }
      : {
          type: "Icon",
          id: "user",
          color: "gray",
          size: 40
        };

    // 3. Build the endElement: the reaction icon
    const endElement: IAutoView.IAutoViewIconProps = {
      type: "Icon",
      id: iconId,
      color: iconColor,
      size: 24
    };

    // 4. Format the timestamp into a human‑readable string
    const timestamp = new Date(reaction.created_at).toLocaleString();

    // 5. Compose the list item
    return {
      type: "ListItem",
      title: reaction.user?.login ?? "Unknown User",
      description: timestamp,
      startElement,
      endElement
    };
  });

  // Wrap all items into a responsive List
  return {
    type: "List",
    childrenProps: listItems
  };
}

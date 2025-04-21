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
  // Helper: Map reaction content to a FontAwesome icon ID and color
  const mapReaction = (
    content: IAutoViewTransformerInputType["content"]
  ): { id: string; color: IAutoView.IAutoViewIconProps["color"] } => {
    switch (content) {
      case "+1":
        return { id: "thumbs-up", color: "green" };
      case "-1":
        return { id: "thumbs-down", color: "red" };
      case "laugh":
        return { id: "face-laugh", color: "yellow" };
      case "confused":
        return { id: "face-confused", color: "orange" };
      case "heart":
        return { id: "heart", color: "pink" };
      case "hooray":
        return { id: "party-hat", color: "violet" };
      case "rocket":
        return { id: "rocket", color: "cyan" };
      case "eyes":
        return { id: "eyes", color: "blue" };
      default:
        return { id: "question-circle", color: "gray" };
    }
  };

  // Build a user avatar or fallback to an icon if user data is missing
  const userAvatarOrIcon: IAutoView.IAutoViewAvatarProps | IAutoView.IAutoViewIconProps =
    input.user && input.user.avatar_url
      ? {
          type: "Avatar",
          src: input.user.avatar_url,
          name: input.user.name ?? input.user.login,
          size: 40,
        }
      : {
          type: "Icon",
          id: "user",
          color: "gray",
          size: 40,
        };

  // Build the reaction icon
  const reactionMeta = mapReaction(input.content);
  const reactionIcon: IAutoView.IAutoViewIconProps = {
    type: "Icon",
    id: reactionMeta.id,
    color: reactionMeta.color,
    size: 32,
  };

  // Card header: shows user + reaction at a glance
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: input.user?.login ?? "Unknown User",
    description: input.user?.name ?? undefined,
    startElement: userAvatarOrIcon,
    endElement: reactionIcon,
  };

  // DataList items for the rest of the reaction fields
  const dataListItems: IAutoView.IAutoViewDataListItemProps[] = [
    {
      type: "DataListItem",
      label: { type: "Text", content: "Reaction ID" },
      value: { type: "Text", content: input.id.toString() },
    },
    {
      type: "DataListItem",
      label: { type: "Text", content: "Node ID" },
      value: { type: "Text", content: input.node_id },
    },
    {
      type: "DataListItem",
      label: { type: "Text", content: "Content" },
      value: {
        type: "Chip",
        label: input.content,
        variant: "filled",
        color: reactionMeta.color as any, // align chip color with icon color
        size: "small",
      },
    },
    {
      type: "DataListItem",
      label: { type: "Text", content: "Created At" },
      value: {
        type: "Text",
        content: new Date(input.created_at).toLocaleString(),
      },
    },
  ];

  // Wrap the DataList in a CardContent for layout consistency
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: {
      type: "DataList",
      childrenProps: dataListItems,
    },
  };

  // Assemble the vertical card
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [cardHeader, cardContent],
  };

  return verticalCard;
}

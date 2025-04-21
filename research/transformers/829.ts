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
  // If no reactions, show a friendly markdown message
  if (!input || input.length === 0) {
    return {
      type: "Markdown",
      content: "*No reactions found.*",
    };
  }

  // Map each GitHub reaction content to a FontAwesome icon id and a color
  const reactionMeta: Record<string, { iconId: string; color: IAutoView.IAutoViewIconProps["color"] }> = {
    "+1":     { iconId: "thumbs-up",   color: "green"   },
    "-1":     { iconId: "thumbs-down", color: "red"     },
    laugh:    { iconId: "laugh",       color: "orange"  },
    confused: { iconId: "meh",         color: "gray"    },
    heart:    { iconId: "heart",       color: "red"     },
    hooray:   { iconId: "hands-clapping", color: "yellow" }, // using "hands-clapping" as a celebratory icon
    rocket:   { iconId: "rocket",      color: "indigo"  },
    eyes:     { iconId: "eye",         color: "teal"    },
  };

  // Transform each reaction into a DataListItem for listing
  const items: IAutoView.IAutoViewDataListItemProps[] = input.map((reaction) => {
    const login    = reaction.user?.login ?? "unknown";
    const avatar   = reaction.user?.avatar_url;
    const created  = new Date(reaction.created_at).toLocaleString();
    // pick icon & color, fallback to gray icon if unknown reaction
    const meta     = reactionMeta[reaction.content] ?? { iconId: reaction.content, color: "gray" };

    return {
      type: "DataListItem",
      // Label shows user avatar + username
      label: [
        {
          type: "Avatar",
          src: avatar,
          name: login,
          size: 32,
          variant: "primary",
        },
        {
          type: "Text",
          variant: "body1",
          content: login,
        },
      ],
      // Value shows reaction icon + timestamp
      value: [
        {
          type: "Icon",
          id: meta.iconId,
          color: meta.color,
          size: 20,
        },
        {
          type: "Text",
          variant: "caption",
          content: created,
        },
      ],
    };
  });

  // Wrap the list of reactions in a DataList component
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: items,
  };

  // Card header summarizing the total count
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: "Reactions",
    description: `Total reactions: ${input.length}`,
    startElement: {
      type: "Icon",
      id: "thumbs-up",
      color: "blue",
      size: 24,
    },
  };

  // Card content containing our DataList
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: [dataList],
  };

  // Use a vertical card for a responsive, mobile‑friendly layout
  return {
    type: "VerticalCard",
    childrenProps: [header, content],
  };
}

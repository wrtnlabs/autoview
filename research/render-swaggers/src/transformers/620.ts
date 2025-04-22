import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Activity
     *
     * @title Activity
    */
    export type activity = {
        id: number & tags.Type<"int32">;
        node_id: string;
        /**
         * The SHA of the commit before the activity.
        */
        before: string;
        /**
         * The SHA of the commit after the activity.
        */
        after: string;
        /**
         * The full Git reference, formatted as `refs/heads/<branch name>`.
        */
        ref: string;
        /**
         * The time when the activity occurred.
        */
        timestamp: string;
        /**
         * The type of the activity that was performed.
        */
        activity_type: "push" | "force_push" | "branch_deletion" | "branch_creation" | "pr_merge" | "merge_queue_merge";
        actor: Schema.nullable_simple_user;
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
type IAutoViewTransformerInputType = Schema.activity[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // If there's no activity, show a friendly markdown message
  if (!input || input.length === 0) {
    return {
      type: "Markdown",
      content: "### No activities to display.",
    } as IAutoView.IAutoViewMarkdownProps;
  }

  // Map each activity_type to a FontAwesome icon id and a color
  const iconMap: Record<
    Schema.activity["activity_type"],
    { id: string; color: IAutoView.IAutoViewIconProps["color"] }
  > = {
    push: { id: "arrow-up", color: "blue" },
    force_push: { id: "bolt", color: "orange" },
    branch_deletion: { id: "trash", color: "red" },
    branch_creation: { id: "code-branch", color: "green" },
    pr_merge: { id: "git-merge", color: "teal" },
    merge_queue_merge: { id: "tasks", color: "violet" },
  };

  // Transform each activity into a ListItem
  const listItems: IAutoView.IAutoViewListItemProps[] = input.map((act) => {
    const actor = act.actor;
    const login = actor?.login ?? "Unknown";
    const avatarUrl = actor?.avatar_url ?? "";

    // Format timestamp for display; fallback to raw string if parsing fails
    let timeLabel = act.timestamp;
    try {
      timeLabel = new Date(act.timestamp).toLocaleString();
    } catch { /* keep raw */ }

    const iconInfo = iconMap[act.activity_type] ?? {
      id: "question",
      color: "gray",
    };

    return {
      type: "ListItem",
      title: login,
      description: `${act.activity_type.replace(/_/g, " ")} at ${timeLabel}`,
      startElement: {
        type: "Avatar",
        src: avatarUrl,
        name: login,
      },
      endElement: {
        type: "Icon",
        id: iconInfo.id,
        color: iconInfo.color,
        size: 24,
      },
    };
  });

  // Return a responsive list of activities
  return {
    type: "List",
    childrenProps: listItems,
  } as IAutoView.IAutoViewListProps;
}

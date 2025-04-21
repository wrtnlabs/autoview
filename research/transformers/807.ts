import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * A collection of related issues and pull requests.
     *
     * @title Milestone
    */
    export type milestone = {
        url: string & tags.Format<"uri">;
        html_url: string & tags.Format<"uri">;
        labels_url: string & tags.Format<"uri">;
        id: number & tags.Type<"int32">;
        node_id: string;
        /**
         * The number of the milestone.
        */
        number: number & tags.Type<"int32">;
        /**
         * The state of the milestone.
        */
        state: "open" | "closed";
        /**
         * The title of the milestone.
        */
        title: string;
        description: string | null;
        creator: Schema.nullable_simple_user;
        open_issues: number & tags.Type<"int32">;
        closed_issues: number & tags.Type<"int32">;
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
        closed_at: (string & tags.Format<"date-time">) | null;
        due_on: (string & tags.Format<"date-time">) | null;
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
type IAutoViewTransformerInputType = Schema.milestone[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Transform each milestone into a ListItem with avatar/icon, title, description, and issue count chips.
  const listItems: IAutoView.IAutoViewListItemProps[] = input.map((milestone) => {
    // Determine the startElement: use the creator's avatar if available, otherwise a fallback icon.
    const startElement: IAutoView.IAutoViewAvatarProps | IAutoView.IAutoViewIconProps =
      milestone.creator !== null
        ? {
            type: "Avatar",
            src: milestone.creator.avatar_url,
            name: milestone.creator.login,
            // Use a color variant to hint at state (open = info, closed = gray).
            variant: milestone.state === "open" ? "info" : "gray",
            size: 32,
          }
        : {
            type: "Icon",
            id: "user", // generic user icon
            color: "gray",
            size: 32,
          };

    // Create chips to show the number of open and closed issues.
    const openIssuesChip: IAutoView.IAutoViewChipProps = {
      type: "Chip",
      label: `${milestone.open_issues} open`,
      color: "warning",
      variant: "outlined",
      size: "small",
    };
    const closedIssuesChip: IAutoView.IAutoViewChipProps = {
      type: "Chip",
      label: `${milestone.closed_issues} closed`,
      color: "success",
      variant: "outlined",
      size: "small",
    };

    // Assemble a brief description: state and optional due date.
    const parts: string[] = [`State: ${milestone.state}`];
    if (milestone.due_on) {
      // Format due date in a locale-friendly way.
      const dueDate = new Date(milestone.due_on).toLocaleDateString();
      parts.push(`Due on ${dueDate}`);
    }
    const description = parts.join(" • ");

    return {
      type: "ListItem",
      title: `#${milestone.number} ${milestone.title}`,
      description,
      href: milestone.html_url,          // Link directly to the milestone page
      startElement,                      // Avatar or fallback icon
      endElement: [openIssuesChip, closedIssuesChip], // Issue count chips
    };
  });

  // Return a responsive list component containing all milestone items.
  return {
    type: "List",
    childrenProps: listItems,
  };
}

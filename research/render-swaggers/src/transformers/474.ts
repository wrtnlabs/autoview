import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * The type of issue.
     *
     * @title Issue Type
    */
    export type issue_type = {
        /**
         * The unique identifier of the issue type.
        */
        id: number & tags.Type<"int32">;
        /**
         * The node identifier of the issue type.
        */
        node_id: string;
        /**
         * The name of the issue type.
        */
        name: string;
        /**
         * The description of the issue type.
        */
        description: string | null;
        /**
         * The color of the issue type.
        */
        color?: "gray" | "blue" | "green" | "yellow" | "orange" | "red" | "pink" | "purple" | null;
        /**
         * The time the issue type created.
        */
        created_at?: string & tags.Format<"date-time">;
        /**
         * The time the issue type last updated.
        */
        updated_at?: string & tags.Format<"date-time">;
        /**
         * The enabled state of the issue type.
        */
        is_enabled?: boolean;
    } | null;
}
type IAutoViewTransformerInputType = Schema.issue_type[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Helper to map schema colors (including 'purple') to Avatar/Chip variants
  const colorVariantMap: Record<string, IAutoView.IAutoViewAvatarProps["variant"]> = {
    gray: "gray",
    blue: "blue",
    green: "green",
    yellow: "yellow",
    orange: "orange",
    red: "red",
    pink: "pink",
    purple: "violet", // Avatar uses 'violet' not 'purple'
    null: "gray",
    undefined: "gray",
  };

  // Normalize and extract valid issue types (filter out null entries)
  const issues = (input || []).filter((item): item is Exclude<typeof item, null> => item !== null);

  // If there is no data to visualize, show a markdown message
  if (issues.length === 0) {
    return {
      type: "Markdown",
      content: "### No issue types available\nThere are no issue types to display at this time.",
    } as IAutoView.IAutoViewMarkdownProps;
  }

  // Transform each issue type into a ListItemProps
  const listItems: IAutoView.IAutoViewListItemProps[] = issues.map((issue) => {
    // Compute display color variant
    const variant = colorVariantMap[String(issue.color)] || "gray";
    // Build an avatar showing the first letter of the name, colored by the issue type color
    const avatar: IAutoView.IAutoViewAvatarProps = {
      type: "Avatar",
      name: issue.name.charAt(0).toUpperCase(),
      variant,
      size: 32,
    };
    // Build a chip displaying the numeric ID
    const idChip: IAutoView.IAutoViewChipProps = {
      type: "Chip",
      label: String(issue.id),
      variant: "outlined",
      size: "small",
      // Use the same color mapping for consistency
      color: variant,
    };
    return {
      type: "ListItem",
      title: issue.name,
      description: issue.description ?? "", // fallback to empty if null
      startElement: avatar,
      endElement: idChip,
    };
  });

  // Return a responsive list of issue types; ListItems are touch-friendly on mobile
  return {
    type: "List",
    childrenProps: listItems,
  } as IAutoView.IAutoViewListProps;
}

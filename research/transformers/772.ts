import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Interaction limit settings.
     *
     * @title Interaction Limits
    */
    export type interaction_limit_response = {
        limit: Schema.interaction_group;
        origin: string;
        expires_at: string & tags.Format<"date-time">;
    };
    /**
     * The type of GitHub user that can comment, open issues, or create pull requests while the interaction limit is in effect.
    */
    export type interaction_group = "existing_users" | "contributors_only" | "collaborators_only";
}
type IAutoViewTransformerInputType = Schema.interaction_limit_response;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Map each interaction group to a human-readable label and a visual color for the chip.
  const limitMap: Record<
    Schema.interaction_group,
    { label: string; color: IAutoView.IAutoViewChipProps["color"] }
  > = {
    existing_users: { label: "Existing Users", color: "info" },
    contributors_only: { label: "Contributors Only", color: "success" },
    collaborators_only: { label: "Collaborators Only", color: "secondary" },
  };

  const { label: limitLabel, color: limitColor } = limitMap[input.limit];

  // A Chip component to highlight which group is limited
  const limitChip: IAutoView.IAutoViewChipProps = {
    type: "Chip",
    label: limitLabel,
    color: limitColor,
    size: "small",
    variant: "filled",
  };

  // An icon to represent the user interaction context
  const headerIcon: IAutoView.IAutoViewIconProps = {
    type: "Icon",
    id: "users",   // FontAwesome 'users' icon
    color: "blue",
    size: 24,
  };

  // The card header shows the origin and group as a chip
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: "Interaction Limits",
    description: input.origin,
    startElement: headerIcon,
    endElement: limitChip,
  };

  // Safely format the expiration date to a localized string
  let expiresText: string;
  try {
    const dt = new Date(input.expires_at);
    if (isNaN(dt.getTime())) throw new Error("Invalid date");
    // .toLocaleString() will adapt to the user's locale, helpful on mobile
    expiresText = dt.toLocaleString();
  } catch {
    // Fallback to raw string if parsing fails
    expiresText = input.expires_at;
  }

  // A single data-list item for the expiration timestamp
  const expirationItem: IAutoView.IAutoViewDataListItemProps = {
    type: "DataListItem",
    label: {
      type: "Text",
      content: "Expires At",
      variant: "body2",
    },
    value: {
      type: "Text",
      content: expiresText,
      variant: "body2",
    },
  };

  // Wrap the expiration into a DataList for consistent styling
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: [expirationItem],
  };

  // Card content holds the DataList
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: dataList,
  };

  // Assemble a vertical card with header and body
  const card: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [cardHeader, cardContent],
  };

  return card;
}

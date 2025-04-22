import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace desk {
        export type GroupsInfiniteScrollingView = {
            next?: string;
            groups?: Schema.Group[];
        };
    }
    export type Group = {
        id?: string;
        channelId?: string;
        title: string & tags.Pattern<"[\\p{L}\\p{N}-_()]+">;
        scope: "all" | "public" | "private";
        managerIds?: string[] & tags.MinItems<1> & tags.MaxItems<2147483647> & tags.UniqueItems;
        icon?: string & tags.Pattern<"\\S+">;
        liveMeetId?: string;
        description?: string;
        createdAt?: number;
        updatedAt?: number;
        /**
         * @deprecated
        */
        name?: string;
        active?: boolean;
    };
}
type IAutoViewTransformerInputType = Schema.desk.GroupsInfiniteScrollingView;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Destructure input for ease of use
  const { groups, next } = input;

  // If no groups are present, show an informative markdown message
  if (!groups || groups.length === 0) {
    return {
      type: "Markdown",
      content: "## No groups available\nThere are no groups to display at this time.",
    };
  }

  // Transform each group into a DataListItemProps for a rich list view
  const items: IAutoView.IAutoViewDataListItemProps[] = groups.map((group) => {
    // Build the label: optional icon (if provided) followed by the title text
    const labelComponents: IAutoView.IAutoViewPresentationComponentProps[] = [];

    if (group.icon) {
      // Use FontAwesome icon if the group.icon matches a valid id
      labelComponents.push({
        type: "Icon",
        id: group.icon,
        size: 24,
        color: "blue",
      });
    }

    // Title text component
    labelComponents.push({
      type: "Text",
      content: group.title,
      variant: "h5",
      color: "primary",
    });

    // Build the value column: description (markdown), scope chip, manager badge
    const valueComponents: IAutoView.IAutoViewPresentationComponentProps[] = [];

    if (group.description) {
      // Render description with markdown for richer formatting
      valueComponents.push({
        type: "Markdown",
        content: group.description,
      });
    }

    // Scope indicator as a chip; color-coded for quick visual distinction
    const scopeColor =
      group.scope === "private"
        ? "error"
        : group.scope === "public"
        ? "success"
        : "info";
    valueComponents.push({
      type: "Chip",
      label: group.scope,
      variant: "filled",
      color: scopeColor,
      size: "small",
    });

    // Badge showing number of managers (if any)
    const managerCount = group.managerIds?.length ?? 0;
    valueComponents.push({
      type: "Badge",
      count: managerCount,
      maxCount: 99,
      showZero: false,
      childrenProps: {
        type: "Icon",
        id: "users",    // FontAwesome "users" icon for managers
        color: "gray",
        size: 16,
      },
    });

    return {
      type: "DataListItem",
      label: labelComponents,
      value: valueComponents,
    };
  });

  // Assemble the data list
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: items,
  };

  // If there's a `next` token/url, append a "Load more" button wrapped in a card
  if (next) {
    const loadMoreButton: IAutoView.IAutoViewButtonProps = {
      type: "Button",
      label: "Load more",
      variant: "text",
      color: "primary",
      size: "medium",
      href: next,
    };

    // CardContent to hold the list
    const cardContent: IAutoView.IAutoViewCardContentProps = {
      type: "CardContent",
      childrenProps: [dataList],
    };

    // CardFooter to hold the pagination control
    const cardFooter: IAutoView.IAutoViewCardFooterProps = {
      type: "CardFooter",
      childrenProps: loadMoreButton,
    };

    // Wrap everything in a vertical card for a cohesive mobile-friendly layout
    return {
      type: "VerticalCard",
      childrenProps: [cardContent, cardFooter],
    };
  }

  // No pagination needed, return just the data list
  return dataList;
}

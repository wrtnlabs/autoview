import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace desk {
    export type GroupsInfiniteScrollingView = {
        next?: string;
        groups?: Group[];
    };
}
type Group = {
    id?: string & tags.JsonSchemaPlugin<{
        readOnly: true
    }>;
    channelId?: string & tags.JsonSchemaPlugin<{
        readOnly: true
    }>;
    title: string & tags.Pattern<"[\\p{L}\\p{N}-_()]+">;
    scope: "all" | "public" | "private";
    managerIds?: string[] & tags.MinItems<1> & tags.MaxItems<2147483647> & tags.UniqueItems & tags.JsonSchemaPlugin<{
        readOnly: true
    }>;
    icon?: string & tags.Pattern<"\\S+">;
    liveMeetId?: string & tags.JsonSchemaPlugin<{
        readOnly: true
    }>;
    description?: string;
    createdAt?: number & tags.JsonSchemaPlugin<{
        format: "int64",
        readOnly: true
    }>;
    updatedAt?: number & tags.JsonSchemaPlugin<{
        format: "int64",
        readOnly: true
    }>;
    /**
     * @deprecated
    */
    name?: string;
    active?: boolean;
};
type IAutoViewTransformerInputType = desk.GroupsInfiniteScrollingView;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // If no groups are provided, return a Markdown component with a friendly message.
  if (!input.groups || input.groups.length === 0) {
    return {
      type: "Markdown",
      content: "## No Groups Available\n\nThere are currently no groups to display. Please check back later."
    } as IAutoView.IAutoViewMarkdownProps;
  }

  // Map each group into a DataListItem component.
  const items: IAutoView.IAutoViewDataListItemProps[] = input.groups.map((group) => {
    // Build an array of visual components for the label.
    // We use an icon (if defined) alongside a text label displaying the group's title.
    const labelComponents: IAutoView.IAutoViewPresentationComponentProps[] = [];

    // If a group icon is defined, use it as an icon component.
    // The icon is visual and reinforces the identity of each group.
    if (group.icon) {
      labelComponents.push({
        type: "Icon",
        id: group.icon, // Assumes group.icon is a valid kebab-case icon name.
        size: 16,
        color: "blue"
      } as IAutoView.IAutoViewIconProps);
    }

    // Always include the group's title as a Text component.
    labelComponents.push({
      type: "Text",
      content: group.title,
      variant: "h4",
      color: "primary"
    } as IAutoView.IAutoViewTextProps);

    // Prepare a Markdown string to visually present additional group details.
    let markdownContent = "";

    // If a description exists, show it at the top.
    if (group.description) {
      markdownContent += group.description;
      markdownContent += "\n\n---\n\n";
    }
    // Add key properties in a formatted markdown style.
    markdownContent += `**Scope:** ${group.scope}`;
    if (typeof group.active === "boolean") {
      markdownContent += `\n\n**Active:** ${group.active ? "Yes" : "No"}`;
    }
    if (group.createdAt) {
      // Convert the timestamp into a locale date string for readability.
      const createdDate = new Date(group.createdAt).toLocaleDateString();
      markdownContent += `\n\n**Created At:** ${createdDate}`;
    }
    if (group.updatedAt) {
      const updatedDate = new Date(group.updatedAt).toLocaleDateString();
      markdownContent += `\n\n**Updated At:** ${updatedDate}`;
    }

    // Return a DataListItem for the current group.
    return {
      type: "DataListItem",
      // The label field takes an array of presentation components.
      label: labelComponents,
      // The value field is a Markdown component that displays more detailed information.
      value: {
        type: "Markdown",
        content: markdownContent
      } as IAutoView.IAutoViewMarkdownProps
    } as IAutoView.IAutoViewDataListItemProps;
  });

  // Wrap all group items in a DataList component to support responsive and interactive lists.
  return {
    type: "DataList",
    childrenProps: items
  } as IAutoView.IAutoViewDataListProps;
}

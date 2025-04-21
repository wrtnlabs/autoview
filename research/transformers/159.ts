import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace IShoppingChannelCategory {
        /**
         * Hierarchical category information with children categories.
        */
        export type IHierarchical = {
            /**
             * List of children categories with hierarchical structure.
             *
             * @title List of children categories with hierarchical structure
            */
            children: Schema.IShoppingChannelCategory.IHierarchical[];
            /**
             * Primary Key.
             *
             * @title Primary Key
            */
            id: string;
            /**
             * Identifier code of the category.
             *
             * The code must be unique in the channel.
             *
             * @title Identifier code of the category
            */
            code: string;
            /**
             * Parent category's ID.
             *
             * @title Parent category's ID
            */
            parent_id: null | (string & tags.Format<"uuid">);
            /**
             * Representative name of the category.
             *
             * The name must be unique within the parent category. If no parent exists,
             * then the name must be unique within the channel between no parent
             * categories.
             *
             * @title Representative name of the category
            */
            name: string;
            /**
             * Creation time of record.
             *
             * @title Creation time of record
            */
            created_at: string;
        };
    }
}
type IAutoViewTransformerInputType = Schema.IShoppingChannelCategory.IHierarchical[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Recursive helper to build a DataList for a given set of nodes
  function buildDataList(nodes: Schema.IShoppingChannelCategory.IHierarchical[]): IAutoView.IAutoViewDataListProps {
    return {
      type: "DataList",
      // Each category becomes a DataListItem, possibly with a nested DataList in its value
      childrenProps: nodes.map((node) => buildDataListItem(node)),
    };
  }

  // Recursive helper to build a DataListItem for a single node
  function buildDataListItem(
    node: Schema.IShoppingChannelCategory.IHierarchical
  ): IAutoView.IAutoViewDataListItemProps {
    // Choose folder icon depending on whether the node has children
    const hasChildren = node.children && node.children.length > 0;
    const iconId = hasChildren ? "folder-open" : "folder";

    // Icon component for visual affordance
    const iconProps: IAutoView.IAutoViewIconProps = {
      type: "Icon",
      id: iconId,
      size: 20,
      color: "blue",
    };

    // Text component to display the category name
    const textProps: IAutoView.IAutoViewTextProps = {
      type: "Text",
      content: node.name,
      variant: "body1",
      color: "primary",
    };

    // DataListItem that wraps the icon + text; if there are children, nest another DataList
    const item: IAutoView.IAutoViewDataListItemProps = {
      type: "DataListItem",
      label: [iconProps, textProps],
    };

    if (hasChildren) {
      // Attach nested DataList under 'value'
      item.value = buildDataList(node.children);
    }

    return item;
  }

  // If no categories are provided, show a friendly markdown message
  if (!input || input.length === 0) {
    return {
      type: "Markdown",
      content: "**No categories available**",
    };
  }

  // Build and return the hierarchical DataList
  return buildDataList(input);
}

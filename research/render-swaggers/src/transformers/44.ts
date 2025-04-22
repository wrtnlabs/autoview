import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace IShoppingChannel {
        /**
         * Hierarchical channel information with children categories.
        */
        export type IHierarchical = {
            /**
             * Children categories with hierarchical structure.
             *
             * @title Children categories with hierarchical structure
            */
            categories: Schema.IShoppingChannelCategory.IHierarchical[];
            /**
             * Primary Key.
             *
             * @title Primary Key
            */
            id: string;
            /**
             * Creation time of record.
             *
             * @title Creation time of record
            */
            created_at: string;
            /**
             * Identifier code.
             *
             * @title Identifier code
            */
            code: string;
            /**
             * Name of the channel.
             *
             * @title Name of the channel
            */
            name: string;
        };
    }
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
type IAutoViewTransformerInputType = Schema.IShoppingChannel.IHierarchical;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  /**
   * Recursively renders a category node as a DataListItem.
   * Uses an icon to distinguish branches (folders) vs leaves (files),
   * and nests child categories inside the `value` field as another DataList.
   */
  function renderCategoryNode(
    node: Schema.IShoppingChannelCategory.IHierarchical
  ): IAutoView.IAutoViewDataListItemProps {
    // Build the label: icon + name + code
    const labelComponents: IAutoView.IAutoViewPresentationComponentProps[] = [
      {
        type: "Icon",
        id: node.children && node.children.length > 0 ? "folder" : "file",
        color: "gray",
        size: 16,
      },
      {
        type: "Text",
        content: node.name,
        variant: "body1",
        color: "primary",
      },
      {
        type: "Text",
        content: `(${node.code})`,
        variant: "caption",
        color: "secondary",
      },
    ];

    const item: IAutoView.IAutoViewDataListItemProps = {
      type: "DataListItem",
      label: labelComponents,
    };

    // If there are children, nest them in a sub-DataList
    if (node.children && node.children.length > 0) {
      item.value = {
        type: "DataList",
        childrenProps: node.children.map(renderCategoryNode),
      };
    }

    return item;
  }

  // If no top-level categories, show a friendly markdown message
  if (!input.categories || input.categories.length === 0) {
    return {
      type: "Markdown",
      content: "**No categories available**",
    };
  }

  // Render the full category tree as a nested DataList
  return {
    type: "DataList",
    childrenProps: input.categories.map(renderCategoryNode),
  };
}

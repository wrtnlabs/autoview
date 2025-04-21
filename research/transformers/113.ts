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
  // If there are no categories to display, show a friendly markdown message.
  if (!input.categories || input.categories.length === 0) {
    return {
      type: "Markdown",
      content: "### No categories available"
    };
  }

  /**
   * Recursively builds a DataList component from a list of hierarchical categories.
   * Each category becomes a DataListItem; nested children produce a nested DataList in the value slot.
   */
  function buildList(
    categories: Schema.IShoppingChannelCategory.IHierarchical[]
  ): IAutoView.IAutoViewDataListProps {
    return {
      type: "DataList",
      childrenProps: categories.map(buildItem)
    };
  }

  /**
   * Builds a single DataListItem for one category.
   * - Uses an icon for quick visual recognition.
   * - Shows the category code in a chip (lightweight, high-visibility badge).
   * - Shows the category name as body text.
   * - If this category has children, nest another DataList in the value slot.
   */
  function buildItem(
    cat: Schema.IShoppingChannelCategory.IHierarchical
  ): IAutoView.IAutoViewDataListItemProps {
    // Label composed of Icon, Chip, and Text
    const labelComponents: IAutoView.IAutoViewPresentationComponentProps[] = [
      {
        type: "Icon",
        id: "folder",
        color: "teal",
        size: 16
      },
      {
        type: "Chip",
        label: cat.code,
        variant: "outlined",
        color: "blue",
        size: "small"
      },
      {
        type: "Text",
        content: cat.name,
        variant: "body1"
      }
    ];

    const item: IAutoView.IAutoViewDataListItemProps = {
      type: "DataListItem",
      label: labelComponents
    };

    // If this category has children, render them as a nested DataList under 'value'
    if (cat.children && cat.children.length > 0) {
      item.value = buildList(cat.children);
    }

    return item;
  }

  // Build and return the top‑level DataList for all root categories.
  return buildList(input.categories);
}

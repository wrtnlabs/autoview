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
  // If there's no data, show a user-friendly markdown message
  if (input.length === 0) {
    return {
      type: "Markdown",
      content: "_No categories available to display._",
    };
  }

  /**
   * Recursively builds a DataList from hierarchical category data.
   * Each item shows:
   * - A Text component for the category name
   * - A Chip component for the category code
   * - A nested DataList of children, or Markdown of creation time if leaf
   */
  function renderList(
    items: Schema.IShoppingChannelCategory.IHierarchical[]
  ): IAutoView.IAutoViewDataListProps {
    return {
      type: "DataList",
      childrenProps: items.map((item) => {
        // Text for category name
        const nameText: IAutoView.IAutoViewTextProps = {
          type: "Text",
          content: [item.name],
          variant: "subtitle1",
          color: "primary",
        };

        // Chip for category code
        const codeChip: IAutoView.IAutoViewChipProps = {
          type: "Chip",
          label: item.code,
          variant: "outlined",
          size: "small",
          color: "secondary",
        };

        // Decide what to render as the "value":
        // - nested list if children exist
        // - markdown timestamp otherwise
        const valueComponent: IAutoView.IAutoViewComponentProps = Array.isArray(
          item.children
        ) && item.children.length > 0
          ? renderList(item.children)
          : {
              type: "Markdown",
              // italicize the timestamp for a subtle look
              content: `*Created at:* ${item.created_at}`,
            };

        return {
          type: "DataListItem",
          // Put the name and code side-by-side
          label: [nameText, codeChip],
          value: valueComponent,
        };
      }),
    };
  }

  // Build and return the top-level list
  return renderList(input);
}

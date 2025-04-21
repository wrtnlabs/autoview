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
   * Recursively build DataListItemProps for a list of categories.
   * Each item shows the category name and, if present, its children in a nested list.
   */
  function buildCategoryItems(
    categories: Schema.IShoppingChannelCategory.IHierarchical[],
  ): IAutoView.IAutoViewDataListItemProps[] {
    return categories.map((cat) => {
      // Base component for the category name
      const labelText: IAutoView.IAutoViewTextProps = {
        type: "Text",
        variant: "body1",
        content: cat.name,
      };

      // If this category has children, render a nested DataList; otherwise show a folder icon
      let valueComponent:
        | IAutoView.IAutoViewDataListProps
        | IAutoView.IAutoViewIconProps = {
        type: "Icon",
        id: "folder",
        color: "gray",
        size: 16,
      };

      if (cat.children && cat.children.length > 0) {
        valueComponent = {
          type: "DataList",
          childrenProps: buildCategoryItems(cat.children),
        };
      }

      return {
        type: "DataListItem",
        // The label can be an array of presentation components; here just one Text
        label: [labelText],
        // For leaf nodes, show an icon; for others, nested list
        value: valueComponent,
      };
    });
  }

  // Build the channel header: avatar + title + code chip
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: input.name,
    description: `Created at ${new Date(input.created_at).toLocaleDateString()}`,
    startElement: {
      type: "Avatar",
      name: input.name[0].toUpperCase(),
      variant: "cyan",
      size: 32,
    },
    endElement: {
      type: "Chip",
      label: input.code,
      size: "small",
      variant: "outlined",
    },
  };

  // Build the content: either a DataList of categories or a markdown message
  const contentChildren: IAutoView.IAutoViewComponentProps =
    input.categories && input.categories.length > 0
      ? {
          type: "DataList",
          childrenProps: buildCategoryItems(input.categories),
        }
      : {
          type: "Markdown",
          content: "_No categories available._",
        };

  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: contentChildren,
  };

  // Compose a vertical card containing the header and the content
  return {
    type: "VerticalCard",
    childrenProps: [header, content],
  };
}

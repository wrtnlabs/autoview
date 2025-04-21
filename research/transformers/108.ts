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



// Transforms hierarchical category data into a nested DataList view.
// Each category is represented with a folder icon, its name, and a code chip.
// Sub-categories are rendered as nested DataLists; leaf nodes display their creation date.
function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // If there are no categories, display a friendly markdown message.
  if (!input || input.length === 0) {
    return {
      type: "Markdown",
      content: "## No categories available\nNo hierarchical categories to display at the moment."
    };
  }

  // Recursively build a DataListItem for each category node.
  function buildItem(
    category: Schema.IShoppingChannelCategory.IHierarchical
  ): IAutoView.IAutoViewDataListItemProps {
    const children = category.children || [];

    // Label combines an icon, the category name, and a code chip.
    const labelComponents: IAutoView.IAutoViewPresentationComponentProps[] = [
      {
        type: "Icon",
        id: "folder",      // FontAwesome folder icon
        size: 16,
        color: "blue"
      },
      {
        type: "Text",
        content: category.name,
        variant: "body1",
        color: "secondary"
      },
      {
        type: "Chip",
        label: category.code,
        size: "small",
        variant: "outlined"
      }
    ];

    // For non-leaf nodes, nest another DataList; otherwise show the creation date.
    let valueProp:
      | IAutoView.IAutoViewPresentationComponentProps[]
      | IAutoView.IAutoViewDataListProps;

    if (children.length > 0) {
      const nestedItems = children.map(child => buildItem(child));
      valueProp = {
        type: "DataList",
        childrenProps: nestedItems
      };
    } else {
      // Format the creation timestamp into a readable date.
      const createdDate = new Date(category.created_at).toLocaleDateString();
      valueProp = [
        {
          type: "Text",
          content: `Created at: ${createdDate}`,
          variant: "caption",
          color: "gray"
        }
      ];
    }

    return {
      type: "DataListItem",
      label: labelComponents,
      value: valueProp
    };
  }

  // Build the top‐level DataList with all root categories.
  const rootItems = input.map(category => buildItem(category));
  return {
    type: "DataList",
    childrenProps: rootItems
  };
}

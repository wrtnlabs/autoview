import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Category of channel.
     *
     * `IShoppingChannelCategory` is a concept that refers to classification
     * categories within a specific {@link IShoppingChannel channel}, and is exactly
     * the same as the concept commonly referred to as "category" in shopping malls.
     *
     * And `IShoppingChannelCategory` is different with {@link IShoppingSection}.
     * {@link IShoppingSection} refers to a "corner" that is independent spatial
     * information in the offline market, which cannot simultaneously classified in
     * a {@link IShoppingSale sale}. Besides, `IShoppingChannelCategory` can be
     * classified into multiple categories in a sale simultaneously.
     *
     * Product	| Section (corner) | Categories
     * ---------|------------------|-----------------------------------
     * Beef	    | Butcher corner   | Frozen food, Meat, Favorite food
     * Grape    | Fruit corner     | Fresh food, Favorite food
     *
     * In addition, as `IShoppingChannelCategory` has 1:N self recursive relationship,
     * it is possible to express below hierarchical structures. Thus, each channel
     * can set their own category classification as they want.
     *
     * - Food > Meat > Frozen
     * - Electronics > Notebook > 15 inches
     * - Miscellaneous > Wallet
     *
     * Furthermore, `IShoppingChannelCategory` is designed to merge between themselves,
     * so there is no burden to edit the category at any time.
    */
    export type IShoppingChannelCategory = {
        /**
         * Parent category info.
         *
         * @title Parent category info
        */
        parent: null | any;
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
    export namespace IShoppingChannelCategory {
        export type IInvert = any;
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
type IAutoViewTransformerInputType = Schema.IShoppingChannelCategory;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Compose the card header with a folder icon, category name, and code
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: input.name,
    description: input.code,
    startElement: {
      type: "Icon",
      id: "folder",
      size: 24,
      color: "blue"
    }
  };

  // Use a markdown component to show the creation timestamp in bold
  const createdAtMarkdown: IAutoView.IAutoViewMarkdownProps = {
    type: "Markdown",
    content: `**Created At:** ${new Date(input.created_at).toLocaleString()}`
  };

  // Collect children props for the CardContent
  const contentChildren: IAutoView.IAutoViewPresentationComponentProps[] = [createdAtMarkdown];

  // If there is a parent category, show it as an outlined chip
  if (input.parent && typeof (input.parent as any).name === "string") {
    const parentName = (input.parent as any).name;
    const parentChip: IAutoView.IAutoViewChipProps = {
      type: "Chip",
      label: parentName,
      variant: "outlined",
      color: "gray"
    };
    contentChildren.push(parentChip);
  }

  // If there are child categories, display them in a responsive chip group
  if (Array.isArray(input.children) && input.children.length > 0) {
    const childChips: IAutoView.IAutoViewChipProps[] = input.children.map((child) => ({
      type: "Chip",
      label: child.name,
      variant: "filled",
      color: "primary"
    }));
    const chipGroup: IAutoView.IAutoViewChipGroupProps = {
      type: "ChipGroup",
      childrenProps: childChips,
      // Show up to 5 chips before collapsing
      maxItems: 5
    };
    contentChildren.push(chipGroup);
  }

  // Wrap the assembled children in a CardContent component
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: contentChildren
  };

  // Return a vertical card that is mobile-friendly and stacks header + content
  return {
    type: "VerticalCard",
    childrenProps: [header, content]
  };
}

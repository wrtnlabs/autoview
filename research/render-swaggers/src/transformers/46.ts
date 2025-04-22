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
   * Recursively generate a Markdown bullet list representing the category tree.
   * We use Markdown for nested lists, since AutoView supports it natively,
   * and it will render nicely on all devices.
   */
  function buildMarkdownTree(
    categories: Schema.IShoppingChannelCategory.IHierarchical[],
    level: number = 0
  ): string {
    let md = "";
    const indent = "  ".repeat(level);
    for (const cat of categories) {
      // Format the creation time in a human‐readable way
      const created = new Date(cat.created_at).toLocaleString();
      md += `${indent}- **${cat.name}**  \n`;
      md += `${indent}  - Code: \`${cat.code}\`  \n`;
      md += `${indent}  - Created at: ${created}  \n`;
      if (cat.children && cat.children.length > 0) {
        md += buildMarkdownTree(cat.children, level + 1);
      }
    }
    return md;
  }

  // Generate the markdown content for all top‐level categories
  const markdownContent = buildMarkdownTree(input.categories);

  // Compose a VerticalCard to present the channel as a card
  // with a header (including an icon) and markdown content.
  const card: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [
      {
        // CardHeader shows the channel's name and code with an icon
        type: "CardHeader",
        title: input.name,
        description: `Channel Code: ${input.code}`,
        startElement: {
          type: "Icon",
          id: "sitemap",   // a hierarchical/folder-like icon
          color: "teal",
          size: 24
        }
      },
      {
        // CardContent holds our markdown tree
        type: "CardContent",
        childrenProps: {
          type: "Markdown",
          content: markdownContent
        }
      }
    ]
  };

  return card;
}

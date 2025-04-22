import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace IPageIShoppingChannel {
        /**
         * A page.
         *
         * Collection of records with pagination indformation.
        */
        export type IHierarchical = {
            /**
             * Page information.
             *
             * @title Page information
            */
            pagination: Schema.IPage.IPagination;
            /**
             * List of records.
             *
             * @title List of records
            */
            data: Schema.IShoppingChannel.IHierarchical[];
        };
    }
    export namespace IPage {
        /**
         * Page information.
        */
        export type IPagination = {
            /**
             * Current page number.
             *
             * @title Current page number
            */
            current: number & tags.Type<"int32">;
            /**
             * Limitation of records per a page.
             *
             * @title Limitation of records per a page
            */
            limit: number & tags.Type<"int32">;
            /**
             * Total records in the database.
             *
             * @title Total records in the database
            */
            records: number & tags.Type<"int32">;
            /**
             * Total pages.
             *
             * Equal to {@link records} / {@link limit} with ceiling.
             *
             * @title Total pages
            */
            pages: number & tags.Type<"int32">;
        };
    }
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
type IAutoViewTransformerInputType = Schema.IPageIShoppingChannel.IHierarchical;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(
  input: IAutoViewTransformerInputType,
): IAutoView.IAutoViewComponentProps {
  // Helper: Recursively build a Markdown bullet list of hierarchical categories
  function buildCategoriesMarkdown(
    categories: Schema.IShoppingChannelCategory.IHierarchical[],
    indent: number = 0,
  ): string {
    if (!categories.length) {
      return '';
    }
    return categories
      .map((cat) => {
        // indent bullets by two spaces per level
        const prefix = '  '.repeat(indent) + '-';
        // show name and code
        const line = `${prefix} **${cat.name}** (\`${cat.code}\`)`;
        // recurse into children
        const childrenMd = buildCategoriesMarkdown(cat.children, indent + 1);
        return childrenMd ? `${line}\n${childrenMd}` : line;
      })
      .join('\n');
  }

  // If no channels, show a friendly message
  if (!Array.isArray(input.data) || input.data.length === 0) {
    return {
      type: 'Text',
      variant: 'body1',
      content: 'No shopping channels available.',
    };
  }

  // Create a VerticalCard for each shopping channel
  const channelCards: IAutoView.IAutoViewVerticalCardProps[] =
    input.data.map((channel) => {
      // render category tree as markdown
      const categoriesMd = buildCategoriesMarkdown(channel.categories);
      // if empty, show a placeholder
      const markdownContent =
        categoriesMd.trim().length > 0
          ? categoriesMd
          : '_No categories defined._';

      return {
        type: 'VerticalCard',
        childrenProps: [
          // Card Header: channel name with icon
          {
            type: 'CardHeader',
            title: channel.name,
            description: `Code: ${channel.code}`,
            startElement: {
              type: 'Icon',
              id: 'shopping-cart',
              color: 'blue',
              size: 24,
            },
          },
          // Card Content: markdown of categories
          {
            type: 'CardContent',
            childrenProps: {
              type: 'Markdown',
              content: `### Categories\n${markdownContent}`,
            },
          },
        ],
      };
    });

  // Wrap all cards in a carousel for responsive, swipeable display
  return {
    type: 'Carousel',
    autoPlay: false,
    infinite: false,
    gutter: 16,
    navControls: true,
    indicators: true,
    childrenProps: channelCards,
  };
}

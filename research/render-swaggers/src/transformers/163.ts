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



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Helper to build a markdown list of categories recursively.
  function buildCategoryList(
    categories: Schema.IShoppingChannelCategory.IHierarchical[],
    indent: number = 0
  ): string {
    let md = "";
    for (const cat of categories) {
      // Prefix each line with spaces to indicate hierarchy.
      const prefix = "  ".repeat(indent);
      md += `${prefix}- **${cat.name}** (code: \`${cat.code}\`)\n`;
      if (cat.children && cat.children.length > 0) {
        md += buildCategoryList(cat.children, indent + 1);
      }
    }
    return md;
  }

  // If there are no channels, show a friendly markdown message.
  if (!input.data || input.data.length === 0) {
    return {
      type: "Markdown",
      content: "### No shopping channels found.\nPlease check back later.",
    };
  }

  // Compose a VerticalCard per channel.
  const channelCards: IAutoView.IAutoViewVerticalCardProps[] = input.data.map(
    (channel) => {
      // Build markdown representation of the category tree.
      const categoryMd =
        channel.categories && channel.categories.length > 0
          ? buildCategoryList(channel.categories)
          : "- _No categories available_\n";

      // CardHeader: show channel name and code.
      const header: IAutoView.IAutoViewCardHeaderProps = {
        type: "CardHeader",
        title: channel.name,
        description: `Created: ${new Date(channel.created_at).toLocaleDateString()} • Code: ${channel.code}`,
        // Use a list icon to visually represent a channel.
        startElement: {
          type: "Icon",
          id: "list",
          color: "blue",
          size: 24,
        },
        // Show the top-level count of categories as a chip.
        endElement: {
          type: "Chip",
          label: String(channel.categories.length),
          color: "primary",
          variant: "filled",
          size: "small",
        },
      };

      // CardContent: display the nested categories as markdown.
      const content: IAutoView.IAutoViewCardContentProps = {
        type: "CardContent",
        childrenProps: {
          type: "Markdown",
          content: `#### Categories\n${categoryMd}`,
        },
      };

      return {
        type: "VerticalCard",
        childrenProps: [header, content],
      };
    }
  );

  // Wrap channel cards in a carousel for responsive swipe/scroll on mobile.
  return {
    type: "Carousel",
    // Display one card per view; users can swipe to see others.
    childrenProps: channelCards,
    navControls: true,
    indicators: true,
    infinite: false,
  };
}

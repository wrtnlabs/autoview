import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace IPageIShoppingChannel {
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
        pagination: IPage.IPagination;
        /**
         * List of records.
         *
         * @title List of records
        */
        data: IShoppingChannel.IHierarchical[];
    };
}
namespace IPage {
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
namespace IShoppingChannel {
    /**
     * Hierarchical channel information with children categories.
    */
    export type IHierarchical = {
        /**
         * Children categories with hierarchical structure.
         *
         * @title Children categories with hierarchical structure
        */
        categories: IShoppingChannelCategory.IHierarchical[];
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
namespace IShoppingChannelCategory {
    /**
     * Hierarchical category information with children categories.
    */
    export type IHierarchical = {
        /**
         * List of children categories with hierarchical structure.
         *
         * @title List of children categories with hierarchical structure
        */
        children: IShoppingChannelCategory.IHierarchical[];
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
type IAutoViewTransformerInputType = IPageIShoppingChannel.IHierarchical;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



/**
 * Recursively flattens hierarchical categories into a list of category names.
 * @param categories - The array of hierarchical categories.
 * @returns A string array of category names.
 */
function flattenCategories(categories: IShoppingChannelCategory.IHierarchical[]): string[] {
  const names: string[] = [];
  for (const category of categories) {
    names.push(category.name);
    if (category.children && category.children.length > 0) {
      names.push(...flattenCategories(category.children));
    }
  }
  return names;
}

function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Extract pagination information from input for later display.
  const { pagination, data: channels } = input;

  // Build the list items representing each shopping channel.
  const channelListItems: IAutoView.IAutoViewDataListItemProps[] = channels.map((channel) => {
    // Flatten all hierarchical category names for this channel.
    const categoryNames = flattenCategories(channel.categories);
    // Compose markdown content which includes the channel code, creation time, and category names if available.
    const markdownContentParts: string[] = [
      `**Code:** ${channel.code}`,
      `**Created At:** ${channel.created_at}`
    ];
    if (categoryNames.length > 0) {
      // Join category names with a comma; could also be a bullet list for better readability.
      markdownContentParts.push(`**Categories:** ${categoryNames.join(', ')}`);
    }
    const markdownContent = markdownContentParts.join('  \n');

    return {
      type: "DataListItem",
      // Use a text component for the channel name.
      label: {
        type: "Text",
        content: channel.name,
        variant: "h5",
        color: "primary"
      },
      // Use a markdown component to render additional details.
      value: {
        type: "Markdown",
        content: markdownContent
      }
    };
  });

  // Compose the DataList component that lists all channels.
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: channelListItems
  };

  // Create the CardHeader component with an icon for a visual touch.
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: "Shopping Channels",
    startElement: {
      type: "Icon",
      id: "shopping-bag", // icon id corresponding to a shopping bag icon in the fontawesome library
      color: "blue",
      size: 24
    }
  };

  // Create the CardContent component that holds our DataList.
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: dataList
  };

  // Create a CardFooter component to show pagination information.
  const cardFooter: IAutoView.IAutoViewCardFooterProps = {
    type: "CardFooter",
    childrenProps: {
      type: "Markdown",
      content: `**Page:** ${pagination.current} / ${pagination.pages}  \n**Records:** ${pagination.records}`
    }
  };

  // Compose the final Vertical Card component containing header, content, and footer.
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [cardHeader, cardContent, cardFooter]
  };

  // Return the visual transformation result.
  return verticalCard;
}

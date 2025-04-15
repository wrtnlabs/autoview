import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
/**
 * A page.
 *
 * Collection of records with pagination indformation.
*/
type IPageIShoppingChannel = {
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
    data: IShoppingChannel[];
};
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
/**
 * Channel information.
 *
 * `IShoppingChannel` is a concept that shapes the distribution channel in the
 * market. Therefore, the difference in the channel in this e-commerce system
 * means that it is another site or application.
 *
 * By the way, if your shopping mall system requires only one channel, then
 * just use only one. This concept is designed to be expandable in the future.
*/
type IShoppingChannel = {
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
type IAutoViewTransformerInputType = IPageIShoppingChannel;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Transform the input shopping channels into a list of DataListItem components.
  const dataListItems: IAutoView.IAutoViewDataListItemProps[] = input.data.map((channel) => {
    // For each channel, the label is rendered using a text component that shows the channel name.
    // The value is rendered using a markdown component that displays additional information in a formatted style.
    return {
      type: "DataListItem",
      label: {
        type: "Text",
        variant: "h6",
        // the 'content' property accepts either a string, an array, or an object.
        // Here we use a simple string for the channel name.
        content: channel.name
      },
      value: {
        type: "Markdown",
        // Using markdown formatting to visually separate the fields.
        content:
          `**Code:** ${channel.code}  \n` +
          `**ID:** ${channel.id}  \n` +
          `**Created:** ${channel.created_at}`
      }
    };
  });

  // Compose a DataList component that aggregates all DataListItems.
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: dataListItems
  };

  // Build the CardHeader with a visual icon to enhance the UI.
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: "Shopping Channels",
    description: `Displaying ${input.data.length} channel(s).`,
    // Using an icon component for visual representation.
    startElement: {
      type: "Icon",
      id: "store", // Assumes 'store' is a valid icon id from the allowed icon collection.
      color: "blue",
      size: 24
    }
  };

  // Compose the CardContent that encapsulates the DataList.
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: dataList
  };

  // Create the CardFooter to display pagination details.
  const paginationText: string =
    `Page ${input.pagination.current} of ${input.pagination.pages} | Total Records: ${input.pagination.records}`;
  const cardFooter: IAutoView.IAutoViewCardFooterProps = {
    type: "CardFooter",
    childrenProps: {
      type: "Text",
      variant: "body2",
      content: paginationText
    }
  };

  // Wrap the header, content, and footer in a VerticalCard to produce a cohesive visual UI.
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [cardHeader, cardContent, cardFooter]
  };

  return verticalCard;
}

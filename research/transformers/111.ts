import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * A page.
     *
     * Collection of records with pagination indformation.
    */
    export type IPageIShoppingChannel = {
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
        data: Schema.IShoppingChannel[];
    };
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
    export type IShoppingChannel = {
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
type IAutoViewTransformerInputType = Schema.IPageIShoppingChannel;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Map each shopping channel to a ListItem for a responsive list view
  const children: IAutoView.IAutoViewListItemProps[] = input.data.map((channel) => {
    // Attempt to parse and format the creation timestamp
    let dateLabel: string;
    const date = new Date(channel.created_at);
    if (!isNaN(date.valueOf())) {
      // Format as local date and time
      dateLabel = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    } else {
      // If parsing fails, fall back to the raw string
      dateLabel = channel.created_at;
    }

    return {
      type: "ListItem",
      // Display channel name as the primary title
      title: channel.name,
      // Show formatted creation date as a subtitle
      description: `Created: ${dateLabel}`,
      // Prepend a calendar icon for visual context
      startElement: {
        type: "Icon",
        id: "calendar-day",     // FontAwesome calendar-day icon
        color: "gray",
        size: 20
      },
      // Append a chip showing the channel code
      endElement: {
        type: "Chip",
        label: channel.code,
        variant: "outlined",
        size: "small",
        color: "blue"
      }
    };
  });

  // Wrap all items in a List component for the final UI
  return {
    type: "List",
    childrenProps: children.length > 0 ? children : []  // ensure an array even if empty
  };
}

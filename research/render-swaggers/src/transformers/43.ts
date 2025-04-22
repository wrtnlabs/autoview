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
  // Helper: safely format ISO date strings to localized date.
  const formatDate = (iso: string): string => {
    const d = new Date(iso);
    return isNaN(d.getTime()) ? iso : d.toLocaleDateString();
  };

  const { pagination, data: channels } = input;

  // Map each channel record to a DataListItemProps for visual listing.
  const items: IAutoView.IAutoViewDataListItemProps[] = channels.map((channel) => ({
    type: "DataListItem",
    // Icon at the start to represent a shopping channel
    startElement: {
      type: "Icon",
      id: "store",         // using the "store" icon
      color: "blue",
      size: 24,
    },
    // Use the channel name as primary label
    label: {
      type: "Text",
      variant: "subtitle1",
      content: channel.name,
    },
    // Display the channel code as a colored chip
    value: {
      type: "Chip",
      label: channel.code,
      variant: "outlined",
      color: "primary",
    },
    // Show creation date as a caption on the right
    endElement: {
      type: "Text",
      variant: "caption",
      content: formatDate(channel.created_at),
    },
  }));

  // Build the data list or a fallback markdown if no channels exist
  const listOrEmpty =
    items.length > 0
      ? {
          type: "DataList" as const,
          childrenProps: items,
        }
      : {
          type: "Markdown" as const,
          content: "### No shopping channels available.",
        };

  // Compose pagination chips for the footer
  const paginationChips: IAutoView.IAutoViewChipProps[] = [
    {
      type: "Chip",
      label: `Page ${pagination.current}/${pagination.pages}`,
      variant: "filled",
      color: "primary",
    },
    {
      type: "Chip",
      label: `Total records: ${pagination.records}`,
      variant: "outlined",
      color: "secondary",
    },
  ];

  // Assemble the vertical card with header, content (list or markdown), and footer
  return {
    type: "VerticalCard",
    childrenProps: [
      {
        type: "CardHeader",
        title: "Shopping Channels",
        description: `Displaying ${channels.length} channel(s)`,
        startElement: {
          type: "Icon",
          id: "store",
          color: "teal",
          size: 32,
        },
      },
      {
        type: "CardContent",
        // We can pass either a DataListProps or a MarkdownProps here
        childrenProps: listOrEmpty,
      },
      {
        type: "CardFooter",
        // Wrap pagination chips in a ChipGroup for compact display
        childrenProps: {
          type: "ChipGroup",
          childrenProps: paginationChips,
          maxItems: 2,
        },
      },
    ],
  };
}

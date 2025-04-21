import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * A page.
     *
     * Collection of records with pagination indformation.
    */
    export type IPageIShoppingDeposit = {
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
        data: Schema.IShoppingDeposit[];
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
    export type IShoppingDeposit = {
        id: string & tags.Format<"uuid">;
        created_at: string & tags.Format<"date-time">;
        code: string;
        source: string;
        direction: -1 | 1;
    };
}
type IAutoViewTransformerInputType = Schema.IPageIShoppingDeposit;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  const { pagination, data } = input;
  const { current, pages, records } = pagination;

  // Transform each deposit record into a DataListItem with an icon and text
  const items: IAutoView.IAutoViewDataListItemProps[] = data.map((rec) => {
    // Arrow icon: up for positive, down for negative
    const directionIcon: IAutoView.IAutoViewIconProps = {
      type: "Icon",
      id: rec.direction === 1 ? "arrow-up" : "arrow-down",
      color: rec.direction === 1 ? "green" : "red",
      size: 16,
    };

    // Main code label
    const codeText: IAutoView.IAutoViewTextProps = {
      type: "Text",
      content: rec.code,
      variant: "body1",
    };

    // Created date (formatted) and source as secondary info
    const dateText: IAutoView.IAutoViewTextProps = {
      type: "Text",
      content: new Date(rec.created_at).toLocaleString(),
      variant: "caption",
      color: "gray",
    };
    const sourceText: IAutoView.IAutoViewTextProps = {
      type: "Text",
      content: rec.source,
      variant: "caption",
      color: "gray",
    };

    return {
      type: "DataListItem",
      // Label shows icon + code
      label: [directionIcon, codeText],
      // Value shows date + source
      value: [dateText, sourceText],
    };
  });

  // If there are no records, render a friendly markdown message
  if (items.length === 0) {
    return {
      type: "Markdown",
      content: "### No deposit records available.",
    };
  }

  // Build the DataList component
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: items,
  };

  // Card header with a list icon
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: "Deposit Records",
    description: `Showing ${data.length} of ${records} total`,
    startElement: {
      type: "Icon",
      id: "list",
      size: 24,
      color: "blue",
    },
  };

  // Card content wraps the DataList
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: dataList,
  };

  // Card footer with pagination info in markdown for responsive text
  const footer: IAutoView.IAutoViewCardFooterProps = {
    type: "CardFooter",
    childrenProps: {
      type: "Markdown",
      content: `**Page**: ${current} / ${pages}  \n**Total Records**: ${records}`,
    },
  };

  // Compose everything into a vertical card for mobile-friendly layout
  const card: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [header, content, footer],
  };

  return card;
}

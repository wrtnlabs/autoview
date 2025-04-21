import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * A page.
     *
     * Collection of records with pagination indformation.
    */
    export type IPageIShoppingMileage = {
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
        data: Schema.IShoppingMileage[];
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
    export type IShoppingMileage = {
        id: string & tags.Format<"uuid">;
        value: null | number;
        created_at: string & tags.Format<"date-time">;
        code: string;
        source: string;
        direction: -1 | 1;
    };
}
type IAutoViewTransformerInputType = Schema.IPageIShoppingMileage;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  const { pagination, data } = input;

  // If there is no data, show a friendly message using Markdown
  if (!data || data.length === 0) {
    return {
      type: "Markdown",
      content: "**No shopping mileage records available.**"
    };
  }

  // Helper: format the ISO timestamp into a locale-aware string, falling back to raw string
  function formatDate(dateTime: string): string {
    const d = new Date(dateTime);
    return isNaN(d.getTime()) ? dateTime : d.toLocaleString();
  }

  // Build a DataListItem for each record
  const listItems: IAutoView.IAutoViewDataListItemProps[] = data.map((record) => {
    const formattedDate = formatDate(record.created_at);
    const valueText = record.value != null ? record.value.toString() : "N/A";

    // Icon showing up/down depending on direction
    const directionIcon: IAutoView.IAutoViewIconProps = {
      type: "Icon",
      id: record.direction === 1 ? "arrow-up" : "arrow-down",
      color: record.direction === 1 ? "green" : "red",
      size: 16
    };

    // Text showing the numeric value (or "N/A")
    const valueLabel: IAutoView.IAutoViewTextProps = {
      type: "Text",
      content: [valueText],
      variant: "body1"
    };

    return {
      type: "DataListItem",
      // Label area: code (highlighted) and date below it
      label: [
        {
          type: "Text",
          content: [record.code],
          variant: "subtitle1"
        },
        {
          type: "Text",
          content: [formattedDate],
          variant: "caption",
          color: "gray"
        }
      ],
      // Value area: arrow icon + the numeric value
      value: [directionIcon, valueLabel]
    };
  });

  // Compose the DataList component
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: listItems
  };

  // Card header with pagination info
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: `Page ${pagination.current} of ${pagination.pages}`,
    description: `Total records: ${pagination.records}`
  };

  // Card content wrapping the DataList
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: dataList
  };

  // Return a VerticalCard that contains the header and the data list
  return {
    type: "VerticalCard",
    childrenProps: [cardHeader, cardContent]
  };
}

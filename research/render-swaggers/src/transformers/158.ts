import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * A page.
     *
     * Collection of records with pagination indformation.
    */
    export type IPageIShoppingSaleUnitStockSupplement = {
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
        data: Schema.IShoppingSaleUnitStockSupplement[];
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
     * Supplementation of inventory quantity of stock.
     *
     * You know what? If a {@link IShoppingSaleUnitStock stock} has been sold over
     * its {@link IShoppingSaleUnitStock.ICreate.quantity initial inventory quantity},
     * the stock can't be sold anymore, because of out of stock. In that case, how the
     * {@link IShoppingSeller} should do?
     *
     * When the sotck is sold out, seller can supplement the inventory record by
     * registering this `IShoppingSaleUnitStockSupplement` record. Right, this
     * `IShoppingSaleUnitStockSupplement` is an entity that embodies the
     * supplementation of the inventory quantity of the belonged stock.
    */
    export type IShoppingSaleUnitStockSupplement = {
        /**
         * Primary Key.
         *
         * @title Primary Key
        */
        id: string;
        /**
         * Supplemented quantity.
         *
         * @title Supplemented quantity
        */
        value: number & tags.Type<"int32">;
        /**
         * Creation time of the record.
         *
         * Another words, the time when inventory of the stock being supplemented.
         *
         * @title Creation time of the record
        */
        created_at: string;
    };
}
type IAutoViewTransformerInputType = Schema.IPageIShoppingSaleUnitStockSupplement;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  const { pagination, data } = input;

  // Edge case: no records to display
  if (!data || data.length === 0) {
    return {
      type: "Markdown",
      content: "### No stock supplementation records found\n\nThere are no records to display at this time."
    };
  }

  // Map each supplement record into a DataListItemProps
  const listItems: IAutoView.IAutoViewDataListItemProps[] = data.map((record) => ({
    type: "DataListItem",
    // Use an icon + timestamp as the label for readability
    label: [
      {
        type: "Icon",
        id: "calendar",
        size: 16,
        color: "blue"
      },
      {
        type: "Text",
        variant: "body2",
        color: "gray",
        content: record.created_at
      }
    ],
    // Render the supplemented quantity as a colored chip
    value: {
      type: "Chip",
      label: record.value.toString(),
      color: "success",
      size: "small",
      variant: "filled"
    }
  }));

  // Assemble the overall UI as a responsive vertical card
  return {
    type: "VerticalCard",
    childrenProps: [
      {
        // Header with title, page info, and an illustrative icon
        type: "CardHeader",
        title: "Stock Supplementation History",
        description: `Page ${pagination.current} of ${pagination.pages}`,
        startElement: {
          type: "Icon",
          id: "history",
          size: 20,
          color: "teal"
        }
      },
      {
        // Main content: list of supplementation events
        type: "CardContent",
        childrenProps: {
          type: "DataList",
          childrenProps: listItems
        }
      },
      {
        // Footer summarizing total record count
        type: "CardFooter",
        childrenProps: {
          type: "Text",
          variant: "caption",
          content: `Total records: ${pagination.records}`
        }
      }
    ]
  };
}

import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
/**
 * A page.
 *
 * Collection of records with pagination indformation.
*/
type IPageIShoppingSaleUnitStockSupplement = {
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
    data: IShoppingSaleUnitStockSupplement[];
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
type IShoppingSaleUnitStockSupplement = {
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
type IAutoViewTransformerInputType = IPageIShoppingSaleUnitStockSupplement;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Extract pagination details for use in the header description.
  const { pagination, data } = input;
  
  // Header markdown content summarizes pagination.
  const headerMarkdownContent = `
**Page:** ${pagination.current} / ${pagination.pages}  
**Total Records:** ${pagination.records}  
**Records per Page:** ${pagination.limit}
  `.trim();

  // Map each record to a DataListItem.
  const dataListItems: IAutoView.IAutoViewDataListItemProps[] = data.map(record => {
    // Prepare markdown content to display key information of the record.
    const recordMarkdown = `
**ID:** ${record.id}  
**Value:** ${record.value}  
**Created At:** ${record.created_at}
    `.trim();
    
    return {
      type: "DataListItem",
      // Use a Markdown component for rich text formatting.
      label: {
        type: "Markdown",
        content: recordMarkdown,
      } as IAutoView.IAutoViewMarkdownProps,
      // Visual cue provided via an icon indicating supplementation.
      startElement: {
        type: "Icon",
        id: "plus", // Assumed valid icon name in kebab-case.
        color: "green",
        size: 20,
      } as IAutoView.IAutoViewIconProps,
    };
  });

  // In case there are no records in the input, use a single item to indicate an empty state.
  let dataListComponent: IAutoView.IAutoViewDataListProps;
  if (dataListItems.length === 0) {
    const noDataItem: IAutoView.IAutoViewDataListItemProps = {
      type: "DataListItem",
      label: {
        type: "Markdown",
        content: "No supplementation records found.",
      } as IAutoView.IAutoViewMarkdownProps,
    };
    dataListComponent = {
      type: "DataList",
      childrenProps: [noDataItem],
    };
  } else {
    dataListComponent = {
      type: "DataList",
      childrenProps: dataListItems,
    };
  }

  // Compose the final visual representation using a vertical card.
  // The vertical card groups a header (with pagination info) and the data list.
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [
      {
        type: "CardHeader",
        title: "Stock Supplementation",
        description: headerMarkdownContent,
        // Include an icon to visually represent the section; using "database" as an example.
        startElement: {
          type: "Icon",
          id: "database", // Ensure this is a valid icon name in kebab-case.
          color: "blue",
          size: 24,
        } as IAutoView.IAutoViewIconProps,
      } as IAutoView.IAutoViewCardHeaderProps,
      {
        type: "CardContent",
        childrenProps: dataListComponent,
      } as IAutoView.IAutoViewCardContentProps,
    ],
  };

  return verticalCard;
}

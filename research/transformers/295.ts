import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace IPageIShoppingSaleSnapshot {
    /**
     * A page.
     *
     * Collection of records with pagination indformation.
    */
    export type ISummary = {
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
        data: IShoppingSaleSnapshot.ISummary[];
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
namespace IShoppingSaleSnapshot {
    /**
     * Summarized information of the sale snapshot.
    */
    export type ISummary = {
        /**
         * Price range of the unit.
         *
         * @title Price range of the unit
        */
        price_range: IShoppingSalePriceRange;
        /**
         * Primary Key of Sale.
         *
         * @title Primary Key of Sale
        */
        id: string;
        /**
         * Primary Key of Snapshot.
         *
         * @title Primary Key of Snapshot
        */
        snapshot_id: string;
        /**
         * Whether the snapshot is the latest one or not.
         *
         * @title Whether the snapshot is the latest one or not
        */
        latest: boolean;
        /**
         * Description and image content describing the sale.
         *
         * @title Description and image content describing the sale
        */
        content: IShoppingSaleContent.IInvert;
        /**
         * List of categories.
         *
         * Which categories the sale is registered to.
         *
         * @title List of categories
        */
        categories: IShoppingChannelCategory.IInvert[];
        /**
         * List of search tags.
         *
         * @title List of search tags
        */
        tags: string[];
        /**
         * List of units.
         *
         * Records about individual product composition information that are sold
         * in the sale. Each {@link IShoppingSaleUnit unit} record has configurable
         * {@link IShoppingSaleUnitOption options},
         * {@link IShoppingSaleUnitOptionCandidate candidate} values for each
         * option, and {@link IShoppingSaleUnitStock final stocks} determined by
         * selecting every candidate values of each option.
         *
         * @title List of units
        */
        units: IShoppingSaleUnit.ISummary[];
    };
}
type IShoppingSalePriceRange = {
    lowest: IShoppingPrice;
    highest: IShoppingPrice;
};
/**
 * Shopping price interface.
*/
type IShoppingPrice = {
    /**
     * Nominal price.
     *
     * This is not {@link real real price} to pay, but just a nominal price to show.
     * If this value is greater than the {@link real real price}, it would be shown
     * like {@link IShoppingSeller seller} is giving a discount.
     *
     * @title Nominal price
    */
    nominal: number;
    /**
     * Real price to pay.
     *
     * @title Real price to pay
    */
    real: number;
};
namespace IShoppingSaleContent {
    export type IInvert = {
        id: string & tags.Format<"uuid">;
        title: string;
        thumbnails: IAttachmentFile[];
    };
}
/**
 * Attachment File.
 *
 * Every attachment files that are managed in current system.
 *
 * For reference, it is possible to omit one of file {@link name}
 * or {@link extension} like `.gitignore` or `README` case, but not
 * possible to omit both of them.
*/
type IAttachmentFile = {
    /**
     * Primary Key.
     *
     * @title Primary Key
    */
    id: string;
    /**
     * Creation time of attachment file.
     *
     * @title Creation time of attachment file
    */
    created_at: string;
    /**
     * File name, except extension.
     *
     * If there's file `.gitignore`, then its name is an empty string.
     *
     * @title File name, except extension
    */
    name: string;
    /**
     * Extension.
     *
     * Possible to omit like `README` case.
     *
     * @title Extension
    */
    extension: null | (string & tags.MinLength<1> & tags.MaxLength<8>);
    /**
     * URL path of the real file.
     *
     * @title URL path of the real file
    */
    url: string;
};
namespace IShoppingChannelCategory {
    /**
     * Invert category information with parent category.
    */
    export type IInvert = {
        /**
         * Parent category info with recursive structure.
         *
         * If no parent exists, then be `null`.
         *
         * @title Parent category info with recursive structure
        */
        parent: null | any;
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
namespace IShoppingSaleUnit {
    export type ISummary = {
        price_range: IShoppingSalePriceRange;
        /**
         * Primary Key.
         *
         * @title Primary Key
        */
        id: string;
        /**
         * Representative name of the unit.
         *
         * @title Representative name of the unit
        */
        name: string;
        /**
         * Whether the unit is primary or not.
         *
         * Just a labeling value.
         *
         * @title Whether the unit is primary or not
        */
        primary: boolean;
        /**
         * Whether the unit is required or not.
         *
         * When the unit is required, the customer must select the unit. If do not
         * select, customer can't buy it.
         *
         * For example, if there's a sale "Macbook Set" and one of the unit is the
         * "Main Body", is it possible to buy the "Macbook Set" without the
         * "Main Body" unit? This property is for that case.
         *
         * @title Whether the unit is required or not
        */
        required: boolean;
    };
}
type IAutoViewTransformerInputType = IPageIShoppingSaleSnapshot.ISummary;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Aggregation/transformation logic:
  // We need to transform the sale snapshot summary into a UI structure that allows a user
  // to view the overall batch of sale snapshots using images, icons and markdown for details.
  
  // Destructure pagination and data from the input
  const { pagination, data } = input;

  // Map each sale snapshot record into a DataListItem component,
  // which will include a label (with an image if available and the snapshot title) 
  // and a markdown value with detailed information.
  const listItems = data.map(record => {
    // Extract fields from the record for easier access
    const {
      id,
      snapshot_id,
      latest,
      price_range,
      content,
      categories,
      tags,
      units
    } = record;
    
    // Use the first thumbnail image if available for better visual representation.
    // thumbnails is an array; if non-empty, take the first one.
    const thumbnail = content.thumbnails && content.thumbnails.length > 0 ? content.thumbnails[0] : null;

    // Compose the label components.
    // Allowed types for label are presentation components like Image and Text.
    // We use an array to combine an image (if exists) and text.
    const labelComponents: (IAutoView.IAutoViewImageProps | IAutoView.IAutoViewTextProps)[] = [];
    if (thumbnail) {
      labelComponents.push({
        type: "Image",
        src: thumbnail.url,
        alt: content.title
      });
    }
    labelComponents.push({
      type: "Text",
      // content is defined as ArrayablestringIAutoViewIconProps,
      // so we can pass a string directly.
      content: content.title,
      variant: "h4",
      color: "primary"
    });

    // Build the markdown content string with detailed information.
    // We use markdown formatting (e.g., bold text and bullet lists) to improve the readability.
    const markdownContent = `
**Sale ID:** ${id}  
**Snapshot ID:** ${snapshot_id}  
**Latest:** ${latest ? 'Yes' : 'No'}  

**Price Range:**  
- Nominal: ${price_range.lowest.nominal} - ${price_range.highest.nominal}  
- Real: ${price_range.lowest.real} - ${price_range.highest.real}  

**Tags:** ${tags.join(', ')}  
**Units Count:** ${units.length}  
**Categories:** ${categories.map(c => c.name).join(', ')}
    `.trim();

    // Return a DataListItem that will be part of a DataList
    return {
      type: "DataListItem",
      label: labelComponents,
      value: {
        type: "Markdown",
        content: markdownContent
      }
    } as IAutoView.IAutoViewDataListItemProps;
  });

  // Compose the DataList component that holds all DataListItems.
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: listItems
  };

  // Compose a CardContent component to encapsulate the data list.
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: [dataList]
  };

  // Compose a CardHeader that shows overall information (e.g., pagination and title).
  // We add an icon to visually reinforce the header.
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: "Sale Snapshots",
    description: `Page ${pagination.current} of ${pagination.pages} — Total records: ${pagination.records}`,
    startElement: {
      type: "Icon",
      id: "list", // Using a generic list icon identifier (kebab-case, without the fa prefix)
      color: "blue",
      size: 24
    }
  };

  // Finally, compose the vertical card which is the final output.
  // It includes the card header and card content.
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [cardHeader, cardContent]
  };

  // Return the composed value which conforms to IAutoView.IAutoViewComponentProps.
  return verticalCard;
}

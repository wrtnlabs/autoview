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
  // If input contains sale records, we transform each record into a list item,
  // otherwise we return a simple message.
  if (input && input.data && input.data.length > 0) {
    // Map each sale record to a DataListItem component that represents a sale snapshot.
    const listItems: IAutoView.IAutoViewDataListItemProps[] = input.data.map(record => {
      // Use the first thumbnail (if exists) as the image for the sale.
      // The Image component accepts a src (with format “uri”) and an optional alt text.
      const thumbnail = (record.content && record.content.thumbnails && record.content.thumbnails[0]) || null;
      const imageElement: IAutoView.IAutoViewImageProps | undefined = thumbnail
        ? {
            type: "Image",
            src: thumbnail.url,
            alt: record.content.title
          }
        : undefined;

      // Build markdown content for sale details.
      // We include the nominal price range, list of category names, tags and units information.
      let markdownContent = "";
      if (record.price_range && record.price_range.lowest && record.price_range.highest) {
        markdownContent += `**Price Range:** \$${record.price_range.lowest.nominal} - \$${record.price_range.highest.nominal}\n\n`;
      }
      if (record.categories && record.categories.length > 0) {
        // Concatenate category names with commas.
        const categoryList = record.categories.map(category => category.name).join(", ");
        markdownContent += `**Categories:** ${categoryList}\n\n`;
      }
      if (record.tags && record.tags.length > 0) {
        markdownContent += `**Tags:** ${record.tags.join(", ")}\n\n`;
      }
      if (record.units && record.units.length > 0) {
        markdownContent += `**Units Available:** ${record.units.length}\n\n`;
      }
      // Include the sale unique identifier as reference.
      markdownContent += `**Sale ID:** ${record.id}`;

      // If the sale is marked as the latest record, attach a badge with an icon.
      // The Badge component requires its childrenProps to be either an Avatar or an Icon.
      const badgeElement: IAutoView.IAutoViewBadgeProps | undefined = record.latest
        ? {
            type: "Badge",
            // Use an Icon component to visually indicate "new" status.
            childrenProps: {
              type: "Icon",
              id: "star", // A common icon to represent "featured" or "new" status in kebab-case.
              size: 16
            },
            color: "success"
          }
        : undefined;

      // Compose the DataListItem with two prominent sections:
      // - label: renders the sale title using a Markdown component for enhanced visuals.
      // - value: an array including detailed markdown info, optional badge, and image elements.
      const listItem: IAutoView.IAutoViewDataListItemProps = {
        type: "DataListItem",
        label: {
          type: "Markdown",
          content: `# ${record.content.title}`
        },
        value: [
          {
            type: "Markdown",
            content: markdownContent
          },
          // Conditionally include the badge if the sale is marked as latest.
          ...(badgeElement ? [badgeElement] : []),
          // Optionally include the image element if a thumbnail exists.
          ...(imageElement ? [imageElement] : [])
        ]
      };

      return listItem;
    });

    // Wrap the list items inside a DataList component for structured display.
    const dataList: IAutoView.IAutoViewDataListProps = {
      type: "DataList",
      childrenProps: listItems
    };

    return dataList;
  } else {
    // In case there is no sale data, provide a fallback UI using a Text component.
    // We use a simple text message which, if needed, could be replaced by markdown.
    return {
      type: "Text",
      content: "No sale records available."
    };
  }
}

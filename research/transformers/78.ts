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
  // Transform each sale snapshot record into a vertical card component.
  const saleCards: IAutoView.IAutoViewVerticalCardProps[] = input.data.map((sale) => {
    // Compose a header with the sale title and some key identifiers.
    const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
      type: "CardHeader",
      title: sale.content.title,
      description: `Sale ID: ${sale.id} | Snapshot: ${sale.snapshot_id} | Latest: ${sale.latest ? "Yes" : "No"}`,
      // Using an icon as a visual cue for the sale record.
      startElement: {
        type: "Icon",
        id: "shopping-cart", // Using a typical shopping cart icon in kebab-case.
        color: "blue",
        size: 24
      }
    };

    // Optionally include media if a thumbnail exists.
    let cardMedia: IAutoView.IAutoViewCardMediaProps | undefined = undefined;
    if (sale.content.thumbnails && sale.content.thumbnails.length > 0) {
      // Use the first available thumbnail image.
      cardMedia = {
        type: "CardMedia",
        src: sale.content.thumbnails[0].url
      };
    }

    // Compose markdown content for detailed sale information.
    // The markdown includes the price ranges, tags and unit information.
    const markdownContent = [
      "**Price Range:**",
      `- Lowest (Nominal): ${sale.price_range.lowest.nominal}, (Real): ${sale.price_range.lowest.real}`,
      `- Highest (Nominal): ${sale.price_range.highest.nominal}, (Real): ${sale.price_range.highest.real}`,
      "",
      "**Tags:**",
      sale.tags.length > 0 ? sale.tags.join(", ") : "None",
      "",
      "**Units:**",
      sale.units.length > 0
        ? sale.units.map(unit => `- ${unit.name} (${unit.required ? "Required" : "Optional"})`).join("\n")
        : "None"
    ].join("\n");

    const cardContent: IAutoView.IAutoViewCardContentProps = {
      type: "CardContent",
      // Markdown is used here to ensure rich text formatting.
      childrenProps: {
        type: "Markdown",
        content: markdownContent
      }
    };

    // Compose a footer to display category information in markdown format.
    const categoryMarkdown = sale.categories.length > 0 
      ? sale.categories.map(cat => `- ${cat.name}`).join("\n")
      : "None";
    const cardFooter: IAutoView.IAutoViewCardFooterProps = {
      type: "CardFooter",
      childrenProps: {
        type: "Markdown",
        content: `**Categories:**\n${categoryMarkdown}`
      }
    };

    // Combine all parts into an array for the VerticalCard.
    const childrenComponents: (
      | IAutoView.IAutoViewCardHeaderProps
      | IAutoView.IAutoViewCardMediaProps
      | IAutoView.IAutoViewCardContentProps
      | IAutoView.IAutoViewCardFooterProps
    )[] = [];
    childrenComponents.push(cardHeader);
    if (cardMedia) childrenComponents.push(cardMedia);
    childrenComponents.push(cardContent, cardFooter);

    // Return the composed vertical card component for the sale.
    return {
      type: "VerticalCard",
      childrenProps: childrenComponents
    };
  });

  let output: IAutoView.IAutoViewComponentProps;

  // Handle the case where no sale snapshots are available.
  if (saleCards.length === 0) {
    output = {
      type: "Markdown",
      content: "No sale snapshots available."
    };
  } 
  // If only one sale snapshot exists, return its vertical card directly.
  else if (saleCards.length === 1) {
    output = saleCards[0];
  } 
  // If multiple sale snapshots exist, wrap them in a carousel component.
  else {
    output = {
      type: "Carousel",
      autoPlay: false, // Disable autoplay to enhance usability on small screens.
      infinite: true,
      // Interval value between 20 and 60 is recommended. Here we use 30.
      interval: 30,
      // The carousel childrenProps accept an array of vertical cards.
      childrenProps: saleCards
    } as IAutoView.IAutoViewCarouselProps;
  }
  
  return output;
}

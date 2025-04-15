import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
/**
 * Snapshot record of sale.
 *
 * `IShoppingSaleSnapshot` is an entity that embodies a snapshot of a sale,
 * and the ERD (Entity Relationship Diagram) describes the role of the
 * `shopping_sale_snapshots` table as follows:
 *
 * > {@link IShoppingSale shopping_sales} is an entity that embodies
 * > "product sales" (sales) information registered by the
 * > {@link IShoppingSeller seller}. And the main information of the sale is
 * > recorded in the sub `shopping_sale_snapshots`, not in the main
 * > {@link IShoppingSale shopping_sales}. When a seller changes a previously
 * > registered item, the existing {@link IShoppingSale shopping_sales} record
 * > is not changed, but a new snapshot record is created.
 * >
 * > This is to preserve the {@link IShoppingCustomer customer}'s
 * > {@link IShoppingOrder purchase history} flawlessly after the customer
 * > purchases a specific item, even if the seller changes the components or price
 * > of the item. It is also intended to support sellers in so-called A/B testing,
 * > which involves changing components or prices and measuring the performance
 * > in each case.
 *
 * By the way, DTO (Data Transfer Object) level used by the front-end developer,
 * it does not distinguish {@link IShoppingSale} and `IShoppingSaleSnapshot`
 * strictly, and generally handles {@link IShoppingSale} and snapshot together.
 *
 * But even though the DTO level does not strictly distinguish them, the word and
 * concept of "snapshot" is still important, so it is recommended to understand
 * the concept of "snapshot" properly.
*/
type IShoppingSaleSnapshot = {
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
    content: IShoppingSaleContent;
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
    units: IShoppingSaleUnit[];
};
/**
 * Content information of sale snapshot.
 *
 * `IShoppingSaleContent` is an entity embodies the description contents
 * of {@link IShoppingSale}.
*/
type IShoppingSaleContent = {
    /**
     * Primary Key.
     *
     * @title Primary Key
    */
    id: string;
    /**
     * Title of the content.
     *
     * @title Title of the content
    */
    title: string;
    /**
     * Format of the body content.
     *
     * Same meaning with file extension like `html`, `md`, and `txt`.
     *
     * @title Format of the body content
    */
    format: "html" | "md" | "txt";
    /**
     * The main body content.
     *
     * Format follows the {@link format}, and default is `md` (markdown).
     *
     * @title The main body content
    */
    body: string;
    /**
     * List of attached files.
     *
     * @title List of attached files
    */
    files: IAttachmentFile[];
    /**
     * List of thumbnails.
     *
     * @title List of thumbnails
    */
    thumbnails: IAttachmentFile[];
};
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
/**
 * Product composition information handled in the sale.
 *
 * `IShoppingSaleUnit` is an entity that embodies the "individual product"
 * information handled in the {@link IShoppingSale sale}.
 *
 * For reference, the reason why `IShoppingSaleUnit` is separated from
 * {@link IShoppingSaleSnapshot} by an algebraic relationship of 1: N is because
 * there are some cases where multiple products are sold in one listing. This is
 * the case with so-called "bundled products".
 *
 * - Bundle from regular product (Mackbook Set)
 *   - Main Body
 *   - Keyboard
 *   - Mouse
 *   - Apple Care (Free A/S Voucher)
 *
 * And again, `IShoppingSaleUnit` does not in itself refer to the
 * {@link IShoppingSaleUnitStock final stock} that the
 * {@link IShoppingCustomer customer} will {@link IShoppingOrder purchase}.
 * The final stock can be found only after selecting all given
 * {@link IShoppingSaleUnitOption options} and their
 * {@link IShoppingSaleUnitOptionCandidate candidate values}.
 *
 * For example, even if you buy a Macbook, the final stocks are determined only
 * after selecting all the options (CPU / RAM / SSD), etc.
*/
type IShoppingSaleUnit = {
    /**
     * List of options.
     *
     * @title List of options
    */
    options: (any | any)[];
    /**
     * List of final stocks.
     *
     * @title List of final stocks
    */
    stocks: IShoppingSaleUnitStock[];
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
type IShoppingSaleUnitSelectableOption = any;
type IShoppingSaleUnitDescriptiveOption = any;
/**
 * Final component information on units for sale.
 *
 * `IShoppingSaleUnitStock` is a subsidiary entity of {@link IShoppingSaleUnit}
 * that represents a product catalog for sale, and is a kind of final stock that is
 * constructed by selecting all {@link IShoppingSaleUnitSelectableOption options}
 * (variable "select" type) and their
 * {@link IShoppingSaleUnitOptionCandidate candidate} values in the belonging unit.
 * It is the "good" itself that customers actually purchase.
 *
 * - Product Name) MacBook
 *   - Options
 *     - CPU: { i3, i5, i7, i9 }
 *     - RAM: { 8GB, 16GB, 32GB, 64GB, 96GB }
 *     - SSD: { 256GB, 512GB, 1TB }
 *   - Number of final stocks: 4 * 5 * 3 = 60
 *
 * For reference, the total number of `IShoppingSaleUnitStock` records in an
 * attribution unit can be obtained using Cartesian Product. In other words, the
 * value obtained by multiplying all the candidate values that each
 * (variable "select" type) option can have by the number of cases is the total
 * number of final stocks in the unit.
 *
 * Of course, without a single variable "select" type option, the final stocks
 * count in the unit is only 1.
*/
type IShoppingSaleUnitStock = {
    /**
     * Primary Key.
     *
     * @title Primary Key
    */
    id: string;
    /**
     * Representative name of the stock.
     *
     * @title Representative name of the stock
    */
    name: string;
    /**
     * Price of the stock.
     *
     * @title Price of the stock
    */
    price: IShoppingPrice;
    /**
     * Current inventory status of the stock.
     *
     * @title Current inventory status of the stock
    */
    inventory: IShoppingSaleUnitStockInventory;
    /**
     * List of choices.
     *
     * Which candidate values being chosen for each option.
     *
     * @title List of choices
    */
    choices: IShoppingSaleUnitStockChoice[];
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
/**
 * Inventory information of a final stock.
*/
type IShoppingSaleUnitStockInventory = {
    /**
     * Total income quantity.
     *
     * @title Total income quantity
    */
    income: number & tags.Type<"int32">;
    /**
     * Total outcome quantity.
     *
     * @title Total outcome quantity
    */
    outcome: number & tags.Type<"int32">;
};
/**
 * Selection information of final stock.
 *
 * `IShoppingSaleUnitStockChoice` is an entity that represents which
 * {@link IShoppingSaleUnitSelectableOption option} of each variable "select"
 * type was selected for each {@link IShoppingSaleUnitStock stock} and which
 * {@link IShoppingSaleUnitOptionCandidate candidate value} was selected within
 * it.
 *
 * Of course, if the bound {@link IShoppingSaleUnit unit} does not have any
 * options, this entity can also be ignored.
*/
type IShoppingSaleUnitStockChoice = {
    /**
     * Primary Key.
     *
     * @title Primary Key
    */
    id: string;
    /**
     * Target option's {@link IShoppingSaleUnitOption.id}
    */
    option_id: string;
    /**
     * Target candidate's {@link IShoppingSaleUnitOptionCandidate.id}
    */
    candidate_id: string;
};
type IAutoViewTransformerInputType = IShoppingSaleSnapshot;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Extract the sale content from the input snapshot.
  // We assume that input.content exists and has required fields because of compile-time validation.
  const content = input.content;
  
  // Prepare a starting avatar element if there is a thumbnail image available.
  // The CardHeader.startElement only accepts types like Avatar, Icon, Chip, etc.
  let startAvatar: IAutoView.IAutoViewAvatarProps | undefined;
  if (content.thumbnails && content.thumbnails.length > 0 && content.thumbnails[0].url) {
    startAvatar = {
      type: "Avatar",
      src: content.thumbnails[0].url,
      // Optionally specify a variant and size to ensure consistent UI styling
      variant: "primary",
      size: 40
    };
  }
  
  // Prepare a CardMedia element if any thumbnail exists.
  let cardMedia: IAutoView.IAutoViewCardMediaProps | undefined;
  if (content.thumbnails && content.thumbnails.length > 0 && content.thumbnails[0].url) {
    cardMedia = {
      type: "CardMedia",
      src: content.thumbnails[0].url,
    };
  }
  
  // Create a Markdown component for the main body.
  // We use a Markdown component rather than plain text to allow rich formatting.
  const markdownComponent: IAutoView.IAutoViewMarkdownProps = {
    type: "Markdown",
    content: content.body,
  };

  // Prepare a ChipGroup to display the categories.
  // Each category is represented as a Chip with its label set to the category's name.
  let chipGroupComponent: IAutoView.IAutoViewChipGroupProps | undefined;
  if (input.categories && input.categories.length > 0) {
    // Map categories to chips.
    const chips = input.categories.map((cat) => {
      return {
        type: "Chip",
        label: cat.name,
        // Optionally set a color based on some logic; here we use "info" as a default.
        color: "info",
        size: "small",
        variant: "filled"
      } as IAutoView.IAutoViewChipProps;
    });
    chipGroupComponent = {
      type: "ChipGroup",
      childrenProps: chips,
      // Optionally set maxItems if needed for visual compactness.
      maxItems: chips.length
    };
  }
  
  // Prepare a Markdown component for displaying tags if available.
  // We format tags as a bullet list.
  let tagsMarkdownComponent: IAutoView.IAutoViewMarkdownProps | undefined;
  if (input.tags && input.tags.length > 0) {
    const tagListMarkdown = "### Tags\n" + input.tags.map(tag => `- ${tag}`).join("\n");
    tagsMarkdownComponent = {
      type: "Markdown",
      content: tagListMarkdown,
    };
  }
  
  // Compose the CardHeader component using the sale content title.
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: content.title,
    // A generic description. In a more sophisticated implementation, you might summarize the content.
    description: "Sale Snapshot Details",
    startElement: startAvatar,
  };
  
  // Compose the CardContent component that will hold the markdown content.
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    // We assign the markdown component directly to childrenProps.
    childrenProps: markdownComponent,
  };
  
  // Compose the CardFooter component which aggregates additional details such as categories and tags.
  // We combine the ChipGroup (if exists) and tags Markdown (if exists) in an array.
  const footerChildren: IAutoView.IAutoViewPresentationComponentProps[] = [];
  if (chipGroupComponent) {
    footerChildren.push(chipGroupComponent);
  }
  if (tagsMarkdownComponent) {
    footerChildren.push(tagsMarkdownComponent);
  }
  const cardFooter: IAutoView.IAutoViewCardFooterProps = {
    type: "CardFooter",
    childrenProps: footerChildren,
  };
  
  // Finally, compose a VerticalCard that aggregates header, media (if available), content, and footer.
  // VerticalCard childrenProps accepts an array of CardHeader, CardMedia, CardContent, and CardFooter.
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [
      cardHeader,
      // Only include CardMedia if we have a valid one.
      ...(cardMedia ? [cardMedia] : []),
      cardContent,
      cardFooter
    ]
  };
  
  // This vertical card component now represents a visually engaging view of the sale snapshot.
  // It makes use of rich visual elements such as avatar images, markdown formatting for the body and tags,
  // and chip groups to show categorical information.
  return verticalCard;
}

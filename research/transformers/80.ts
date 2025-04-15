import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
/**
 * Seller sales products.
 *
 * `IShoppingSale` is an entity that embodies "product sales" (sales)
 * information registered by the {@link ISoppingSeller seller}. And the main
 * information of the sale is recorded in the sub {@link IShoppingSaleSnapshot},
 * not in the main `IShoppingSale`. When a seller changes a previously registered
 * item, the existing `IShoppingSale` record is not changed, but a new
 * {@link IShoppingSaleSnapshot snapshot} record be created.
 *
 * This is to preserve the {@link IShoppingCustomer customer}'s
 * {@link IShoppingOrder purchase history} flawlessly after the customer
 * purchases a specific item, even if the seller changes the components or
 * price of the item. It is also intended to support sellers in so-called A/B
 * testing, which involves changing components or prices and measuring the
 * performance in each case.
*/
type IShoppingSale = {
    /**
     * Belonged section.
     *
     * @title Belonged section
    */
    section: IShoppingSection;
    /**
     * Seller who has registered the sale.
     *
     * @title Seller who has registered the sale
    */
    seller: IShoppingSeller.IInvert;
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
    /**
     * Creation time of the record.
     *
     * Note that, this property is different with {@link opened_at},
     * which means the timepoint of the sale is opened.
     *
     * @title Creation time of the record
    */
    created_at: string;
    /**
     * Last updated time of the record.
     *
     * In another words, creation time of the last snapshot.
     *
     * @title Last updated time of the record
    */
    updated_at: string;
    /**
     * Paused time of the sale.
     *
     * The sale is paused by the seller, for some reason.
     *
     * {@link IShoppingCustomer Customers} can still see the sale on the
     * both list and detail pages, but the sale has a warning label
     * "The sale is paused by the seller".
     *
     * @title Paused time of the sale
    */
    paused_at: null | (string & tags.Format<"date-time">);
    /**
     * Suspended time of the sale.
     *
     * The sale is suspended by the seller, for some reason.
     *
     * {@link IShoppingCustomer Customers} cannot see the sale on the
     * both list and detail pages. It is almost same with soft delettion,
     * but there's a little bit difference that the owner
     * {@link IShoppingSeller seller} can still see the sale and resume it.
     *
     * Of course, the {@link IShoppingCustomer customers} who have
     * already purchased the sale can still see the sale on the
     * {@link IShoppingOrder order} page.
     *
     * @title Suspended time of the sale
    */
    suspended_at: null | (string & tags.Format<"date-time">);
    /**
     * Opening time of the sale.
     *
     * @title Opening time of the sale
    */
    opened_at: null | (string & tags.Format<"date-time">);
    /**
     * Closing time of the sale.
     *
     * If this value is `null`, the sale be continued forever.
     *
     * @title Closing time of the sale
    */
    closed_at: null | (string & tags.Format<"date-time">);
};
/**
 * Section information.
 *
 * `IShoppingSection` is a concept that refers to the spatial information of
 * the market.
 *
 * If we compare the section mentioned here to the offline market, it means a
 * spatially separated area within the store, such as the "fruit corner" or
 * "butcher corner". Therefore, in the {@link IShoppingSale sale} entity, it is
 * not possible to classify multiple sections simultaneously, but only one section
 * can be classified.
 *
 * By the way, if your shopping mall system requires only one section, then just
 * use only one. This concept is designed to be expandable in the future.
*/
type IShoppingSection = {
    /**
     * Primary Key.
     *
     * @title Primary Key
    */
    id: string;
    /**
     * Identifier code.
     *
     * @title Identifier code
    */
    code: string;
    /**
     * Representative name of the section.
     *
     * @title Representative name of the section
    */
    name: string;
    /**
     * Creation time of record.
     *
     * @title Creation time of record
    */
    created_at: string;
};
namespace IShoppingSeller {
    /**
     * Invert information starting from seller info.
     *
     * Instead of accessing to the seller information from the
     * {@link IShoppingCustomer.member} -> {@link IShoppingMember.seller},
     * `IShoppingSeller.IInvert` starts from the seller information
     * and access to the customer, member and {@link IShoppingCitizen citizen}
     * information inversely.
    */
    export type IInvert = {
        /**
         * Discriminant for the type of seller.
         *
         * @title Discriminant for the type of seller
        */
        type: "seller";
        /**
         * Membership joining information.
         *
         * @title Membership joining information
        */
        member: IShoppingMember.IInvert;
        /**
         * Customer, the connection information.
         *
         * @title Customer, the connection information
        */
        customer: IShoppingCustomer.IInvert;
        /**
         * Real-name and mobile number authentication information.
         *
         * @title Real-name and mobile number authentication information
        */
        citizen: IShoppingCitizen;
        /**
         * Primary Key.
         *
         * @title Primary Key
        */
        id: string;
        /**
         * Creation tmie of record.
         *
         * Another words, the time when the seller has signed up.
         *
         * @title Creation tmie of record
        */
        created_at: string;
    };
}
namespace IShoppingMember {
    /**
     * Invert information of member.
     *
     * This invert member information has been designed to be used for another
     * invert information of sellers and administrators like below.
     *
     * - {@link IShoppingSeller.IInvert}
     * - {@link IShoppingAdministrator.IInvert}
    */
    export type IInvert = {
        /**
         * Primary Key.
         *
         * @title Primary Key
        */
        id: string;
        /**
         * Nickname that uniquely identifies the member.
         *
         * @title Nickname that uniquely identifies the member
        */
        nickname: string;
        /**
         * List of emails.
         *
         * @title List of emails
        */
        emails: IShoppingMemberEmail[];
        /**
         * Creation time of record.
         *
         * Another words, the time when the member has signed up.
         *
         * @title Creation time of record
        */
        created_at: string;
    };
}
/**
 * Email address of member.
 *
 * This shopping mall system allows multiple email addresses to be
 * registered for one {@link IShoppingMember member}. If you don't have to
 * plan such multiple email addresses, just use only one.
*/
type IShoppingMemberEmail = {
    /**
     * Primary Key.
     *
     * @title Primary Key
    */
    id: string;
    /**
     * Email address value.
     *
     * @title Email address value
    */
    value: string;
    /**
     * Creation time of record.
     *
     * @title Creation time of record
    */
    created_at: string;
};
namespace IShoppingCustomer {
    /**
     * Inverted customer information.
     *
     * This inverted customer information has been designed to be used for
     * another invert information of sellers and administrators like below.
     *
     * - {@link IShoppingSeller.IInvert}
     * - {@link IShoppingAdministrator.IInvert}
    */
    export type IInvert = {
        /**
         * Primary Key.
         *
         * @title Primary Key
        */
        id: string;
        /**
         * Belonged channel.
         *
         * @title Belonged channel
        */
        channel: IShoppingChannel;
        /**
         * External user information.
         *
         * When the customer has come from an external service.
         *
         * @title External user information
        */
        external_user: null | any;
        /**
         * Connection address.
         *
         * Same with {@link window.location.href} of client.
         *
         * @title Connection address
        */
        href: string;
        /**
         * Referrer address.
         *
         * Same with {@link window.document.referrer} of client.
         *
         * @title Referrer address
        */
        referrer: null | (string & tags.Format<"uri">) | (string & tags.MaxLength<0>);
        /**
         * Connection IP Address.
         *
         * @title Connection IP Address
        */
        ip: (string & tags.Format<"ipv4">) | (string & tags.Format<"ipv6">);
        /**
         * Creation time of the connection record.
         *
         * @title Creation time of the connection record
        */
        created_at: string;
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
type IShoppingChannel = {
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
type IShoppingExternalUser = any;
/**
 * Citizen verification information.
 *
 * `IShoppingCitizen` is an entity that records the user's
 * {@link name real name} and {@link mobile} input information.
 *
 * For reference, in South Korea, real name authentication is required for
 * e-commerce participants, so the name attribute is important. However, the
 * situation is different overseas, so in reality, mobile attributes are the
 * most important, and identification of individual person is also done based
 * on this mobile.
 *
 * Of course, real name and mobile phone authentication information are
 * encrypted and stored.
*/
type IShoppingCitizen = {
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
     * Mobile number.
     *
     * @title Mobile number
    */
    mobile: string & tags.JsonSchemaPlugin<{
        "x-wrtn-payment-order-mobile": true
    }>;
    /**
     * Real name, or equivalent nickname.
     *
     * @title Real name, or equivalent nickname
    */
    name: string & tags.JsonSchemaPlugin<{
        "x-wrtn-payment-order-citizen": true
    }>;
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
type IAutoViewTransformerInputType = IShoppingSale;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // In our transformation, we assume input is of type IShoppingSale.
  // We will collect several AutoView components into a VerticalCard to visually present
  // the sale information, including header, media (if available), content (markdown formatted),
  // and footer (with chip group for categories and a text element for metadata).
  
  // Alias input to sale for improved readability.
  const sale = input;
  
  // Build the Card Header.
  // We use an Icon as the startElement to suggest a shopping symbol and another Icon as endElement for additional info.
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: sale.content.title,
    description: "Sale at Section: " + sale.section.name,
    startElement: {
      type: "Icon",
      id: "shopping-cart", // icon name representing a sale
      color: "blue",
      size: 24
    },
    endElement: {
      type: "Icon",
      id: "info", // icon name for info
      color: "gray",
      size: 24
    }
  };
  
  // Build the Card Media if a thumbnail image is available.
  let cardMedia: IAutoView.IAutoViewCardMediaProps | null = null;
  if (sale.content.thumbnails && sale.content.thumbnails.length > 0) {
    // Take the first thumbnail's url.
    const thumbnail = sale.content.thumbnails[0];
    if (thumbnail && thumbnail.url) {
      cardMedia = {
        type: "CardMedia",
        src: thumbnail.url
      };
    }
  }
  
  // Build the Card Content using markdown for a rich text presentation.
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: {
      type: "Markdown",
      content: sale.content.body
    }
  };
  
  // Build a ChipGroup for the list of sale categories.
  // Each chip represents one category by its name.
  let chipGroup: IAutoView.IAutoViewChipGroupProps | null = null;
  if (sale.categories && sale.categories.length > 0) {
    const chips = sale.categories.map((category) => {
      return {
        type: "Chip",
        label: category.name,
        variant: "outlined",
        color: "primary",
        size: "small"
      } as IAutoView.IAutoViewChipProps;
    });
    chipGroup = {
      type: "ChipGroup",
      childrenProps: chips
    };
  }
  
  // Build additional footer information, e.g., tags and last updated date.
  // For tags, we use a Text component rendered in markdown style if needed.
  const tagText: IAutoView.IAutoViewTextProps = {
    type: "Text",
    content: "Tags: " + (sale.tags && sale.tags.length > 0 ? sale.tags.join(", ") : "None"),
    variant: "caption",
    color: "secondary"
  };
  
  // Combine footer children components into an array.
  const footerChildren: IAutoView.IAutoViewPresentationComponentProps[] = [];
  if (chipGroup) footerChildren.push(chipGroup);
  footerChildren.push({
    type: "Text",
    content: "Last updated: " + sale.updated_at,
    variant: "caption",
    color: "gray"
  } as IAutoView.IAutoViewTextProps);
  footerChildren.push(tagText);
  
  const cardFooter: IAutoView.IAutoViewCardFooterProps = {
    type: "CardFooter",
    childrenProps: footerChildren
  };
  
  // Compose the vertical card with all the sub-components.
  // Order of childrenProps: Header, (Media if exists), Content, and Footer.
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [
      cardHeader,
      // Only include media if available.
      ...(cardMedia ? [cardMedia] : []),
      cardContent,
      cardFooter
    ]
  };
  
  // Return the aggregated component tree.
  return verticalCard;
}

import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * Item in a shopping cart.
   *
   * `IShoppingCartCommodity` is an entity that represents a
   * {@link IShoppingSaleSnapshot snapshot} of the items that
   * {@link IShoppingCustomer customer} has placed into his shopping cart with a
   * {@link IShoppingOrder purchase} in mind. And if the customer continues this
   * into an actual order in the future, `IShoppingCartCommodity` be changed to
   * {@link IShoppingOrderGood}.
   *
   * And while adding a sale snapshot to the shopping cart, the customer inevitably
   * selects specific {@link IShoppingSaleUnit units} and
   * {@link IShoppingSaleUnitStock final stocks} within the listing snapshot.
   * Information about these units and stocks is recorded in the subsidiary entity
   * {@link IShoppingCartCommodityStock}. Also, there is an attribute {@link volume}
   * that indicates how many sets of snapshots of the target commodity will be
   * purchased. This "volume" is a value that will be multiplied by
   * {@link IShoppingSaleUnitStock.IInvert.quantity}, the quantity for each
   * component.
   */
  export type IShoppingCartCommodity = {
    /**
     * Primary Key.
     *
     * If you want to continue to the order the commodity, then use this ID to order.
     *
     * @title Primary Key
     */
    id: string;
    /**
     * Invert information of the sale (snapshot), in the perspective of commodity.
     *
     * @title Invert information of the sale (snapshot), in the perspective of commodity
     */
    sale: AutoViewInputSubTypes.IShoppingSaleSnapshot.IInvert;
    /**
     * Whether current commodity is orderable or not.
     *
     * If this attribute is `false`, then the commodity is not orderable, because
     * it has already been ordered.
     *
     * @title Whether current commodity is orderable or not
     */
    orderable: boolean;
    /**
     * Whether current commodity is pseudo or not.
     *
     * When this attribute is `true`, then the commodity is not the real one,
     * but just fake information only for calculating the discount effect by
     * {@link IShoppingCoupon coupons}.
     *
     * @title Whether current commodity is pseudo or not
     */
    pseudo: boolean;
    /**
     * Volume of the commodity to purchase.
     *
     * A value indicating how many sets would be multiplied to the children
     * {@link IShoppingSaleUnitStock.IInvert.quantity} values.
     *
     * @title Volume of the commodity to purchase
     */
    volume: number & tags.Type<"int32">;
    /**
     * Price of the commodity.
     *
     * For reference, this price value has not been multiplied by the
     * {@link volume} value. It just sumed up the prices of the children
     * {@link IShoppingSaleUnitStock.IInvert.price} values.
     *
     * @title Price of the commodity
     */
    price: AutoViewInputSubTypes.IShoppingPrice;
    /**
     * Creation time of the record.
     *
     * @title Creation time of the record
     */
    created_at: string;
  };
  export namespace IShoppingSaleSnapshot {
    /**
     * Invert information of the sale snapshot, in the perspective of commodity.
     *
     * `IShoppingSaleSnapshot.IInvert` is a structure used to represent a
     * snapshot in the perspective of a {@link IShoppingCommodity}, corresponding
     * to an {@link IShoppingCartCommodityStock} entity.
     *
     * Therefore, `IShoppingSaleSnapshot.IInvert` does not contain every
     * {@link IShoppingSaleUnit units} and {@link IShoppingSaleUnitStock stocks}
     * of the snapshot records, but only some of the records which are put
     * into the {@link IShoppingCartCommodity shopping cart}.
     */
    export type IInvert = {
      /**
       * Belonged section's information.
       *
       * @title Belonged section's information
       */
      section: AutoViewInputSubTypes.IShoppingSection;
      /**
       * Seller who've registered the sale.
       *
       * @title Seller who've registered the sale
       */
      seller: AutoViewInputSubTypes.IShoppingSeller.IInvert;
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
      content: AutoViewInputSubTypes.IShoppingSaleContent.IInvert;
      /**
       * List of categories.
       *
       * Which categories the sale is registered to.
       *
       * @title List of categories
       */
      categories: AutoViewInputSubTypes.IShoppingChannelCategory.IInvert[];
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
      units: AutoViewInputSubTypes.IShoppingSaleUnit.IInvert[];
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
  }
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
  export type IShoppingSection = {
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
  export namespace IShoppingSeller {
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
      member: AutoViewInputSubTypes.IShoppingMember.IInvert;
      /**
       * Customer, the connection information.
       *
       * @title Customer, the connection information
       */
      customer: AutoViewInputSubTypes.IShoppingCustomer.IInvert;
      /**
       * Real-name and mobile number authentication information.
       *
       * @title Real-name and mobile number authentication information
       */
      citizen: AutoViewInputSubTypes.IShoppingCitizen;
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
  export namespace IShoppingMember {
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
      emails: AutoViewInputSubTypes.IShoppingMemberEmail[];
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
  export type IShoppingMemberEmail = {
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
  export namespace IShoppingCustomer {
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
      channel: AutoViewInputSubTypes.IShoppingChannel;
      /**
       * External user information.
       *
       * When the customer has come from an external service.
       *
       * @title External user information
       */
      external_user: null | AutoViewInputSubTypes.IShoppingExternalUser;
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
      referrer:
        | null
        | (string & tags.Format<"uri">)
        | (string & tags.MaxLength<0>);
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
  /**
   * External user information.
   *
   * `IShoppingExternalUser` is an entity dsigned for when this system needs
   * to connect with external services and welcome their users as
   * {@link IShoppingCustomer customers} of this service.
   *
   * For reference, customers who connect from an external service must have
   * this record, and the external service user is identified through the two
   * attributes {@link application} and {@link uid}. If a customer connected
   * from an external service completes
   * {@link IShoppingCitizen real-name authentication} from this service, each
   * time the external service user reconnects to this service and issues a
   * new customer authentication token, real-name authentication begins with
   * completed.
   *
   * And {@link password} is the password issued to the user by the external
   * service system (the so-called permanent user authentication token), and
   * is never the actual user password. However, for customers who entered the
   * same application and uid as the current external system user, this is to
   * determine whether to view this as a correct external system user or a
   * violation.
   *
   * In addition, additional information received from external services can
   * be recorded in the data field in JSON format.
   */
  export type IShoppingExternalUser = {
    /**
     * Primary Key.
     *
     * @title Primary Key
     */
    id: string;
    /**
     * Citizen activation info.
     *
     * @title Citizen activation info
     */
    citizen: null | AutoViewInputSubTypes.IShoppingCitizen;
    /**
     * Creation time of record.
     *
     * Another word, first time when the external user connected.
     *
     * @title Creation time of record
     */
    created_at: string;
    /**
     * Identifier key of external user from the external system.
     *
     * @title Identifier key of external user from the external system
     */
    uid: string;
    /**
     * Identifier code of the external service.
     *
     * It can be same with {@link IShoppingChannel.code} in common.
     *
     * @title Identifier code of the external service
     */
    application: string;
    /**
     * Nickname of external user in the external system.
     *
     * @title Nickname of external user in the external system
     */
    nickname: string;
    /**
     * Additional information about external user from the external
     * system.
     */
    data: any;
  };
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
  export type IShoppingCitizen = {
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
    mobile: string;
    /**
     * Real name, or equivalent nickname.
     *
     * @title Real name, or equivalent nickname
     */
    name: string;
  };
  export namespace IShoppingSaleContent {
    export type IInvert = {
      id: string & tags.Format<"uuid">;
      title: string;
      thumbnails: AutoViewInputSubTypes.IAttachmentFile[];
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
  export type IAttachmentFile = {
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
  export namespace IShoppingChannelCategory {
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
      parent: null | AutoViewInputSubTypes.IShoppingChannelCategory.IInvert;
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
  export namespace IShoppingSaleUnit {
    export type IInvert = {
      /**
       * List of final stocks.
       *
       * @title List of final stocks
       */
      stocks: AutoViewInputSubTypes.IShoppingSaleUnitStock.IInvert[];
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
  export namespace IShoppingSaleUnitStock {
    /**
     * Invert information from the cart.
     */
    export type IInvert = {
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
      price: AutoViewInputSubTypes.IShoppingPrice;
      /**
       * Quantity of the stock in the cart.
       *
       * @title Quantity of the stock in the cart
       */
      quantity: number & tags.Type<"int32">;
      /**
       * Current inventory status of the stock.
       *
       * @title Current inventory status of the stock
       */
      inventory: AutoViewInputSubTypes.IShoppingSaleUnitStockInventory;
      /**
       * List of choices.
       *
       * Which values being written for each option.
       *
       * @title List of choices
       */
      choices: AutoViewInputSubTypes.IShoppingSaleUnitStockChoice.IInvert[];
    };
  }
  /**
   * Shopping price interface.
   */
  export type IShoppingPrice = {
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
  export type IShoppingSaleUnitStockInventory = {
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
  export namespace IShoppingSaleUnitStockChoice {
    /**
     * Invert information from the cart.
     */
    export type IInvert = {
      /**
       * Primary Key.
       *
       * @title Primary Key
       */
      id: string;
      /**
       * Target option.
       *
       * @title Target option
       */
      option:
        | AutoViewInputSubTypes.IShoppingSaleUnitSelectableOption.IInvert
        | AutoViewInputSubTypes.IShoppingSaleUnitDescriptiveOption;
      /**
       * Selected candidate value.
       *
       * @title Selected candidate value
       */
      candidate: null | AutoViewInputSubTypes.IShoppingSaleUnitOptionCandidate;
      /**
       * Written value.
       *
       * @title Written value
       */
      value: null | string | number | boolean;
    };
  }
  export namespace IShoppingSaleUnitSelectableOption {
    export type IInvert = {
      /**
       * Primary Key.
       *
       * @title Primary Key
       */
      id: string;
      /**
       * Discriminant for the type of selectable option.
       *
       * @title Discriminant for the type of selectable option
       */
      type: "select";
      /**
       * Represents the name of the option.
       *
       * @title Represents the name of the option
       */
      name: string;
      /**
       * Whether the option is variable or not.
       *
       * When type of current option is "select", this attribute means whether
       * selecting different candidate value affects the final stock or not.
       *
       * @title Whether the option is variable or not
       */
      variable: boolean;
    };
  }
  /**
   * Descriptive option.
   *
   * When type of the option not `"select"`, it means the option is descriptive
   * that requiring {@link IShoppingCustomer customers} to write some value to
   * {@link IShoppingOrder purchase}. Also, whatever customer writes about the
   * option, it does not affect the {@link IShoppingSaleUnitStock final stock}.
   *
   * Another words, the descriptive option is just for information transfer.
   */
  export type IShoppingSaleUnitDescriptiveOption = {
    /**
     * Primary Key.
     *
     * @title Primary Key
     */
    id: string;
    /**
     * Type of descriptive option.
     *
     * Which typed value should be written when purchasing.
     *
     * @title Type of descriptive option
     */
    type: "string" | "number" | "boolean";
    /**
     * Readable name of the option.
     *
     * @title Readable name of the option
     */
    name: string;
  };
  /**
   * Selectable candidate values within an option.
   *
   * `IShoppingSaleUnitOptionCandidate` is an entity that represents individual
   * candidate values that can be selected from
   * {@link IShoppingSaleUnitSelectableOption options of the "select" type}.
   *
   * - Example
   *   - RAM: 8GB, 16GB, 32GB
   *   - GPU: RTX 3060, RTX 4080, TESLA
   *   - License: Private, Commercial, Educatiion
   *
   * By the way, if belonged option is not "select" type, this entity never
   * being used.
   */
  export type IShoppingSaleUnitOptionCandidate = {
    /**
     * Primary Key.
     *
     * @title Primary Key
     */
    id: string;
    /**
     * Represents the name of the candidate value.
     *
     * @title Represents the name of the candidate value
     */
    name: string;
  };
}
export type AutoViewInput = AutoViewInputSubTypes.IShoppingCartCommodity;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { sale, volume, price, created_at, orderable, pseudo } = value;

  // Title and image handling
  const title = sale.content.title;
  const thumbnail =
    sale.content.thumbnails[0]?.url ||
    `https://placehold.co/300x300/f8fafc/475569?text=${encodeURIComponent(
      title,
    )}`;

  // Meta information
  const sellerName = sale.seller.member.nickname;
  const sectionName = sale.section.name;
  const categoryNames = sale.categories.map((c) => c.name);
  const tagsList = sale.tags;

  // Flatten selected stocks across units
  const unitStocks = sale.units.flatMap((unit) => unit.stocks);

  // Date formatting
  const formattedDate = new Date(created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  // Price calculations
  const totalPrice = price.real * volume;
  const formatPrice = (n: number): string => `$${n.toFixed(2)}`;

  // Option summary (e.g., "Color: Red, Size: M")
  const getOptionSummary = (
    choices: AutoViewInputSubTypes.IShoppingSaleUnitStockChoice.IInvert[],
  ): string =>
    choices
      .map((choice) => {
        const label = choice.option.name;
        const val =
          "type" in choice.option && choice.option.type === "select"
            ? choice.candidate?.name
            : choice.value;
        return `${label}: ${val}`;
      })
      .filter(Boolean)
      .join(", ");

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md flex flex-col md:flex-row gap-4">
      {/* Product Image */}
      <div className="w-full md:w-1/4 flex-shrink-0">
        <img
          src={thumbnail}
          alt={title}
          className="w-full aspect-square object-cover rounded-md"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://placehold.co/300x300/f8fafc/475569?text=Image";
          }}
        />
      </div>

      {/* Details */}
      <div className="flex flex-col flex-1 justify-between">
        <div className="space-y-3">
          {/* Header: Title & Badges */}
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800 truncate">
              {title}
            </h2>
            <div className="flex items-center gap-2">
              {pseudo && (
                <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded">
                  Promo
                </span>
              )}
              {!orderable && (
                <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded">
                  Ordered
                </span>
              )}
            </div>
          </div>

          {/* Meta: Seller, Section, Added Date */}
          <div className="flex flex-wrap items-center text-sm text-gray-500 gap-4">
            <div className="flex items-center gap-1">
              <LucideReact.User size={16} className="text-gray-400" />
              <span>{sellerName}</span>
            </div>
            <div className="flex items-center gap-1">
              <LucideReact.Tag size={16} className="text-gray-400" />
              <span>{sectionName}</span>
            </div>
            <div className="flex items-center gap-1">
              <LucideReact.Calendar size={16} className="text-gray-400" />
              <span>{formattedDate}</span>
            </div>
          </div>

          {/* Categories */}
          {categoryNames.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {categoryNames.map((cat, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded"
                >
                  {cat}
                </span>
              ))}
            </div>
          )}

          {/* Tags */}
          {tagsList.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tagsList.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Stock Items */}
          <div className="divide-y divide-gray-200">
            {unitStocks.map((stock) => (
              <div
                key={stock.id}
                className="py-2 flex flex-col sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="text-gray-700">
                  <p className="font-medium">{stock.name}</p>
                  {stock.choices.length > 0 && (
                    <p className="text-xs text-gray-500">
                      {getOptionSummary(stock.choices)}
                    </p>
                  )}
                </div>
                <div className="mt-1 sm:mt-0 flex items-center gap-4 text-sm text-gray-500">
                  <span>Qty: {stock.quantity}</span>
                  <span>{formatPrice(stock.price.real)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer: Volume & Total Price */}
        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
          <div className="text-sm text-gray-600">Sets: {volume}</div>
          <div className="text-lg font-semibold text-gray-800">
            {formatPrice(totalPrice)}
          </div>
        </div>
      </div>
    </div>
  );
}

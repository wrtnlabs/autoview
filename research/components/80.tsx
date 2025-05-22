import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * Order application information.
   *
   * `IShoppingOrder` is an entity that embodies {@link IShoppingCustomer customer}'s
   * order application information. However, please note that at this time, you are
   * still at the "order application" stage and not the "order confirmation" stage.
   *
   * And as soon as a customer applies for an order, all
   * {@link IShoppingCartCommodity commodities} in the target shopping cart are
   * promoted to {@link IShoppingOrderGood goods}, and those good records are created
   * under this `IShoppingOrder`.
   *
   * Of course, not all commodities in the target shopping cart become
   * {@link IShoppingOrderGood}, but only those selected by the customer become the
   * {@link IShoppingOrderGood}.
   */
  export type IShoppingOrder = {
    /**
     * Primary Key.
     *
     * @title Primary Key
     */
    id: string;
    /**
     * Representative name of the order.
     *
     * @title Representative name of the order
     */
    name: string;
    /**
     * Customer who've applied for the order.
     *
     * @title Customer who've applied for the order
     */
    customer: AutoViewInputSubTypes.IShoppingCustomer;
    /**
     * List of goods in the order.
     *
     * @title List of goods in the order
     */
    goods: AutoViewInputSubTypes.IShoppingOrderGood[];
    /**
     * Price information including discounts.
     *
     * For reference, this price value has multiplied by the {@link volume} value.
     * Therefore, even if {@link volume} value is equal to the target
     * {@link IShoppingCartCommodity.volume}, this price value can be different
     * with the {@link IShoppingCartCommodity.price} value.
     *
     * @title Price information including discounts
     */
    price: AutoViewInputSubTypes.IShoppingOrderPrice;
    /**
     * Order completion and payment information.
     *
     * @title Order completion and payment information
     */
    publish: null | AutoViewInputSubTypes.IShoppingOrderPublish;
    /**
     * Creation time of the record.
     *
     * @title Creation time of the record
     */
    created_at: string;
  };
  /**
   * Customer information, but not a person but a connection basis.
   *
   * `IShoppingCustomer` is an entity that literally embodies the information of
   * those who participated in the market as customers. By the way, the
   * `IShoppingCustomer` does not mean a person, but a connection basis. Therefore,
   * even if the same person connects to the shopping mall multiple, multiple
   * records are created in `IShoppingCustomer`.
   *
   * The first purpose of this is to track the customer's inflow path in detail,
   * and it is for cases where the same person enters as a non-member,
   * {@link IShoppingCartCommodity puts items in the shopping cart} in advance,
   * and only authenticates their {@link IShoppingCitizen real name} or
   * registers/logs in at the moment of {@link IShoppingOrderPublish payment}.
   * It is the second. Lastly, it is to accurately track the activities that
   * a person performs at the shopping mall in various ways like below.
   *
   * - Same person comes from an {@link IShoppingExternalUser external service}
   * - Same person creates multiple accounts
   * - Same person makes a {@link IShoppingOrderPublish purchase} as a non-member with only {@link IShoppingCitizen real name authentication}
   * - Same person acts both {@link IShoppingSeller seller} and {@link IShoppingAdministrator admin} at the same time
   *
   * Therefore, `IShoppingCustomer` can have multiple records with the same
   * {@link IShoppingCitizen}, {@link IShoppingMember}, and
   * {@link IShoppingExternalUser}. Additionally, if a customer signs up for
   * membership after verifying their real name or signs up for our service after
   * being a user of an external service, all related records are changed at once.
   * Therefore, identification and tracking of customers can be done very
   * systematically.
   */
  export type IShoppingCustomer = {
    /**
     * Discriminant for the type of customer.
     *
     * @title Discriminant for the type of customer
     */
    type: "customer";
    /**
     * Membership information.
     *
     * If the customer has joined as a member.
     *
     * @title Membership information
     */
    member: null | AutoViewInputSubTypes.IShoppingMember;
    /**
     * Citizen information.
     *
     * If the customer has verified his real name and mobile number.
     *
     * @title Citizen information
     */
    citizen: null | AutoViewInputSubTypes.IShoppingCitizen;
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
   * Member Account.
   *
   * `IShoppingMember` is an entity that symbolizes the case when a
   * {@link IShoppingCustomer} signs up as a member of this shopping mall
   * system.
   *
   * If a `IShoppingMember` has seller or administrator property. it means that
   * the {@link IShoppingCustomer} has acting as a {@link IShoppingSeller seller}
   * or {@link IShoppingAdministrator administrator} at the same time.
   */
  export type IShoppingMember = {
    /**
     * Citizen information.
     *
     * Only when has verified as a citizen, with mobile number and real name.
     *
     * For reference, if the member has signed up as a seller or administrator,
     * this citizen information must be.
     *
     * @title Citizen information
     */
    citizen: null | AutoViewInputSubTypes.IShoppingCitizen;
    /**
     * Seller information.
     *
     * If the member also signed up as a seller.
     *
     * @title Seller information
     */
    seller: null | AutoViewInputSubTypes.IShoppingSeller;
    /**
     * Administrator information.
     *
     * If the member also signed up as an administrator.
     *
     * @title Administrator information
     */
    administrator: null | AutoViewInputSubTypes.IShoppingAdministrator;
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
  /**
   * Seller information.
   *
   * `IShoppingSeller` is an entity that embodies a person who registers
   * {@link IShoppingSale sales} to operate selling activities, with
   * {@link IShoppingMember membership} joining.
   *
   * For reference, unlike {@link IShoppingCustomer customers} which can
   * participate even without membership joining, seller must join membership
   * to operate sales. Also, seller must do the
   * {@link IShoppingCitizen real-name and mobile authentication}, too.
   */
  export type IShoppingSeller = {
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
    /**
     * Summary of seller information.
     */
    export type ISummary = {
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
  /**
   * Administrator account.
   *
   * `IShoppingAdministrator` is an entity that embodies a person who manages
   * the shopping mall system, with {@link IShoppingMember membership} joining.
   *
   * For reference, unlike {@link IShoppingCustomer customers} which can participate
   * even without membership joining, administrator must join membership to operate
   * managements. Also, administrator must perform the
   * {@link IShoppingCitizen real-name and mobile authentication}, too.
   */
  export type IShoppingAdministrator = {
    /**
     * Primary Key.
     *
     * @title Primary Key
     */
    id: string;
    /**
     * Creation time of record.
     *
     * Another words, the time when the administrator has signed up.
     *
     * @title Creation time of record
     */
    created_at: string;
  };
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
   * Information about the individual goods that make up your order.
   *
   * `IShoppingOrderGood` is an entity that represents each good ordered by a
   * {@link IShoppingCustomer customer}, and the record is created in the process
   * of upgrading the product {@link IShoppingCartCommodity commodity} in the
   * shopping cart to a good due to the customer's {@link IShoppingOrder order}
   * request.
   *
   * And `IShoppingOrderGood`, like {@link IShoppingCartCommodity}, is a concept
   * that corresponds to the listing {@link IShoppingSaleSnapshot sale snapshot}.
   *
   * For reference, `IShoppingOrderGood` also contains {@link volume} information
   * separately from the belonging {@link IShoppingCartCommodity.volume}. This is
   * because there are some cases where you put 3 books in your shopping cart and
   * then change them to 4 during the actual order application process. This is to
   * increase the reusability of the shopping cart by changing the volume attribute
   * of the current entity rather than directly changing the commodity information.
   *
   * In addition, `IShoppingOrderGood` becomes the most basic unit for the post-order
   * process, that is, after service (A/S). For example, after receiving a
   * customer's product, confirming the order is recorded in the {@link confirmed_at}
   * attribute. Additionally, `IShoppingOrderGood` is the unit in which customers
   * issues or request exchanges or refunds for ordered products.
   */
  export type IShoppingOrderGood = {
    /**
     * Primary Key.
     *
     * @title Primary Key
     */
    id: string;
    /**
     * Commodity that is the basis of the good.
     *
     * @title Commodity that is the basis of the good
     */
    commodity: AutoViewInputSubTypes.IShoppingCartCommodity;
    /**
     * Volume of the good.
     *
     * The value multiplied to {@link IShoppingCartCommodityStock.quantity}.
     * It's purpose is exactly same with {@link IShoppingCartCommodity.volume},
     * but rewritten because the {@link IShoppingCartCommodity} records are reusable
     * until payment.
     *
     * @title Volume of the good
     */
    volume: number & tags.Type<"int32">;
    /**
     * Price information including discounts and multiplied volume.
     *
     * @title Price information including discounts and multiplied volume
     */
    price: AutoViewInputSubTypes.IShoppingOrderPrice.ISummary;
    /**
     * State of delivery about the good.
     *
     * @title State of delivery about the good
     */
    state:
      | null
      | "none"
      | "underway"
      | "preparing"
      | "manufacturing"
      | "shipping"
      | "delivering"
      | "arrived";
    /**
     * Confirmation time of order good.
     *
     * When be confirmed, customer can't request refund or exchange.
     *
     * The confirmation be accomplished by following cases.
     *
     * - Customer does it directly.
     * - 14 days after the delivery.
     *
     * @title Confirmation time of order good
     */
    confirmed_at: null | (string & tags.Format<"date-time">);
  };
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
    export type ISummary = {
      price_range: AutoViewInputSubTypes.IShoppingSalePriceRange;
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
  /**
   * Price information of the order including discounts.
   */
  export type IShoppingOrderPrice = {
    /**
     * List of discount coupon ticket payments.
     *
     * @title List of discount coupon ticket payments
     */
    ticket_payments: AutoViewInputSubTypes.IShoppingCouponTicketPayment[];
    /**
     * Amount of the cash payment.
     *
     * @title Amount of the cash payment
     */
    cash: number;
    /**
     * Amount of the deposit payment.
     *
     * @title Amount of the deposit payment
     */
    deposit: number;
    /**
     * Amount of the mileage payment.
     *
     * @title Amount of the mileage payment
     */
    mileage: number;
    /**
     * Amount of the discount coupon ticket payment.
     *
     * @title Amount of the discount coupon ticket payment
     */
    ticket: number;
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
  export namespace IShoppingOrderPrice {
    /**
     * Summarized information of the order price.
     */
    export type ISummary = {
      /**
       * Amount of the cash payment.
       *
       * @title Amount of the cash payment
       */
      cash: number;
      /**
       * Amount of the deposit payment.
       *
       * @title Amount of the deposit payment
       */
      deposit: number;
      /**
       * Amount of the mileage payment.
       *
       * @title Amount of the mileage payment
       */
      mileage: number;
      /**
       * Amount of the discount coupon ticket payment.
       *
       * @title Amount of the discount coupon ticket payment
       */
      ticket: number;
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
  }
  /**
   * Discount coupon ticket payment details.
   *
   * `IShoppingCouponTicketPayment` is an entity that embodies the payment
   * information for the {@link IShoppingOrder order} of
   * {@link IShoppingCouponTicket}, and is used when a consumer uses the
   * discount coupon ticket he or she was issued to order and has the payment
   * amount deducted.
   *
   * And since {@link IShoppingOrder} itself is not an entity used in
   * situations where an order is completed, but rather an entity designed to
   * express an order request, the creation of this
   * `IShoppingCouponTicketPayment` record does not actually mean that the
   * attached ticket disappears. Until the {@link IShoppingCustomer customer}
   * {@link IShoppingOrderPublish.paid_at completes the payment} and confirms
   * the order, the ticket can be understood as a kind of deposit.
   *
   * Additionally, this record can be deleted by the customer reversing the
   * payment of the ticket, but it can also be deleted when the attribution
   * order itself is cancelled.
   */
  export type IShoppingCouponTicketPayment = {
    /**
     * Primary Key.
     *
     * @title Primary Key
     */
    id: string;
    /**
     * Target ticket.
     *
     * @title Target ticket
     */
    ticket: AutoViewInputSubTypes.IShoppingCouponTicket;
    /**
     * Creation time of the record.
     *
     * @title Creation time of the record
     */
    created_at: string;
  };
  /**
   * Discount coupon ticket issuance details.
   *
   * `IShoppingCouponTicket` is an entity that symbolizes
   * {@link IShoppingCoupon discount coupon} tickets issued by
   * {@link IShoppingCustomer customers}.
   *
   * And if the target discount coupon specification itself has an expiration
   * date, the expiration date is recorded in expired_at and is automatically
   * discarded after that expiration date. Of course, it doesn't matter if you
   * use the discount coupon for your order within the deadline.
   */
  export type IShoppingCouponTicket = {
    /**
     * Primary Key.
     *
     * @title Primary Key
     */
    id: string;
    /**
     * Customer who've taken the coupon ticket.
     *
     * @title Customer who've taken the coupon ticket
     */
    customer: AutoViewInputSubTypes.IShoppingCustomer;
    /**
     * Target coupon.
     *
     * @title Target coupon
     */
    coupon: AutoViewInputSubTypes.IShoppingCoupon;
    /**
     * Creation time of the record.
     *
     * @title Creation time of the record
     */
    created_at: string;
    /**
     * Expiration time of the ticket.
     *
     * @title Expiration time of the ticket
     */
    expired_at: null | (string & tags.Format<"date-time">);
  };
  /**
   * Discount coupon.
   *
   * `IShoppingCoupon` is an entity that symbolizes discount coupons at
   * a shopping mall.
   *
   * Note that, `IShoppingCoupon` only contains specification information
   * about discount coupons. Please keep in mind that this is a different
   * concept from {@link IShoppingCouponTicket}, which refers to the issuance
   * of a discount coupon, or {@link IShoppingCouponTicketPayment}, which
   * refers to its payment.
   *
   * Additionally, discount coupons are applied on an order-by-order basis,
   * but each has its own unique restrictions. For example, a coupon with
   * {@link IShoppingCouponSellerCriteria} may or may not be used only for
   * {@link IShoppingSale} of listings registered by the {@link IShoppingSeller}.
   * Also, there are restrictions such as
   * {@link IShoppingCouponDiscount.threshold minimum amount restrictions} for
   * using discount coupons and
   * {@link IShoppingCouponDiscount.limit maximum discount amount limits}.
   *
   * In addition, you can set whether to issue discount coupons publicly or
   * give them only to people who know the specific issuing code. In addition,
   * there are restrictions such as issued discount coupons having an
   * {@link IShoppingCouponRestriction.expired_at expiration date} or being
   * issued only to customers who came in through a
   * {@link IShoppingCouponFunnelCriteria specific funnel}.
   *
   * For more information, please refer to the properties below and the
   * subsidiary entities described later.
   */
  export type IShoppingCoupon = {
    /**
     * Primary Key.
     *
     * @title Primary Key
     */
    id: string;
    /**
     * Designer who've made the coupon.
     *
     * @title Designer who've made the coupon
     */
    designer:
      | AutoViewInputSubTypes.IShoppingAdministrator
      | AutoViewInputSubTypes.IShoppingSeller;
    /**
     * Inventory information.
     *
     * @title Inventory information
     */
    inventory: AutoViewInputSubTypes.IShoppingCouponInventory;
    /**
     * List of criteria information.
     *
     * @title List of criteria information
     */
    criterias: (
      | AutoViewInputSubTypes.IShoppingCouponSectionCriteria
      | AutoViewInputSubTypes.IShoppingCouponSellerCriteria
      | AutoViewInputSubTypes.IShoppingCouponSaleCriteria
      | AutoViewInputSubTypes.IShoppingCouponFunnelCriteria
    )[];
    /**
     * Discount information.
     *
     * @title Discount information
     */
    discount:
      | AutoViewInputSubTypes.IShoppingCouponDiscount.IAmount
      | AutoViewInputSubTypes.IShoppingCouponDiscount.IPercent;
    /**
     * Restriction information.
     *
     * @title Restriction information
     */
    restriction: AutoViewInputSubTypes.IShoppingCouponRestriction;
    /**
     * Representative name of the coupon.
     *
     * @title Representative name of the coupon
     */
    name: string;
    /**
     * Opening time of the coupon.
     *
     * @title Opening time of the coupon
     */
    opened_at: null | (string & tags.Format<"date-time">);
    /**
     * Closing time of the coupon.
     *
     * Tickets cannot be issued after this time.
     *
     * However, previously issued tickets can still be used until their
     * expiration date.
     *
     * @title Closing time of the coupon
     */
    closed_at: null | (string & tags.Format<"date-time">);
    /**
     * Creation tie of the record.
     *
     * @title Creation tie of the record
     */
    created_at: string;
  };
  /**
   * Inventory information of the coupon.
   *
   * If a {@link IShoppingCoupon coupon} has been designed with limited
   * inventory, this `IShoppingCouponInventory` structure represents the
   * remaining inventory information.
   */
  export type IShoppingCouponInventory = {
    /**
     * Remaining volume for everyone.
     *
     * If there is a limit to the quantity issued, it becomes impossible to
     * issue tickets exceeding this value.
     *
     * In other words, the concept of N coupons being issued on a first-come,
     * first-served basis is created.
     *
     * @title Remaining volume for everyone
     */
    volume: null | (number & tags.Type<"uint32">);
    /**
     * Remaining volume per citizen.
     *
     * As a limit to the total amount of issuance per person, it is common to
     * assign 1 to limit duplicate issuance to the same citizen, or to use the
     * `nul`` value to set no limit.
     *
     * Of course, by assigning a value of N, the total amount issued to the
     * same citizen can be limited.
     *
     * @title Remaining volume per citizen
     */
    volume_per_citizen: null | (number & tags.Type<"uint32">);
  };
  /**
   * Conditions for sections of discount coupons.
   *
   * `IShoppingCouponSectionCriteria` is a subtype entity of
   * {@link IShoppingCouponCriteriaBase} and is used when setting conditions
   * for a specific {@link IShoppingSection section}.
   *
   * If the {@link direction} value is "include", the coupon can only be used
   * for the target {@link sections}. Conversely, if it is "exclude", the
   * coupon cannot be used.
   */
  export type IShoppingCouponSectionCriteria = {
    /**
     * Target sections to include or exclude.
     *
     * @title Target sections to include or exclude
     */
    sections: AutoViewInputSubTypes.IShoppingSection[];
    /**
     * Descrimanator type.
     *
     * @title Descrimanator type
     */
    type: "section";
    /**
     * Direction of the criteria.
     *
     * @title Direction of the criteria
     */
    direction: "include" | "exclude";
  };
  /**
   * Conditions for sellers of discount coupons.
   *
   * `IShoppingCouponSellerCriteria` is a subtype entity of
   * {@link IShoppingCouponCriteriaBase} and is used when setting conditions
   * for a specific {@link IShoppingSeller seller}.
   *
   * If the {@link direction} value is "include", the coupon can only be used
   * for the target {@link sellers}. Conversely, if it is "exclude", the
   * coupon cannot be used.
   */
  export type IShoppingCouponSellerCriteria = {
    /**
     * Target sellers to include or exclude.
     *
     * @title Target sellers to include or exclude
     */
    sellers: AutoViewInputSubTypes.IShoppingSeller[];
    /**
     * Descrimanator type.
     *
     * @title Descrimanator type
     */
    type: "seller";
    /**
     * Direction of the criteria.
     *
     * @title Direction of the criteria
     */
    direction: "include" | "exclude";
  };
  /**
   * Conditions for sales of discount coupons.
   *
   * `IShoppingCouponSaleCriteria` is a subtype entity of
   * {@link IShoppingCouponCriteriaBase} and is used when setting conditions
   * for a specific {@link IShoppingSale sale}.
   *
   * If the {@link direction} value is "include", the coupon can only be used
   * for the target {@link sales}. Conversely, if it is "exclude", the
   * coupon cannot be used.
   */
  export type IShoppingCouponSaleCriteria = {
    /**
     * Target sales to include or exclude.
     *
     * @title Target sales to include or exclude
     */
    sales: AutoViewInputSubTypes.IShoppingSale.ISummary[];
    /**
     * Descrimanator type.
     *
     * @title Descrimanator type
     */
    type: "sale";
    /**
     * Direction of the criteria.
     *
     * @title Direction of the criteria
     */
    direction: "include" | "exclude";
  };
  export namespace IShoppingSale {
    /**
     * Summarized information of sale.
     *
     * This summarized information being used for pagination.
     */
    export type ISummary = {
      /**
       * Belonged section.
       *
       * @title Belonged section
       */
      section: AutoViewInputSubTypes.IShoppingSection;
      /**
       * Seller who has registered the sale.
       *
       * @title Seller who has registered the sale
       */
      seller: AutoViewInputSubTypes.IShoppingSeller.ISummary;
      /**
       * Price range of the unit.
       *
       * @title Price range of the unit
       */
      price_range: AutoViewInputSubTypes.IShoppingSalePriceRange;
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
      units: AutoViewInputSubTypes.IShoppingSaleUnit.ISummary[];
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
  export type IShoppingSalePriceRange = {
    lowest: AutoViewInputSubTypes.IShoppingPrice;
    highest: AutoViewInputSubTypes.IShoppingPrice;
  };
  /**
   * Limit the funnel of discount coupons.
   *
   * `ishoppingcouponfunnelcriteria` is a subtype entity of
   * {@link IShoppingCouponCriteria}, and is used when you want to issue or
   * exclude discount coupons only to {@link IShoppingCustomer customers} who
   * came from a specific path.
   *
   * And funnel restrictions are possible in 3 ways: The first is
   * {@link IShoppingCustomer.referrer}, and by parsing
   * {@link IShoppingCustomer.href}, which records the customer's access
   * address, restrictions can be made in units of specific URLs or variables.
   */
  export type IShoppingCouponFunnelCriteria = {
    /**
     * List of target funnels.
     *
     * @title List of target funnels
     */
    funnels: (
      | AutoViewInputSubTypes.IShoppingCouponFunnelCriteria.IValueFunnel
      | AutoViewInputSubTypes.IShoppingCouponFunnelCriteria.IVariableFunnel
    )[];
    /**
     * Descrimanator type.
     *
     * @title Descrimanator type
     */
    type: "funnel";
    /**
     * Direction of the criteria.
     *
     * @title Direction of the criteria
     */
    direction: "include" | "exclude";
  };
  export namespace IShoppingCouponFunnelCriteria {
    /**
     * Kind of funnel restriction by a value.
     */
    export type IValueFunnel = {
      /**
       * Kind of funnel restriction.
       *
       * @title Kind of funnel restriction
       */
      kind: "url" | "referrer";
      /**
       * Target value.
       *
       * @title Target value
       */
      value: string;
    };
    /**
     * Kind of funnel restriction by a variable.
     */
    export type IVariableFunnel = {
      /**
       * Kind of funnel restriction.
       *
       * @title Kind of funnel restriction
       */
      kind: "variable";
      /**
       * Target variable's key.
       *
       * @title Target variable's key
       */
      key: string;
      /**
       * Target variable's value.
       *
       * @title Target variable's value
       */
      value: string;
    };
  }
  export namespace IShoppingCouponDiscount {
    /**
     * Discount information with amount unit.
     */
    export type IAmount = {
      /**
       * Discount unit as amount.
       *
       * It means the order price would be discounted by the amount value.
       *
       * @title Discount unit as amount
       */
      unit: "amount";
      /**
       * Discount value as amount.
       *
       * @title Discount value as amount
       */
      value: number;
      /**
       * Minimum purchase amount for discount.
       *
       * When setting this value, discount coupons cannot be applied to
       * order totals that are less than this value.
       *
       * @title Minimum purchase amount for discount
       */
      threshold: null | (number & tags.Minimum<0>);
      /**
       * Maximum amount available for discount.
       *
       * When this value is set, no further discount will be given no
       * matter how much you order. This property would be meaningful
       * only when the {@link multiplicative} is `true`.
       *
       * @title Maximum amount available for discount
       */
      limit: null | (number & tags.ExclusiveMinimum<0>);
      /**
       * Multiplicative or not.
       *
       * If this property is `true`, the discount value would be multiplied
       * to the {@link IShoppingCartCommodity.volume} or
       * {@link IShoppingOrderGood.volume} value. Also, in that case,
       * the {@link limit} property would be meaningful.
       *
       * @title Multiplicative or not
       */
      multiplicative: boolean;
    };
    /**
     * Discount information with percent unit.
     */
    export type IPercent = {
      /**
       * Discount unit as percent.
       *
       * It means the order price would be discounted by the percent value.
       *
       * @title Discount unit as percent
       */
      unit: "percent";
      /**
       * Discount value as percent.
       *
       * @title Discount value as percent
       */
      value: number;
      /**
       * Minimum purchase amount for discount.
       *
       * When setting this value, discount coupons cannot be applied to
       * order totals that are less than this value.
       *
       * @title Minimum purchase amount for discount
       */
      threshold: null | (number & tags.Minimum<0>);
      /**
       * Maximum amount available for discount.
       *
       * When this value is set, no further discount will be given no
       * matter how much you order.
       *
       * @title Maximum amount available for discount
       */
      limit: null | (number & tags.ExclusiveMinimum<0>);
    };
  }
  /**
   * Restriction information of the coupon.
   */
  export type IShoppingCouponRestriction = {
    /**
     * Access level of coupon.
     *
     * - public: possible to find from public API
     * - private: unable to find from public API
     *   - arbitrarily assigned by the seller or administrator
     *   - issued from one-time link
     *
     * @title Access level of coupon
     */
    access: "public" | "private";
    /**
     * Exclusivity or not.
     *
     * An exclusive discount coupon refers to a discount coupon that has an
     * exclusive relationship with other discount coupons and can only be
     * used alone. That is, when an exclusive discount coupon is used, no
     * other discount coupon can be used for the same
     * {@link IShoppingOrder order} or {@link IShoppingOrderGood good}.
     *
     * Please note that this exclusive attribute is a very different concept
     * from multiplicative, which means whether the same coupon can be
     * multiplied and applied to multiple coupons of the same order, so
     * please do not confuse them.
     *
     * @title Exclusivity or not
     */
    exclusive: boolean;
    /**
     * Limited quantity issued.
     *
     * If there is a limit to the quantity issued, it becomes impossible
     * to issue tickets exceeding this value.
     *
     * In other words, the concept of N coupons being issued on
     * a first-come, first-served basis is created.
     *
     * @title Limited quantity issued
     */
    volume: null | (number & tags.Type<"uint32">);
    /**
     * Limited quantity issued per person.
     *
     * As a limit to the total amount of issuance per person, it is
     * common to assign 1 to limit duplicate issuance to the same citizen,
     * or to use the NULL value to set no limit.
     *
     * Of course, by assigning a value of N, the total amount issued
     * to the same citizen can be limited.
     *
     * @title Limited quantity issued per person
     */
    volume_per_citizen: null | (number & tags.Type<"uint32">);
    /**
     * Expiration day(s) value.
     *
     * The concept of expiring N days after a discount coupon ticket is issued.
     *
     * Therefore, customers must use the ticket within N days, if possible,
     * from the time it is issued.
     *
     * @title Expiration day(s) value
     */
    expired_in: null | (number & tags.Type<"uint32">);
    /**
     * Expiration date.
     *
     * A concept that expires after YYYY-MM-DD after a discount coupon ticket
     * is issued.
     *
     * Double restrictions are possible with expired_in, of which the one
     * with the shorter expiration date is used.
     *
     * @title Expiration date
     */
    expired_at: null | (string & tags.Format<"date-time">);
  };
  /**
   * Order completion and payment information.
   *
   * `IShoppingOrderPublish` is an entity that embodies the series of processes
   * in which a {@link IShoppingCustomer customer} pays for his or her
   * {@link IShoppingOrder order}, thereby completing the order. And only after
   * the order is {@link paid_at completed}, can the {@link IShoppingSeller seller}
   * recognize that the customer has purchased his product.
   *
   * By the way, please note that just because the `IShoppingOrderPublish` record
   * exists, it does not mean that the payment has been completed. Of course, with
   * "credit cards" and "Google Pay", payment application and payment occur at the
   * same time. However, there are some cases where payment is made after the
   * payment application, such as "bank transfer" or "virtual account payment".
   * Therefore, to see the completion of payment, be sure to check the
   * {@link paid_at} property.
   *
   * In addition, even after payment has been made, there may be cases where it is
   * suddenly cancelled, so please be aware of this as well.
   */
  export type IShoppingOrderPublish = {
    /**
     * List of deliveries.
     *
     * An {@link IShoppingOrder order} can be delivered in multiple times.
     * Of course, the opposite case is also possible, that a
     * {@link IShoppingDelivery delivery} can be composed of multiple orders.
     *
     * @title List of deliveries
     */
    deliveries: AutoViewInputSubTypes.IShoppingDelivery[];
    /**
     * State of the order, about the deliveries.
     *
     * @title State of the order, about the deliveries
     */
    state:
      | "none"
      | "underway"
      | "preparing"
      | "manufacturing"
      | "shipping"
      | "delivering"
      | "arrived";
    /**
     * Primary Key.
     *
     * @title Primary Key
     */
    id: string;
    /**
     * Creation time of the record.
     *
     * @title Creation time of the record
     */
    created_at: string;
    /**
     * Time when the order was paid.
     *
     * @title Time when the order was paid
     */
    paid_at: null | (string & tags.Format<"date-time">);
    /**
     * Time when the payment was cancelled.
     *
     * @title Time when the payment was cancelled
     */
    cancelled_at: null | (string & tags.Format<"date-time">);
    /**
     * Address where the {@link IShoppingOrderGood goods} to be delivered.
     *
     * @title Address where the {@link IShoppingOrderGood goods} to be delivered
     */
    address: AutoViewInputSubTypes.IShoppingAddress;
  };
  /**
   * Delivery information.
   *
   * When delivering {@link IShoppingOrderGood goods} to
   * {@link IShoppingCustomer customer}, {@link IShoppingSeller seller} can deliver
   * multiple {@link IShoppingSaleUnitStock stocks}, goods at once. Also, it is
   * possible to deliver a stock or good in multiple times due to physical restriction
   * like volume or weight problem.
   *
   * As you can see from above, the relationship between delivery with
   * {@link IShoppingOrder order} (or {@link IShoppingOrderGood good}) is not 1: 1 or
   * N: 1, but M: N. Entity `IShoppingDelivery` has been designed to represent such
   * relationship, by referencing target stocks or goods through subsidiary entity
   * {@link IShoppingDeliveryPiece}.
   *
   * Also, delivery does not end with only one step. It has multiple processes like
   * manufacturing, planning, shipping and delivering. Those steps are represented by
   * another subsidiary entity {@link IShoppingDeliveryJourney}.
   */
  export type IShoppingDelivery = {
    /**
     * Primary Key.
     *
     * @title Primary Key
     */
    id: string;
    /**
     * Seller who've delivered the goods.
     *
     * @title Seller who've delivered the goods
     */
    seller: AutoViewInputSubTypes.IShoppingSeller;
    /**
     * List of journeys of the delivery.
     *
     * @title List of journeys of the delivery
     */
    journeys: AutoViewInputSubTypes.IShoppingDeliveryJourney[];
    /**
     * List of pieces of the delivery.
     *
     * @title List of pieces of the delivery
     */
    pieces: AutoViewInputSubTypes.IShoppingDeliveryPiece[];
    /**
     * List of shippers of the delivery.
     *
     * @title List of shippers of the delivery
     */
    shippers: AutoViewInputSubTypes.IShoppingDeliveryShipper[];
    /**
     * State of the delivery.
     *
     * @title State of the delivery
     */
    state:
      | "none"
      | "underway"
      | "preparing"
      | "manufacturing"
      | "shipping"
      | "delivering"
      | "arrived";
    /**
     * Creation time of the record.
     *
     * @title Creation time of the record
     */
    created_at: string;
  };
  /**
   * Journey of delivery.
   *
   * `IShoppingDeliveryJourney` is a subsidiary entity of {@link IShoppingDelivery},
   * describing each journey of the delivery. For reference, the word journey
   * means each step of the delivery process, such as preparing, shipping, and
   * delivering {@link IShoppingOrderGood goods} to the
   * {@link IShoppingCustomer customer}.
   */
  export type IShoppingDeliveryJourney = {
    /**
     * Primary Key.
     *
     * @title Primary Key
     */
    id: string;
    /**
     * Creation time of the record.
     *
     * @title Creation time of the record
     */
    created_at: string;
    /**
     * Deletion time of the record.
     *
     * @title Deletion time of the record
     */
    deleted_at: null | (string & tags.Format<"date-time">);
    /**
     * Type of journey.
     *
     * - preparing
     * - manufacturing
     * - shipping
     * - delivering
     *
     * @title Type of journey
     */
    type: "preparing" | "manufacturing" | "shipping" | "delivering";
    /**
     * Title of journey.
     *
     * @title Title of journey
     */
    title: null | string;
    /**
     * Description of journey.
     *
     * @title Description of journey
     */
    description: null | string;
    /**
     * Start time of the journey.
     *
     * @title Start time of the journey
     */
    started_at: null | (string & tags.Format<"date-time">);
    /**
     * Completion time of the journey.
     *
     * @title Completion time of the journey
     */
    completed_at: null | (string & tags.Format<"date-time">);
  };
  /**
   * Which stocks are delivered.
   *
   * `IShoppingDeliveryPiece` is a subsidiary entity of {@link IShoppingDelivery},
   * describing how much quantity is delivered for each
   * {@link IShoppingSaleUnitStock stock} in {@link IShoppingOrder}.
   *
   * For reference, as an order can be delivered in multiple times due to volume
   * or weight problem, it is possible to have multiple `IShoppingDeliveryPiece`
   * records for a single stock.
   */
  export type IShoppingDeliveryPiece = {
    /**
     * Primary Key.
     *
     * @title Primary Key
     */
    id: string;
    /**
     * Target order's {@link IShoppingOrderPublish.id}.
     *
     * @title Target order's {@link IShoppingOrderPublish.id}
     */
    publish_id: string;
    /**
     * Target good's {@link IShoppingOrderGood.id}.
     *
     * @title Target good's {@link IShoppingOrderGood.id}
     */
    good_id: string;
    /**
     * Target stock's {@link IShoppingSaleUnitStock.id}.
     *
     * @title Target stock's {@link IShoppingSaleUnitStock.id}
     */
    stock_id: string;
    /**
     * Quantity of the stock.
     *
     * It can be precision value to express split shipping.
     *
     * @title Quantity of the stock
     */
    quantity: number;
  };
  export type IShoppingDeliveryShipper = {
    id: string & tags.Format<"uuid">;
    created_at: string & tags.Format<"date-time">;
    company: null | string;
    name: string;
    mobile: string;
  };
  /**
   * The address information.
   */
  export type IShoppingAddress = {
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
     * Mobile number to contact.
     *
     * @title Mobile number to contact
     */
    mobile: string;
    /**
     * Representative name of the address.
     *
     * Sometimes be receiver's name, and sometimes be place name.
     *
     * @title Representative name of the address
     */
    name: string;
    /**
     * Country name.
     *
     * @title Country name
     */
    country: string;
    /**
     * Province name.
     *
     * @title Province name
     */
    province: string;
    /**
     * City name.
     *
     * @title City name
     */
    city: string;
    /**
     * Department name.
     *
     * @title Department name
     */
    department: string;
    /**
     * Detailed address containing street name, building number, and room number.
     *
     * @title Detailed address containing street name, building number, and room number
     */
    possession: string;
    /**
     * Zip code, or postal code.
     *
     * @title Zip code, or postal code
     */
    zip_code: string;
    /**
     * Special description if required.
     *
     * @title Special description if required
     */
    special_note: null | string;
  };
}
export type AutoViewInput = AutoViewInputSubTypes.IShoppingOrder;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const orderDate = new Date(value.created_at).toLocaleString();
  const paid = value.publish?.paid_at != null;
  const statusLabel = paid ? "Paid" : "Pending";
  const statusIcon = paid ? (
    <LucideReact.CheckCircle className="text-green-500" size={16} />
  ) : (
    <LucideReact.Clock className="text-amber-500" size={16} />
  );
  const customerName =
    value.customer.citizen?.name ?? value.customer.member?.nickname ?? "Guest";
  const totalQuantity = value.goods.reduce((sum, g) => sum + g.volume, 0);
  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  const formattedTotal = currencyFormatter.format(value.price.real);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {value.name || `Order #${value.id}`}
        </h2>
        <div className="flex items-center space-x-1">
          {statusIcon}
          <span className="text-sm text-gray-600">{statusLabel}</span>
        </div>
      </div>

      {/* Meta */}
      <div className="flex items-center text-sm text-gray-600 space-x-2 mb-3">
        <LucideReact.Calendar size={16} />
        <span>{orderDate}</span>
      </div>
      <div className="flex items-center text-sm text-gray-600 space-x-2 mb-4">
        <LucideReact.User size={16} />
        <span>{customerName}</span>
      </div>

      {/* Items */}
      <div className="mb-4">
        <h3 className="font-medium text-gray-700 mb-2">
          Items ({value.goods.length})
        </h3>
        <ul className="divide-y divide-gray-200">
          {value.goods.map((good) => {
            const title = good.commodity.sale.content.title;
            const imgUrl =
              good.commodity.sale.content.thumbnails?.[0]?.url ??
              "https://placehold.co/80?text=No+Image";
            const itemPrice = currencyFormatter.format(good.price.real);
            return (
              <li
                key={good.id}
                className="flex items-center py-2 first:pt-0 last:pb-0"
              >
                <img
                  src={imgUrl}
                  alt={title}
                  className="w-12 h-12 object-cover rounded mr-3 flex-shrink-0"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      "https://placehold.co/80?text=No+Image";
                  }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {title}
                  </p>
                  <p className="text-sm text-gray-600">Qty: {good.volume}</p>
                </div>
                <p className="text-sm text-gray-800 ml-3">{itemPrice}</p>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Total */}
      <div className="flex justify-between items-center pt-3 border-t border-gray-200">
        <span className="text-sm font-medium text-gray-700">
          Total ({totalQuantity} items)
        </span>
        <div className="flex items-center space-x-1">
          <LucideReact.DollarSign
            className="text-gray-400"
            size={16}
            strokeWidth={1.5}
          />
          <span className="text-lg font-semibold text-gray-800">
            {formattedTotal}
          </span>
        </div>
      </div>
    </div>
  );
}

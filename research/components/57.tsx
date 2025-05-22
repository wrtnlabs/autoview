import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * A page.
   *
   * Collection of records with pagination indformation.
   */
  export type IPageIShoppingCoupon = {
    /**
     * Page information.
     *
     * @title Page information
     */
    pagination: AutoViewInputSubTypes.IPage.IPagination;
    /**
     * List of records.
     *
     * @title List of records
     */
    data: AutoViewInputSubTypes.IShoppingCoupon[];
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
  export type IShoppingSalePriceRange = {
    lowest: AutoViewInputSubTypes.IShoppingPrice;
    highest: AutoViewInputSubTypes.IShoppingPrice;
  };
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
}
export type AutoViewInput = AutoViewInputSubTypes.IPageIShoppingCoupon;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { pagination, data: coupons } = value;
  const startIndex = (pagination.current - 1) * pagination.limit + 1;
  const endIndex = Math.min(
    pagination.current * pagination.limit,
    pagination.records,
  );

  const formatDate = (iso: string | null): string =>
    iso
      ? new Date(iso).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "—";

  const formatDiscount = (
    d:
      | AutoViewInputSubTypes.IShoppingCouponDiscount.IAmount
      | AutoViewInputSubTypes.IShoppingCouponDiscount.IPercent,
  ): string =>
    d.unit === "amount" ? `${d.value.toLocaleString()} off` : `${d.value}% off`;

  const formatInventory = (vol: number | null): string =>
    vol === null ? "∞" : vol.toString();

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <div className="mb-4 text-sm text-gray-600">
        Showing {startIndex}–{endIndex} of {pagination.records} coupons
        <span className="ml-2">
          | Page {pagination.current} of {pagination.pages}
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {coupons.map((coupon) => (
          <div key={coupon.id} className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-gray-800 truncate">
              {coupon.name}
            </h2>
            <div className="flex items-center text-sm text-gray-600 mt-2">
              <LucideReact.Tag size={16} className="mr-1" />
              <span>{formatDiscount(coupon.discount)}</span>
              {coupon.discount.threshold !== null && (
                <span className="ml-2">min {coupon.discount.threshold}</span>
              )}
            </div>
            <div className="flex items-center text-sm text-gray-600 mt-2">
              <LucideReact.Package size={16} className="mr-1" />
              <span>
                Qty: {formatInventory(coupon.inventory.volume)} / per person:{" "}
                {formatInventory(coupon.inventory.volume_per_citizen)}
              </span>
            </div>
            <div className="flex items-center text-sm text-gray-600 mt-2">
              <LucideReact.Calendar size={16} className="mr-1" />
              <span>
                Valid: {formatDate(coupon.opened_at)} –{" "}
                {formatDate(coupon.closed_at)}
              </span>
            </div>
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center text-sm text-gray-600">
                {coupon.restriction.access === "public" ? (
                  <>
                    <LucideReact.Globe size={16} className="mr-1" />
                    <span>Public</span>
                  </>
                ) : (
                  <>
                    <LucideReact.Lock size={16} className="mr-1" />
                    <span>Private</span>
                  </>
                )}
              </div>
              {coupon.restriction.exclusive && (
                <span className="inline-flex items-center px-2 py-0.5 bg-red-100 text-red-800 text-xs font-medium rounded">
                  <LucideReact.Star size={12} className="mr-1 text-red-600" />
                  Exclusive
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

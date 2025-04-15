import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
/**
 * A page.
 *
 * Collection of records with pagination indformation.
*/
type IPageIShoppingCoupon = {
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
    data: IShoppingCoupon[];
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
type IShoppingCoupon = {
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
    designer: any | any;
    /**
     * Inventory information.
     *
     * @title Inventory information
    */
    inventory: IShoppingCouponInventory;
    /**
     * List of criteria information.
     *
     * @title List of criteria information
    */
    criterias: (any | any | any | any)[];
    /**
     * Discount information.
     *
     * @title Discount information
    */
    discount: any | any;
    /**
     * Restriction information.
     *
     * @title Restriction information
    */
    restriction: IShoppingCouponRestriction;
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
type IShoppingAdministrator = any;
type IShoppingSeller = any;
/**
 * Inventory information of the coupon.
 *
 * If a {@link IShoppingCoupon coupon} has been designed with limited
 * inventory, this `IShoppingCouponInventory` structure represents the
 * remaining inventory information.
*/
type IShoppingCouponInventory = {
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
type IShoppingCouponSectionCriteria = any;
type IShoppingCouponSellerCriteria = any;
type IShoppingCouponSaleCriteria = any;
type IShoppingCouponFunnelCriteria = any;
namespace IShoppingCouponDiscount {
    export type IAmount = any;
    export type IPercent = any;
}
/**
 * Restriction information of the coupon.
*/
type IShoppingCouponRestriction = {
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
type IAutoViewTransformerInputType = IPageIShoppingCoupon;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Extract coupons list from input data
  const coupons = input.data || [];

  // Convert each coupon into a DataListItem to display its details
  const dataListItems: IAutoView.IAutoViewDataListItemProps[] = coupons.map(coupon => {
    // Create an Avatar component to visually represent the coupon header.
    // We use the coupon name (or its first letter) to make it more recognizable.
    const avatar: IAutoView.IAutoViewAvatarProps = {
      type: "Avatar",
      name: coupon.name,
      size: 40, // Using one of the allowed sizes
      variant: "primary"
    };

    // Use a Markdown component to render the coupon name in header style.
    const nameHeader: IAutoView.IAutoViewMarkdownProps = {
      type: "Markdown",
      content: `# ${coupon.name}`
    };

    // Prepare inventory details with graceful fallback if values are null.
    const inventoryVolume = coupon.inventory.volume != null ? coupon.inventory.volume : "N/A";
    const inventoryPerCitizen = coupon.inventory.volume_per_citizen != null ? coupon.inventory.volume_per_citizen : "N/A";

    // Since the designer field is "any", we attempt to represent it as a string.
    const designerInfo =
      typeof coupon.designer === "string" ? coupon.designer : JSON.stringify(coupon.designer);

    // Compose a Markdown string that summarizes key coupon details.
    // Using markdown formatting for improved visual clarity.
    const detailsContent = `
**Designer:** ${designerInfo}  
**Inventory:** Volume: ${inventoryVolume}, Per Citizen: ${inventoryPerCitizen}  
**Opened:** ${coupon.opened_at ?? "Not set"}  
**Closed:** ${coupon.closed_at ?? "Not set"}  
**Created:** ${coupon.created_at}
    `.trim();

    const detailsMarkdown: IAutoView.IAutoViewMarkdownProps = {
      type: "Markdown",
      content: detailsContent
    };

    // The DataListItem's label can be an array of components for richer visuals.
    // Here we place the avatar and the markdown header together.
    return {
      type: "DataListItem",
      label: [avatar, nameHeader],
      value: detailsMarkdown
    };
  });

  // If no coupon data is available, prepare a fallback text component.
  let dataListComponent: IAutoView.IAutoViewComponentProps;
  if (dataListItems.length === 0) {
    dataListComponent = {
      type: "Text",
      // Using markdown-like content instead of plain text for better styling.
      content: "No coupons available."
    } as IAutoView.IAutoViewTextProps;
  } else {
    dataListComponent = {
      type: "DataList",
      childrenProps: dataListItems
    } as IAutoView.IAutoViewDataListProps;
  }

  // Create a Card Header to display an overall title and pagination summary.
  const pagination = input.pagination;
  const paginationInfo = `Page ${pagination.current} of ${pagination.pages} - Total coupons: ${pagination.records}`;
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: "Coupons List",
    description: paginationInfo
    // Optionally, a startElement could be added here for additional visuals.
  };

  // Embed the data list into the Card Content.
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: dataListComponent
  };

  // Finally, wrap the whole view in a Vertical Card for a neat, responsive layout.
  // VerticalCard is ideal for mobile as it stacks content vertically.
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [cardHeader, cardContent]
  };

  return verticalCard;
}

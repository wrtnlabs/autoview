import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
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
type IAutoViewTransformerInputType = IShoppingCoupon;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // We are assuming input is of type IShoppingCoupon.
  // We use a vertical card to aggregate the coupon information visually.
  // The vertical card will have a header displaying the coupon name and an icon,
  // and a content section that uses markdown to render key coupon details.

  // Create a CardHeader for the coupon:
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: input.name,
    description: `Coupon ID: ${input.id}`,
    // The startElement supports a limited set of types.
    // We choose an icon (e.g., "tag") to represent the coupon visually.
    startElement: {
      type: "Icon",
      id: "tag", // using a generic tag icon in kebab-case (without any prefix)
      size: 24,
      color: "blue"
    }
  };

  // Compose coupon details in Markdown format.
  // Using markdown enables us to style and structure text if needed.
  const markdownContentLines: string[] = [];
  
  // Designer information (we convert to string in case it's complex)
  markdownContentLines.push(`**Designer:** ${input.designer ? input.designer.toString() : "N/A"}`);
  
  // Inventory details
  if (input.inventory) {
    markdownContentLines.push("**Inventory:**");
    markdownContentLines.push(`- Remaining volume: ${input.inventory.volume ?? "N/A"}`);
    markdownContentLines.push(`- Volume per citizen: ${input.inventory.volume_per_citizen ?? "N/A"}`);
  }
  
  // Discount details are of an unknown shape (type any). Provide a simple indicator.
  if (input.discount) {
    markdownContentLines.push("**Discount:** Details available.");
  }
  
  // Restriction details
  if (input.restriction) {
    markdownContentLines.push("**Restrictions:**");
    markdownContentLines.push(`- Access: ${input.restriction.access}`);
    markdownContentLines.push(`- Exclusive: ${input.restriction.exclusive ? "Yes" : "No"}`);
    markdownContentLines.push(`- Volume Limit: ${input.restriction.volume ?? "N/A"}`);
    markdownContentLines.push(`- Volume per citizen: ${input.restriction.volume_per_citizen ?? "N/A"}`);
    markdownContentLines.push(`- Expires in (days): ${input.restriction.expired_in ?? "N/A"}`);
    markdownContentLines.push(`- Expired at: ${input.restriction.expired_at ?? "N/A"}`);
  }
  
  // Date information
  markdownContentLines.push("**Dates:**");
  markdownContentLines.push(`- Opened at: ${input.opened_at ?? "Not specified"}`);
  markdownContentLines.push(`- Closed at: ${input.closed_at ?? "Not specified"}`);
  markdownContentLines.push(`- Created at: ${input.created_at}`);

  // Optional: Add criteria info if available.
  if (input.criterias && input.criterias.length > 0) {
    markdownContentLines.push("**Criteria Information:**");
    markdownContentLines.push(`- Total criteria items: ${input.criterias.length}`);
  }

  // Combine all markdown lines into a single markdown string.
  const markdownContent = markdownContentLines.join("\n");

  // Create a CardContent component that contains the markdown component.
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    // We nest a markdown component to render rich text.
    childrenProps: {
      type: "Markdown",
      content: markdownContent
    }
  };

  // Compose the final vertical card component that aggregates header and content.
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [cardHeader, cardContent]
  };

  // Return the final UI component.
  return verticalCard;
}

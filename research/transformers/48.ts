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
  // In this implementation, we compose a vertical card to display a discount coupon in a visual and responsive way.
  // We use a CardHeader with an icon to visually represent the coupon and use a Markdown component for detailed data.
  // Finally, a CardFooter displays meta-information such as the record creation time.
  
  // Compose the header component with an icon on the left.
  // The header shows the coupon's name and a short description (using the coupon ID & open/closed time).
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: input.name,
    description: `Coupon ID: ${input.id}\nOpened: ${input.opened_at ?? "N/A"}\nClosed: ${input.closed_at ?? "N/A"}`,
    // Using an icon as a visual indicator, e.g. a "ticket" icon representing a discount coupon.
    startElement: {
      type: "Icon",
      id: "ticket", // icon id in kebab-case (assumed to be available from the icon set)
      size: 20,
      color: "blue"
    }
  };

  // Compose the content component using markdown to render structured coupon details.
  // We include inventory information, discount details, and restrictions.
  // JSON.stringify is used for discount if it is not a string; in production code you might want to further format discount details.
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    // The markdown format helps us to stylize the detailed text in a more engaging manner.
    childrenProps: {
      type: "Markdown",
      content: `
## Coupon Details

**Inventory:**
- Total Volume: ${input.inventory.volume !== null ? input.inventory.volume : "Unlimited"}
- Per Citizen: ${input.inventory.volume_per_citizen !== null ? input.inventory.volume_per_citizen : "No Limit"}

**Discount Information:**
\`\`\`json
${JSON.stringify(input.discount, null, 2)}
\`\`\`

**Restrictions:**
- Access: ${input.restriction.access}
- Exclusive: ${input.restriction.exclusive ? "Yes" : "No"}
- Volume Limit: ${input.restriction.volume !== null ? input.restriction.volume : "Unlimited"}
- Volume Per Citizen: ${input.restriction.volume_per_citizen !== null ? input.restriction.volume_per_citizen : "No Limit"}
- Expiration (days): ${input.restriction.expired_in !== null ? input.restriction.expired_in : "Not Set"}
- Expired At: ${input.restriction.expired_at !== null ? input.restriction.expired_at : "Not Set"}

${ input.criterias && input.criterias.length > 0 ? "### Criteria:\n" + input.criterias.map((criteria, index) => `- Criteria ${index + 1}: ${JSON.stringify(criteria)}`).join("\n") : "" }
`.trim()
    }
  };

  // Compose the footer component using a text component.
  // It shows the creation time and may include additional designer or meta data if needed.
  const cardFooter: IAutoView.IAutoViewCardFooterProps = {
    type: "CardFooter",
    childrenProps: {
      type: "Text",
      variant: "caption",
      // Display created_at information. We keep it simple and visually separate.
      content: `Created At: ${input.created_at}`
    }
  };

  // Now, compose a vertical card that aggregates the header, content, and footer components.
  // The vertical card is responsive and designed for mobile devices.
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [
      cardHeader,
      cardContent,
      cardFooter
    ]
  };

  // Return the final UI structure composed as a vertical card.
  return verticalCard;
}

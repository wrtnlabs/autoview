import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
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
        designer: any | any;
        /**
         * Inventory information.
         *
         * @title Inventory information
        */
        inventory: Schema.IShoppingCouponInventory;
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
        restriction: Schema.IShoppingCouponRestriction;
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
    export type IShoppingAdministrator = any;
    export type IShoppingSeller = any;
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
    export type IShoppingCouponSectionCriteria = any;
    export type IShoppingCouponSellerCriteria = any;
    export type IShoppingCouponSaleCriteria = any;
    export type IShoppingCouponFunnelCriteria = any;
    export namespace IShoppingCouponDiscount {
        export type IAmount = any;
        export type IPercent = any;
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
type IAutoViewTransformerInputType = Schema.IShoppingCoupon;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // Helper to display nullable numbers as "Unlimited" or the number.
    const formatVolume = (vol: number | null): string =>
        vol === null ? "Unlimited" : String(vol);

    // Map access level to chip color.
    const accessColor = input.restriction.access === "public" ? "success" : "error";

    // Build the header: show coupon name and an icon.
    const header: IAutoView.IAutoViewCardHeaderProps = {
        type: "CardHeader",
        title: input.name,
        // show coupon ID lightly in description
        description: `ID: ${input.id}`,
        startElement: {
            type: "Icon",
            id: "ticket-alt",   // FontAwesome ticket icon
            color: "teal",
            size: 20
        }
    };

    // Build a data list of core properties.
    const dataListItems: IAutoView.IAutoViewDataListItemProps[] = [
        {
            type: "DataListItem",
            label: { type: "Text", content: "Created", variant: "subtitle2" },
            value: { type: "Text", content: input.created_at, variant: "body2" }
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Valid From", variant: "subtitle2" },
            value: {
                type: "Text",
                content: input.opened_at ?? "N/A",
                variant: "body2"
            }
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Valid Until", variant: "subtitle2" },
            value: {
                type: "Text",
                content: input.closed_at ?? "N/A",
                variant: "body2"
            }
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Total Inventory", variant: "subtitle2" },
            value: {
                type: "Text",
                content: formatVolume(input.inventory.volume),
                variant: "body2"
            }
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Per-Customer Limit", variant: "subtitle2" },
            value: {
                type: "Text",
                content: formatVolume(input.inventory.volume_per_citizen),
                variant: "body2"
            }
        }
    ];

    const content: IAutoView.IAutoViewCardContentProps = {
        type: "CardContent",
        childrenProps: [
            {
                type: "DataList",
                childrenProps: dataListItems
            } as IAutoView.IAutoViewDataListProps,
            // Use markdown to render discount details as JSON for readability.
            {
                type: "Markdown",
                content:
                    "### Discount Details\n" +
                    "json\n" +
                    JSON.stringify(input.discount, null, 2) +
                    "\n```"
            } as IAutoView.IAutoViewMarkdownProps,
            // Similarly render criteria array if non-empty.
            ...(input.criterias.length > 0
                ? [
                      {
                          type: "Markdown",
                          content:
                              "### Coupon Criteria\n" +
                              "```json\n" +
                              JSON.stringify(input.criterias, null, 2) +
                              "\n```"
                      } as IAutoView.IAutoViewMarkdownProps
                  ]
                : [])
        ]
    };

    // Build a group of chips to show restriction flags.
    const chips: IAutoView.IAutoViewChipProps[] = [];

    // Access level chip
    chips.push({
        type: "Chip",
        label: `Access: ${input.restriction.access}`,
        color: accessColor,
        size: "small",
        variant: "filled"
    });

    // Exclusivity chip
    chips.push({
        type: "Chip",
        label: input.restriction.exclusive ? "Exclusive" : "Combinable",
        color: input.restriction.exclusive ? "error" : "info",
        size: "small",
        variant: "outlined"
    });

    // Volume restrictions
    if (input.restriction.volume !== null) {
        chips.push({
            type: "Chip",
            label: `Limit: ${input.restriction.volume}`,
            color: "warning",
            size: "small",
            variant: "outlined"
        });
    }
    if (input.restriction.volume_per_citizen !== null) {
        chips.push({
            type: "Chip",
            label: `Per-Customer: ${input.restriction.volume_per_citizen}`,
            color: "warning",
            size: "small",
            variant: "outlined"
        });
    }
    // Expiration by days or date
    if (input.restriction.expired_in !== null) {
        chips.push({
            type: "Chip",
            label: `${input.restriction.expired_in}d after issue`,
            color: "secondary",
            size: "small",
            variant: "outlined"
        });
    }
    if (input.restriction.expired_at !== null) {
        chips.push({
            type: "Chip",
            label: `Expires on ${input.restriction.expired_at}`,
            color: "error",
            size: "small",
            variant: "filled"
        });
    }

    const footer: IAutoView.IAutoViewCardFooterProps = {
        type: "CardFooter",
        childrenProps: {
            type: "ChipGroup",
            childrenProps: chips
        } as IAutoView.IAutoViewChipGroupProps
    };

    // Compose the vertical card
    const card: IAutoView.IAutoViewVerticalCardProps = {
        type: "VerticalCard",
        childrenProps: [header, content, footer]
    };

    return card;
}

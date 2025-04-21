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
    // Helper to create a DataListItem with a label and a simple text value
    const makeTextItem = (label: string, value: string): IAutoView.IAutoViewDataListItemProps => ({
        type: "DataListItem",
        label: { type: "Text", content: label },
        value: { type: "Text", content: value },
    });

    // Safely stringify designer info
    const designerStr = (() => {
        try {
            if (input.designer == null) return "N/A";
            if (typeof input.designer === "string") return input.designer;
            return JSON.stringify(input.designer);
        } catch {
            return String(input.designer);
        }
    })();

    // Determine discount display (percent or amount)
    const discountObj = input.discount as any;
    let discountStr = "N/A";
    if (discountObj != null) {
        if (typeof discountObj.percent === "number") {
            discountStr = `${discountObj.percent}%`;
        } else if (typeof discountObj.amount === "number") {
            discountStr = `$${discountObj.amount}`;
        } else {
            // Fallback to JSON
            discountStr = JSON.stringify(discountObj);
        }
    }

    // Count criteria entries
    const criteriaCount = Array.isArray(input.criterias) ? input.criterias.length : 0;

    // Normalize inventory values
    const invVolume = input.inventory.volume != null ? String(input.inventory.volume) : "Unlimited";
    const invPerCitizen = input.inventory.volume_per_citizen != null
        ? String(input.inventory.volume_per_citizen)
        : "Unlimited";

    // Normalize restriction values
    const restr = input.restriction;
    const accessStr = restr.access ?? "N/A";
    const exclusiveStr = restr.exclusive ? "Yes" : "No";
    const restrVolume = restr.volume != null ? String(restr.volume) : "Unlimited";
    const restrPerCitizen = restr.volume_per_citizen != null ? String(restr.volume_per_citizen) : "Unlimited";
    const expiredInStr = restr.expired_in != null ? `${restr.expired_in} days` : "N/A";
    const expiredAtStr = restr.expired_at ?? "N/A";

    // Dates
    const openedAt = input.opened_at ?? "N/A";
    const closedAt = input.closed_at ?? "N/A";
    const createdAt = input.created_at ?? "N/A";

    // Build a list of data items summarizing the coupon
    const dataItems: IAutoView.IAutoViewDataListItemProps[] = [
        makeTextItem("ID", input.id),
        makeTextItem("Designer", designerStr),
        makeTextItem("Inventory Volume", invVolume),
        makeTextItem("Per-Citizen Inventory", invPerCitizen),
        makeTextItem("Criteria Count", String(criteriaCount)),
        makeTextItem("Discount", discountStr),
        makeTextItem("Access Level", accessStr),
        makeTextItem("Exclusive", exclusiveStr),
        makeTextItem("Max Issued", restrVolume),
        makeTextItem("Per-Citizen Max", restrPerCitizen),
        makeTextItem("Expires In", expiredInStr),
        makeTextItem("Expires At", expiredAtStr),
        makeTextItem("Opened At", openedAt),
        makeTextItem("Closed At", closedAt),
        makeTextItem("Created At", createdAt),
    ];

    // Compose the DataList component
    const dataList: IAutoView.IAutoViewDataListProps = {
        type: "DataList",
        childrenProps: dataItems,
    };

    // Header with a coupon icon, name, and a subtitle
    const header: IAutoView.IAutoViewCardHeaderProps = {
        type: "CardHeader",
        title: input.name,
        description: `Coupon #${input.id}`,
        startElement: {
            type: "Icon",
            id: "ticket-alt", // FontAwesome ticket icon
            size: 24,
            color: "blue",
        },
    };

    // Card content wrapping the data list
    const content: IAutoView.IAutoViewCardContentProps = {
        type: "CardContent",
        childrenProps: dataList,
    };

    // Return a vertical card that is responsive and easy to read
    const card: IAutoView.IAutoViewVerticalCardProps = {
        type: "VerticalCard",
        childrenProps: [header, content],
    };

    return card;
}

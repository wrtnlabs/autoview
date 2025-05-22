import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
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
        inventory: AutoViewInputSubTypes.IShoppingCouponInventory;
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
export type AutoViewInput = AutoViewInputSubTypes.IShoppingCoupon;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const now = new Date();
  const openedAt = value.opened_at ? new Date(value.opened_at) : null;
  const closedAt = value.closed_at ? new Date(value.closed_at) : null;
  const restriction = value.restriction;

  // Format dates to a readable string
  const formatDateTime = (d: Date) =>
    d.toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const formattedCreatedAt = formatDateTime(new Date(value.created_at));
  const formattedOpenedAt = openedAt ? formatDateTime(openedAt) : "—";
  const formattedClosedAt = closedAt ? formatDateTime(closedAt) : "—";
  const formattedExpiredAt = restriction.expired_at
    ? formatDateTime(new Date(restriction.expired_at))
    : null;

  // Determine coupon status
  let statusText = "Unknown";
  let statusColor = "bg-gray-500";
  if (openedAt && now < openedAt) {
    statusText = "Not Yet Open";
    statusColor = "bg-yellow-500";
  } else if (closedAt && now > closedAt) {
    statusText = "Expired";
    statusColor = "bg-red-500";
  } else {
    statusText = "Active";
    statusColor = "bg-green-500";
  }

  // Summarize discount field (truncate JSON)
  const rawDiscount = (() => {
    try {
      return JSON.stringify(value.discount);
    } catch {
      return "-";
    }
  })();
  const discountSummary =
    rawDiscount.length > 50 ? rawDiscount.slice(0, 50) + "…" : rawDiscount;

  // Expiration restriction summary
  const expirationParts: string[] = [];
  if (restriction.expired_in != null) {
    expirationParts.push(`Expires in ${restriction.expired_in} day(s)`);
  }
  if (formattedExpiredAt) {
    expirationParts.push(`or on ${formattedExpiredAt}`);
  }
  const expirationText = expirationParts.join(" ");

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
      {/* Header */}
      <div className="mb-3">
        <h2 className="text-xl font-semibold text-gray-800 truncate">{value.name}</h2>
        <p className="text-sm text-gray-500">Created: {formattedCreatedAt}</p>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span className={`px-2 py-1 text-xs font-medium text-white ${statusColor} rounded-full`}>
          {statusText}
        </span>
        <span className="px-2 py-1 text-xs font-medium text-white bg-blue-500 rounded-full">
          {restriction.access === "public" ? "Public" : "Private"}
        </span>
        <span
          className={`px-2 py-1 text-xs font-medium text-white ${
            restriction.exclusive ? "bg-red-500" : "bg-green-500"
          } rounded-full`}
        >
          {restriction.exclusive ? "Exclusive" : "Stackable"}
        </span>
      </div>

      {/* Key Details Grid */}
      <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-700">
        <div>
          <p className="font-medium">Total Volume</p>
          <p>{value.inventory.volume != null ? value.inventory.volume : "Unlimited"}</p>
        </div>
        <div>
          <p className="font-medium">Per Citizen</p>
          <p>
            {value.inventory.volume_per_citizen != null
              ? value.inventory.volume_per_citizen
              : "Unlimited"}
          </p>
        </div>
        <div>
          <p className="font-medium">Criteria Count</p>
          <p>{value.criterias.length}</p>
        </div>
        <div>
          <p className="font-medium">Discount</p>
          <p className="text-gray-600 line-clamp-2">{discountSummary}</p>
        </div>
      </div>

      {/* Validity Period */}
      <div className="mb-4 text-sm text-gray-700">
        <p className="font-medium">Validity Period</p>
        <p>
          {formattedOpenedAt} – {formattedClosedAt}
        </p>
      </div>

      {/* Expiration Restriction */}
      {expirationText && (
        <div className="text-sm text-gray-700">
          <p className="font-medium">Expiration Restriction</p>
          <p>{expirationText}</p>
        </div>
      )}
    </div>
  );
}

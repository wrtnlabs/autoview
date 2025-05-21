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
  const formatDateTime = (iso?: string | null): string =>
    iso
      ? new Date(iso).toLocaleString(undefined, {
          dateStyle: 'medium',
          timeStyle: 'short',
        })
      : '-';

  const formatDate = (iso?: string | null): string =>
    iso
      ? new Date(iso).toLocaleDateString(undefined, {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })
      : '-';

  const truncate = (input: string, max = 60): string =>
    input.length > max ? input.slice(0, max).trimEnd() + '…' : input;

  const name = value.name;
  const createdAt = formatDateTime(value.created_at);
  const openedAt = formatDateTime(value.opened_at);
  const closedAt = formatDateTime(value.closed_at);
  const inventoryVolume =
    value.inventory.volume !== null ? value.inventory.volume : 'Unlimited';
  const inventoryPerCitizen =
    value.inventory.volume_per_citizen !== null
      ? value.inventory.volume_per_citizen
      : 'Unlimited';
  const criteriaCount = Array.isArray(value.criterias)
    ? value.criterias.length
    : 0;

  const { access, exclusive, expired_in, expired_at } = value.restriction;
  const accessBadgeColor =
    access === 'public' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  const exclusiveBadgeColor = exclusive
    ? 'bg-yellow-100 text-yellow-800'
    : 'bg-gray-100 text-gray-600';

  const expirationDisplay = expired_in
    ? `Expires in ${expired_in} day${expired_in > 1 ? 's' : ''}`
    : expired_at
    ? `Expires at ${formatDate(expired_at)}`
    : 'No expiration';

  // Discount display: safely stringify and truncate
  let discountStr = '-';
  try {
    const raw = JSON.stringify(value.discount);
    discountStr = truncate(raw, 50);
  } catch {
    discountStr = '-';
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6 mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-2 truncate">{name}</h2>
      <p className="text-sm text-gray-500 mb-4">Created: {createdAt}</p>
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 text-xs font-medium rounded ${accessBadgeColor}`}>
            {access === 'public' ? 'Public' : 'Private'}
          </span>
          <span className={`px-2 py-1 text-xs font-medium rounded ${exclusiveBadgeColor}`}>
            {exclusive ? 'Exclusive' : 'Non-Exclusive'}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-700">
          <div>
            <div className="font-medium">Valid From</div>
            <div className="text-gray-600">{openedAt}</div>
          </div>
          <div>
            <div className="font-medium">Valid Until</div>
            <div className="text-gray-600">{closedAt}</div>
          </div>
          <div>
            <div className="font-medium">Inventory</div>
            <div className="text-gray-600">
              Total: {inventoryVolume}
              <br />
              Per Person: {inventoryPerCitizen}
            </div>
          </div>
          <div>
            <div className="font-medium">Criteria</div>
            <div className="text-gray-600">{criteriaCount} rule{criteriaCount !== 1 ? 's' : ''}</div>
          </div>
        </div>
        <div>
          <div className="font-medium text-sm text-gray-700">Discount</div>
          <pre className="mt-1 text-xs text-gray-600 bg-gray-50 p-2 rounded line-clamp-2">
            {discountStr}
          </pre>
        </div>
        <div>
          <div className="font-medium text-sm text-gray-700">Restriction</div>
          <div className="text-gray-600">{expirationDisplay}</div>
        </div>
      </div>
    </div>
  );
}

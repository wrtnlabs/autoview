import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    export namespace IPageIShoppingSale {
        /**
         * A page.
         *
         * Collection of records with pagination indformation.
        */
        export type ISummary = {
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
            data: AutoViewInputSubTypes.IShoppingSale.ISummary[];
        };
    }
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
            parent: null | any;
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
}
export type AutoViewInput = AutoViewInputSubTypes.IPageIShoppingSale.ISummary;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { pagination, data: sales } = value;
  const { current, pages, records } = pagination;

  // Format ISO date strings into a readable "MMM D, YYYY" format or return 'N/A'
  function formatDate(dateStr: string | null): string {
    if (!dateStr) return "N/A";
    const d = new Date(dateStr);
    return d.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4">
      {/* Pagination Summary */}
      <div className="mb-4 text-sm text-gray-600">
        Page {current} of {pages} · {records} total sales
      </div>

      {/* Sales Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sales.map((sale) => {
          const { id, content, price_range, section, seller, tags, opened_at, closed_at, paused_at, suspended_at, latest } = sale;

          // Pick first thumbnail if available
          const firstThumb = content.thumbnails[0]?.url;
          // Display title
          const title = content.title;
          // Price display, using 'real' prices (could use 'nominal' if desired)
          const minPrice = price_range.lowest.real;
          const maxPrice = price_range.highest.real;
          const priceDisplay =
            minPrice === maxPrice
              ? `$${minPrice.toLocaleString()}`
              : `$${minPrice.toLocaleString()} – $${maxPrice.toLocaleString()}`;
          // Seller nickname
          const sellerName = seller.member.nickname;
          // Section name
          const sectionName = section.name;
          // Status badges
          const isPaused = paused_at !== null;
          const isSuspended = suspended_at !== null;
          // Dates
          const openDate = formatDate(opened_at);
          const closeDate = closed_at ? formatDate(closed_at) : "Ongoing";

          return (
            <div key={id} className="bg-white rounded-lg shadow hover:shadow-lg transition flex flex-col overflow-hidden">
              {firstThumb && (
                <img
                  src={firstThumb}
                  alt={title}
                  className="w-full h-40 object-cover"
                />
              )}
              <div className="p-4 flex flex-col flex-grow">
                <h2 className="text-lg font-semibold text-gray-800 truncate">
                  {title}
                </h2>
                <p className="text-sm text-gray-600 mt-1 truncate">
                  Section: {sectionName}
                </p>
                <p className="text-sm text-gray-600">Seller: {sellerName}</p>
                <p className="text-indigo-600 font-medium mt-2">{priceDisplay}</p>

                {/* Tags */}
                {tags.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Status Badges */}
                <div className="mt-3 flex flex-wrap gap-2">
                  {isPaused && (
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                      Paused
                    </span>
                  )}
                  {isSuspended && (
                    <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                      Suspended
                    </span>
                  )}
                  {!isPaused && !isSuspended && (
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                      Active
                    </span>
                  )}
                  {latest && (
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      Latest
                    </span>
                  )}
                </div>
              </div>

              {/* Dates Footer */}
              <div className="bg-gray-50 px-4 py-3 text-xs text-gray-500 border-t">
                <div>Opened: {openDate}</div>
                <div>Closes: {closeDate}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Simple Footer Pagination */}
      <div className="mt-6 text-center text-sm text-gray-600">
        Page {current} of {pages}
      </div>
    </div>
  );
}

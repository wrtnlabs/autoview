import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
}
export type AutoViewInput = AutoViewInputSubTypes.IPageIShoppingSale.ISummary;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { pagination, data } = value;

  const formatDate = (dateStr: string | null): string =>
    dateStr
      ? new Date(dateStr).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "-";

  const formatPrice = (num: number): string =>
    new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: "USD",
    }).format(num);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-gray-50">
      {/* Page header */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Sales Overview</h2>
        <p className="mt-1 text-sm text-gray-600">
          Page {pagination.current} of {pagination.pages} —{" "}
          {pagination.records.toLocaleString()} records
        </p>
      </div>

      {/* Grid of sale cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((sale) => {
          // Primary thumbnail or placeholder
          const thumb = sale.content.thumbnails[0];
          const imageUrl =
            thumb?.url ||
            "https://placehold.co/300x200/f8fafc/475569?text=Sale+Image";

          // Determine open date
          const openDate = sale.opened_at || sale.created_at;

          // Status badge logic
          const status =
            sale.suspended_at !== null
              ? {
                  label: "Suspended",
                  bg: "bg-red-100",
                  text: "text-red-800",
                  icon: (
                    <LucideReact.XCircle
                      className="inline-block text-red-500 mr-1"
                      size={16}
                    />
                  ),
                }
              : sale.paused_at !== null
                ? {
                    label: "Paused",
                    bg: "bg-yellow-100",
                    text: "text-yellow-800",
                    icon: (
                      <LucideReact.PauseCircle
                        className="inline-block text-yellow-500 mr-1"
                        size={16}
                      />
                    ),
                  }
                : {
                    label: sale.closed_at ? "Closed" : "Open",
                    bg: sale.closed_at ? "bg-gray-100" : "bg-green-100",
                    text: sale.closed_at ? "text-gray-800" : "text-green-800",
                    icon: sale.closed_at ? (
                      <LucideReact.XCircle
                        className="inline-block text-gray-500 mr-1"
                        size={16}
                      />
                    ) : (
                      <LucideReact.CheckCircle
                        className="inline-block text-green-500 mr-1"
                        size={16}
                      />
                    ),
                  };

          return (
            <div
              key={sale.id}
              className="flex flex-col bg-white rounded-lg shadow hover:shadow-md transition overflow-hidden"
            >
              {/* Image */}
              <div className="w-full aspect-video bg-gray-200 overflow-hidden">
                <img
                  src={imageUrl}
                  alt={sale.content.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      "https://placehold.co/300x200/f8fafc/475569?text=Image";
                  }}
                />
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold text-gray-800 truncate">
                  {sale.content.title}
                </h3>

                {/* Seller */}
                <div className="mt-2 text-sm text-gray-600 flex items-center">
                  <LucideReact.User
                    className="inline-block text-gray-500 mr-1"
                    size={16}
                  />
                  <span>{sale.seller.member.nickname}</span>
                </div>

                {/* Section */}
                <div className="mt-1 text-sm text-gray-600 flex items-center">
                  <LucideReact.MapPin
                    className="inline-block text-gray-500 mr-1"
                    size={16}
                  />
                  <span>{sale.section.name}</span>
                </div>

                {/* Price Range */}
                <div className="mt-3 text-base font-medium text-gray-800">
                  {formatPrice(sale.price_range.lowest.real)}
                  {sale.price_range.lowest.real !==
                  sale.price_range.highest.real ? (
                    <> – {formatPrice(sale.price_range.highest.real)}</>
                  ) : null}
                </div>

                {/* Status Badge */}
                <div className="mt-2 flex items-center text-sm">
                  {status.icon}
                  <span
                    className={`px-2 py-0.5 rounded text-xs font-medium ${status.bg} ${status.text}`}
                  >
                    {status.label}
                  </span>
                </div>

                {/* Categories */}
                <div className="mt-3 flex flex-wrap gap-2">
                  {sale.categories.map((cat) => (
                    <span
                      key={cat.id}
                      className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded"
                    >
                      {cat.name}
                    </span>
                  ))}
                </div>

                {/* Tags */}
                <div className="mt-3 flex flex-wrap gap-1 flex-grow">
                  {sale.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Opened Date */}
                <div className="mt-4 pt-2 border-t text-xs text-gray-500 flex items-center">
                  <LucideReact.Calendar
                    className="inline-block text-gray-400 mr-1"
                    size={14}
                  />
                  <span>Opened: {formatDate(openDate)}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

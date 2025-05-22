import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  export namespace IPageIShoppingSaleSnapshot {
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
      data: AutoViewInputSubTypes.IShoppingSaleSnapshot.ISummary[];
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
  export namespace IShoppingSaleSnapshot {
    /**
     * Summarized information of the sale snapshot.
     */
    export type ISummary = {
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
    };
  }
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
export type AutoViewInput =
  AutoViewInputSubTypes.IPageIShoppingSaleSnapshot.ISummary;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  const { current, pages, records } = value.pagination;
  const saleItems = value.data;

  const formatPriceRange = (
    range: AutoViewInputSubTypes.IShoppingSalePriceRange,
  ): string => {
    const low = range.lowest.real;
    const high = range.highest.real;
    return `${low.toLocaleString()} - ${high.toLocaleString()}`;
  };

  return (
    <div className="p-4 space-y-6">
      {/* Pagination Summary */}
      <div className="text-gray-600 text-sm">
        Page {current} of {pages} · {records.toLocaleString()} records
      </div>

      {/* Grid of Sale Snapshots */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {saleItems.map((item) => (
          <div
            key={item.snapshot_id}
            className="bg-white rounded-lg shadow overflow-hidden flex flex-col"
          >
            {/* Thumbnail & Latest Badge */}
            <div className="relative">
              <img
                src={
                  item.content.thumbnails[0]?.url ||
                  "https://placehold.co/300x300/f8fafc/475569?text=Product"
                }
                alt={item.content.title}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    "https://placehold.co/300x300/f8fafc/475569?text=Product";
                }}
                className="w-full aspect-square object-cover"
              />
              {item.latest && (
                <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                  Latest
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col flex-grow">
              <h2 className="text-gray-800 font-semibold text-lg truncate">
                {item.content.title}
              </h2>
              <div className="mt-2 text-gray-600 text-sm">
                Price: {formatPriceRange(item.price_range)}
              </div>

              {/* Tags */}
              <div className="mt-2 flex flex-wrap gap-1">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Categories */}
              <div className="mt-2 flex flex-wrap gap-1">
                {item.categories.map((cat) => (
                  <span
                    key={cat.id}
                    className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded"
                  >
                    {cat.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Units Count */}
            <div className="px-4 py-2 border-t border-gray-200 text-gray-600 text-sm flex items-center">
              <LucideReact.Box size={16} className="mr-1 text-gray-500" />
              Units: {item.units.length}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

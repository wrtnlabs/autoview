import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    export namespace IShoppingSale {
        /**
         * Creation information of sale.
        */
        export type ICreate = {
            /**
             * Belonged section's {@link IShoppingSection.code}.
             *
             * @title Belonged section's {@link IShoppingSection.code}
            */
            section_code: string;
            /**
             * Initial status of the sale.
             *
             * `null` or `undefined`: No restriction
             * `paused`: Starts with {@link ITimestamps.paused_at paused} status
             * `suspended`: Starts with {@link ITimestamps.suspended_at suspended} status
             *
             * @title Initial status of the sale
            */
            status?: null | "paused" | "suspended";
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
            /**
             * Description and image content describing the sale.
             *
             * @title Description and image content describing the sale
            */
            content: AutoViewInputSubTypes.IShoppingSaleContent.ICreate;
            /**
             * List of units.
             *
             * @title List of units
            */
            units: AutoViewInputSubTypes.IShoppingSaleUnit.ICreate[];
            /**
             * List of search tags.
             *
             * @title List of search tags
            */
            tags: string[];
            /**
             * List of target categories' {@link IShoppingChannelCategory.code}s.
             *
             * If empty, it means all categories of the channel is listing the sale.
             *
             * @title List of target categories' {@link IShoppingChannelCategory.code}s
            */
            category_codes: string[];
        };
    }
    export namespace IShoppingSaleContent {
        export type ICreate = {
            title: string;
            format: "html" | "md" | "txt";
            body: string;
            files: AutoViewInputSubTypes.IAttachmentFile.ICreate[];
            thumbnails: AutoViewInputSubTypes.IAttachmentFile.ICreate[];
        };
    }
    export namespace IAttachmentFile {
        export type ICreate = {
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
    }
    export namespace IShoppingSaleUnit {
        /**
         * Creation information of sale unit.
        */
        export type ICreate = {
            /**
             * List of options.
             *
             * @title List of options
            */
            options: (any | any)[];
            /**
             * List of final stocks.
             *
             * @title List of final stocks
            */
            stocks: AutoViewInputSubTypes.IShoppingSaleUnitStock.ICreate[];
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
    export namespace IShoppingSaleUnitSelectableOption {
        export type ICreate = any;
    }
    export namespace IShoppingSaleUnitDescriptiveOption {
        export type ICreate = any;
    }
    export namespace IShoppingSaleUnitStock {
        /**
         * Creation information of the stock.
        */
        export type ICreate = {
            /**
             * Representative name of the stock.
             *
             * @title Representative name of the stock
            */
            name: string;
            /**
             * Price of the stock.
             *
             * @title Price of the stock
            */
            price: AutoViewInputSubTypes.IShoppingPrice;
            /**
             * Initial inventory quantity.
             *
             * @title Initial inventory quantity
            */
            quantity: number & tags.Type<"int32">;
            /**
             * List of choices.
             *
             * Which candidate values being chosen for each option.
             *
             * @title List of choices
            */
            choices: AutoViewInputSubTypes.IShoppingSaleUnitStockChoice.ICreate[];
        };
    }
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
    export namespace IShoppingSaleUnitStockChoice {
        /**
         * Creation information of stock choice.
        */
        export type ICreate = {
            /**
             * Target option's index number in
             * {@link IShoppingSaleUnit.ICreate.options}.
            */
            option_index: number & tags.Type<"int32">;
            /**
             * Target candidate's index number in
             * {@link IShoppingSaleUnitSelectableOption.ICreate.candidates}.
            */
            candidate_index: number & tags.Type<"int32">;
        };
    }
}
export type AutoViewInput = AutoViewInputSubTypes.IShoppingSale.ICreate;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const statusLabel = value.status === "paused"
    ? "Paused"
    : value.status === "suspended"
      ? "Suspended"
      : "No Restriction";
  const statusColor =
    value.status === "paused"
      ? "bg-yellow-100 text-yellow-800"
      : value.status === "suspended"
        ? "bg-red-100 text-red-800"
        : "bg-green-100 text-green-800";

  const openedDate = value.opened_at ? new Date(value.opened_at) : null;
  const closedDate = value.closed_at ? new Date(value.closed_at) : null;
  const dateOptions: Intl.DateTimeFormatOptions = {
    year: "numeric", month: "short", day: "numeric",
    hour: "2-digit", minute: "2-digit"
  };
  const formattedOpened = openedDate
    ? openedDate.toLocaleString(undefined, dateOptions)
    : null;
  const formattedClosed = closedDate
    ? closedDate.toLocaleString(undefined, dateOptions)
    : null;

  const totalUnits = value.units.length;
  const totalStocks = value.units.reduce(
    (sum, unit) => sum + (unit.stocks?.length || 0),
    0
  );

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  return (
    <article className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      {/* Header: Title and Status */}
      <header className="mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          {value.content.title}
        </h2>
        <div className="mt-2 flex items-center space-x-2">
          <span className={`px-2 py-1 text-sm font-medium rounded ${statusColor}`}>
            {statusLabel}
          </span>
          <span className="text-sm text-gray-500">
            Section: {value.section_code}
          </span>
        </div>
      </header>

      {/* Date Range */}
      <div className="mb-4 text-sm text-gray-600">
        {formattedOpened && (
          <span>Open: {formattedOpened}</span>
        )}
        {formattedClosed ? (
          <span className="ml-4">Close: {formattedClosed}</span>
        ) : (
          <span className="ml-4">Close: Never</span>
        )}
      </div>

      {/* Thumbnails Preview */}
      {value.content.thumbnails && value.content.thumbnails.length > 0 && (
        <div className="mb-4 grid grid-cols-3 gap-2">
          {value.content.thumbnails.slice(0, 3).map((file, idx) => (
            <img
              key={idx}
              src={file.url}
              alt={file.name || `Thumbnail ${idx + 1}`}
              className="w-full h-24 object-cover rounded"
            />
          ))}
        </div>
      )}

      {/* Description (truncated) */}
      <section className="mb-4 text-gray-700">
        <p className="line-clamp-3 overflow-hidden whitespace-pre-wrap">
          {value.content.body}
        </p>
      </section>

      {/* Tags and Categories */}
      <div className="mb-4 flex flex-wrap gap-2">
        {value.tags.map((tag, idx) => (
          <span
            key={idx}
            className="px-2 py-1 bg-gray-100 text-gray-800 text-sm rounded"
          >
            {tag}
          </span>
        ))}
        {value.category_codes.map((cat, idx) => (
          <span
            key={`cat-${idx}`}
            className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded"
          >
            {cat}
          </span>
        ))}
      </div>

      {/* Summary Footer */}
      <footer className="pt-4 border-t border-gray-200 text-sm text-gray-600">
        <p>Units: {totalUnits}</p>
        <p>Stocks: {totalStocks}</p>
      </footer>
    </article>
  );
}

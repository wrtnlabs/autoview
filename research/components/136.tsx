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
  const statusMap: Record<string, string> = {
    paused: "Paused",
    suspended: "Suspended",
  };
  const statusLabel = value.status == null ? "No Restriction" : statusMap[value.status] || value.status;
  const openedDate = value.opened_at ? new Date(value.opened_at) : null;
  const closedDate = value.closed_at ? new Date(value.closed_at) : null;
  const periodLabel = openedDate
    ? closedDate
      ? `${openedDate.toLocaleDateString()} – ${closedDate.toLocaleDateString()}`
      : `Since ${openedDate.toLocaleDateString()}`
    : closedDate
    ? `Until ${closedDate.toLocaleDateString()}`
    : "Always Open";
  const thumbnailUrl = value.content.thumbnails[0]?.url;
  const bodySnippet =
    value.content.body.length > 120
      ? value.content.body.slice(0, 120).trim() + "…"
      : value.content.body;
  const categoryLabel =
    value.category_codes.length > 0
      ? value.category_codes.join(", ")
      : "All Categories";
  const unitSummaries = value.units.map((unit) => {
    const prices = unit.stocks.map((s) => s.price.real);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const priceLabel =
      min === max
        ? `$${min.toLocaleString()}`
        : `$${min.toLocaleString()} – $${max.toLocaleString()}`;
    return {
      name: unit.name,
      required: unit.required,
      priceLabel,
    };
  });
  const tagElements = value.tags.map((tag) => (
    <span
      key={tag}
      className="text-xs bg-gray-100 text-gray-800 rounded-full py-0.5 px-2"
    >
      {tag}
    </span>
  ));

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="md:flex">
        {thumbnailUrl && (
          <div className="md:flex-shrink-0">
            <img
              src={thumbnailUrl}
              alt={value.content.title || "Thumbnail"}
              className="h-48 w-full object-cover md:h-full md:w-48"
            />
          </div>
        )}
        <div className="p-4 flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 truncate">
              {value.content.title}
            </h2>
            <p className="mt-1 text-sm text-gray-600 line-clamp-3">
              {bodySnippet}
            </p>
            <div className="mt-2 space-y-1">
              <div className="text-sm text-gray-500">
                <span className="font-medium text-gray-700">Status:</span>{" "}
                {statusLabel}
              </div>
              <div className="text-sm text-gray-500">
                <span className="font-medium text-gray-700">Period:</span>{" "}
                {periodLabel}
              </div>
              <div className="text-sm text-gray-500">
                <span className="font-medium text-gray-700">Categories:</span>{" "}
                {categoryLabel}
              </div>
            </div>
            <div className="mt-3">
              <div className="flex flex-wrap gap-1">{tagElements}</div>
            </div>
            {unitSummaries.length > 0 && (
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-800">
                  Units ({unitSummaries.length})
                </h3>
                <ul className="mt-2 space-y-2">
                  {unitSummaries.map((u) => (
                    <li
                      key={u.name}
                      className="flex justify-between items-center text-sm"
                    >
                      <span className="truncate">{u.name}</span>
                      <span className="ml-2 text-green-600 font-medium">
                        {u.priceLabel}
                      </span>
                      {u.required && (
                        <span className="ml-2 text-xs bg-red-100 text-red-800 rounded-full py-0.5 px-2">
                          Required
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="mt-4 text-right">
            <span className="text-xs text-gray-400">
              Attachments: {value.content.files.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

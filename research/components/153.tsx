import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace IShoppingSale {
        /**
         * Creation information of sale.
        */
        export interface ICreate {
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
        }
    }
    export namespace IShoppingSaleContent {
        export interface ICreate {
            title: string;
            format: "html" | "md" | "txt";
            body: string;
            files: AutoViewInputSubTypes.IAttachmentFile.ICreate[];
            thumbnails: AutoViewInputSubTypes.IAttachmentFile.ICreate[];
        }
    }
    export namespace IAttachmentFile {
        export interface ICreate {
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
        }
    }
    export namespace IShoppingSaleUnit {
        /**
         * Creation information of sale unit.
        */
        export interface ICreate {
            /**
             * List of options.
             *
             * @title List of options
            */
            options: (AutoViewInputSubTypes.IShoppingSaleUnitSelectableOption.ICreate | AutoViewInputSubTypes.IShoppingSaleUnitDescriptiveOption.ICreate)[];
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
        }
    }
    export namespace IShoppingSaleUnitSelectableOption {
        /**
         * Creation information of the selectable option.
        */
        export interface ICreate {
            /**
             * Discriminant for the type of selectable option.
             *
             * @title Discriminant for the type of selectable option
            */
            type: "select";
            /**
             * Represents the name of the option.
             *
             * @title Represents the name of the option
            */
            name: string;
            /**
             * Whether the option is variable or not.
             *
             * When type of current option is "select", this attribute means whether
             * selecting different candidate value affects the final stock or not.
             *
             * @title Whether the option is variable or not
            */
            variable: boolean;
            /**
             * List of candidate values.
             *
             * @title List of candidate values
            */
            candidates: AutoViewInputSubTypes.IShoppingSaleUnitOptionCandidate.ICreate[];
        }
    }
    export namespace IShoppingSaleUnitOptionCandidate {
        /**
         * Creation information of the candidate value.
        */
        export interface ICreate {
            /**
             * Represents the name of the candidate value.
             *
             * @title Represents the name of the candidate value
            */
            name: string;
        }
    }
    export namespace IShoppingSaleUnitDescriptiveOption {
        /**
         * Creation information of the descriptive option.
        */
        export interface ICreate {
            /**
             * Type of descriptive option.
             *
             * Which typed value should be written when purchasing.
             *
             * @title Type of descriptive option
            */
            type: "string" | "number" | "boolean";
            /**
             * Readable name of the option.
             *
             * @title Readable name of the option
            */
            name: string;
        }
    }
    export namespace IShoppingSaleUnitStock {
        /**
         * Creation information of the stock.
        */
        export interface ICreate {
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
        }
    }
    /**
     * Shopping price interface.
    */
    export interface IShoppingPrice {
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
    }
    export namespace IShoppingSaleUnitStockChoice {
        /**
         * Creation information of stock choice.
        */
        export interface ICreate {
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
        }
    }
}
export type AutoViewInput = AutoViewInputSubTypes.IShoppingSale.ICreate;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const statusKey = value.status ?? "active";
  const statusMapping: Record<
    string,
    { text: string; icon: JSX.Element; color: string }
  > = {
    paused: {
      text: "Paused",
      icon: <LucideReact.Clock size={16} />,
      color: "text-amber-500",
    },
    suspended: {
      text: "Suspended",
      icon: <LucideReact.AlertTriangle size={16} />,
      color: "text-red-500",
    },
    active: {
      text: "Active",
      icon: <LucideReact.CheckCircle size={16} />,
      color: "text-green-500",
    },
  };
  const statusInfo = statusMapping[statusKey] || statusMapping.active;
  const openedAt = value.opened_at
    ? new Date(value.opened_at).toLocaleString()
    : "Not specified";
  const closedAt = value.closed_at
    ? new Date(value.closed_at).toLocaleString()
    : "Never";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-6 bg-white rounded-lg shadow-md space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <h2 className="text-2xl font-semibold text-gray-800">
          {value.content.title}
        </h2>
        <div className={`flex items-center gap-1 ${statusInfo.color}`}>
          {statusInfo.icon}
          <span className="text-sm font-medium">{statusInfo.text}</span>
        </div>
      </div>

      {/* Metadata */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <LucideReact.Calendar size={16} className="text-gray-400" />
          <span>Opens: {openedAt}</span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.Calendar size={16} className="text-gray-400" />
          <span>Closes: {closedAt}</span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.Tag size={16} className="text-gray-400" />
          <span>Section: {value.section_code}</span>
        </div>
      </div>

      {/* Content Body */}
      <p className="text-gray-700 line-clamp-3 whitespace-pre-wrap">
        {value.content.body}
      </p>

      {/* Thumbnails */}
      {value.content.thumbnails.length > 0 && (
        <div className="flex items-center gap-2">
          {value.content.thumbnails.slice(0, 3).map((thumb, idx) => (
            <img
              key={idx}
              src={thumb.url}
              alt={`${value.content.title} thumbnail`}
              className="w-20 h-20 object-cover rounded"
              onError={(e) =>
                (e.currentTarget.src =
                  "https://placehold.co/80x80/f1f5f9/64748b?text=No+Image")
              }
            />
          ))}
          {value.content.thumbnails.length > 3 && (
            <span className="text-sm text-gray-500">
              +{value.content.thumbnails.length - 3}
            </span>
          )}
        </div>
      )}

      {/* Tags */}
      {value.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {value.tags.map((tag, idx) => (
            <span
              key={idx}
              className="inline-flex items-center px-2 py-0.5 bg-blue-100 text-blue-800 text-xs font-medium rounded"
            >
              <LucideReact.Tag size={12} className="mr-1" />
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Categories */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium text-gray-700">Categories:</span>
        {value.category_codes.length > 0 ? (
          value.category_codes.map((code, idx) => (
            <span
              key={idx}
              className="inline-flex items-center px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded"
            >
              {code}
            </span>
          ))
        ) : (
          <span className="text-sm text-gray-500">All Categories</span>
        )}
      </div>

      {/* Units */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">Units</h3>
        {value.units.map((unit, uIndex) => {
          const realPrices = unit.stocks.map((s) => s.price.real);
          const minPrice = Math.min(...realPrices);
          const maxPrice = Math.max(...realPrices);
          const priceDisplay =
            minPrice === maxPrice
              ? `$${minPrice.toLocaleString()}`
              : `$${minPrice.toLocaleString()} - $${maxPrice.toLocaleString()}`;

          return (
            <div
              key={uIndex}
              className="p-4 bg-gray-50 rounded-lg border border-gray-100"
            >
              <div className="flex items-center justify-between">
                <h4 className="text-md font-medium text-gray-800 flex items-center gap-2">
                  {unit.name}
                  {unit.primary && (
                    <LucideReact.Star
                      className="text-yellow-400"
                      size={16}
                      aria-label="Primary"
                    />
                  )}
                  {unit.required && (
                    <LucideReact.Lock
                      className="text-red-500"
                      size={16}
                      aria-label="Required"
                    />
                  )}
                </h4>
                <span className="text-sm font-semibold text-gray-900">
                  {priceDisplay}
                </span>
              </div>
              <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-600">
                <div>Options: {unit.options.length}</div>
                <div>Variants: {unit.stocks.length}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

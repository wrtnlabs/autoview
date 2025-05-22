import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
      options: (
        | AutoViewInputSubTypes.IShoppingSaleUnitSelectableOption.ICreate
        | AutoViewInputSubTypes.IShoppingSaleUnitDescriptiveOption.ICreate
      )[];
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
    /**
     * Creation information of the selectable option.
     */
    export type ICreate = {
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
    };
  }
  export namespace IShoppingSaleUnitOptionCandidate {
    /**
     * Creation information of the candidate value.
     */
    export type ICreate = {
      /**
       * Represents the name of the candidate value.
       *
       * @title Represents the name of the candidate value
       */
      name: string;
    };
  }
  export namespace IShoppingSaleUnitDescriptiveOption {
    /**
     * Creation information of the descriptive option.
     */
    export type ICreate = {
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
    };
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
  const statusInfo = (() => {
    if (value.status === "paused") {
      return {
        label: "Paused",
        icon: <LucideReact.Clock size={16} className="text-amber-500" />,
        colorClass: "text-amber-500",
      };
    }
    if (value.status === "suspended") {
      return {
        label: "Suspended",
        icon: <LucideReact.AlertTriangle size={16} className="text-red-500" />,
        colorClass: "text-red-500",
      };
    }
    return {
      label: "No Restriction",
      icon: <LucideReact.CheckCircle size={16} className="text-green-500" />,
      colorClass: "text-green-500",
    };
  })();

  const openDate = value.opened_at
    ? new Date(value.opened_at).toLocaleString()
    : "No start date";
  const closeDate = value.closed_at
    ? new Date(value.closed_at).toLocaleString()
    : "No end date";

  const totalUnits = value.units.length;
  const totalOptions = value.units.reduce(
    (sum, unit) => sum + unit.options.length,
    0,
  );
  const totalStocks = value.units.reduce(
    (sum, unit) => sum + unit.stocks.length,
    0,
  );

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-6 bg-white rounded-lg shadow-md space-y-6 max-w-md mx-auto">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800">
          {value.content.title}
        </h2>
        <div className="text-sm text-gray-500">
          Section: {value.section_code}
        </div>
      </div>

      {/* Status */}
      <div className="flex items-center space-x-2">
        {statusInfo.icon}
        <span className={`text-sm font-medium ${statusInfo.colorClass}`}>
          {statusInfo.label}
        </span>
      </div>

      {/* Dates and Tags */}
      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
        <div className="flex items-center space-x-1">
          <LucideReact.Calendar size={16} className="text-gray-400" />
          <span>{openDate}</span>
        </div>
        <div className="flex items-center space-x-1">
          <LucideReact.Calendar size={16} className="text-gray-400" />
          <span>{closeDate}</span>
        </div>
        <div className="flex items-center space-x-1">
          <LucideReact.Tag size={16} className="text-blue-500" />
          <span>
            {value.tags.length > 0 ? value.tags.join(", ") : "No Tags"}
          </span>
        </div>
        {value.category_codes.length > 0 && (
          <div className="flex items-center space-x-1">
            <LucideReact.Tag size={16} className="text-green-500" />
            <span>{value.category_codes.join(", ")}</span>
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {value.content.thumbnails.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {value.content.thumbnails.slice(0, 3).map((file, idx) => (
            <img
              key={idx}
              src={file.url}
              alt={file.name || "Thumbnail"}
              className="w-full aspect-video object-cover rounded-md"
              onError={(e) => {
                e.currentTarget.src =
                  "https://placehold.co/400x300/f1f5f9/64748b?text=Thumbnail";
              }}
            />
          ))}
          {value.content.thumbnails.length > 3 && (
            <div className="flex items-center justify-center bg-gray-100 rounded-md text-gray-500 text-sm">
              +{value.content.thumbnails.length - 3} more
            </div>
          )}
        </div>
      )}

      {/* Description */}
      <p className="text-gray-700 text-sm line-clamp-3">{value.content.body}</p>

      {/* Summary Metrics */}
      <div className="grid grid-cols-3 gap-4 text-gray-600">
        <div className="flex items-center space-x-1">
          <LucideReact.Package size={16} className="text-gray-500" />
          <span>{totalUnits} Units</span>
        </div>
        <div className="flex items-center space-x-1">
          <LucideReact.Sliders size={16} className="text-gray-500" />
          <span>{totalOptions} Options</span>
        </div>
        <div className="flex items-center space-x-1">
          <LucideReact.ShoppingCart size={16} className="text-gray-500" />
          <span>{totalStocks} Stocks</span>
        </div>
      </div>
    </div>
  );
}

import LucideReact from "lucide-react";
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
  const statusMap: Record<string, { label: string; icon: JSX.Element }> = {
    no_restriction: {
      label: "No Restriction",
      icon: <LucideReact.Circle className="text-gray-400" size={16} />,
    },
    paused: {
      label: "Paused",
      icon: <LucideReact.Clock className="text-amber-500" size={16} />,
    },
    suspended: {
      label: "Suspended",
      icon: <LucideReact.AlertTriangle className="text-red-500" size={16} />,
    },
  };
  const key = value.status ?? "no_restriction";
  const statusInfo = statusMap[key] || statusMap.no_restriction;
  const openedAt = value.opened_at
    ? new Date(value.opened_at).toLocaleString()
    : "Not specified";
  const closedAt = value.closed_at
    ? new Date(value.closed_at).toLocaleString()
    : "Forever";
  const thumbnails = value.content.thumbnails || [];
  const firstThumbnails = thumbnails.slice(0, 3);
  const placeholderUrl =
    "https://placehold.co/300x300/f8fafc/475569?text=Sale+Image";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-6 bg-white rounded-lg shadow-md space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <h2 className="text-xl font-semibold text-gray-800">
          {value.content.title}
        </h2>
        <div className="flex items-center gap-1 text-sm text-gray-600">
          {statusInfo.icon}
          <span>{statusInfo.label}</span>
        </div>
      </div>

      {/* Section & Dates */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <LucideReact.Tag size={16} className="text-gray-400" />
          <span>Section:</span>
          <span className="font-medium text-gray-700">
            {value.section_code}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.Calendar size={16} className="text-gray-400" />
          <span>Opens:</span>
          <span className="font-medium text-gray-700">{openedAt}</span>
        </div>
        <div className="flex items-center gap-1">
          <LucideReact.Calendar size={16} className="text-gray-400" />
          <span>Closes:</span>
          <span className="font-medium text-gray-700">{closedAt}</span>
        </div>
      </div>

      {/* Content Preview */}
      <div className="prose prose-sm max-w-none line-clamp-3 text-gray-700">
        {/* Render plain or truncated content */}
        {value.content.body}
      </div>

      {/* Thumbnails */}
      {firstThumbnails.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {firstThumbnails.map((thumb, idx) => (
            <img
              key={idx}
              src={thumb.url}
              alt={thumb.name || `Thumbnail ${idx + 1}`}
              className="w-full h-24 object-cover rounded"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = placeholderUrl;
              }}
            />
          ))}
        </div>
      )}

      {/* Tags & Categories */}
      <div className="flex flex-wrap gap-2">
        {value.tags.length > 0 &&
          value.tags.map((tag, i) => (
            <span
              key={`tag-${i}`}
              className="flex items-center bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
            >
              <LucideReact.Tag size={12} className="mr-1 text-gray-400" />
              {tag}
            </span>
          ))}
        {value.category_codes.length > 0 &&
          value.category_codes.map((code, i) => (
            <span
              key={`cat-${i}`}
              className="flex items-center bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full"
            >
              <LucideReact.Tag size={12} className="mr-1 text-blue-400" />
              {code}
            </span>
          ))}
      </div>

      {/* Units & Stocks */}
      {value.units.length > 0 && (
        <div className="space-y-4">
          {value.units.map((unit, ui) => (
            <div key={ui} className="border-t pt-4 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-800">
                  {unit.name}
                </h3>
                <div className="flex items-center gap-2 text-sm">
                  {unit.primary && (
                    <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                      Primary
                    </span>
                  )}
                  {unit.required && (
                    <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded-full">
                      Required
                    </span>
                  )}
                </div>
              </div>
              {/* Options */}
              {unit.options.length > 0 && (
                <ul className="text-sm text-gray-600 space-y-1">
                  {unit.options.map((opt, oi) => (
                    <li key={oi} className="flex items-center gap-2">
                      {opt.type === "select" ? (
                        <>
                          <LucideReact.ListChecks
                            size={16}
                            className="text-gray-400"
                          />
                          <span>
                            {opt.name} (choices: {opt.candidates.length})
                          </span>
                        </>
                      ) : (
                        <>
                          <LucideReact.Edit3
                            size={16}
                            className="text-gray-400"
                          />
                          <span>
                            {opt.name} ({opt.type})
                          </span>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              )}
              {/* Stocks */}
              {unit.stocks.length > 0 && (
                <div className="space-y-2">
                  {unit.stocks.map((stock, si) => {
                    const nominal = stock.price.nominal.toLocaleString();
                    const real = stock.price.real.toLocaleString();
                    const savings =
                      stock.price.nominal > stock.price.real
                        ? (
                            stock.price.nominal - stock.price.real
                          ).toLocaleString()
                        : null;
                    const choiceLabels = stock.choices
                      .map((c) => {
                        const o = unit.options[c.option_index];
                        const candidate =
                          "candidates" in o && o.candidates[c.candidate_index];
                        return (
                          o.name + (candidate ? `: ${candidate.name}` : "")
                        );
                      })
                      .join(", ");
                    return (
                      <div
                        key={si}
                        className="p-3 bg-gray-50 rounded-lg flex flex-col sm:flex-row sm:justify-between sm:items-center"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-800">
                              {stock.name}
                            </span>
                            <span className="text-sm text-gray-600">
                              ×{stock.quantity}
                            </span>
                          </div>
                          <div className="flex items-baseline gap-2 text-sm">
                            <span className="font-semibold text-gray-800">
                              ${real}
                            </span>
                            {stock.price.nominal > stock.price.real && (
                              <>
                                <span className="text-gray-500 line-through">
                                  ${nominal}
                                </span>
                                <span className="text-red-500">
                                  save ${savings}
                                </span>
                              </>
                            )}
                          </div>
                          {choiceLabels && (
                            <div className="text-xs text-gray-500 truncate">
                              {choiceLabels}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

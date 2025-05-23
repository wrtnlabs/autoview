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
  const openedAtFormatted = value.opened_at
    ? new Date(value.opened_at).toLocaleString()
    : 'None';
  const closedAtFormatted = value.closed_at
    ? new Date(value.closed_at).toLocaleString()
    : 'No end';
  const statusText = value.status ?? 'active';

  // Helper to derive choice labels for a stock
  const getChoiceLabels = (
    choices: AutoViewInputSubTypes.IShoppingSaleUnitStockChoice.ICreate[],
    options: (
      | AutoViewInputSubTypes.IShoppingSaleUnitSelectableOption.ICreate
      | AutoViewInputSubTypes.IShoppingSaleUnitDescriptiveOption.ICreate
    )[]
  ): string =>
    choices
      .map((choice) => {
        const opt = options[choice.option_index];
        if (
          opt &&
          (opt as AutoViewInputSubTypes.IShoppingSaleUnitSelectableOption.ICreate)
            .type === 'select'
        ) {
          const selectOpt = opt as AutoViewInputSubTypes.IShoppingSaleUnitSelectableOption.ICreate;
          return selectOpt.candidates[choice.candidate_index]?.name ?? '';
        }
        return '';
      })
      .filter(Boolean)
      .join(', ');

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800 truncate">
          {value.content.title}
        </h2>
        <div className="flex items-center text-sm">
          {statusText === 'paused' && (
            <LucideReact.PauseCircle className="text-yellow-500" size={16} />
          )}
          {statusText === 'suspended' && (
            <LucideReact.XCircle className="text-red-500" size={16} />
          )}
          {statusText === 'active' && (
            <LucideReact.CheckCircle className="text-green-500" size={16} />
          )}
          <span className="ml-1 capitalize text-gray-600">{statusText}</span>
        </div>
      </div>

      {/* Dates */}
      <div className="mt-2 flex items-center text-sm text-gray-500">
        <LucideReact.Calendar size={16} />
        <span className="ml-1">
          {openedAtFormatted} – {closedAtFormatted}
        </span>
      </div>

      {/* Content Preview */}
      <div className="mt-4 flex flex-col md:flex-row gap-4">
        {value.content.thumbnails && value.content.thumbnails.length > 0 ? (
          <img
            src={value.content.thumbnails[0].url}
            alt={value.content.title}
            className="w-full md:w-1/3 aspect-square object-cover rounded"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                'https://placehold.co/400x300/f1f5f9/64748b?text=Sale';
            }}
          />
        ) : (
          <div className="w-full md:w-1/3 aspect-square bg-gray-100 rounded flex items-center justify-center text-gray-400">
            <LucideReact.ImageOff size={48} />
          </div>
        )}
        <p className="flex-1 text-gray-700 text-sm line-clamp-3">
          {value.content.body}
        </p>
      </div>

      {/* Tags */}
      <div className="mt-4 flex flex-wrap gap-2">
        {value.tags.map((tag) => (
          <span
            key={tag}
            className="flex items-center text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded"
          >
            <LucideReact.Tag size={12} className="mr-1" />
            {tag}
          </span>
        ))}
      </div>

      {/* Units */}
      <div className="mt-6">
        <h3 className="text-lg font-medium text-gray-800">Units</h3>
        <ul className="mt-2 divide-y divide-gray-200">
          {value.units.map((unit, idx) => (
            <li key={idx} className="py-3">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-800">
                  {unit.name}
                </span>
                <div className="flex items-center space-x-2 text-xs">
                  {unit.primary && (
                    <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded-full">
                      Primary
                    </span>
                  )}
                  {unit.required && (
                    <span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded-full">
                      Required
                    </span>
                  )}
                </div>
              </div>

              {/* Options List */}
              <div className="mt-2">
                <span className="text-sm text-gray-600">Options:</span>
                <ul className="mt-1 list-disc list-inside text-sm text-gray-600">
                  {unit.options.map((opt, oIdx) => (
                    <li key={oIdx}>
                      {opt.type === 'select' ? (
                        <>
                          <span className="font-medium">{opt.name}:</span>{' '}
                          {(
                            (opt as AutoViewInputSubTypes.IShoppingSaleUnitSelectableOption.ICreate)
                              .candidates
                          )
                            .map((c) => c.name)
                            .join(', ')}
                        </>
                      ) : (
                        <>
                          <span className="font-medium">{opt.name}</span>{' '}
                          <span className="italic text-gray-500">
                            ({opt.type})
                          </span>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Stocks List */}
              <div className="mt-2">
                <span className="text-sm text-gray-600">Stocks:</span>
                <ul className="mt-1 space-y-1 text-sm">
                  {unit.stocks.map((stock, sIdx) => {
                    const choiceLabels = getChoiceLabels(
                      stock.choices,
                      unit.options
                    );
                    return (
                      <li
                        key={sIdx}
                        className="flex flex-col md:flex-row md:items-center md:justify-between"
                      >
                        <div className="text-gray-700">
                          {choiceLabels || 'Default'}
                        </div>
                        <div className="flex items-center space-x-4 mt-1 md:mt-0">
                          <div className="text-gray-700">
                            {stock.price.nominal > stock.price.real ? (
                              <span>
                                <span className="line-through text-gray-500 mr-1">
                                  ${stock.price.nominal.toFixed(2)}
                                </span>
                                <span className="text-green-600">
                                  ${stock.price.real.toFixed(2)}
                                </span>
                              </span>
                            ) : (
                              <span>
                                ${stock.price.real.toFixed(2)}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center text-gray-500">
                            <LucideReact.Box size={16} className="mr-1" />
                            <span>Qty: {stock.quantity}</span>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

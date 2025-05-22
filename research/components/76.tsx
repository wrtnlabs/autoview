import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    export namespace IShoppingCartCommodity {
        /**
         * Creation information of a shopping cart commodity.
        */
        export type ICreate = {
            /**
             * Target sale's {@link IShoppingSale.id}.
             *
             * @title Target sale's {@link IShoppingSale.id}
            */
            sale_id: string;
            /**
             * List of the stocks to be purchased.
             *
             * @title List of the stocks to be purchased
            */
            stocks: AutoViewInputSubTypes.IShoppingCartCommodityStock.ICreate[];
            /**
             * Volume of the commodity to purchase.
             *
             * A value indicating how many sets would be multiplied to the children
             * {@link IShoppingSaleUnitStock.IInvert.quantity} values.
             *
             * @title Volume of the commodity to purchase
            */
            volume: number & tags.Type<"int32">;
            /**
             * Whether to accumulate the volume or not.
             *
             * If this attribute is not `false` and there's same commodity that
             * composed with same stocks and options, then the volume will be
             * accumulated to the existed one.
             *
             * Otherwise, duplicated commodity would be newly created.
             *
             * @title Whether to accumulate the volume or not
            */
            accumulate?: null | boolean;
        };
    }
    export namespace IShoppingCartCommodityStock {
        /**
         * Creation information of the commodity stock of shopping cart.
         *
         * When record being created, its corresponding structure would be
         * {@link IShoppingSaleSnapshotUnit.IInvert} and
         * {@link IShoppingSaleSnapshotUnitStock.IInvert}.
        */
        export type ICreate = {
            /**
             * Target unit's {@link IShoppingSaleUnit.id}.
             *
             * @title Target unit's {@link IShoppingSaleUnit.id}
            */
            unit_id: string;
            /**
             * Target stock's {@link IShoppingSaleUnitStock.id}.
             *
             * It must be matched with the {@link choices} property.
             *
             * @title Target stock's {@link IShoppingSaleUnitStock.id}
            */
            stock_id: string;
            /**
             * Creation information of the choices for each descriptive option.
             *
             * If target option is not of descriptive but of selective, then
             * this property must be an empty array.
             *
             * @title Creation information of the choices for each descriptive option
            */
            choices: AutoViewInputSubTypes.IShoppingCartCommodityStockChoice.ICreate[];
            /**
             * Quantity of the stock to purchase.
             *
             * This value is multiplied by the {@link IShoppingCartCommodity.volume}.
             *
             * @title Quantity of the stock to purchase
            */
            quantity: number & tags.Type<"int32">;
        };
    }
    export namespace IShoppingCartCommodityStockChoice {
        /**
         * Creation information of the choice for each option (of descriptive).
         *
         * When target option is {@link IShoppingSaleUnitDescriptiveOption}
         * type, then you have to compose this choice structure with
         * {@link value} specification.
         *
         * Otherwise when target option is {@link IShoppingSaleUnitSelectableOption}
         * type, you don't need to compose this choice structure. Just fill only
         * the {@link IShoppingCartCommodityStock.ICreate.stock_id} property.
        */
        export type ICreate = {
            /**
             * Target option's {@link IShoppingSaleUnitOption.id}.
             *
             * @title Target option's {@link IShoppingSaleUnitOption.id}
            */
            option_id: string;
            /**
             * Written value about the option.
             *
             * When target option's type is 'descriptive', then you have to
             * fill this property with the written value by the customer.
             *
             * @title Written value about the option
            */
            value: null | string | number | boolean;
        };
    }
}
export type AutoViewInput = AutoViewInputSubTypes.IShoppingCartCommodity.ICreate;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { sale_id, stocks, volume, accumulate } = value;

  // Shorten long IDs for display (e.g., 8 chars…4 chars)
  const shorten = (id: string): string =>
    id.length > 12 ? `${id.slice(0, 8)}…${id.slice(-4)}` : id;

  // Total units across all stocks, considering the volume multiplier
  const totalUnits = stocks.reduce(
    (sum, stock) => sum + stock.quantity * volume,
    0,
  );

  // Format boolean accumulate flag
  const formatAccumulate = (flag?: boolean | null): string =>
    flag ? "Yes" : "No";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-6">
      {/* Summary Header */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div>
          <p className="text-gray-500 text-sm">Sale ID</p>
          <p className="text-gray-900 font-medium truncate">{shorten(sale_id)}</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Volume</p>
          <p className="text-gray-900 font-medium">{volume}</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Accumulate</p>
          <p className="text-gray-900 font-medium">
            {formatAccumulate(accumulate)}
          </p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Total Items</p>
          <p className="text-gray-900 font-medium">{totalUnits}</p>
        </div>
      </div>

      {/* Individual Stock Entries */}
      <div className="space-y-4">
        {stocks.map((stock, idx) => (
          <div
            key={idx}
            className="p-4 bg-gray-50 rounded-lg border border-gray-200"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <p className="text-gray-500 text-sm">Unit ID</p>
                <p className="text-gray-900 font-medium truncate">
                  {shorten(stock.unit_id)}
                </p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Stock ID</p>
                <p className="text-gray-900 font-medium truncate">
                  {shorten(stock.stock_id)}
                </p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Qty per Set</p>
                <p className="text-gray-900 font-medium">{stock.quantity}</p>
              </div>
            </div>
            {stock.choices.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {stock.choices.map((choice, cidx) => {
                  const display = choice.value === null
                    ? "—"
                    : String(choice.value);
                  return (
                    <span
                      key={cidx}
                      className="inline-block bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded"
                    >
                      {choice.option_id}: {display}
                    </span>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

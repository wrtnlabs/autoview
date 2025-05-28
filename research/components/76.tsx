import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace IShoppingCartCommodity {
        /**
         * Creation information of a shopping cart commodity.
        */
        export interface ICreate {
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
        }
    }
    export namespace IShoppingCartCommodityStock {
        /**
         * Creation information of the commodity stock of shopping cart.
         *
         * When record being created, its corresponding structure would be
         * {@link IShoppingSaleSnapshotUnit.IInvert} and
         * {@link IShoppingSaleSnapshotUnitStock.IInvert}.
        */
        export interface ICreate {
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
        }
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
        export interface ICreate {
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
        }
    }
}
export type AutoViewInput = AutoViewInputSubTypes.IShoppingCartCommodity.ICreate;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const saleIdShort =
    value.sale_id.length > 12
      ? `${value.sale_id.slice(0, 6)}…${value.sale_id.slice(-4)}`
      : value.sale_id;
  const isAccum = value.accumulate === true;
  const totalItems =
    value.stocks.reduce((sum, stock) => sum + stock.quantity, 0) * value.volume;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md w-full bg-white shadow-md rounded-lg p-4">
      {/* Sale Reference */}
      <div className="flex items-center mb-4">
        <LucideReact.Tag className="text-gray-500 mr-2" size={20} />
        <span className="text-gray-700 font-medium">Sale ID:</span>
        <span className="ml-1 text-gray-900 truncate">{saleIdShort}</span>
      </div>

      {/* Volume & Accumulation */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center">
          <LucideReact.Layers className="text-gray-500 mr-2" size={20} />
          <div>
            <div className="text-gray-700 font-medium">Volume</div>
            <div className="text-gray-900">{value.volume}</div>
          </div>
        </div>
        <div className="flex items-center">
          <LucideReact.CheckCircle
            className={`mr-2 ${isAccum ? "text-green-500" : "text-gray-400"}`}
            size={20}
          />
          <div>
            <div className="text-gray-700 font-medium">Accumulate</div>
            <div className="text-gray-900">
              {isAccum ? "Enabled" : "Disabled"}
            </div>
          </div>
        </div>
      </div>

      {/* Total Items */}
      <div className="flex items-center mb-4">
        <LucideReact.Package className="text-gray-500 mr-2" size={20} />
        <span className="text-gray-700 font-medium">Total Pieces:</span>
        <span className="ml-1 text-gray-900">{totalItems}</span>
      </div>

      {/* Stock Details */}
      <ul className="space-y-3">
        {value.stocks.map((stock, idx) => {
          const unitIdShort =
            stock.unit_id.length > 12
              ? `${stock.unit_id.slice(0, 6)}…${stock.unit_id.slice(-4)}`
              : stock.unit_id;
          const stockIdShort =
            stock.stock_id.length > 12
              ? `${stock.stock_id.slice(0, 6)}…${stock.stock_id.slice(-4)}`
              : stock.stock_id;
          const itemTotal = stock.quantity * value.volume;

          return (
            <li key={idx} className="border rounded-lg p-3">
              <div className="flex items-center mb-1">
                <LucideReact.Package
                  className="text-gray-500 mr-2"
                  size={16}
                />
                <span className="text-gray-700 font-medium mr-1">Unit:</span>
                <span className="text-gray-900 truncate">{unitIdShort}</span>
              </div>
              <div className="flex items-center mb-1">
                <LucideReact.Server
                  className="text-gray-500 mr-2"
                  size={16}
                />
                <span className="text-gray-700 font-medium mr-1">Stock:</span>
                <span className="text-gray-900 truncate">{stockIdShort}</span>
              </div>
              <div className="flex items-center mb-1">
                <LucideReact.List className="text-gray-500 mr-2" size={16} />
                <span className="text-gray-700 font-medium mr-1">
                  Quantity:
                </span>
                <span className="text-gray-900">
                  {stock.quantity} × {value.volume} = {itemTotal}
                </span>
              </div>
              {stock.choices.length > 0 && (
                <div className="mt-2">
                  <span className="text-gray-700 font-medium">Choices:</span>
                  <ul className="ml-4 list-disc text-gray-900">
                    {stock.choices.map((choice, cidx) => (
                      <li key={cidx} className="truncate">
                        <span className="font-medium">Option:</span>{" "}
                        {choice.option_id}{" "}
                        <span className="font-medium">Value:</span>{" "}
                        {choice.value != null ? String(choice.value) : "None"}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

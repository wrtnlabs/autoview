import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
export type AutoViewInput =
  AutoViewInputSubTypes.IShoppingCartCommodity.ICreate;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const totalVolume = value.volume;
  const accumulate = value.accumulate === true;
  const accumulateLabel = accumulate ? "Yes" : "No";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <LucideReact.ShoppingCart className="text-blue-500" size={20} />
        <h2 className="ml-2 text-lg font-semibold text-gray-800">
          Shopping Cart Commodity
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        <div>
          <div className="text-sm text-gray-500">Sale ID</div>
          <div className="text-gray-800 break-all">{value.sale_id}</div>
        </div>
        <div>
          <div className="text-sm text-gray-500">Volume</div>
          <div className="text-gray-800">{totalVolume}</div>
        </div>
        <div>
          <div className="text-sm text-gray-500">Accumulate</div>
          <div
            className={`flex items-center ${
              accumulate ? "text-green-600" : "text-gray-600"
            }`}
          >
            {accumulate ? (
              <LucideReact.CheckCircle size={16} className="mr-1" />
            ) : (
              <LucideReact.XCircle size={16} className="mr-1" />
            )}
            {accumulateLabel}
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-md font-medium text-gray-800 mb-2 flex items-center">
          <LucideReact.Box className="text-gray-500 mr-1" size={18} />
          Items
        </h3>
        <ul className="divide-y divide-gray-200">
          {value.stocks.map((stock, index) => {
            const totalQuantity = stock.quantity * totalVolume;
            return (
              <li
                key={`${stock.unit_id}-${stock.stock_id}-${index}`}
                className="py-3"
              >
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center">
                    <LucideReact.Box className="text-gray-500 mr-2" size={16} />
                    <span className="font-medium text-gray-800">
                      Stock {index + 1}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    Total Qty: {totalQuantity}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                  <div>
                    <div className="text-gray-500">Unit ID</div>
                    <div className="text-gray-800 break-all">
                      {stock.unit_id}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500">Stock ID</div>
                    <div className="text-gray-800 break-all">
                      {stock.stock_id}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-500">Quantity</div>
                    <div className="text-gray-800">{stock.quantity}</div>
                  </div>
                </div>

                {stock.choices.length > 0 && (
                  <div className="mt-2 text-sm">
                    <div className="text-gray-500 mb-1">Options</div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {stock.choices.map((choice) => (
                        <li key={choice.option_id} className="flex items-start">
                          <LucideReact.Tag
                            className="text-gray-500 mr-1 mt-1"
                            size={16}
                          />
                          <div>
                            <span className="font-medium text-gray-800">
                              {choice.option_id}:
                            </span>{" "}
                            <span className="text-gray-600">
                              {String(choice.value)}
                            </span>
                          </div>
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
    </div>
  );
}

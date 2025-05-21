import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * Supplementation of inventory quantity of stock.
     *
     * You know what? If a {@link IShoppingSaleUnitStock stock} has been sold over
     * its {@link IShoppingSaleUnitStock.ICreate.quantity initial inventory quantity},
     * the stock can't be sold anymore, because of out of stock. In that case, how the
     * {@link IShoppingSeller} should do?
     *
     * When the sotck is sold out, seller can supplement the inventory record by
     * registering this `IShoppingSaleUnitStockSupplement` record. Right, this
     * `IShoppingSaleUnitStockSupplement` is an entity that embodies the
     * supplementation of the inventory quantity of the belonged stock.
    */
    export type IShoppingSaleUnitStockSupplement = {
        /**
         * Primary Key.
         *
         * @title Primary Key
        */
        id: string;
        /**
         * Supplemented quantity.
         *
         * @title Supplemented quantity
        */
        value: number & tags.Type<"int32">;
        /**
         * Creation time of the record.
         *
         * Another words, the time when inventory of the stock being supplemented.
         *
         * @title Creation time of the record
        */
        created_at: string;
    };
}
export type AutoViewInput = AutoViewInputSubTypes.IShoppingSaleUnitStockSupplement;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { value: supplementedQty, created_at } = value;
  const dateObj = new Date(created_at);
  const formattedDate = dateObj.toLocaleString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilize semantic HTML elements where appropriate.
  return (
    <div
      role="region"
      aria-label="Stock Supplement Record"
      className="w-full max-w-md mx-auto p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
    >
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
        <div className="mb-4 sm:mb-0">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            Supplemented Quantity
          </p>
          <p className="mt-1 text-2xl font-semibold text-gray-900">
            {supplementedQty}
          </p>
        </div>
        <div>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            Recorded At
          </p>
          <p className="mt-1 text-sm text-gray-700 truncate">
            {formattedDate}
          </p>
        </div>
      </div>
    </div>
  );
}

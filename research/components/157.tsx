import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
export type AutoViewInput =
  AutoViewInputSubTypes.IShoppingSaleUnitStockSupplement;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { value: quantity, created_at } = value;
  const formattedDate = React.useMemo(() => {
    const date = new Date(created_at);
    return isNaN(date.getTime())
      ? created_at
      : date.toLocaleString(undefined, {
          year: "numeric",
          month: "short",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        });
  }, [created_at]);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm max-w-xs w-full">
      <div className="flex items-center mb-3">
        <LucideReact.PlusCircle
          className="text-green-500"
          size={20}
          strokeWidth={2}
          aria-hidden="true"
        />
        <h2 className="ml-2 text-lg font-semibold text-gray-800">
          Stock Supplement
        </h2>
      </div>
      <div className="flex items-center justify-between py-1">
        <span className="flex items-center text-gray-600">
          <LucideReact.Package className="text-gray-400 mr-1" size={16} />
          Quantity
        </span>
        <span className="font-medium text-gray-900">{quantity}</span>
      </div>
      <div className="flex items-center justify-between py-1">
        <span className="flex items-center text-gray-600">
          <LucideReact.Calendar className="text-gray-400 mr-1" size={16} />
          Date
        </span>
        <time dateTime={created_at} className="font-medium text-gray-900">
          {formattedDate}
        </time>
      </div>
    </div>
  );
}

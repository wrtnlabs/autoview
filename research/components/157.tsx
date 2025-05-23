import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
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
    export interface IShoppingSaleUnitStockSupplement {
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
    }
}
export type AutoViewInput = AutoViewInputSubTypes.IShoppingSaleUnitStockSupplement;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Data transformation: format the creation timestamp to a human-readable string
  const formattedDate = new Date(value.created_at).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    We display only the supplemented quantity and its creation time.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md sm:flex sm:items-center sm:justify-between">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-blue-50 text-blue-500 rounded-full">
          <LucideReact.PlusCircle size={24} aria-hidden="true" />
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-700">Supplemented Quantity</p>
          <p className="text-2xl font-semibold text-gray-900">{value.value}</p>
        </div>
      </div>
      <div className="mt-3 sm:mt-0 flex items-center text-sm text-gray-500">
        <LucideReact.Calendar size={16} className="mr-1" aria-hidden="true" />
        <span>{formattedDate}</span>
      </div>
    </div>
  );
}

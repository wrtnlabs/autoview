import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * A page.
   *
   * Collection of records with pagination indformation.
   */
  export type IPageIShoppingSaleUnitStockSupplement = {
    /**
     * Page information.
     *
     * @title Page information
     */
    pagination: AutoViewInputSubTypes.IPage.IPagination;
    /**
     * List of records.
     *
     * @title List of records
     */
    data: AutoViewInputSubTypes.IShoppingSaleUnitStockSupplement[];
  };
  export namespace IPage {
    /**
     * Page information.
     */
    export type IPagination = {
      /**
       * Current page number.
       *
       * @title Current page number
       */
      current: number & tags.Type<"int32">;
      /**
       * Limitation of records per a page.
       *
       * @title Limitation of records per a page
       */
      limit: number & tags.Type<"int32">;
      /**
       * Total records in the database.
       *
       * @title Total records in the database
       */
      records: number & tags.Type<"int32">;
      /**
       * Total pages.
       *
       * Equal to {@link records} / {@link limit} with ceiling.
       *
       * @title Total pages
       */
      pages: number & tags.Type<"int32">;
    };
  }
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
  AutoViewInputSubTypes.IPageIShoppingSaleUnitStockSupplement;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Derive pagination and data
  const { pagination, data } = value;
  const { current, pages, records } = pagination;

  // 2. Helper to format ISO date strings
  const formatDate = (iso: string): string => {
    const d = new Date(iso);
    return d.toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // 3. Compose the visual structure
  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      {/* List of supplements */}
      {data.length > 0 ? (
        <ul className="grid gap-4">
          {data.map((item) => (
            <li
              key={item.id}
              className="p-4 bg-white rounded-lg shadow flex items-center justify-between"
            >
              {/* Quantity */}
              <div className="flex items-center gap-2">
                <LucideReact.PlusCircle
                  className="text-green-500"
                  size={20}
                  aria-hidden="true"
                />
                <span className="font-medium text-gray-800">+{item.value}</span>
              </div>
              {/* Date */}
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <LucideReact.Calendar
                  className="text-gray-400"
                  size={16}
                  aria-hidden="true"
                />
                <span>{formatDate(item.created_at)}</span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-col items-center justify-center p-8 text-gray-500">
          <LucideReact.AlertCircle
            className="text-gray-400"
            size={24}
            aria-hidden="true"
          />
          <span className="mt-2">No supplementation records found.</span>
        </div>
      )}

      {/* Pagination Summary */}
      <div className="mt-4 text-center text-sm text-gray-600">
        Page {current} of {pages} &middot; {records.toLocaleString()} total
      </div>
    </div>
  );
}

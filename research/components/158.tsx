import { tags } from "typia";
import React from "react";
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
export type AutoViewInput = AutoViewInputSubTypes.IPageIShoppingSaleUnitStockSupplement;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { pagination, data } = value;

  // Total supplemented quantity on this page
  const totalSupplemented = data.reduce((sum, record) => sum + record.value, 0);
  // Average supplemented quantity
  const averageSupplement =
    data.length > 0 ? totalSupplemented / data.length : 0;

  // Format ISO date string into a human-readable form
  const formatDate = (iso: string): string => {
    const date = new Date(iso);
    return date.toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <header className="mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Stock Supplement Records
        </h2>
        <p className="text-sm text-gray-500">
          Page {pagination.current} of {pagination.pages} &middot;{" "}
          {pagination.records} total records
        </p>
      </header>

      <div className="flex flex-wrap items-center justify-between mb-4 space-y-2 sm:space-y-0">
        <div className="text-sm text-gray-700">
          <span className="font-medium">Per Page:</span> {pagination.limit}
        </div>
        <div className="text-sm text-gray-700">
          <span className="font-medium">Total Qty (this page):</span>{" "}
          {totalSupplemented}
        </div>
        <div className="text-sm text-gray-700">
          <span className="font-medium">Average Qty:</span>{" "}
          {averageSupplement.toFixed(2)}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.map((record) => (
              <tr key={record.id}>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {record.value}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {formatDate(record.created_at)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

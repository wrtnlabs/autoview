import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * A page.
     *
     * Collection of records with pagination indformation.
    */
    export interface IPageIShoppingSaleUnitStockSupplement {
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
    }
    export namespace IPage {
        /**
         * Page information.
        */
        export interface IPagination {
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
        }
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
export type AutoViewInput = AutoViewInputSubTypes.IPageIShoppingSaleUnitStockSupplement;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants
  const { pagination, data } = value;
  const totalSupplemented = data.reduce((sum, item) => sum + item.value, 0);
  const formattedTotalSupplemented = totalSupplemented.toLocaleString();
  const formattedCurrentPage = `${pagination.current} / ${pagination.pages}`;
  const formattedTotalRecords = pagination.records.toLocaleString();
  const formatDate = (iso: string) =>
    new Date(iso).toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  // 2. Compose the visual structure using JSX and Tailwind CSS
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* Header with total and pagination summary */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
        <div className="flex items-center text-gray-700">
          <LucideReact.PlusCircle size={20} className="text-green-500 mr-2" />
          <span className="text-lg font-semibold">
            Total Supplemented: {formattedTotalSupplemented}
          </span>
        </div>
        <div className="mt-3 sm:mt-0 text-gray-500 text-sm space-x-4">
          <span>Page {formattedCurrentPage}</span>
          <span>|</span>
          <span>{formattedTotalRecords} records</span>
        </div>
      </div>

      {/* Table-like list of supplementation records */}
      <div className="mt-4 overflow-x-auto">
        <div className="grid grid-cols-2 text-gray-600 font-medium text-sm border-b pb-2">
          <span>Quantity</span>
          <span>Created At</span>
        </div>

        {data.length === 0 ? (
          // Empty state
          <div className="py-6 flex flex-col items-center text-gray-400">
            <LucideReact.AlertCircle size={24} />
            <span className="mt-2 text-sm">No records found.</span>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {data.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-2 py-2 text-gray-800 text-sm"
              >
                <div className="flex items-center">
                  <LucideReact.PlusCircle
                    size={16}
                    className="text-green-500 mr-1"
                  />
                  <span>{item.value.toLocaleString()}</span>
                </div>
                <div className="flex items-center">
                  <LucideReact.Calendar
                    size={16}
                    className="text-gray-400 mr-1"
                  />
                  <span>{formatDate(item.created_at)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

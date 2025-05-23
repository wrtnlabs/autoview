import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * A page.
     *
     * Collection of records with pagination indformation.
    */
    export interface IPageIShoppingMileageHistory {
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
        data: AutoViewInputSubTypes.IShoppingMileageHistory[];
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
    export interface IShoppingMileageHistory {
        id: string & tags.Format<"uuid">;
        citizen: AutoViewInputSubTypes.IShoppingCitizen;
        mileage: AutoViewInputSubTypes.IShoppingMileage;
        source_id: string & tags.Format<"uuid">;
        value: number;
        balance: number;
        created_at: string & tags.Format<"date-time">;
    }
    /**
     * Citizen verification information.
     *
     * `IShoppingCitizen` is an entity that records the user's
     * {@link name real name} and {@link mobile} input information.
     *
     * For reference, in South Korea, real name authentication is required for
     * e-commerce participants, so the name attribute is important. However, the
     * situation is different overseas, so in reality, mobile attributes are the
     * most important, and identification of individual person is also done based
     * on this mobile.
     *
     * Of course, real name and mobile phone authentication information are
     * encrypted and stored.
    */
    export interface IShoppingCitizen {
        /**
         * Primary Key.
         *
         * @title Primary Key
        */
        id: string;
        /**
         * Creation time of record.
         *
         * @title Creation time of record
        */
        created_at: string;
        /**
         * Mobile number.
         *
         * @title Mobile number
        */
        mobile: string;
        /**
         * Real name, or equivalent nickname.
         *
         * @title Real name, or equivalent nickname
        */
        name: string;
    }
    export interface IShoppingMileage {
        id: string & tags.Format<"uuid">;
        value: null | number;
        created_at: string & tags.Format<"date-time">;
        code: string;
        source: string;
        direction: -1 | 1;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.IPageIShoppingMileageHistory;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Data aggregation/transformation
  const creditTotal = value.data
    .filter((rec) => rec.value > 0)
    .reduce((sum, rec) => sum + rec.value, 0);
  const debitTotal = value.data
    .filter((rec) => rec.value < 0)
    .reduce((sum, rec) => sum + Math.abs(rec.value), 0);

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  // 2. Compose visual structure
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* Header & summary */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Mileage History</h2>
        <div className="flex space-x-6 mt-2 md:mt-0 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <LucideReact.PlusCircle className="text-green-500" size={16} />
            <span>Earned: {creditTotal.toLocaleString()}</span>
          </div>
          <div className="flex items-center space-x-1">
            <LucideReact.MinusCircle className="text-red-500" size={16} />
            <span>Spent: {debitTotal.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase">
              <th className="px-3 py-2">Customer</th>
              <th className="px-3 py-2">Change</th>
              <th className="px-3 py-2">Balance</th>
              <th className="px-3 py-2">Source</th>
              <th className="px-3 py-2">Date</th>
            </tr>
          </thead>
          <tbody className="text-gray-800 text-sm">
            {value.data.map((rec) => {
              const isCredit = rec.value > 0;
              return (
                <tr key={rec.id} className="border-t">
                  <td className="px-3 py-2">
                    <div className="flex items-center space-x-2">
                      <LucideReact.User className="text-gray-400" size={16} />
                      <span className="font-medium truncate">{rec.citizen.name}</span>
                      <span className="text-gray-500 truncate">({rec.citizen.mobile})</span>
                    </div>
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex items-center space-x-1">
                      {isCredit ? (
                        <LucideReact.PlusCircle className="text-green-500" size={16} />
                      ) : (
                        <LucideReact.MinusCircle className="text-red-500" size={16} />
                      )}
                      <span>{Math.abs(rec.value).toLocaleString()}</span>
                    </div>
                  </td>
                  <td className="px-3 py-2">{rec.balance.toLocaleString()}</td>
                  <td className="px-3 py-2">
                    <div className="flex items-center space-x-1">
                      <LucideReact.Tag className="text-blue-500" size={16} />
                      <span className="truncate">{rec.mileage.source}</span>
                    </div>
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex items-center space-x-1">
                      <LucideReact.Calendar className="text-gray-400" size={16} />
                      <span>{formatDate(rec.created_at)}</span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination info */}
      <div className="mt-4 text-gray-600 text-sm flex flex-wrap items-center space-x-2">
        <span>
          Page {value.pagination.current} of {value.pagination.pages}
        </span>
        <span className="hidden sm:inline">•</span>
        <span>Total records: {value.pagination.records}</span>
      </div>
    </div>
  );
}

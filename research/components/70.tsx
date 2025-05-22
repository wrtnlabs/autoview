import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * A page.
     *
     * Collection of records with pagination indformation.
    */
    export type IPageIShoppingMileageHistory = {
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
    export type IShoppingMileageHistory = {
        id: string & tags.Format<"uuid">;
        citizen: AutoViewInputSubTypes.IShoppingCitizen;
        mileage: AutoViewInputSubTypes.IShoppingMileage;
        source_id: string & tags.Format<"uuid">;
        value: number;
        balance: number;
        created_at: string & tags.Format<"date-time">;
    };
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
    export type IShoppingCitizen = {
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
    };
    export type IShoppingMileage = {
        id: string & tags.Format<"uuid">;
        value: null | number;
        created_at: string & tags.Format<"date-time">;
        code: string;
        source: string;
        direction: -1 | 1;
    };
}
export type AutoViewInput = AutoViewInputSubTypes.IPageIShoppingMileageHistory;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { pagination, data } = value;
  const { current, limit, pages, records } = pagination;

  const maskMobile = (mobile: string): string =>
    mobile.replace(/\d(?=\d{4})/g, '*');

  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  const formatNumber = (num: number): string =>
    num.toLocaleString();

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* Pagination Summary */}
      <div className="mb-4 flex flex-col sm:flex-row sm:justify-between">
        <div className="text-gray-700 text-sm">
          Page <span className="font-semibold">{current}</span> of{' '}
          <span className="font-semibold">{pages}</span>
        </div>
        <div className="text-gray-700 text-sm mt-1 sm:mt-0">
          Showing{' '}
          <span className="font-semibold">
            {Math.min(data.length, limit)}
          </span>{' '}
          of <span className="font-semibold">{records}</span> records
        </div>
      </div>

      {/* Records Table */}
      {data.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          No records found.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">
                  Date
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">
                  Citizen
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">
                  Mobile
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">
                  Source
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase">
                  Code
                </th>
                <th className="px-4 py-2 text-right text-xs font-medium text-gray-600 uppercase">
                  Amount
                </th>
                <th className="px-4 py-2 text-right text-xs font-medium text-gray-600 uppercase">
                  Balance
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((record, idx) => {
                const dir = record.mileage.direction;
                const sign = dir === 1 ? '+' : '-';
                const amount = `${sign}${formatNumber(record.value)}`;
                const amountColor =
                  dir === 1 ? 'text-green-600' : 'text-red-600';
                return (
                  <tr
                    key={record.id}
                    className={idx % 2 === 0 ? '' : 'bg-gray-50'}
                  >
                    <td className="px-4 py-2 text-sm text-gray-700 whitespace-nowrap">
                      {formatDate(record.created_at)}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700 truncate max-w-xs">
                      {record.citizen.name}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700 whitespace-nowrap">
                      {maskMobile(record.citizen.mobile)}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700 truncate max-w-sm">
                      {record.mileage.source}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700 whitespace-nowrap">
                      {record.mileage.code}
                    </td>
                    <td
                      className={`px-4 py-2 text-sm font-medium text-right ${amountColor}`}
                    >
                      {amount}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700 text-right">
                      {formatNumber(record.balance)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

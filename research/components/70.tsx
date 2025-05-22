import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
  const formatDate = (dateStr: string): string =>
    new Date(dateStr).toLocaleString();
  const numberFormatter = new Intl.NumberFormat();
  const formatNumber = (num: number): string => numberFormatter.format(num);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* Header with title and pagination summary */}
      <div className="mb-4 flex flex-col sm:flex-row sm:justify-between sm:items-center">
        <h2 className="text-lg font-semibold text-gray-800">Mileage History</h2>
        <div className="text-sm text-gray-600 flex flex-col sm:flex-row sm:items-center gap-2">
          <span>
            Page {pagination.current} of {pagination.pages}
          </span>
          <span>{pagination.records} records</span>
          <span>{pagination.limit} per page</span>
        </div>
      </div>

      {/* Content: either no-data state or list of records */}
      {data.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-gray-500">
          <LucideReact.AlertCircle size={24} className="mb-2" />
          <span>No mileage history available.</span>
        </div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {data.map((item) => (
            <li
              key={item.id}
              className="py-4 flex flex-col sm:flex-row sm:justify-between"
            >
              {/* Left section: Citizen info, timestamp, code */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <div className="flex items-center">
                  <LucideReact.User size={16} className="text-gray-500" />
                  <span className="ml-1 text-gray-800">
                    {item.citizen.name}
                  </span>
                </div>
                <div className="flex items-center">
                  <LucideReact.Phone size={16} className="text-gray-500" />
                  <span className="ml-1 text-gray-600">
                    {item.citizen.mobile}
                  </span>
                </div>
                <div className="flex items-center">
                  <LucideReact.Calendar size={16} className="text-gray-500" />
                  <span className="ml-1 text-gray-600">
                    {formatDate(item.created_at)}
                  </span>
                </div>
                <span className="inline-block px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-xs">
                  {item.mileage.code}
                </span>
              </div>

              {/* Right section: change value and resulting balance */}
              <div className="flex flex-col sm:items-end gap-2 mt-3 sm:mt-0">
                <div className="flex items-center">
                  {item.mileage.direction === 1 ? (
                    <LucideReact.ArrowUp size={16} className="text-green-500" />
                  ) : (
                    <LucideReact.ArrowDown size={16} className="text-red-500" />
                  )}
                  <span className="ml-1 text-gray-800 font-semibold">
                    {(item.mileage.direction === 1 ? "+" : "-") +
                      formatNumber(Math.abs(item.value))}
                  </span>
                </div>
                <div className="flex items-center">
                  <LucideReact.DollarSign size={16} className="text-gray-400" />
                  <span className="ml-1 text-gray-600">
                    Balance: {formatNumber(item.balance)}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

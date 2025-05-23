import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export interface billing_usage_report {
        usageItems?: {
            /**
             * Date of the usage line item.
            */
            date: string;
            /**
             * Product name.
            */
            product: string;
            /**
             * SKU name.
            */
            sku: string;
            /**
             * Quantity of the usage line item.
            */
            quantity: number & tags.Type<"int32">;
            /**
             * Unit type of the usage line item.
            */
            unitType: string;
            /**
             * Price per unit of the usage line item.
            */
            pricePerUnit: number;
            /**
             * Gross amount of the usage line item.
            */
            grossAmount: number;
            /**
             * Discount amount of the usage line item.
            */
            discountAmount: number;
            /**
             * Net amount of the usage line item.
            */
            netAmount: number;
            /**
             * Name of the organization.
            */
            organizationName: string;
            /**
             * Name of the repository.
            */
            repositoryName?: string;
        }[];
    }
}
export type AutoViewInput = AutoViewInputSubTypes.billing_usage_report;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const items = value.usageItems ?? [];

  const totalItems = items.length;
  const totalQuantity = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalGross = items.reduce((sum, i) => sum + i.grossAmount, 0);
  const totalDiscount = items.reduce((sum, i) => sum + i.discountAmount, 0);
  const totalNet = items.reduce((sum, i) => sum + i.netAmount, 0);

  const formatDate = (s: string) =>
    new Date(s).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
  const formatNumber = (n: number) => n.toLocaleString();
  const formatMoney = (n: number) =>
    n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (items.length === 0) {
    return (
      <div className="p-4 bg-white rounded-lg shadow flex flex-col items-center text-gray-500">
        <LucideReact.AlertCircle size={48} />
        <p className="mt-2 text-sm">No usage data available.</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-6">
      <header className="flex items-center mb-2">
        <LucideReact.FileText className="text-gray-600" size={24} />
        <h2 className="ml-2 text-xl font-semibold text-gray-800">Billing Usage Report</h2>
      </header>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        <div className="flex items-center p-3 bg-gray-50 rounded">
          <LucideReact.List className="text-blue-500" size={20} />
          <div className="ml-2">
            <p className="text-xs text-gray-500">Line Items</p>
            <p className="text-lg font-semibold text-gray-800">{formatNumber(totalItems)}</p>
          </div>
        </div>
        <div className="flex items-center p-3 bg-gray-50 rounded">
          <LucideReact.Hash className="text-purple-500" size={20} />
          <div className="ml-2">
            <p className="text-xs text-gray-500">Total Qty</p>
            <p className="text-lg font-semibold text-gray-800">{formatNumber(totalQuantity)}</p>
          </div>
        </div>
        <div className="flex items-center p-3 bg-gray-50 rounded">
          <LucideReact.DollarSign className="text-green-500" size={20} />
          <div className="ml-2">
            <p className="text-xs text-gray-500">Gross Amount</p>
            <p className="text-lg font-semibold text-gray-800">${formatMoney(totalGross)}</p>
          </div>
        </div>
        <div className="flex items-center p-3 bg-gray-50 rounded">
          <LucideReact.Tag className="text-yellow-500" size={20} />
          <div className="ml-2">
            <p className="text-xs text-gray-500">Discount</p>
            <p className="text-lg font-semibold text-gray-800">-${formatMoney(totalDiscount)}</p>
          </div>
        </div>
        <div className="flex items-center p-3 bg-gray-50 rounded">
          <LucideReact.CreditCard className="text-indigo-500" size={20} />
          <div className="ml-2">
            <p className="text-xs text-gray-500">Net Amount</p>
            <p className="text-lg font-semibold text-gray-800">${formatMoney(totalNet)}</p>
          </div>
        </div>
      </div>

      {/* Detailed Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Date</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Product</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">SKU</th>
              <th className="px-3 py-2 text-right text-xs font-medium text-gray-600 uppercase tracking-wider">Qty</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Unit</th>
              <th className="px-3 py-2 text-right text-xs font-medium text-gray-600 uppercase tracking-wider">Price/Unit</th>
              <th className="px-3 py-2 text-right text-xs font-medium text-gray-600 uppercase tracking-wider">Gross</th>
              <th className="px-3 py-2 text-right text-xs font-medium text-gray-600 uppercase tracking-wider">Discount</th>
              <th className="px-3 py-2 text-right text-xs font-medium text-gray-600 uppercase tracking-wider">Net</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Organization</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Repository</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {items.map((item, idx) => (
              <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700">{formatDate(item.date)}</td>
                <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700 truncate max-w-xs">{item.product}</td>
                <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700 truncate max-w-xs">{item.sku}</td>
                <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700 text-right">{item.quantity}</td>
                <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700">{item.unitType}</td>
                <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700 text-right">${formatMoney(item.pricePerUnit)}</td>
                <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700 text-right">${formatMoney(item.grossAmount)}</td>
                <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700 text-right">-${formatMoney(item.discountAmount)}</td>
                <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700 text-right">${formatMoney(item.netAmount)}</td>
                <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700 truncate max-w-xs">{item.organizationName}</td>
                <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700 truncate max-w-xs">
                  {item.repositoryName ?? "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

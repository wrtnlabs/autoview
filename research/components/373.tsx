import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    export type billing_usage_report = {
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
    };
}
export type AutoViewInput = AutoViewInputSubTypes.billing_usage_report;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const items = value.usageItems ?? [];

  // Utility to format dates (e.g., "Jan 5, 2024")
  const formatDate = (dateStr: string): string =>
    new Date(dateStr).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  // Utility to format numbers as currency (assumes USD)
  const formatCurrency = (amount: number): string =>
    `$${amount.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  // Totals for summary row
  const totalGross = items.reduce((sum, i) => sum + i.grossAmount, 0);
  const totalDiscount = items.reduce((sum, i) => sum + i.discountAmount, 0);
  const totalNet = items.reduce((sum, i) => sum + i.netAmount, 0);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Usage Report
      </h2>

      {items.length === 0 ? (
        <p className="text-gray-600">No usage items available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
                >
                  Date
                </th>
                <th
                  scope="col"
                  className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
                >
                  Product
                </th>
                <th
                  scope="col"
                  className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
                >
                  SKU
                </th>
                <th
                  scope="col"
                  className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
                >
                  Quantity
                </th>
                <th
                  scope="col"
                  className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
                >
                  Unit Price
                </th>
                <th
                  scope="col"
                  className="px-3 py-2 text-right text-xs font-medium text-gray-600 uppercase tracking-wider"
                >
                  Gross
                </th>
                <th
                  scope="col"
                  className="px-3 py-2 text-right text-xs font-medium text-gray-600 uppercase tracking-wider"
                >
                  Discount
                </th>
                <th
                  scope="col"
                  className="px-3 py-2 text-right text-xs font-medium text-gray-600 uppercase tracking-wider"
                >
                  Net
                </th>
                <th
                  scope="col"
                  className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
                >
                  Organization
                </th>
                <th
                  scope="col"
                  className="px-3 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
                >
                  Repository
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {items.map((item, idx) => (
                <tr key={`${item.date}-${item.product}-${idx}`}>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700">
                    {formatDate(item.date)}
                  </td>
                  <td className="px-3 py-2 max-w-xs truncate text-sm text-gray-700">
                    {item.product}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700">
                    {item.sku}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700">
                    {item.quantity.toLocaleString()} {item.unitType}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700">
                    {formatCurrency(item.pricePerUnit)}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-right text-gray-800 font-medium">
                    {formatCurrency(item.grossAmount)}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-right text-gray-800 font-medium">
                    {formatCurrency(item.discountAmount)}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-right text-gray-800 font-medium">
                    {formatCurrency(item.netAmount)}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700">
                    {item.organizationName}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700">
                    {item.repositoryName ?? "-"}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-gray-50">
              <tr>
                <td
                  colSpan={5}
                  className="px-3 py-2 text-sm font-semibold text-gray-800"
                >
                  Totals
                </td>
                <td className="px-3 py-2 text-sm text-right text-gray-800 font-semibold">
                  {formatCurrency(totalGross)}
                </td>
                <td className="px-3 py-2 text-sm text-right text-gray-800 font-semibold">
                  {formatCurrency(totalDiscount)}
                </td>
                <td className="px-3 py-2 text-sm text-right text-gray-800 font-semibold">
                  {formatCurrency(totalNet)}
                </td>
                <td colSpan={2} />
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </div>
  );
}

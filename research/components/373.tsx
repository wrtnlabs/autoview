import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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

  const totalGross = items.reduce((sum, item) => sum + item.grossAmount, 0);
  const totalDiscount = items.reduce(
    (sum, item) => sum + item.discountAmount,
    0,
  );
  const totalNet = items.reduce((sum, item) => sum + item.netAmount, 0);

  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const formatDate = (iso: string) => dateFormatter.format(new Date(iso));

  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  const formatCurrency = (n: number) => currencyFormatter.format(n);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-500">
        <LucideReact.AlertCircle size={48} />
        <p className="mt-2 text-sm">No usage data available</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="flex items-center p-4 bg-gray-50 rounded-lg">
          <LucideReact.TrendingUp className="text-gray-500" size={20} />
          <div className="ml-3">
            <dt className="text-xs font-medium text-gray-500 uppercase">
              Total Gross
            </dt>
            <dd className="mt-1 text-lg font-semibold text-gray-900">
              {formatCurrency(totalGross)}
            </dd>
          </div>
        </div>
        <div className="flex items-center p-4 bg-gray-50 rounded-lg">
          <LucideReact.Percent className="text-gray-500" size={20} />
          <div className="ml-3">
            <dt className="text-xs font-medium text-gray-500 uppercase">
              Total Discount
            </dt>
            <dd className="mt-1 text-lg font-semibold text-gray-900">
              {formatCurrency(totalDiscount)}
            </dd>
          </div>
        </div>
        <div className="flex items-center p-4 bg-gray-50 rounded-lg">
          <LucideReact.CheckCircle className="text-green-500" size={20} />
          <div className="ml-3">
            <dt className="text-xs font-medium text-gray-500 uppercase">
              Total Net
            </dt>
            <dd className="mt-1 text-lg font-semibold text-gray-900">
              {formatCurrency(totalNet)}
            </dd>
          </div>
        </div>
      </div>

      {/* Detailed Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Organization
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Unit Price
              </th>
              <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Net Amount
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {items.map((item, idx) => {
              const orgLabel = item.repositoryName
                ? `${item.organizationName}/${item.repositoryName}`
                : item.organizationName;
              return (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                    <div className="flex items-center gap-1">
                      <LucideReact.Calendar
                        className="text-gray-400"
                        size={16}
                      />
                      <span>{formatDate(item.date)}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                    {orgLabel}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-900">
                        {item.product}
                      </span>
                      <span className="text-xs text-gray-500">{item.sku}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-gray-700">
                    {item.quantity} {item.unitType}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-right text-gray-700">
                    {formatCurrency(item.pricePerUnit)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-semibold text-right text-gray-900">
                    {formatCurrency(item.netAmount)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

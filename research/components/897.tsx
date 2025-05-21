import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * View Traffic
     *
     * @title View Traffic
    */
    export type view_traffic = {
        count: number & tags.Type<"int32">;
        uniques: number & tags.Type<"int32">;
        views: AutoViewInputSubTypes.traffic[];
    };
    /**
     * @title Traffic
    */
    export type traffic = {
        timestamp: string & tags.Format<"date-time">;
        uniques: number & tags.Type<"int32">;
        count: number & tags.Type<"int32">;
    };
}
export type AutoViewInput = AutoViewInputSubTypes.view_traffic;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const totalViews = value.count;
  const totalUniques = value.uniques;
  const recordCount = value.views.length;
  const avgViews = recordCount > 0 ? totalViews / recordCount : 0;
  const avgUniques = recordCount > 0 ? totalUniques / recordCount : 0;

  const formatter = new Intl.NumberFormat('en-US');
  const formattedViews = formatter.format(totalViews);
  const formattedUniques = formatter.format(totalUniques);
  const formattedAvgViews = formatter.format(Math.round(avgViews));
  const formattedAvgUniques = formatter.format(Math.round(avgUniques));

  const sortedViews = [...value.views].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
  const recentViews = sortedViews.slice(0, 5);

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 space-y-3 sm:space-y-0">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Traffic Summary</h2>
          <p className="text-sm text-gray-600">
            Over <span className="font-medium">{formattedViews}</span> views &{' '}
            <span className="font-medium">{formattedUniques}</span> unique visitors
          </p>
        </div>
        <div className="flex space-x-6">
          <div>
            <p className="text-xs text-gray-500 uppercase">Entries</p>
            <p className="text-base font-medium text-gray-900">{recordCount}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase">Avg Views</p>
            <p className="text-base font-medium text-gray-900">{formattedAvgViews}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase">Avg Uniques</p>
            <p className="text-base font-medium text-gray-900">{formattedAvgUniques}</p>
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-md font-semibold text-gray-900 mb-2">Recent Activity</h3>
        <ul className="divide-y divide-gray-200">
          {recentViews.map((item, index) => (
            <li key={index} className="py-2 flex flex-col sm:flex-row justify-between">
              <span className="text-sm text-gray-700">{formatDate(item.timestamp)}</span>
              <div className="mt-1 sm:mt-0 flex space-x-4">
                <span className="text-sm text-gray-700">
                  {formatter.format(item.count)} views
                </span>
                <span className="text-sm text-gray-700">
                  {formatter.format(item.uniques)} uniques
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

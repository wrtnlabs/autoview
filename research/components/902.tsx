import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  export namespace IApiSearchLabels {
    export type GetResponse = {
      total_count: number & tags.Type<"int32">;
      incomplete_results: boolean;
      items: AutoViewInputSubTypes.label_search_result_item[];
    };
  }
  /**
   * Label Search Result Item
   *
   * @title Label Search Result Item
   */
  export type label_search_result_item = {
    id: number & tags.Type<"int32">;
    node_id: string;
    url: string & tags.Format<"uri">;
    name: string;
    color: string;
    default: boolean;
    description: string | null;
    score: number;
    text_matches?: AutoViewInputSubTypes.search_result_text_matches;
  };
  /**
   * @title Search Result Text Matches
   */
  export type search_result_text_matches = {
    object_url?: string;
    object_type?: string | null;
    property?: string;
    fragment?: string;
    matches?: {
      text?: string;
      indices?: (number & tags.Type<"int32">)[];
    }[];
  }[];
}
export type AutoViewInput = AutoViewInputSubTypes.IApiSearchLabels.GetResponse;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formattedTotal = value.total_count.toLocaleString();
  const hasIncomplete = value.incomplete_results;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilize semantic HTML elements where appropriate.

  // 3. Return the React element.
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center text-gray-800">
          <LucideReact.Tag size={20} className="mr-2 text-blue-500" />
          <h2 className="text-lg font-semibold">Labels ({formattedTotal})</h2>
        </div>
        {hasIncomplete && (
          <div className="flex items-center text-amber-600 text-sm">
            <LucideReact.AlertTriangle size={16} className="mr-1" />
            <span>Incomplete results</span>
          </div>
        )}
      </div>
      {/* List of label items */}
      <ul className="space-y-4">
        {value.items.map((item) => (
          <li
            key={item.id}
            className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center overflow-hidden">
                <span
                  className="w-4 h-4 rounded-sm mr-2 flex-shrink-0"
                  style={{ backgroundColor: `#${item.color}` }}
                />
                <h3 className="text-md font-medium text-gray-900 truncate">
                  {item.name}
                </h3>
                {item.default && (
                  <LucideReact.CheckCircle
                    size={16}
                    className="ml-2 text-green-500"
                    aria-label="Default Label"
                  />
                )}
              </div>
              <div className="flex items-center text-gray-500 text-sm">
                <LucideReact.BarChart2 size={16} className="mr-1" />
                <span>{item.score.toFixed(2)}</span>
              </div>
            </div>
            {item.description ? (
              <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                {item.description}
              </p>
            ) : (
              <p className="mt-2 text-sm text-gray-400 italic">
                No description
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

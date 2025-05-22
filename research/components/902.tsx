import { tags } from "typia";
import React from "react";
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
        "default": boolean;
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
  const { total_count, incomplete_results, items } = value;
  const formattedTotal = `${total_count} label${total_count === 1 ? "" : "s"} found`;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-full">
      {/* Header with total and warning */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-800">{formattedTotal}</h2>
        {incomplete_results && (
          <p className="mt-1 text-sm text-yellow-600">
            Results may be incomplete
          </p>
        )}
      </div>

      {/* List of label items */}
      <ul className="space-y-4">
        {items.map((item) => {
          const hasDescription = typeof item.description === "string" && item.description.trim().length > 0;
          return (
            <li
              key={item.id}
              className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg"
            >
              {/* Color swatch */}
              <div
                className="w-4 h-4 mt-1 rounded-full flex-shrink-0"
                style={{ backgroundColor: `#${item.color}` }}
              />

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-gray-900 truncate">
                    {item.name}
                  </span>
                  {item.default && (
                    <span className="px-2 py-0.5 text-xs font-medium text-white bg-blue-500 rounded">
                      Default
                    </span>
                  )}
                </div>

                {hasDescription && (
                  <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                    {item.description}
                  </p>
                )}

                <div className="mt-2 flex items-center text-sm text-gray-500 space-x-3">
                  <span>Score: {item.score.toFixed(2)}</span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

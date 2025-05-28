import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace IApiSearchLabels {
        export interface GetResponse {
            total_count: number & tags.Type<"int32">;
            incomplete_results: boolean;
            items: AutoViewInputSubTypes.label_search_result_item[];
        }
    }
    /**
     * Label Search Result Item
     *
     * @title Label Search Result Item
    */
    export interface label_search_result_item {
        id: number & tags.Type<"int32">;
        node_id: string;
        url: string & tags.Format<"uri">;
        name: string;
        color: string;
        "default": boolean;
        description: string | null;
        score: number;
        text_matches?: AutoViewInputSubTypes.search_result_text_matches;
    }
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
  const hasItems = Array.isArray(items) && items.length > 0;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* Header with total count and incomplete flag */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <LucideReact.Tag size={24} className="text-blue-500" />
          <h2 className="text-xl font-semibold text-gray-800">
            Labels ({total_count})
          </h2>
        </div>
        {incomplete_results && (
          <div className="flex items-center text-amber-500 text-sm">
            <LucideReact.AlertTriangle size={20} className="flex-shrink-0" />
            <span className="ml-1">Incomplete results</span>
          </div>
        )}
      </div>

      {/* Item list or empty state */}
      {hasItems ? (
        <ul className="space-y-6">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex flex-col sm:flex-row sm:items-start sm:space-x-4"
            >
              {/* Color Badge */}
              <div
                className="flex-shrink-0 w-5 h-5 rounded-full mt-1 sm:mt-0"
                style={{ backgroundColor: `#${item.color}` }}
                title={`Color: #${item.color}`}
              />

              <div className="flex-1">
                {/* Name and Default Indicator */}
                <div className="flex items-center">
                  <h3 className="text-lg font-medium text-gray-900">
                    {item.name}
                  </h3>
                  {item.default && (
                    <LucideReact.CheckCircle
                      size={16}
                      className="ml-2 text-green-500 flex-shrink-0"
                      aria-label="Default label"
                    />
                  )}
                </div>

                {/* Description */}
                <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                  {item.description ?? "No description provided."}
                </p>

                {/* Metadata: Score and URL */}
                <div className="mt-2 flex flex-wrap items-center text-sm text-gray-500 space-x-4">
                  {/* Relevance Score */}
                  <div className="flex items-center">
                    <LucideReact.Star
                      size={14}
                      className="text-yellow-400 flex-shrink-0"
                    />
                    <span className="ml-1">{item.score.toFixed(2)}</span>
                  </div>

                  {/* Link to Label */}
                  <div className="flex items-center max-w-full">
                    <LucideReact.Link
                      size={14}
                      className="text-gray-400 flex-shrink-0"
                    />
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-1 truncate text-blue-600 hover:underline"
                      title={item.url}
                    >
                      {item.url}
                    </a>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-col items-center justify-center py-8 text-gray-400">
          <LucideReact.AlertCircle size={32} className="mb-2" />
          <span>No labels found.</span>
        </div>
      )}
    </div>
  );
}

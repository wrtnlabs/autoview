import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * Code Of Conduct
   *
   * @title Code Of Conduct
   */
  export type code_of_conduct = {
    key: string;
    name: string;
    url: string & tags.Format<"uri">;
    body?: string;
    html_url: (string & tags.Format<"uri">) | null;
  };
}
export type AutoViewInput = AutoViewInputSubTypes.code_of_conduct[];

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Derived constants
  const count: number = value.length;

  // 2. Return early for empty state
  if (count === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-500">
        <LucideReact.AlertCircle size={48} className="animate-pulse" />
        <span className="mt-4 text-lg">No code of conduct data available</span>
      </div>
    );
  }

  // 3. Main render
  return (
    <section className="space-y-6">
      <header className="flex items-center justify-between px-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Code of Conduct ({count})
        </h2>
        <div className="flex items-center text-gray-500">
          <LucideReact.FileText size={20} className="mr-2" />
          <span>
            {count} entr{count === 1 ? "y" : "ies"}
          </span>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-6 px-4 md:grid-cols-2">
        {value.map((item) => (
          <article
            key={item.key}
            className="flex flex-col p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-800">{item.name}</h3>
              <span className="px-2 py-1 text-xs font-medium uppercase text-gray-600 bg-gray-100 rounded-full">
                {item.key}
              </span>
            </div>

            {item.html_url && (
              <div className="flex items-center mt-2 text-sm text-blue-600 truncate">
                <LucideReact.Link size={16} className="mr-1 flex-shrink-0" />
                <span className="break-all">{item.html_url}</span>
              </div>
            )}

            {item.body && (
              <p className="mt-3 text-gray-700 text-sm line-clamp-3">
                {item.body}
              </p>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

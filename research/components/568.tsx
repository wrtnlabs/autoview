import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * Project columns contain cards of work.
     *
     * @title Project Column
    */
    export type project_column = {
        url: string & tags.Format<"uri">;
        project_url: string & tags.Format<"uri">;
        cards_url: string & tags.Format<"uri">;
        /**
         * The unique identifier of the project column
        */
        id: number & tags.Type<"int32">;
        node_id: string;
        /**
         * Name of the project column
        */
        name: string;
        created_at: string & tags.Format<"date-time">;
        updated_at: string & tags.Format<"date-time">;
    };
}
export type AutoViewInput = AutoViewInputSubTypes.project_column[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const columns = value;
  const count = columns.length;

  // Format ISO date string into a human-readable format.
  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilize semantic HTML elements where appropriate.
  return (
    <section className="p-4">
      <header className="mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          Project Columns ({count})
        </h2>
      </header>
      {count === 0 ? (
        <p className="text-center text-gray-500">No columns available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {columns.map((col) => (
            <div
              key={col.id}
              className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3
                className="text-lg font-medium text-gray-900 truncate"
                title={col.name}
              >
                {col.name}
              </h3>
              <div className="mt-2 text-sm text-gray-600 space-y-1">
                <p>
                  <span className="font-semibold">Created:</span>{" "}
                  {formatDate(col.created_at)}
                </p>
                <p>
                  <span className="font-semibold">Updated:</span>{" "}
                  {formatDate(col.updated_at)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

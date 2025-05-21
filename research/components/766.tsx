import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * Porter Author
     *
     * @title Porter Author
    */
    export type porter_author = {
        id: number & tags.Type<"int32">;
        remote_id: string;
        remote_name: string;
        email: string;
        name: string;
        url: string & tags.Format<"uri">;
        import_url: string & tags.Format<"uri">;
    };
}
export type AutoViewInput = AutoViewInputSubTypes.porter_author[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Data aggregation: count the number of authors
  const count = value.length;

  // 2. Handle empty state
  if (count === 0) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-sm">
        <p className="text-center text-gray-500">No authors available.</p>
      </div>
    );
  }

  // 3. Compose the visual structure using JSX and Tailwind CSS
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* Header with author count */}
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Authors ({count})
      </h2>

      {/* List of authors */}
      <ul className="divide-y divide-gray-100">
        {value.map((author) => (
          <li
            key={author.id}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-3"
          >
            {/* Main author info */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {author.name}
              </p>
              <p className="mt-1 text-sm text-gray-500 truncate">
                Platform: {author.remote_name}
              </p>
              <p className="mt-1 text-sm text-gray-500 truncate">
                {author.email}
              </p>
            </div>

            {/* URL info */}
            <div className="mt-2 sm:mt-0 sm:ml-6 flex-shrink-0 text-sm text-gray-500 space-y-1">
              <p className="truncate">
                URL: {author.url}
              </p>
              <p className="truncate">
                Import URL: {author.import_url}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

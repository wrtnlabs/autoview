import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * A GitHub Classroom classroom
     *
     * @title Simple Classroom
    */
    export type simple_classroom = {
        /**
         * Unique identifier of the classroom.
        */
        id: number & tags.Type<"int32">;
        /**
         * The name of the classroom.
        */
        name: string;
        /**
         * Returns whether classroom is archived or not.
        */
        archived: boolean;
        /**
         * The url of the classroom on GitHub Classroom.
        */
        url: string;
    };
}
export type AutoViewInput = AutoViewInputSubTypes.simple_classroom[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const total = value.length;
  const archivedCount = value.filter((c) => c.archived).length;
  const activeCount = total - archivedCount;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Classrooms ({total})
        </h2>
        <p className="text-sm text-gray-600">
          <span className="font-medium text-green-600">{activeCount} Active</span>
          {", "}
          <span className="font-medium text-gray-500">{archivedCount} Archived</span>
        </p>
      </div>

      {total === 0 ? (
        <p className="text-center text-gray-500">No classrooms available.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {value.map((classroom) => {
            const statusLabel = classroom.archived ? "Archived" : "Active";
            const statusClasses = classroom.archived
              ? "text-gray-600 bg-gray-100"
              : "text-green-700 bg-green-100";

            return (
              <div
                key={classroom.id}
                className="p-4 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-md font-semibold text-gray-800 truncate">
                    {classroom.name}
                  </h3>
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded ${statusClasses}`}
                  >
                    {statusLabel}
                  </span>
                </div>
                <p
                  className="text-sm text-blue-600 truncate break-all"
                  title={classroom.url}
                >
                  {classroom.url}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

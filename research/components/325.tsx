import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
  const activeCount = value.filter((c) => !c.archived).length;
  const archivedCount = total - activeCount;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="flex items-center text-gray-700">
          <LucideReact.Users size={16} className="mr-1" />
          <span>Total: {total}</span>
        </div>
        <div className="flex items-center text-green-600">
          <LucideReact.CheckCircle size={16} className="mr-1" />
          <span>Active: {activeCount}</span>
        </div>
        <div className="flex items-center text-red-600">
          <LucideReact.XCircle size={16} className="mr-1" />
          <span>Archived: {archivedCount}</span>
        </div>
      </div>

      {/* Classroom List or Empty State */}
      <div className="mt-4">
        {total > 0 ? (
          <div className="space-y-3">
            {value.map((classroom) => (
              <div
                key={classroom.id}
                className="p-3 bg-gray-50 rounded-md flex flex-col sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center text-gray-800">
                  <span className="font-medium truncate">{classroom.name}</span>
                  {classroom.archived ? (
                    <LucideReact.XCircle
                      className="ml-2 text-red-500"
                      size={16}
                    />
                  ) : (
                    <LucideReact.CheckCircle
                      className="ml-2 text-green-500"
                      size={16}
                    />
                  )}
                </div>
                <div className="flex items-center text-gray-500 mt-2 sm:mt-0">
                  <LucideReact.Link size={16} className="mr-1" />
                  <span className="truncate">{classroom.url}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center text-gray-400">
            <LucideReact.AlertCircle size={24} className="mr-2" />
            <span>No classrooms available</span>
          </div>
        )}
      </div>
    </div>
  );
}

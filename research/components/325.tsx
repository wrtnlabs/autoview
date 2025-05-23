import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * A GitHub Classroom classroom
     *
     * @title Simple Classroom
    */
    export interface simple_classroom {
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
    }
}
export type AutoViewInput = AutoViewInputSubTypes.simple_classroom[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const total = value.length;
  const archivedCount = value.filter((item) => item.archived).length;
  const activeCount = total - archivedCount;

  // 2. Handle empty state
  if (total === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <LucideReact.AlertCircle size={48} className="text-gray-400" />
        <p className="mt-2 text-gray-500">No classrooms available.</p>
      </div>
    );
  }

  // 3. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center bg-gray-50 p-4 rounded-lg">
          <LucideReact.Users size={20} className="text-gray-500 mr-2" />
          <div>
            <p className="text-xs text-gray-500 uppercase">Total</p>
            <p className="text-lg font-semibold text-gray-900">{total}</p>
          </div>
        </div>
        <div className="flex items-center bg-gray-50 p-4 rounded-lg">
          <LucideReact.CheckCircle size={20} className="text-green-500 mr-2" />
          <div>
            <p className="text-xs text-gray-500 uppercase">Active</p>
            <p className="text-lg font-semibold text-gray-900">{activeCount}</p>
          </div>
        </div>
        <div className="flex items-center bg-gray-50 p-4 rounded-lg">
          <LucideReact.Archive size={20} className="text-gray-500 mr-2" />
          <div>
            <p className="text-xs text-gray-500 uppercase">Archived</p>
            <p className="text-lg font-semibold text-gray-900">{archivedCount}</p>
          </div>
        </div>
      </div>

      {/* Classroom List */}
      <div className="space-y-4">
        {value.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-white rounded-lg shadow"
          >
            <div className="mb-2 sm:mb-0">
              <p className="text-lg font-medium text-gray-900">{item.name}</p>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <div className="flex items-center text-sm text-gray-500 max-w-xs truncate">
                <LucideReact.Link size={16} className="mr-1" />
                <span className="truncate">{item.url}</span>
              </div>
              <div className="flex items-center text-sm">
                {item.archived ? (
                  <>
                    <LucideReact.Archive size={16} className="text-gray-500 mr-1" />
                    <span className="text-gray-500">Archived</span>
                  </>
                ) : (
                  <>
                    <LucideReact.CheckCircle size={16} className="text-green-500 mr-1" />
                    <span className="text-green-600">Active</span>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

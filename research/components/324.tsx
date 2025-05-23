import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * Grade for a student or groups GitHub Classroom assignment
     *
     * @title Classroom Assignment Grade
    */
    export interface classroom_assignment_grade {
        /**
         * Name of the assignment
        */
        assignment_name: string;
        /**
         * URL of the assignment
        */
        assignment_url: string;
        /**
         * URL of the starter code for the assignment
        */
        starter_code_url: string;
        /**
         * GitHub username of the student
        */
        github_username: string;
        /**
         * Roster identifier of the student
        */
        roster_identifier: string;
        /**
         * Name of the student's assignment repository
        */
        student_repository_name: string;
        /**
         * URL of the student's assignment repository
        */
        student_repository_url: string;
        /**
         * Timestamp of the student's assignment submission
        */
        submission_timestamp: string;
        /**
         * Number of points awarded to the student
        */
        points_awarded: number & tags.Type<"int32">;
        /**
         * Number of points available for the assignment
        */
        points_available: number & tags.Type<"int32">;
        /**
         * If a group assignment, name of the group the student is in
        */
        group_name?: string;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.classroom_assignment_grade[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const totalCount = value.length;
  const averagePercent = totalCount > 0
    ? (
        value.reduce(
          (sum, item) =>
            sum + (item.points_available > 0
              ? item.points_awarded / item.points_available
              : 0),
          0,
        ) /
        totalCount
      ) * 100
    : 0;
  const formattedAverage = averagePercent.toFixed(1);

  // Helper to format timestamps
  const formatDate = (iso: string) =>
    new Date(iso).toLocaleString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (totalCount === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-gray-500">
        <LucideReact.AlertCircle size={48} className="mb-2" />
        <span className="text-lg">No assignments to display</span>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm space-y-4">
      {/* Header with summary */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-semibold text-gray-800">
          Classroom Assignment Grades
        </h2>
        <div className="mt-2 sm:mt-0 text-sm text-gray-600">
          {totalCount} {totalCount === 1 ? 'Assignment' : 'Assignments'} · Avg. {formattedAverage}%
        </div>
      </div>

      {/* List of assignments */}
      <div className="divide-y divide-gray-200">
        {value.map((item, idx) => {
          const submission = formatDate(item.submission_timestamp);
          const percent = item.points_available
            ? ((item.points_awarded / item.points_available) * 100).toFixed(1)
            : '0.0';
          const isPerfect = item.points_awarded === item.points_available;

          return (
            <div
              key={idx}
              className="py-4 flex flex-col sm:flex-row sm:justify-between sm:items-center"
            >
              {/* Left: Assignment title and optional group */}
              <div className="flex items-center space-x-2 truncate">
                <LucideReact.Link size={16} className="text-blue-500 flex-shrink-0" />
                <a
                  href={item.assignment_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-blue-600 hover:underline truncate"
                  title={item.assignment_name}
                >
                  {item.assignment_name}
                </a>
                {item.group_name && (
                  <span className="ml-2 inline-block bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded">
                    {item.group_name}
                  </span>
                )}
              </div>

              {/* Right: Details */}
              <div className="mt-3 sm:mt-0 flex flex-wrap items-center text-sm text-gray-500 space-x-4">
                {/* Submission date */}
                <div className="flex items-center gap-1">
                  <LucideReact.Calendar size={16} className="flex-shrink-0" />
                  <span className="truncate">{submission}</span>
                </div>

                {/* Score */}
                <div className="flex items-center gap-1">
                  {isPerfect ? (
                    <LucideReact.CheckCircle className="text-green-500" size={16} />
                  ) : (
                    <LucideReact.AlertTriangle className="text-amber-500" size={16} />
                  )}
                  <span>
                    {item.points_awarded}/{item.points_available} ({percent}%)
                  </span>
                </div>

                {/* Student repo link */}
                <div className="flex items-center gap-1 max-w-xs truncate">
                  <LucideReact.Code size={16} className="text-gray-400 flex-shrink-0" />
                  <a
                    href={item.student_repository_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline truncate"
                    title={item.student_repository_name}
                  >
                    {item.student_repository_name}
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

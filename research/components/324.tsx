import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * Grade for a student or groups GitHub Classroom assignment
   *
   * @title Classroom Assignment Grade
   */
  export type classroom_assignment_grade = {
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
  };
}
export type AutoViewInput = AutoViewInputSubTypes.classroom_assignment_grade[];

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // Handle empty state
  if (!value || value.length === 0) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-md flex flex-col items-center text-gray-500">
        <LucideReact.AlertCircle size={48} className="mb-2" />
        <span className="text-sm">No submissions available</span>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white divide-y divide-gray-200 shadow rounded-lg">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
              Student
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
              Assignment
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
              Submitted
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
              Grade
            </th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
              Group
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {value.map((item, idx) => {
            // Format submission date
            const submissionDate = new Date(item.submission_timestamp);
            const formattedDate = submissionDate.toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
            });
            // Calculate grade percentage
            const percentage = Math.round(
              (item.points_awarded / item.points_available) * 100,
            );

            return (
              <tr key={idx}>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                  <div className="flex items-center gap-2">
                    <LucideReact.Github size={16} className="text-gray-500" />
                    <a
                      href={item.student_repository_url}
                      className="text-blue-600 hover:underline truncate"
                      title={item.github_username}
                    >
                      {item.github_username}
                    </a>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                  <div className="flex items-center gap-1">
                    <LucideReact.Link size={16} className="text-gray-500" />
                    <a
                      href={item.assignment_url}
                      className="text-blue-600 hover:underline truncate"
                      title={item.assignment_name}
                    >
                      {item.assignment_name}
                    </a>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                  <div className="flex items-center gap-1">
                    <LucideReact.Calendar size={16} className="text-gray-500" />
                    <span>{formattedDate}</span>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                  <div className="flex flex-col">
                    <span>
                      {item.points_awarded} / {item.points_available} (
                      {percentage}%)
                    </span>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1 overflow-hidden">
                      <div
                        className="bg-green-500 h-2"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                  {item.group_name ? (
                    <div className="flex items-center gap-1">
                      <LucideReact.Users size={16} className="text-gray-500" />
                      <span>{item.group_name}</span>
                    </div>
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

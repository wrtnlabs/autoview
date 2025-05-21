import { tags } from "typia";
import React from "react";
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
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  //    - Sort submissions by most recent
  //    - Format date and calculate percentage score
  const submissions = [...value].sort(
    (a, b) =>
      new Date(b.submission_timestamp).getTime() -
      new Date(a.submission_timestamp).getTime()
  );

  const formatDate = (iso: string): string =>
    new Date(iso).toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    - Card list of classroom assignment grades
  //    - Mobile-first responsive design
  return (
    <div className="space-y-4">
      {submissions.map((item, index) => {
        const percent =
          item.points_available > 0
            ? Math.round(
                (item.points_awarded / item.points_available) * 100
              )
            : 0;
        return (
          <div
            key={index}
            className="p-4 bg-white rounded-lg shadow-sm border border-gray-200"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800 truncate">
                {item.assignment_name}
              </h3>
              <span className="mt-1 sm:mt-0 text-sm text-gray-500">
                {formatDate(item.submission_timestamp)}
              </span>
            </div>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-700">
              <div>
                <span className="font-medium">Student:</span>{" "}
                {item.github_username} ({item.roster_identifier})
              </div>
              {item.group_name && (
                <div>
                  <span className="font-medium">Group:</span>{" "}
                  {item.group_name}
                </div>
              )}
              <div>
                <span className="font-medium">Score:</span>{" "}
                {item.points_awarded}/{item.points_available} (
                {percent}%)
              </div>
              <div className="col-span-1 sm:col-span-2 flex flex-col space-y-1">
                <div>
                  <span className="font-medium">Assignment URL:</span>
                </div>
                <div className="truncate text-blue-600">
                  {item.assignment_url}
                </div>
                <div>
                  <span className="font-medium">Starter Code:</span>
                </div>
                <div className="truncate text-blue-600">
                  {item.starter_code_url}
                </div>
                <div>
                  <span className="font-medium">Repo URL:</span>
                </div>
                <div className="truncate text-blue-600">
                  {item.student_repository_url}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

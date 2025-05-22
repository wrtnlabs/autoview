import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * A GitHub Classroom accepted assignment
     *
     * @title Classroom Accepted Assignment
    */
    export type classroom_accepted_assignment = {
        /**
         * Unique identifier of the repository.
        */
        id: number & tags.Type<"int32">;
        /**
         * Whether an accepted assignment has been submitted.
        */
        submitted: boolean;
        /**
         * Whether a submission passed.
        */
        passing: boolean;
        /**
         * Count of student commits.
        */
        commit_count: number & tags.Type<"int32">;
        /**
         * Most recent grade.
        */
        grade: string;
        students: AutoViewInputSubTypes.simple_classroom_user[];
        repository: AutoViewInputSubTypes.simple_classroom_repository;
        assignment: AutoViewInputSubTypes.simple_classroom_assignment;
    };
    /**
     * A GitHub user simplified for Classroom.
     *
     * @title Simple Classroom User
    */
    export type simple_classroom_user = {
        id: number & tags.Type<"int32">;
        login: string;
        avatar_url: string & tags.Format<"uri">;
        html_url: string & tags.Format<"uri">;
    };
    /**
     * A GitHub repository view for Classroom
     *
     * @title Simple Classroom Repository
    */
    export type simple_classroom_repository = {
        /**
         * A unique identifier of the repository.
        */
        id: number & tags.Type<"int32">;
        /**
         * The full, globally unique name of the repository.
        */
        full_name: string;
        /**
         * The URL to view the repository on GitHub.com.
        */
        html_url: string;
        /**
         * The GraphQL identifier of the repository.
        */
        node_id: string;
        /**
         * Whether the repository is private.
        */
        "private": boolean;
        /**
         * The default branch for the repository.
        */
        default_branch: string;
    };
    /**
     * A GitHub Classroom assignment
     *
     * @title Simple Classroom Assignment
    */
    export type simple_classroom_assignment = {
        /**
         * Unique identifier of the repository.
        */
        id: number & tags.Type<"int32">;
        /**
         * Whether an accepted assignment creates a public repository.
        */
        public_repo: boolean;
        /**
         * Assignment title.
        */
        title: string;
        /**
         * Whether it's a Group Assignment or Individual Assignment.
        */
        type: "individual" | "group";
        /**
         * The link that a student can use to accept the assignment.
        */
        invite_link: string;
        /**
         * Whether the invitation link is enabled. Visiting an enabled invitation link will accept the assignment.
        */
        invitations_enabled: boolean;
        /**
         * Sluggified name of the assignment.
        */
        slug: string;
        /**
         * Whether students are admins on created repository on accepted assignment.
        */
        students_are_repo_admins: boolean;
        /**
         * Whether feedback pull request will be created on assignment acceptance.
        */
        feedback_pull_requests_enabled: boolean;
        /**
         * The maximum allowable teams for the assignment.
        */
        max_teams?: (number & tags.Type<"int32">) | null;
        /**
         * The maximum allowable members per team.
        */
        max_members?: (number & tags.Type<"int32">) | null;
        /**
         * The selected editor for the assignment.
        */
        editor: string;
        /**
         * The number of students that have accepted the assignment.
        */
        accepted: number & tags.Type<"int32">;
        /**
         * The number of students that have submitted the assignment.
        */
        submitted: number & tags.Type<"int32">;
        /**
         * The number of students that have passed the assignment.
        */
        passing: number & tags.Type<"int32">;
        /**
         * The programming language used in the assignment.
        */
        language: string;
        /**
         * The time at which the assignment is due.
        */
        deadline: (string & tags.Format<"date-time">) | null;
        classroom: AutoViewInputSubTypes.simple_classroom;
    };
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
export type AutoViewInput = AutoViewInputSubTypes.classroom_accepted_assignment[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formatDate = (iso: string | null): string =>
    iso
      ? new Date(iso).toLocaleDateString("default", {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      : "No deadline";

  const assignments = Array.isArray(value) ? value : [];

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (assignments.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No assignments to display.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="px-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Classroom Accepted Assignments ({assignments.length})
        </h2>
      </div>
      {assignments.map((item) => (
        <div
          key={item.id}
          className="mx-4 bg-white rounded-lg shadow-md overflow-hidden"
        >
          <div className="p-4">
            <div className="flex justify-between items-start">
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-gray-900 truncate">
                  {item.assignment.title}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {item.assignment.type === "group"
                    ? "Group Assignment"
                    : "Individual Assignment"}
                </p>
              </div>
              <div className="ml-4 flex-shrink-0 text-sm text-gray-600">
                {formatDate(item.assignment.deadline)}
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-gray-700">
              <div>
                <span className="font-medium">Repository:</span>{" "}
                <span className="truncate">{item.repository.full_name}</span>
              </div>
              <div>
                <span className="font-medium">Commits:</span>{" "}
                {item.commit_count}
              </div>
              <div>
                <span className="font-medium">Submitted:</span>{" "}
                {item.submitted ? "Yes" : "No"}
              </div>
              <div>
                <span className="font-medium">Passing:</span>{" "}
                {item.passing ? "Yes" : "No"}
              </div>
              <div>
                <span className="font-medium">Grade:</span> {item.grade}
              </div>
              <div>
                <span className="font-medium">Students:</span>{" "}
                {item.students.length}
              </div>
            </div>

            <div className="mt-4">
              <div className="text-sm font-medium text-gray-600 mb-1">
                Student Avatars
              </div>
              <div className="flex -space-x-2 overflow-hidden">
                {item.students.slice(0, 5).map((student) => (
                  <img
                    key={student.id}
                    src={student.avatar_url}
                    alt={student.login}
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
                  />
                ))}
                {item.students.length > 5 && (
                  <div className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-gray-200 text-xs font-medium text-gray-600 ring-2 ring-white">
                    +{item.students.length - 5}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 border-t pt-4 text-sm text-gray-600">
              <div>
                <span className="font-medium">Classroom:</span>{" "}
                {item.assignment.classroom.name}
                {item.assignment.classroom.archived && (
                  <span className="ml-1 text-red-500">(Archived)</span>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

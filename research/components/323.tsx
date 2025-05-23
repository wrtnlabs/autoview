import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * A GitHub Classroom accepted assignment
     *
     * @title Classroom Accepted Assignment
    */
    export interface classroom_accepted_assignment {
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
    }
    /**
     * A GitHub user simplified for Classroom.
     *
     * @title Simple Classroom User
    */
    export interface simple_classroom_user {
        id: number & tags.Type<"int32">;
        login: string;
        avatar_url: string & tags.Format<"uri">;
        html_url: string & tags.Format<"uri">;
    }
    /**
     * A GitHub repository view for Classroom
     *
     * @title Simple Classroom Repository
    */
    export interface simple_classroom_repository {
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
    }
    /**
     * A GitHub Classroom assignment
     *
     * @title Simple Classroom Assignment
    */
    export interface simple_classroom_assignment {
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
    }
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
export type AutoViewInput = AutoViewInputSubTypes.classroom_accepted_assignment[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // Empty state
  if (!value || value.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        <LucideReact.AlertCircle size={48} className="mx-auto mb-4" />
        <p>No assignments available.</p>
      </div>
    );
  }

  return (
    <ul className="space-y-4">
      {value.map((item, idx) => {
        const {
          assignment,
          repository,
          students,
          commit_count,
          grade,
          submitted,
          passing,
        } = item;
        const formattedDeadline = assignment.deadline
          ? new Date(assignment.deadline).toLocaleString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
            })
          : "No deadline";

        return (
          <li key={idx} className="p-4 bg-white rounded-lg shadow">
            <div className="flex flex-col sm:flex-row sm:justify-between">
              {/* Left: Assignment details */}
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 truncate">
                  {assignment.title}
                </h3>

                {/* Student avatars */}
                <div className="mt-2 flex items-center">
                  <div className="flex -space-x-2">
                    {students.map((student) => (
                      <img
                        key={student.id}
                        src={student.avatar_url}
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                            student.login
                          )}&background=0D8ABC&color=fff`;
                        }}
                        alt={student.login}
                        title={student.login}
                        className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                      />
                    ))}
                  </div>
                  <span className="ml-3 text-sm text-gray-600">
                    {students.length}{" "}
                    {students.length > 1 ? "students" : "student"}
                  </span>
                </div>

                {/* Metadata */}
                <div className="mt-3 flex flex-wrap text-sm text-gray-600 space-x-4">
                  <div className="flex items-center">
                    <LucideReact.Link className="text-gray-400" size={16} />
                    <a
                      href={repository.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-1 hover:underline truncate"
                    >
                      {repository.full_name}
                    </a>
                  </div>
                  <div className="flex items-center">
                    <LucideReact.Code className="text-gray-400" size={16} />
                    <span className="ml-1">{commit_count} commits</span>
                  </div>
                  <div className="flex items-center">
                    <LucideReact.Calendar className="text-gray-400" size={16} />
                    <span className="ml-1">{formattedDeadline}</span>
                  </div>
                  {assignment.language && (
                    <div className="flex items-center">
                      <LucideReact.Code className="text-gray-400" size={16} />
                      <span className="ml-1">{assignment.language}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Right: Status and grade */}
              <div className="mt-4 sm:mt-0 flex flex-col sm:items-end space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-700">
                    Submitted:
                  </span>
                  {submitted ? (
                    <LucideReact.CheckCircle
                      className="text-green-500"
                      size={16}
                    />
                  ) : (
                    <LucideReact.XCircle className="text-red-500" size={16} />
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-700">
                    Passing:
                  </span>
                  {passing ? (
                    <LucideReact.CheckCircle
                      className="text-green-500"
                      size={16}
                    />
                  ) : (
                    <LucideReact.XCircle className="text-red-500" size={16} />
                  )}
                </div>
                <div className="flex items-center space-x-1">
                  <LucideReact.Star className="text-amber-400" size={16} />
                  <span className="text-sm font-medium text-gray-700">
                    {grade}
                  </span>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

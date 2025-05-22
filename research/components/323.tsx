import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

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
    private: boolean;
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
export type AutoViewInput =
  AutoViewInputSubTypes.classroom_accepted_assignment[];

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  // If no assignments, show empty state
  if (!value || value.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-gray-500">
        <LucideReact.AlertCircle size={24} className="mb-2" />
        <span>No accepted assignments found.</span>
      </div>
    );
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="space-y-4">
      {value.map((rec) => {
        const {
          id,
          submitted,
          passing,
          commit_count,
          grade,
          students,
          repository,
          assignment,
        } = rec;
        const formattedDeadline = assignment.deadline
          ? new Date(assignment.deadline).toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
            })
          : "No deadline";
        // Determine status icon and label
        let StatusIcon: JSX.Element;
        let statusLabel: string;
        if (!submitted) {
          StatusIcon = (
            <LucideReact.Clock className="text-amber-500" size={16} />
          );
          statusLabel = "Pending";
        } else if (passing) {
          StatusIcon = (
            <LucideReact.CheckCircle className="text-green-500" size={16} />
          );
          statusLabel = "Passed";
        } else {
          StatusIcon = (
            <LucideReact.XCircle className="text-red-500" size={16} />
          );
          statusLabel = "Needs Improvement";
        }
        // Assignment type icon
        const TypeIcon =
          assignment.type === "group" ? (
            <LucideReact.Users className="text-gray-500" size={16} />
          ) : (
            <LucideReact.User className="text-gray-500" size={16} />
          );

        return (
          <div key={id} className="p-4 bg-white rounded-lg shadow-md">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              {/* Left: Students & Title */}
              <div className="flex items-start md:items-center gap-3">
                {/* Avatars */}
                <div className="flex -space-x-2">
                  {students.slice(0, 3).map((s, idx) => (
                    <img
                      key={s.id}
                      src={s.avatar_url}
                      alt={s.login}
                      onError={(e) => {
                        const img = e.currentTarget;
                        img.onerror = null;
                        img.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(s.login)}&background=0D8ABC&color=fff`;
                      }}
                      className="w-8 h-8 rounded-full border-2 border-white object-cover"
                    />
                  ))}
                  {students.length > 3 && (
                    <span className="w-8 h-8 flex items-center justify-center bg-gray-200 text-gray-600 text-xs font-medium rounded-full border-2 border-white">
                      +{students.length - 3}
                    </span>
                  )}
                </div>
                {/* Title and type */}
                <div className="flex items-center gap-1">
                  <h3 className="text-lg font-semibold text-gray-800 truncate">
                    {assignment.title}
                  </h3>
                  {TypeIcon}
                </div>
              </div>
              {/* Right: Repository */}
              <div className="mt-2 md:mt-0 flex items-center text-gray-500 text-sm truncate">
                <LucideReact.Link size={16} className="mr-1" />
                <span className="truncate">{repository.full_name}</span>
              </div>
            </div>
            {/* Details row */}
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-600">
              {/* Commit count */}
              <div className="flex items-center gap-1">
                <LucideReact.GitCommit size={16} className="text-gray-400" />
                <span>{commit_count} commits</span>
              </div>
              {/* Submission status */}
              <div className="flex items-center gap-1">
                {StatusIcon}
                <span>{statusLabel}</span>
              </div>
              {/* Grade */}
              <div className="flex items-center gap-1">
                <LucideReact.Star size={16} className="text-amber-400" />
                <span>{grade}</span>
              </div>
              {/* Deadline */}
              <div className="flex items-center gap-1">
                <LucideReact.Calendar size={16} className="text-gray-400" />
                <span>{formattedDeadline}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

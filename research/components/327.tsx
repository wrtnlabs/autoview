import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
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
export type AutoViewInput = AutoViewInputSubTypes.simple_classroom_assignment[];

export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  const assignments = value;
  if (assignments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-gray-500">
        <LucideReact.AlertCircle
          size={48}
          className="mb-4"
          aria-hidden="true"
        />
        <span>No assignments available.</span>
      </div>
    );
  }

  const formatDate = (dateString: string | null): string =>
    dateString
      ? new Date(dateString).toLocaleString(undefined, {
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      : "No deadline";

  const tagColorClasses: Record<string, string> = {
    green: "text-green-700 bg-green-100",
    blue: "text-blue-700 bg-blue-100",
    indigo: "text-indigo-700 bg-indigo-100",
    teal: "text-teal-700 bg-teal-100",
    gray: "text-gray-700 bg-gray-100",
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {assignments.map((assignment) => {
        const deadlineText = formatDate(assignment.deadline);
        const statusTags: { label: string; color: string }[] = [];
        if (assignment.public_repo)
          statusTags.push({ label: "Public Repo", color: "green" });
        if (assignment.students_are_repo_admins)
          statusTags.push({ label: "Students as Admins", color: "blue" });
        if (assignment.feedback_pull_requests_enabled)
          statusTags.push({ label: "Feedback PRs", color: "indigo" });
        if (assignment.invitations_enabled)
          statusTags.push({ label: "Invitations Enabled", color: "teal" });
        if (assignment.classroom.archived)
          statusTags.push({ label: "Classroom Archived", color: "gray" });

        return (
          <article
            key={assignment.id}
            className="p-4 bg-white rounded-lg shadow hover:shadow-md transition"
          >
            <header className="mb-2">
              <h2 className="text-lg font-semibold text-gray-800 truncate">
                {assignment.title}
              </h2>
              <p className="text-sm text-gray-500">
                {assignment.classroom.name}
              </p>
            </header>

            <div className="flex items-center gap-2 mb-2 text-sm text-gray-600">
              {assignment.type === "group" ? (
                <LucideReact.Users
                  size={16}
                  className="text-gray-400"
                  aria-label="Group Assignment"
                />
              ) : (
                <LucideReact.User
                  size={16}
                  className="text-gray-400"
                  aria-label="Individual Assignment"
                />
              )}
              <span className="capitalize">{assignment.type} Assignment</span>
            </div>

            <div className="flex items-center gap-4 mb-2 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <LucideReact.Code
                  size={16}
                  className="text-gray-400"
                  aria-hidden="true"
                />
                <span>{assignment.language}</span>
              </div>
              <div className="flex items-center gap-1">
                <LucideReact.Edit3
                  size={16}
                  className="text-gray-400"
                  aria-hidden="true"
                />
                <span>{assignment.editor}</span>
              </div>
            </div>

            <div className="flex items-center gap-1 mb-2 text-sm text-gray-600">
              <LucideReact.Calendar
                size={16}
                className="text-gray-400"
                aria-hidden="true"
              />
              <span>{deadlineText}</span>
            </div>

            <div className="flex flex-wrap items-center gap-4 mb-2 text-sm">
              <div className="flex items-center gap-1 text-gray-600">
                <LucideReact.CheckCircle
                  size={16}
                  className="text-green-500"
                  aria-hidden="true"
                />
                <span>{assignment.accepted} Accepted</span>
              </div>
              <div className="flex items-center gap-1 text-gray-600">
                <LucideReact.UploadCloud
                  size={16}
                  className="text-blue-500"
                  aria-hidden="true"
                />
                <span>{assignment.submitted} Submitted</span>
              </div>
              <div className="flex items-center gap-1 text-gray-600">
                <LucideReact.Award
                  size={16}
                  className="text-yellow-500"
                  aria-hidden="true"
                />
                <span>{assignment.passing} Passing</span>
              </div>
            </div>

            {(assignment.max_teams != null ||
              assignment.max_members != null) && (
              <div className="flex items-center gap-4 mb-2 text-sm text-gray-600">
                {assignment.max_teams != null && (
                  <span>Max Teams: {assignment.max_teams}</span>
                )}
                {assignment.max_members != null && (
                  <span>Max Members: {assignment.max_members}</span>
                )}
              </div>
            )}

            {statusTags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {statusTags.map((tag) => (
                  <span
                    key={tag.label}
                    className={`px-2 py-0.5 text-xs font-medium ${tagColorClasses[tag.color]} rounded`}
                  >
                    {tag.label}
                  </span>
                ))}
              </div>
            )}
          </article>
        );
      })}
    </div>
  );
}

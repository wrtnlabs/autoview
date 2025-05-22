import * as LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  /**
   * A GitHub Classroom assignment
   *
   * @title Classroom Assignment
   */
  export type classroom_assignment = {
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
     * Whether it's a group assignment or individual assignment.
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
     * Whether students are admins on created repository when a student accepts the assignment.
     */
    students_are_repo_admins: boolean;
    /**
     * Whether feedback pull request will be created when a student accepts the assignment.
     */
    feedback_pull_requests_enabled: boolean;
    /**
     * The maximum allowable teams for the assignment.
     */
    max_teams: (number & tags.Type<"int32">) | null;
    /**
     * The maximum allowable members per team.
     */
    max_members: (number & tags.Type<"int32">) | null;
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
    starter_code_repository: AutoViewInputSubTypes.simple_classroom_repository;
    classroom: AutoViewInputSubTypes.classroom;
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
   * A GitHub Classroom classroom
   *
   * @title Classroom
   */
  export type classroom = {
    /**
     * Unique identifier of the classroom.
     */
    id: number & tags.Type<"int32">;
    /**
     * The name of the classroom.
     */
    name: string;
    /**
     * Whether classroom is archived.
     */
    archived: boolean;
    organization: AutoViewInputSubTypes.simple_classroom_organization;
    /**
     * The URL of the classroom on GitHub Classroom.
     */
    url: string;
  };
  /**
   * A GitHub organization.
   *
   * @title Organization Simple for Classroom
   */
  export type simple_classroom_organization = {
    id: number & tags.Type<"int32">;
    login: string;
    node_id: string;
    html_url: string & tags.Format<"uri">;
    name: string | null;
    avatar_url: string;
  };
}
export type AutoViewInput = AutoViewInputSubTypes.classroom_assignment;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const assignmentType =
    value.type === "individual" ? "Individual Assignment" : "Group Assignment";
  const formattedDeadline = value.deadline
    ? new Date(value.deadline).toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : "No deadline";
  const repoVisibilityText = value.public_repo
    ? "Public Repository"
    : "Private Repository";
  const repoVisibilityIcon = value.public_repo ? (
    <LucideReact.CheckCircle
      size={16}
      className="text-green-500"
      aria-label="Public"
    />
  ) : (
    <LucideReact.XCircle
      size={16}
      className="text-red-500"
      aria-label="Private"
    />
  );
  const teamsInfo =
    value.type === "group"
      ? `${value.max_teams ?? "Unlimited"} teams, up to ${value.max_members ?? "Unlimited"} members`
      : null;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilize semantic HTML elements where appropriate.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 truncate">
          {value.title}
        </h2>
        <span className="px-2 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded">
          {assignmentType}
        </span>
      </div>

      {/* Key Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
        <div className="flex items-center space-x-1">
          <LucideReact.Users size={16} className="text-gray-500" />
          <span>{value.classroom.name}</span>
        </div>
        <div className="flex items-center space-x-1">
          <LucideReact.User size={16} className="text-gray-500" />
          <span>{value.classroom.organization.login}</span>
        </div>
        <div className="flex items-center space-x-1">
          <LucideReact.Link size={16} className="text-gray-500" />
          <span>
            {value.invitations_enabled
              ? "Invitations Enabled"
              : "Invitations Disabled"}
          </span>
        </div>
        {value.invitations_enabled && (
          <div className="flex items-center space-x-1 truncate">
            <LucideReact.Link size={16} className="text-gray-500" />
            <span className="truncate">{value.invite_link}</span>
          </div>
        )}
        <div className="flex items-center space-x-1">
          <LucideReact.Calendar size={16} className="text-gray-500" />
          <span>{formattedDeadline}</span>
        </div>
        <div className="flex items-center space-x-1">
          {repoVisibilityIcon}
          <span>{repoVisibilityText}</span>
        </div>
        <div className="flex items-center space-x-1 col-span-1 sm:col-span-2 truncate">
          <LucideReact.Link size={16} className="text-gray-500" />
          <span className="truncate">
            {value.starter_code_repository.full_name}
          </span>
        </div>
        {teamsInfo && (
          <div className="flex items-center space-x-1">
            <LucideReact.Tag size={16} className="text-gray-500" />
            <span>{teamsInfo}</span>
          </div>
        )}
      </div>

      {/* Participation Statistics */}
      <div className="flex items-center space-x-6 text-sm text-gray-600">
        <div className="flex items-center space-x-1">
          <LucideReact.Users size={16} className="text-gray-500" />
          <span>{value.accepted} Accepted</span>
        </div>
        <div className="flex items-center space-x-1">
          <LucideReact.UploadCloud size={16} className="text-gray-500" />
          <span>{value.submitted} Submitted</span>
        </div>
        <div className="flex items-center space-x-1">
          <LucideReact.CheckCircle size={16} className="text-green-500" />
          <span>{value.passing} Passing</span>
        </div>
      </div>

      {/* Features & Settings */}
      <div className="flex flex-wrap gap-2 text-sm">
        <span className="flex items-center space-x-1 px-2 py-1 bg-gray-100 text-gray-800 rounded">
          <LucideReact.Edit3 size={16} className="text-gray-500" />
          <span>{value.editor}</span>
        </span>
        <span className="flex items-center space-x-1 px-2 py-1 bg-gray-100 text-gray-800 rounded">
          <LucideReact.Code size={16} className="text-gray-500" />
          <span>{value.language}</span>
        </span>
        <span className="flex items-center space-x-1 px-2 py-1 bg-gray-100 text-gray-800 rounded">
          {value.students_are_repo_admins ? (
            <LucideReact.CheckCircle size={16} className="text-green-500" />
          ) : (
            <LucideReact.XCircle size={16} className="text-red-500" />
          )}
          <span>Students as Admins</span>
        </span>
        <span className="flex items-center space-x-1 px-2 py-1 bg-gray-100 text-gray-800 rounded">
          {value.feedback_pull_requests_enabled ? (
            <LucideReact.CheckCircle size={16} className="text-green-500" />
          ) : (
            <LucideReact.XCircle size={16} className="text-red-500" />
          )}
          <span>Feedback PRs</span>
        </span>
      </div>
    </div>
  );
}

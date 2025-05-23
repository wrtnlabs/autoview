import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * A GitHub Classroom assignment
     *
     * @title Classroom Assignment
    */
    export interface classroom_assignment {
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
     * A GitHub Classroom classroom
     *
     * @title Classroom
    */
    export interface classroom {
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
    }
    /**
     * A GitHub organization.
     *
     * @title Organization Simple for Classroom
    */
    export interface simple_classroom_organization {
        id: number & tags.Type<"int32">;
        login: string;
        node_id: string;
        html_url: string & tags.Format<"uri">;
        name: string | null;
        avatar_url: string;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.classroom_assignment;



export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // Derived constants for display
  const typeIcon =
    value.type === 'individual' ? (
      <LucideReact.User size={16} className="text-gray-500" />
    ) : (
      <LucideReact.Users size={16} className="text-gray-500" />
    );
  const typeLabel =
    value.type === 'individual' ? 'Individual Assignment' : 'Group Assignment';

  const deadlineFormatted = value.deadline
    ? new Date(value.deadline).toLocaleString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      })
    : 'No deadline';

  const privacyIcon = value.public_repo ? (
    <LucideReact.Unlock size={16} className="text-green-500" />
  ) : (
    <LucideReact.Lock size={16} className="text-red-500" />
  );

  const stats = [
    {
      icon: <LucideReact.UserCheck size={16} className="text-blue-500" />,
      label: 'Accepted',
      count: value.accepted,
    },
    {
      icon: <LucideReact.FileCheck size={16} className="text-yellow-500" />,
      label: 'Submitted',
      count: value.submitted,
    },
    {
      icon: <LucideReact.Award size={16} className="text-green-500" />,
      label: 'Passing',
      count: value.passing,
    },
  ];

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = 'https://placehold.co/40x40/e2e8f0/1e293b?text=Org';
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-6">
      {/* Header: Title & Classroom */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex items-center space-x-3">
          <img
            src={value.classroom.organization.avatar_url}
            onError={handleImgError}
            alt={value.classroom.organization.name ?? value.classroom.organization.login}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h2 className="text-lg font-semibold text-gray-900 truncate">{value.title}</h2>
            <p className="text-sm text-gray-500">{value.classroom.name}</p>
          </div>
        </div>
        <a
          href={value.classroom.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 md:mt-0 flex items-center space-x-1 text-blue-600 hover:underline"
        >
          <LucideReact.Link size={16} />
          <span className="text-sm">View Classroom</span>
        </a>
      </div>

      {/* Key Attributes */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        <div className="flex items-center space-x-2">
          {typeIcon}
          <span className="text-sm text-gray-700">{typeLabel}</span>
        </div>
        <div className="flex items-center space-x-2">
          {privacyIcon}
          <span className="text-sm text-gray-700">
            {value.public_repo ? 'Public Repo' : 'Private Repo'}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <LucideReact.Calendar size={16} className="text-gray-500" />
          <span className="text-sm text-gray-700">{deadlineFormatted}</span>
        </div>
        <div className="flex items-center space-x-2">
          <LucideReact.Edit size={16} className="text-gray-500" />
          <span className="text-sm text-gray-700">{value.editor}</span>
        </div>
        <div className="flex items-center space-x-2">
          <LucideReact.Code size={16} className="text-gray-500" />
          <span className="text-sm text-gray-700">{value.language}</span>
        </div>
        {value.type === 'group' && (
          <>
            <div className="flex items-center space-x-2">
              <LucideReact.Users size={16} className="text-gray-500" />
              <span className="text-sm text-gray-700">
                Max Teams: {value.max_teams ?? 'Unlimited'}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <LucideReact.User size={16} className="text-gray-500" />
              <span className="text-sm text-gray-700">
                Max Members: {value.max_members ?? 'Unlimited'}
              </span>
            </div>
          </>
        )}
      </div>

      {/* Statistics */}
      <div>
        <p className="text-sm font-medium text-gray-800 mb-2">Stats</p>
        <div className="flex space-x-6">
          {stats.map(({ icon, label, count }) => (
            <div key={label} className="flex items-center space-x-1">
              {icon}
              <span className="text-sm text-gray-700">
                {label}: {count}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <a
          href={value.invitations_enabled ? value.invite_link : undefined}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center space-x-2 text-sm ${
            value.invitations_enabled ? 'text-blue-600 hover:underline' : 'text-gray-400'
          }`}
        >
          {value.invitations_enabled ? (
            <LucideReact.Link size={16} />
          ) : (
            <LucideReact.XCircle size={16} />
          )}
          <span>
            {value.invitations_enabled ? 'Join Link' : 'Invitations Disabled'}
          </span>
        </a>
        <a
          href={value.starter_code_repository.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 text-sm text-blue-600 hover:underline"
        >
          <LucideReact.GitBranch size={16} />
          <span>Starter Code</span>
        </a>
      </div>
    </div>
  );
}

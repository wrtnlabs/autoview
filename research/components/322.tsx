import { tags } from "typia";
import React from "react";
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
        "private": boolean;
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
  const formattedDeadline: string = value.deadline
    ? new Date(value.deadline).toLocaleString(undefined, {
        dateStyle: 'medium',
        timeStyle: 'short',
      })
    : 'No Deadline';

  const submissionRate: number =
    value.accepted > 0 ? Math.round((value.submitted / value.accepted) * 100) : 0;
  const passingRate: number =
    value.submitted > 0 ? Math.round((value.passing / value.submitted) * 100) : 0;

  const maxTeamsDisplay: string | number =
    value.max_teams === null ? 'Unlimited' : value.max_teams;
  const maxMembersDisplay: string | number =
    value.max_members === null ? 'Unlimited' : value.max_members;

  const assignmentType: string =
    value.type === 'group' ? 'Group Assignment' : 'Individual Assignment';

  const orgName: string =
    value.classroom.organization.name || value.classroom.organization.login;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="bg-white rounded-lg shadow p-6 space-y-6 max-w-md mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
        <h2 className="text-xl font-semibold text-gray-800 truncate">
          {value.title}
        </h2>
        <span className="mt-1 sm:mt-0 text-sm font-medium text-indigo-600">
          {assignmentType}
        </span>
      </div>

      {/* Subtitle */}
      <p className="text-sm text-gray-500">
        Editor: <span className="text-gray-700">{value.editor}</span> ·
        Language:{' '}
        <span className="text-gray-700">{value.language}</span>
      </p>

      {/* Details Grid */}
      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm">
        <div>
          <dt className="font-medium text-gray-500">Classroom</dt>
          <dd className="mt-1 flex items-center text-gray-700 truncate">
            <img
              src={value.classroom.organization.avatar_url}
              alt=""
              className="w-5 h-5 rounded-full mr-2 flex-shrink-0"
            />
            <span className="truncate">
              {orgName} / {value.classroom.name}
            </span>
          </dd>
        </div>
        <div>
          <dt className="font-medium text-gray-500">Deadline</dt>
          <dd className="mt-1 text-gray-700">{formattedDeadline}</dd>
        </div>
        <div>
          <dt className="font-medium text-gray-500">Invitations</dt>
          <dd className="mt-1 text-gray-700">
            {value.invitations_enabled ? 'Enabled' : 'Disabled'}
          </dd>
        </div>
        <div>
          <dt className="font-medium text-gray-500">Invite Link</dt>
          <dd className="mt-1">
            <code className="block text-xs text-blue-600 truncate">
              {value.invite_link}
            </code>
          </dd>
        </div>
        <div>
          <dt className="font-medium text-gray-500">Repository</dt>
          <dd className="mt-1 text-gray-700">
            {value.public_repo ? 'Public' : 'Private'}
          </dd>
        </div>
        <div>
          <dt className="font-medium text-gray-500">Students Are Admins</dt>
          <dd className="mt-1 text-gray-700">
            {value.students_are_repo_admins ? 'Yes' : 'No'}
          </dd>
        </div>
        <div>
          <dt className="font-medium text-gray-500">Feedback PRs</dt>
          <dd className="mt-1 text-gray-700">
            {value.feedback_pull_requests_enabled ? 'Enabled' : 'Disabled'}
          </dd>
        </div>
        {value.type === 'group' && (
          <>
            <div>
              <dt className="font-medium text-gray-500">Max Teams</dt>
              <dd className="mt-1 text-gray-700">{maxTeamsDisplay}</dd>
            </div>
            <div>
              <dt className="font-medium text-gray-500">Max Members/Team</dt>
              <dd className="mt-1 text-gray-700">{maxMembersDisplay}</dd>
            </div>
          </>
        )}
        <div className="sm:col-span-2">
          <dt className="font-medium text-gray-500">Starter Code</dt>
          <dd className="mt-1 text-gray-700 truncate">
            {value.starter_code_repository.full_name}
            @
            {value.starter_code_repository.default_branch}
          </dd>
        </div>
      </dl>

      {/* Statistics */}
      <div className="border-t pt-4 grid grid-cols-3 text-center text-sm">
        <div>
          <p className="text-lg font-semibold text-gray-800">
            {value.accepted}
          </p>
          <p className="text-gray-500">Accepted</p>
        </div>
        <div>
          <p className="text-lg font-semibold text-gray-800">
            {value.submitted} ({submissionRate}%)
          </p>
          <p className="text-gray-500">Submitted</p>
        </div>
        <div>
          <p className="text-lg font-semibold text-gray-800">
            {value.passing} ({passingRate}%)
          </p>
          <p className="text-gray-500">Passing</p>
        </div>
      </div>
    </div>
  );
}

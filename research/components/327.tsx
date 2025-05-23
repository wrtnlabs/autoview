import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
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
export type AutoViewInput = AutoViewInputSubTypes.simple_classroom_assignment[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Data grouping by classroom name
  const assignmentsByClassroom = value.reduce(
    (groups, assignment) => {
      const className = assignment.classroom.name;
      if (!groups[className]) groups[className] = [];
      groups[className].push(assignment);
      return groups;
    },
    {} as Record<string, AutoViewInputSubTypes.simple_classroom_assignment[]>,
  );

  // 2. Empty state
  if (value.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-gray-400">
        <LucideReact.AlertCircle size={48} />
        <p className="mt-4 text-lg">No assignments available</p>
      </div>
    );
  }

  // 3. JSX output
  return (
    <div className="space-y-10">
      {Object.entries(assignmentsByClassroom).map(([className, assignments]) => (
        <section key={className}>
          <header className="mb-4 flex items-center">
            <LucideReact.ClipboardList className="text-gray-600" size={24} />
            <h2 className="ml-2 text-2xl font-semibold text-gray-800">
              {className}
            </h2>
          </header>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {assignments.map((a) => {
              const formattedDeadline = a.deadline
                ? new Date(a.deadline).toLocaleString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "No deadline";
              const teamsLimit =
                a.max_teams == null ? "Unlimited" : a.max_teams;
              const membersLimit =
                a.max_members == null ? "Unlimited" : a.max_members;

              return (
                <div
                  key={a.id}
                  className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-lg font-medium text-gray-800 mb-3 truncate">
                    {a.title}
                  </h3>
                  <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <LucideReact.Edit2
                        className="text-gray-500"
                        size={16}
                      />
                      <span className="ml-1">{a.editor}</span>
                    </div>
                    <div className="flex items-center">
                      <LucideReact.Globe
                        className={
                          a.public_repo
                            ? "text-green-500"
                            : "text-gray-400"
                        }
                        size={16}
                      />
                      <span className="ml-1">
                        {a.public_repo ? "Public repo" : "Private repo"}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <LucideReact.Clock className="text-amber-500" size={16} />
                      <span className="ml-1 capitalize">{a.type}</span>
                    </div>
                    {a.type === "group" && (
                      <>
                        <div className="flex items-center">
                          <LucideReact.Users
                            className="text-gray-500"
                            size={16}
                          />
                          <span className="ml-1">Teams: {teamsLimit}</span>
                        </div>
                        <div className="flex items-center">
                          <LucideReact.User
                            className="text-gray-500"
                            size={16}
                          />
                          <span className="ml-1">
                            Members/team: {membersLimit}
                          </span>
                        </div>
                      </>
                    )}
                    <div className="flex items-center">
                      <LucideReact.Calendar
                        className="text-gray-500"
                        size={16}
                      />
                      <span className="ml-1">{formattedDeadline}</span>
                    </div>
                    <div className="flex items-center">
                      <LucideReact.Code className="text-gray-500" size={16} />
                      <span className="ml-1">{a.language}</span>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-gray-700 mb-4 space-x-4">
                    <div className="flex items-center">
                      <LucideReact.UserCheck
                        className="text-indigo-500"
                        size={16}
                      />
                      <span className="ml-1">Accepted: {a.accepted}</span>
                    </div>
                    <div className="flex items-center">
                      <LucideReact.Upload
                        className="text-blue-500"
                        size={16}
                      />
                      <span className="ml-1">Submitted: {a.submitted}</span>
                    </div>
                    <div className="flex items-center">
                      <LucideReact.CheckCircle
                        className="text-green-500"
                        size={16}
                      />
                      <span className="ml-1">Passing: {a.passing}</span>
                    </div>
                  </div>
                  <div className="text-sm">
                    <a
                      href={a.invite_link}
                      className="block truncate text-indigo-600 hover:underline"
                      title={a.invite_link}
                    >
                      Invite Link
                    </a>
                    <p className="mt-1 text-xs text-gray-500">
                      {a.invitations_enabled
                        ? "Invitations enabled"
                        : "Invitations disabled"}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}

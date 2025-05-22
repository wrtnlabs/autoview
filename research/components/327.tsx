import { tags } from "typia";
import React from "react";
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



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formatDate = (dateStr: string | null): string => {
    if (!dateStr) return "No deadline";
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return "Invalid date";
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="space-y-4">
      {value.length === 0 ? (
        <div className="text-center text-gray-500">No assignments available.</div>
      ) : (
        value.map((assignment) => {
          const {
            id,
            title,
            type,
            public_repo,
            invitations_enabled,
            accepted,
            submitted,
            passing,
            max_teams,
            max_members,
            editor,
            language,
            deadline,
            classroom,
          } = assignment;
          const invitationStatus = invitations_enabled ? "Open" : "Closed";
          const deadlineText = formatDate(deadline);

          return (
            <div
              key={id}
              className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Header: Title and Type */}
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold text-gray-800 truncate">
                  {title}
                </h3>
                <span
                  className={
                    "text-xs font-medium px-2 py-1 rounded " +
                    (type === "group"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-indigo-100 text-indigo-800")
                  }
                >
                  {type === "group" ? "Group" : "Individual"}
                </span>
              </div>

              {/* Classroom Name */}
              <div className="mt-1 text-sm text-gray-600 truncate">
                Classroom: {classroom.name}
              </div>

              {/* Badges */}
              <div className="mt-2 flex flex-wrap gap-2 text-xs">
                <span
                  className={
                    "px-2 py-1 rounded " +
                    (public_repo
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-600")
                  }
                >
                  {public_repo ? "Public Repo" : "Private Repo"}
                </span>
                <span
                  className={
                    "px-2 py-1 rounded " +
                    (invitations_enabled
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800")
                  }
                >
                  Invitations {invitationStatus}
                </span>
                <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded">
                  Editor: {editor}
                </span>
                <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded">
                  Lang: {language}
                </span>
                {max_teams !== undefined && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded">
                    Max Teams: {max_teams === null ? "∞" : max_teams}
                  </span>
                )}
                {max_members !== undefined && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded">
                    Max Members: {max_members === null ? "∞" : max_members}
                  </span>
                )}
                <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded">
                  Due: {deadlineText}
                </span>
              </div>

              {/* Statistics */}
              <div className="mt-4 grid grid-cols-3 text-center text-sm font-medium">
                <div>
                  <div className="text-gray-900">{accepted}</div>
                  <div className="text-gray-500">Accepted</div>
                </div>
                <div>
                  <div className="text-gray-900">{submitted}</div>
                  <div className="text-gray-500">Submitted</div>
                </div>
                <div>
                  <div className="text-gray-900">{passing}</div>
                  <div className="text-gray-500">Passed</div>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

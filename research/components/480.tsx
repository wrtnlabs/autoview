import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * Information about a Copilot Business seat assignment for a user, team, or organization.
     *
     * @title Copilot Business Seat Detail
    */
    export type copilot_seat_details = {
        assignee: AutoViewInputSubTypes.simple_user;
        organization?: AutoViewInputSubTypes.nullable_organization_simple;
        /**
         * The team through which the assignee is granted access to GitHub Copilot, if applicable.
        */
        assigning_team?: any | any | null;
        /**
         * The pending cancellation date for the seat, in `YYYY-MM-DD` format. This will be null unless the assignee's Copilot access has been canceled during the current billing cycle. If the seat has been cancelled, this corresponds to the start of the organization's next billing cycle.
        */
        pending_cancellation_date?: (string & tags.Format<"date">) | null;
        /**
         * Timestamp of user's last GitHub Copilot activity, in ISO 8601 format.
        */
        last_activity_at?: (string & tags.Format<"date-time">) | null;
        /**
         * Last editor that was used by the user for a GitHub Copilot completion.
        */
        last_activity_editor?: string | null;
        /**
         * Timestamp of when the assignee was last granted access to GitHub Copilot, in ISO 8601 format.
        */
        created_at: string;
        /**
         * **Closing down notice:** This field is no longer relevant and is closing down. Use the `created_at` field to determine when the assignee was last granted access to GitHub Copilot. Timestamp of when the assignee's GitHub Copilot access was last updated, in ISO 8601 format.
         *
         * @deprecated
        */
        updated_at?: string;
        /**
         * The Copilot plan of the organization, or the parent enterprise, when applicable.
        */
        plan_type?: "business" | "enterprise" | "unknown";
    };
    /**
     * A GitHub user.
     *
     * @title Simple User
    */
    export type simple_user = {
        name?: string | null;
        email?: string | null;
        login: string;
        id: number & tags.Type<"int32">;
        node_id: string;
        avatar_url: string & tags.Format<"uri">;
        gravatar_id: string | null;
        url: string & tags.Format<"uri">;
        html_url: string & tags.Format<"uri">;
        followers_url: string & tags.Format<"uri">;
        following_url: string;
        gists_url: string;
        starred_url: string;
        subscriptions_url: string & tags.Format<"uri">;
        organizations_url: string & tags.Format<"uri">;
        repos_url: string & tags.Format<"uri">;
        events_url: string;
        received_events_url: string & tags.Format<"uri">;
        type: string;
        site_admin: boolean;
        starred_at?: string;
        user_view_type?: string;
    };
    /**
     * A GitHub organization.
     *
     * @title Organization Simple
    */
    export type nullable_organization_simple = {
        login: string;
        id: number & tags.Type<"int32">;
        node_id: string;
        url: string & tags.Format<"uri">;
        repos_url: string & tags.Format<"uri">;
        events_url: string & tags.Format<"uri">;
        hooks_url: string;
        issues_url: string;
        members_url: string;
        public_members_url: string;
        avatar_url: string;
        description: string | null;
    } | null;
    export type team = any;
    export type enterprise_team = any;
}
export type AutoViewInput = AutoViewInputSubTypes.copilot_seat_details;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const assignee = value.assignee;
  const assigneeName = assignee.name ?? assignee.login;
  const avatarUrl = assignee.avatar_url;

  const organization = value.organization;
  const organizationName = organization?.login;

  const createdAt = new Date(value.created_at);
  const createdAtFormatted = createdAt.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const lastActivityAt = value.last_activity_at ? new Date(value.last_activity_at) : null;
  const lastActivityDate = lastActivityAt
    ? lastActivityAt.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;
  const lastActivityTime = lastActivityAt
    ? lastActivityAt.toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

  const pendingCancellationAt = value.pending_cancellation_date
    ? new Date(value.pending_cancellation_date)
    : null;
  const pendingCancellationFormatted = pendingCancellationAt
    ? pendingCancellationAt.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;

  const planType = value.plan_type ?? "unknown";
  const planBadgeClasses =
    planType === "business"
      ? "bg-blue-100 text-blue-800"
      : planType === "enterprise"
      ? "bg-purple-100 text-purple-800"
      : "bg-gray-100 text-gray-800";
  const planLabel = planType.charAt(0).toUpperCase() + planType.slice(1);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-sm mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center space-x-4">
        <img
          src={avatarUrl}
          alt={assigneeName}
          className="w-12 h-12 rounded-full object-cover flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-semibold text-gray-900 truncate">
            {assigneeName}
          </h2>
          <p className="text-sm text-gray-500 truncate">{assignee.login}</p>
        </div>
        <span
          className={`px-2 py-1 text-xs font-medium rounded ${planBadgeClasses}`}
        >
          {planLabel}
        </span>
      </div>
      <div className="mt-4 space-y-2 text-sm text-gray-700">
        <div>
          <span className="font-medium text-gray-900">Granted:</span>{" "}
          {createdAtFormatted}
        </div>
        {lastActivityDate && (
          <div>
            <span className="font-medium text-gray-900">Last Activity:</span>{" "}
            {lastActivityDate} at {lastActivityTime}
            {value.last_activity_editor && (
              <> via {value.last_activity_editor}</>
            )}
          </div>
        )}
        {organizationName && (
          <div>
            <span className="font-medium text-gray-900">Organization:</span>{" "}
            {organizationName}
          </div>
        )}
        {pendingCancellationFormatted && (
          <div>
            <span className="font-medium text-red-600">
              Pending Cancellation:
            </span>{" "}
            {pendingCancellationFormatted}
          </div>
        )}
      </div>
    </div>
  );
}

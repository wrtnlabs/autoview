import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    export namespace IApiOrgsCopilotBillingSeats {
        export type GetResponse = {
            /**
             * Total number of Copilot seats for the organization currently being billed.
            */
            total_seats?: number & tags.Type<"int32">;
            seats?: AutoViewInputSubTypes.copilot_seat_details[];
        };
    }
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
export type AutoViewInput = AutoViewInputSubTypes.IApiOrgsCopilotBillingSeats.GetResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const seats: AutoViewInputSubTypes.copilot_seat_details[] = value.seats ?? [];
  const totalSeats = value.total_seats ?? seats.length;
  const assignedSeats = seats.length;
  const pendingCount = seats.filter((s) => s.pending_cancellation_date != null).length;

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

  const formatDateTime = (dateStr: string) =>
    new Date(dateStr).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  const seatList = seats.map((seat, idx) => (
    <div key={idx} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-md">
      <img
        src={seat.assignee.avatar_url}
        alt={seat.assignee.login}
        className="w-10 h-10 rounded-full object-cover flex-shrink-0"
      />
      <div className="flex-1 min-w-0">
        <p className="text-md font-medium text-gray-800 truncate">
          {seat.assignee.name ?? seat.assignee.login}
        </p>
        {seat.plan_type && (
          <span className="inline-block text-xs px-2 py-0.5 mt-1 rounded-full text-white bg-blue-500">
            {seat.plan_type.charAt(0).toUpperCase() + seat.plan_type.slice(1)}
          </span>
        )}
        {seat.organization && (
          <p className="text-xs text-gray-500 truncate">{seat.organization.login}</p>
        )}
        <p className="text-xs text-gray-500">
          Last Active:{' '}
          {seat.last_activity_at ? formatDateTime(seat.last_activity_at) : 'N/A'}
        </p>
        {seat.pending_cancellation_date && (
          <p className="text-xs text-red-600">
            Cancels on {formatDate(seat.pending_cancellation_date)}
          </p>
        )}
      </div>
    </div>
  ));

  // 3. Return the React element.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md w-full max-w-md mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Copilot Billing Seats</h2>
      <div className="grid grid-cols-3 gap-4 text-center mb-6">
        <div>
          <p className="text-2xl font-bold text-indigo-600">{totalSeats}</p>
          <p className="text-sm text-gray-500">Total Seats</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-indigo-600">{assignedSeats}</p>
          <p className="text-sm text-gray-500">Assigned</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-indigo-600">{pendingCount}</p>
          <p className="text-sm text-gray-500">Pending Canc.</p>
        </div>
      </div>
      <div className="space-y-4">{seatList}</div>
    </div>
  );
}

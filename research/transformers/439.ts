import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace IApiOrgsCopilotBillingSeats {
        export type GetResponse = {
            /**
             * Total number of Copilot seats for the organization currently being billed.
            */
            total_seats?: number & tags.Type<"int32">;
            seats?: Schema.copilot_seat_details[];
        };
    }
    /**
     * Information about a Copilot Business seat assignment for a user, team, or organization.
     *
     * @title Copilot Business Seat Detail
    */
    export type copilot_seat_details = {
        assignee: Schema.simple_user;
        organization?: Schema.nullable_organization_simple;
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
type IAutoViewTransformerInputType = Schema.IApiOrgsCopilotBillingSeats.GetResponse;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Extract seats array and total seats, with sensible defaults
  const seats = input.seats ?? [];
  const totalSeats = input.total_seats ?? 0;

  // Helper to format ISO date strings to a human-readable date
  function formatDate(isoDate: string): string {
    // Using toLocaleDateString for simplicity; adjust options as needed
    const date = new Date(isoDate);
    return date.toLocaleDateString();
  }

  // Map plan types to chip colors for visual distinction
  const planColorMap: Record<string, IAutoView.IAutoViewChipProps['color']> = {
    business: "blue",
    enterprise: "orange",
    unknown: "gray",
  };

  // Build a DataListItemProps for each seat
  const dataListItems: IAutoView.IAutoViewDataListItemProps[] = seats.map(seat => {
    const assignee = seat.assignee;
    const planType = seat.plan_type ?? "unknown";
    const lastActivity = seat.last_activity_at;
    const pendingDate = seat.pending_cancellation_date;

    // Label for the row: avatar + login
    const labelComponents: IAutoView.IAutoViewPresentationComponentProps[] = [
      {
        type: "Avatar",
        src: assignee.avatar_url,
        name: assignee.login,
        size: 28,
      },
      {
        type: "Text",
        content: assignee.login,
        variant: "body1",
        // Small left margin to separate from avatar
        color: "primary",
      },
    ];

    // Value for the row: chips and text items for details
    const valueComponents: IAutoView.IAutoViewPresentationComponentProps[] = [];

    // Plan type chip
    valueComponents.push({
      type: "Chip",
      label: planType.charAt(0).toUpperCase() + planType.slice(1),
      color: planColorMap[planType] || "gray",
      size: "small",
      variant: "outlined",
    });

    // Last activity date as a text with an icon
    if (lastActivity) {
      valueComponents.push({
        type: "Text",
        content: [`🕒 ${formatDate(lastActivity)}`],
        variant: "caption",
        color: "secondary",
      });
    }

    // Pending cancellation date as a warning chip
    if (pendingDate) {
      valueComponents.push({
        type: "Chip",
        label: `Cancel on ${formatDate(pendingDate)}`,
        color: "warning",
        size: "small",
        variant: "outlined",
      });
    }

    return {
      type: "DataListItem",
      label: labelComponents,
      value: valueComponents,
    };
  });

  // Compose the overall UI as a vertical card with header and content
  return {
    type: "VerticalCard",
    childrenProps: [
      {
        // Card header with title and total seats badge
        type: "CardHeader",
        title: "GitHub Copilot Seats",
        description: `Total Seats: ${totalSeats}`,
        startElement: {
          type: "Badge",
          count: totalSeats,
          showZero: true,
          childrenProps: {
            type: "Icon",
            id: "users",
            color: "blue",
            size: 20,
          },
        },
      },
      {
        // Card content with a DataList of seat details
        type: "CardContent",
        childrenProps: {
          type: "DataList",
          childrenProps: dataListItems,
        },
      },
    ],
  };
}

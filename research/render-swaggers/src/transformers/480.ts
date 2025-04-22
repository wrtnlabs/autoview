import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
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
type IAutoViewTransformerInputType = Schema.copilot_seat_details;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(
  input: IAutoViewTransformerInputType,
): IAutoView.IAutoViewComponentProps {
  const {
    assignee,
    organization,
    pending_cancellation_date,
    last_activity_at,
    last_activity_editor,
    created_at,
    plan_type,
  } = input;

  // Map plan types to chip colors
  const planColorMap: Record<string, IAutoView.IAutoViewChipProps["color"]> = {
    business: "success",
    enterprise: "info",
    unknown: "gray",
  };

  // Build a list of data fields for the DataList
  const dataItems: IAutoView.IAutoViewDataListItemProps[] = [];

  // Plan type
  dataItems.push({
    type: "DataListItem",
    label: [
      { type: "Text", content: "Plan", variant: "subtitle2" },
    ],
    value: {
      type: "Chip",
      label: plan_type ?? "unknown",
      variant: "filled",
      color: planColorMap[plan_type ?? "unknown"],
    },
  });

  // Created at date
  dataItems.push({
    type: "DataListItem",
    label: [
      { type: "Text", content: "Created At", variant: "subtitle2" },
    ],
    value: {
      type: "Text",
      content: new Date(created_at).toLocaleDateString(),
      variant: "body2",
    },
  });

  // Last activity timestamp, if available
  if (last_activity_at) {
    dataItems.push({
      type: "DataListItem",
      label: [
        { type: "Text", content: "Last Activity", variant: "subtitle2" },
      ],
      value: {
        type: "Text",
        content: new Date(last_activity_at).toLocaleString(),
        variant: "body2",
      },
    });
    if (last_activity_editor) {
      dataItems.push({
        type: "DataListItem",
        label: [
          { type: "Text", content: "Editor Used", variant: "subtitle2" },
        ],
        value: {
          type: "Text",
          content: last_activity_editor,
          variant: "body2",
        },
      });
    }
  }

  // Pending cancellation date
  if (pending_cancellation_date) {
    dataItems.push({
      type: "DataListItem",
      label: [
        { type: "Text", content: "Will Cancel On", variant: "subtitle2" },
      ],
      value: {
        type: "Text",
        content: new Date(pending_cancellation_date).toLocaleDateString(),
        variant: "body2",
        color: "#d97706", // a warning amber tone
      },
    });
  }

  // Organization, if present
  if (organization) {
    dataItems.push({
      type: "DataListItem",
      label: [
        { type: "Text", content: "Organization", variant: "subtitle2" },
      ],
      value: {
        type: "Text",
        content: organization.login,
        variant: "body2",
      },
    });
  }

  // Compose the DataList component
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: dataItems,
  };

  // Header: show user avatar, login, and name (if any)
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: assignee.login,
    description: assignee.name ?? undefined,
    startElement: {
      type: "Avatar",
      src: assignee.avatar_url,
      name: assignee.login,
      size: 56,
      variant: "primary",
    },
  };

  // Assemble into a VerticalCard for a responsive layout
  return {
    type: "VerticalCard",
    childrenProps: [
      header,
      { type: "CardContent", childrenProps: [dataList] },
    ],
  };
}

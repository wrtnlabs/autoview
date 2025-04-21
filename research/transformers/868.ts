import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export type secret_scanning_alert = {
        number?: Schema.alert_number;
        created_at?: Schema.alert_created_at;
        updated_at?: Schema.nullable_alert_updated_at;
        url?: Schema.alert_url;
        html_url?: Schema.alert_html_url;
        /**
         * The REST API URL of the code locations for this alert.
        */
        locations_url?: string;
        state?: Schema.secret_scanning_alert_state;
        resolution?: Schema.secret_scanning_alert_resolution;
        /**
         * The time that the alert was resolved in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`.
        */
        resolved_at?: (string & tags.Format<"date-time">) | null;
        resolved_by?: Schema.nullable_simple_user;
        /**
         * An optional comment to resolve an alert.
        */
        resolution_comment?: string | null;
        /**
         * The type of secret that secret scanning detected.
        */
        secret_type?: string;
        /**
         * User-friendly name for the detected secret, matching the `secret_type`.
         * For a list of built-in patterns, see "[Supported secret scanning patterns](https://docs.github.com/code-security/secret-scanning/introduction/supported-secret-scanning-patterns#supported-secrets)."
        */
        secret_type_display_name?: string;
        /**
         * The secret that was detected.
        */
        secret?: string;
        /**
         * Whether push protection was bypassed for the detected secret.
        */
        push_protection_bypassed?: boolean | null;
        push_protection_bypassed_by?: Schema.nullable_simple_user;
        /**
         * The time that push protection was bypassed in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`.
        */
        push_protection_bypassed_at?: (string & tags.Format<"date-time">) | null;
        push_protection_bypass_request_reviewer?: Schema.nullable_simple_user;
        /**
         * An optional comment when reviewing a push protection bypass.
        */
        push_protection_bypass_request_reviewer_comment?: string | null;
        /**
         * An optional comment when requesting a push protection bypass.
        */
        push_protection_bypass_request_comment?: string | null;
        /**
         * The URL to a push protection bypass request.
        */
        push_protection_bypass_request_html_url?: (string & tags.Format<"uri">) | null;
        /**
         * The token status as of the latest validity check.
        */
        validity?: "active" | "inactive" | "unknown";
        /**
         * Whether the detected secret was publicly leaked.
        */
        publicly_leaked?: boolean | null;
        /**
         * Whether the detected secret was found in multiple repositories under the same organization or enterprise.
        */
        multi_repo?: boolean | null;
        /**
         * A boolean value representing whether or not alert is base64 encoded
        */
        is_base64_encoded?: boolean | null;
    };
    /**
     * The security alert number.
    */
    export type alert_number = number & tags.Type<"int32">;
    /**
     * The time that the alert was created in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`.
    */
    export type alert_created_at = string;
    /**
     * The time that the alert was last updated in ISO 8601 format: `YYYY-MM-DDTHH:MM:SSZ`.
    */
    export type nullable_alert_updated_at = (string & tags.Format<"date-time">) | null;
    /**
     * The REST API URL of the alert resource.
    */
    export type alert_url = string;
    /**
     * The GitHub URL of the alert resource.
    */
    export type alert_html_url = string;
    /**
     * Sets the state of the secret scanning alert. You must provide `resolution` when you set the state to `resolved`.
    */
    export type secret_scanning_alert_state = "open" | "resolved";
    /**
     * **Required when the `state` is `resolved`.** The reason for resolving the alert.
    */
    export type secret_scanning_alert_resolution = "false_positive" | "wont_fix" | "revoked" | "used_in_tests" | null;
    /**
     * A GitHub user.
     *
     * @title Simple User
    */
    export type nullable_simple_user = {
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
    } | null;
}
type IAutoViewTransformerInputType = Schema.secret_scanning_alert;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Helper: safely format ISO dates into locale strings
  const formatDate = (iso?: string | null): string =>
    iso ? new Date(iso).toLocaleString() : "N/A";

  // Map alert state to icon and color for header
  const stateIcon = input.state === "resolved" ? "check-circle" : "exclamation-triangle";
  const stateColor = input.state === "resolved" ? "green" : "yellow";

  // Build the header for the card: shows alert number and secret type
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: `Alert #${input.number ?? "?"}`,
    description: input.secret_type_display_name ?? input.secret_type ?? "Unknown secret",
    // Start icon indicating open vs resolved
    startElement: {
      type: "Icon",
      id: stateIcon,
      color: stateColor,
      size: 20,
    },
  };

  // Prepare a list of detailed fields
  const listItems: IAutoView.IAutoViewDataListItemProps[] = [];

  // Created at
  listItems.push({
    type: "DataListItem",
    label: {
      type: "Text",
      content: "Created At",
      variant: "subtitle2",
      color: "gray",
    },
    value: {
      type: "Text",
      content: formatDate(input.created_at),
      variant: "body2",
    },
  });

  // Updated at
  listItems.push({
    type: "DataListItem",
    label: {
      type: "Text",
      content: "Last Updated",
      variant: "subtitle2",
      color: "gray",
    },
    value: {
      type: "Text",
      content: formatDate(input.updated_at as string),
      variant: "body2",
    },
  });

  // Resolution
  listItems.push({
    type: "DataListItem",
    label: {
      type: "Text",
      content: "Resolution",
      variant: "subtitle2",
      color: "gray",
    },
    value: {
      type: "Chip",
      label: input.resolution ?? "none",
      color: input.resolution ? "primary" : "gray",
      size: "small",
      variant: "outlined",
    },
  });

  // Resolved by (if available)
  if (input.resolved_by && typeof input.resolved_by === "object") {
    listItems.push({
      type: "DataListItem",
      label: {
        type: "Text",
        content: "Resolved By",
        variant: "subtitle2",
        color: "gray",
      },
      value: {
        type: "Avatar",
        src: input.resolved_by.avatar_url,
        name: input.resolved_by.login,
        size: 32,
        variant: "info",
      },
    });
  }

  // Publicly leaked?
  if (input.publicly_leaked !== undefined && input.publicly_leaked !== null) {
    listItems.push({
      type: "DataListItem",
      label: {
        type: "Text",
        content: "Publicly Leaked",
        variant: "subtitle2",
        color: "gray",
      },
      value: {
        type: "Text",
        content: input.publicly_leaked ? "Yes" : "No",
        variant: "body2",
      },
    });
  }

  // Multi-repo occurrence?
  if (input.multi_repo !== undefined && input.multi_repo !== null) {
    listItems.push({
      type: "DataListItem",
      label: {
        type: "Text",
        content: "Multi-Repo",
        variant: "subtitle2",
        color: "gray",
      },
      value: {
        type: "Text",
        content: input.multi_repo ? "Yes" : "No",
        variant: "body2",
      },
    });
  }

  // Location details button (link to code locations)
  if (input.locations_url) {
    listItems.push({
      type: "DataListItem",
      label: {
        type: "Text",
        content: "Locations",
        variant: "subtitle2",
        color: "gray",
      },
      value: {
        type: "Button",
        label: "View Locations",
        href: input.locations_url,
        variant: "outlined",
        size: "small",
        color: "primary",
      },
    });
  }

  // Build the content section as a DataList
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: {
      type: "DataList",
      childrenProps: listItems,
    },
  };

  // Footer: link to the alert's GitHub page
  const footer: IAutoView.IAutoViewCardFooterProps = {
    type: "CardFooter",
    childrenProps: {
      type: "Button",
      label: "View on GitHub",
      href: input.html_url ?? "",
      variant: "text",
      size: "medium",
      color: "secondary",
    },
  };

  // Compose a vertical card to display everything
  const card: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [header, content, footer],
  };

  return card;
}

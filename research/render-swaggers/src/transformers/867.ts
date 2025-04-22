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
type IAutoViewTransformerInputType = Schema.secret_scanning_alert[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Handle empty list: show friendly markdown message
  if (!input || input.length === 0) {
    return {
      type: "Markdown",
      content: "### No secret scanning alerts found\nThere are no alerts to display."
    };
  }

  // Map each alert to a ListItemProps
  const items: IAutoView.IAutoViewListItemProps[] = input.map((alert) => {
    // Determine state icon and color
    const isResolved = alert.state === "resolved";
    const stateIcon: IAutoView.IAutoViewIconProps = {
      type: "Icon",
      id: isResolved ? "check-circle" : "exclamation-triangle",
      color: isResolved ? "green" : "red",
      size: 24
    };

    // Build a primary title: display name or type + number
    const title = `${alert.secret_type_display_name ?? alert.secret_type ?? "Secret"} #${alert.number}`;

    // Format created and (if any) resolved dates
    const createdDate = alert.created_at
      ? new Date(alert.created_at).toLocaleDateString()
      : "Unknown";
    const resolvedDate = isResolved && alert.resolved_at
      ? new Date(alert.resolved_at).toLocaleDateString()
      : null;
    // Description with dot separator for readability on small screens
    const descriptionParts = [`Created: ${createdDate}`];
    if (isResolved && resolvedDate) {
      descriptionParts.push(`Resolved: ${resolvedDate}`);
    }
    const description = descriptionParts.join(" • ");

    // If resolved, add a chip to show resolution reason
    const endElements: Array<
      | IAutoView.IAutoViewChipProps
      | IAutoView.IAutoViewButtonProps
    > = [];

    if (isResolved && alert.resolution) {
      // Color-code the resolution: false_positive=gray, wont_fix=orange, revoked=red, used_in_tests=blue
      const resolutionColorMap: Record<string, IAutoView.IAutoViewChipProps["color"]> = {
        false_positive: "gray",
        wont_fix: "orange",
        revoked: "red",
        used_in_tests: "blue"
      };
      endElements.push({
        type: "Chip",
        label: alert.resolution.replace(/_/g, " "),
        color: resolutionColorMap[alert.resolution] || "gray",
        size: "small",
        variant: "outlined"
      });
    }

    // Add a "View" button linking to the GitHub alert page
    if (alert.html_url) {
      endElements.push({
        type: "Button",
        variant: "text",
        color: "primary",
        size: "small",
        label: "View",
        startElement: {
          type: "Icon",
          id: "external-link-alt",
          size: 16,
          color: "blue"
        },
        href: alert.html_url
      });
    }

    return {
      type: "ListItem",
      title,
      description,
      startElement: stateIcon,
      // If we have any endElements, supply them; else undefined
      endElement: endElements.length === 1 ? endElements[0] : endElements
    };
  });

  // Compose a responsive list of alerts
  return {
    type: "List",
    childrenProps: items
  };
}

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
  // Map alert state to a FontAwesome icon name and color
  const stateIconMap: Record<string, { id: string; color: IAutoView.IAutoViewIconProps["color"] }> = {
    open: { id: "exclamation-triangle", color: "orange" },
    resolved: { id: "check-circle", color: "green" },
  };

  // Helper to format ISO dates into a more user-friendly string
  function formatDate(dateString: string): string {
    try {
      return new Date(dateString).toLocaleString();
    } catch {
      return dateString;
    }
  }

  // Build the card header: Title, description, state icon, and resolver avatar
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: `#${input.number ?? ""}${input.secret_type_display_name ? `: ${input.secret_type_display_name}` : ""}`,
    description: input.secret_type,
    startElement: {
      type: "Icon",
      id: stateIconMap[input.state ?? "open"].id,
      color: stateIconMap[input.state ?? "open"].color,
      size: 24,
    },
    endElement: input.resolved_by
      ? {
          type: "Avatar",
          src: input.resolved_by.avatar_url,
          name: input.resolved_by.login,
          variant: "info",
          size: 32,
        }
      : undefined,
  };

  // Build a DataList of key timestamps and URLs
  const listItems: IAutoView.IAutoViewDataListItemProps[] = [];

  if (input.created_at) {
    listItems.push({
      type: "DataListItem",
      label: [{ type: "Text", content: ["Created At"], variant: "subtitle2" }],
      value: [{ type: "Text", content: [formatDate(input.created_at)], variant: "body2" }],
    });
  }
  if (input.updated_at) {
    listItems.push({
      type: "DataListItem",
      label: [{ type: "Text", content: ["Updated At"], variant: "subtitle2" }],
      value: [{ type: "Text", content: [formatDate(input.updated_at)], variant: "body2" }],
    });
  }
  if (input.resolved_at) {
    listItems.push({
      type: "DataListItem",
      label: [{ type: "Text", content: ["Resolved At"], variant: "subtitle2" }],
      value: [{ type: "Text", content: [formatDate(input.resolved_at)], variant: "body2" }],
    });
  }
  if (input.html_url) {
    listItems.push({
      type: "DataListItem",
      label: [{ type: "Text", content: ["Details URL"], variant: "subtitle2" }],
      value: [
        {
          type: "Button",
          variant: "text",
          color: "primary",
          size: "small",
          label: ["View"],
          href: input.html_url,
        },
      ],
    });
  }

  // Compose the card content: either a DataList or fallback Markdown
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps:
      listItems.length > 0
        ? { type: "DataList", childrenProps: listItems }
        : {
            type: "Markdown",
            content: "No details available for this alert.",
          },
  };

  // Build chips for resolution and flags (public leak, multi-repo, bypass)
  const chips: IAutoView.IAutoViewChipProps[] = [];

  if (input.resolution) {
    chips.push({
      type: "Chip",
      label: input.resolution,
      color: input.resolution === "wont_fix" ? "warning" : "success",
      size: "small",
      variant: "filled",
    });
  }
  if (input.publicly_leaked) {
    chips.push({
      type: "Chip",
      label: "Publicly Leaked",
      color: "error",
      size: "small",
      variant: "outlined",
    });
  }
  if (input.multi_repo) {
    chips.push({
      type: "Chip",
      label: "Multi-Repo",
      color: "info",
      size: "small",
      variant: "outlined",
    });
  }
  if (input.push_protection_bypassed) {
    chips.push({
      type: "Chip",
      label: "Bypassed",
      color: "secondary",
      size: "small",
      variant: "outlined",
    });
  }

  // Compose the card footer: a ChipGroup or single Chip
  const footer: IAutoView.IAutoViewCardFooterProps = {
    type: "CardFooter",
    childrenProps:
      chips.length === 0
        ? {
            type: "Text",
            content: ["No flags or resolution."],
            variant: "caption",
          }
        : chips.length === 1
        ? chips[0]
        : { type: "ChipGroup", childrenProps: chips },
  };

  // Return a vertical card that aggregates header, content, and footer
  return {
    type: "VerticalCard",
    childrenProps: [header, content, footer],
  };
}

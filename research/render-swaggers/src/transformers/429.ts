import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * A code security configuration
    */
    export type code_security_configuration = {
        /**
         * The ID of the code security configuration
        */
        id?: number & tags.Type<"int32">;
        /**
         * The name of the code security configuration. Must be unique within the organization.
        */
        name?: string;
        /**
         * The type of the code security configuration.
        */
        target_type?: "global" | "organization" | "enterprise";
        /**
         * A description of the code security configuration
        */
        description?: string;
        /**
         * The enablement status of GitHub Advanced Security
        */
        advanced_security?: "enabled" | "disabled";
        /**
         * The enablement status of Dependency Graph
        */
        dependency_graph?: "enabled" | "disabled" | "not_set";
        /**
         * The enablement status of Automatic dependency submission
        */
        dependency_graph_autosubmit_action?: "enabled" | "disabled" | "not_set";
        /**
         * Feature options for Automatic dependency submission
        */
        dependency_graph_autosubmit_action_options?: {
            /**
             * Whether to use runners labeled with 'dependency-submission' or standard GitHub runners.
            */
            labeled_runners?: boolean;
        };
        /**
         * The enablement status of Dependabot alerts
        */
        dependabot_alerts?: "enabled" | "disabled" | "not_set";
        /**
         * The enablement status of Dependabot security updates
        */
        dependabot_security_updates?: "enabled" | "disabled" | "not_set";
        /**
         * The enablement status of code scanning default setup
        */
        code_scanning_default_setup?: "enabled" | "disabled" | "not_set";
        /**
         * Feature options for code scanning default setup
        */
        code_scanning_default_setup_options?: {
            /**
             * Whether to use labeled runners or standard GitHub runners.
            */
            runner_type?: "standard" | "labeled" | "not_set" | null;
            /**
             * The label of the runner to use for code scanning when runner_type is 'labeled'.
            */
            runner_label?: string | null;
        } | null;
        /**
         * The enablement status of code scanning delegated alert dismissal
        */
        code_scanning_delegated_alert_dismissal?: "enabled" | "disabled" | "not_set";
        /**
         * The enablement status of secret scanning
        */
        secret_scanning?: "enabled" | "disabled" | "not_set";
        /**
         * The enablement status of secret scanning push protection
        */
        secret_scanning_push_protection?: "enabled" | "disabled" | "not_set";
        /**
         * The enablement status of secret scanning delegated bypass
        */
        secret_scanning_delegated_bypass?: "enabled" | "disabled" | "not_set";
        /**
         * Feature options for secret scanning delegated bypass
        */
        secret_scanning_delegated_bypass_options?: {
            /**
             * The bypass reviewers for secret scanning delegated bypass
            */
            reviewers?: {
                /**
                 * The ID of the team or role selected as a bypass reviewer
                */
                reviewer_id: number & tags.Type<"int32">;
                /**
                 * The type of the bypass reviewer
                */
                reviewer_type: "TEAM" | "ROLE";
            }[];
        };
        /**
         * The enablement status of secret scanning validity checks
        */
        secret_scanning_validity_checks?: "enabled" | "disabled" | "not_set";
        /**
         * The enablement status of secret scanning non-provider patterns
        */
        secret_scanning_non_provider_patterns?: "enabled" | "disabled" | "not_set";
        /**
         * The enablement status of Copilot secret scanning
        */
        secret_scanning_generic_secrets?: "enabled" | "disabled" | "not_set";
        /**
         * The enablement status of secret scanning delegated alert dismissal
        */
        secret_scanning_delegated_alert_dismissal?: "enabled" | "disabled" | "not_set";
        /**
         * The enablement status of private vulnerability reporting
        */
        private_vulnerability_reporting?: "enabled" | "disabled" | "not_set";
        /**
         * The enforcement status for a security configuration
        */
        enforcement?: "enforced" | "unenforced";
        /**
         * The URL of the configuration
        */
        url?: string;
        /**
         * The URL of the configuration
        */
        html_url?: string;
        created_at?: string & tags.Format<"date-time">;
        updated_at?: string & tags.Format<"date-time">;
    };
}
type IAutoViewTransformerInputType = Schema.code_security_configuration;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Helper to format ISO date strings into a human-readable form
  const formatDate = (iso?: string): string =>
    iso ? new Date(iso).toLocaleString() : "N/A";

  // Map feature flags to a display-friendly list
  const featureFlags: Array<{ label: string; value?: string }> = [
    { label: "Advanced Security", value: input.advanced_security },
    { label: "Dependency Graph", value: input.dependency_graph },
    { label: "Auto-dependency Submit", value: input.dependency_graph_autosubmit_action },
    { label: "Dependabot Alerts", value: input.dependabot_alerts },
    { label: "Dependabot Updates", value: input.dependabot_security_updates },
    { label: "Code Scanning Setup", value: input.code_scanning_default_setup },
    { label: "Delegated Alert Dismissal", value: input.code_scanning_delegated_alert_dismissal },
    { label: "Secret Scanning", value: input.secret_scanning },
    { label: "Push Protection", value: input.secret_scanning_push_protection },
    { label: "Delegated Bypass", value: input.secret_scanning_delegated_bypass },
    { label: "Validity Checks", value: input.secret_scanning_validity_checks },
    { label: "Non‑Provider Patterns", value: input.secret_scanning_non_provider_patterns },
    { label: "Generic Secrets", value: input.secret_scanning_generic_secrets },
    { label: "Delegated Alert Dismissal (Secret)", value: input.secret_scanning_delegated_alert_dismissal },
    { label: "Private Vulnerability Reporting", value: input.private_vulnerability_reporting },
  ];

  // Build DataListItem for each flag (skip undefined or "not_set")
  const flagItems: IAutoView.IAutoViewDataListItemProps[] = featureFlags
    .filter(f => f.value !== undefined && f.value !== "not_set")
    .map(f => ({
      type: "DataListItem",
      // Using a simple text label
      label: {
        type: "Text",
        content: f.label,
        variant: "body2",
      },
      // Chip indicating enabled/disabled status
      value: {
        type: "Chip",
        label: f.value === "enabled" ? "Enabled" : f.value === "disabled" ? "Disabled" : f.value!,
        variant: "filled",
        size: "small",
        // Color green for enabled, red for disabled, gray otherwise
        color: f.value === "enabled" ? "green"
              : f.value === "disabled" ? "red"
              : "gray",
      },
    }));

  // Core information items (always displayed, even if undefined)
  const infoItems: IAutoView.IAutoViewDataListItemProps[] = [
    {
      type: "DataListItem",
      label: { type: "Text", content: "Target Type", variant: "body2" },
      value: {
        type: "Text",
        content: input.target_type ?? "N/A",
        variant: "body2",
        color: "primary",
      },
    },
    {
      type: "DataListItem",
      label: { type: "Text", content: "Enforcement", variant: "body2" },
      value: {
        type: "Chip",
        label: input.enforcement === "enforced" ? "Enforced"
             : input.enforcement === "unenforced" ? "Unenforced"
             : "N/A",
        variant: "filled",
        size: "small",
        color: input.enforcement === "enforced" ? "green" : "red",
      },
    },
  ];

  // Optional link to the configuration
  const linkItem: IAutoView.IAutoViewDataListItemProps | null = input.html_url || input.url
    ? {
        type: "DataListItem",
        label: { type: "Text", content: "Configuration Link", variant: "body2" },
        value: {
          type: "Button",
          label: "View",
          variant: "outlined",
          size: "small",
          color: "primary",
          href: input.html_url ?? input.url!,
        },
      }
    : null;

  // Assemble all DataList items
  const dataListChildren: IAutoView.IAutoViewDataListItemProps[] = [
    ...infoItems,
    ...flagItems,
    ...(linkItem ? [linkItem] : []),
  ];

  // Build the full vertical card
  return {
    type: "VerticalCard",
    childrenProps: [
      // Header with an icon indicating enforcement status
      {
        type: "CardHeader",
        title: input.name ?? "Unnamed Configuration",
        description: input.description,
        startElement: {
          type: "Icon",
          id: "shield-alt", // using a shield icon for security config
          color: input.enforcement === "enforced" ? "green" : "red",
          size: 24,
        },
      },
      // Content: a DataList of feature toggles and info
      {
        type: "CardContent",
        childrenProps: {
          type: "DataList",
          childrenProps: dataListChildren,
        } as IAutoView.IAutoViewDataListProps,
      },
      // Footer with timestamps
      {
        type: "CardFooter",
        childrenProps: [
          {
            type: "Text",
            content: `Created: ${formatDate(input.created_at)}`,
            variant: "caption",
            color: "gray",
          },
          {
            type: "Text",
            content: `Updated: ${formatDate(input.updated_at)}`,
            variant: "caption",
            color: "gray",
          },
        ],
      },
    ],
  };
}

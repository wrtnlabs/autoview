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
  // Helper to safely format dates or return placeholder
  const formatDate = (iso?: string): string =>
    iso ? new Date(iso).toLocaleString() : "-";

  // Mapping from boolean-like field values to chip colors
  const statusColor = (status: string | undefined): "green" | "red" | "gray" => {
    switch (status) {
      case "enabled":
        return "green";
      case "disabled":
        return "red";
      default:
        return "gray";
    }
  };

  // Define which feature flags to render as chips, and their labels
  const featureFields: Array<[keyof IAutoViewTransformerInputType, string]> = [
    ["advanced_security", "Advanced Security"],
    ["dependency_graph", "Dependency Graph"],
    ["dependency_graph_autosubmit_action", "Dependency Autosubmit"],
    ["dependabot_alerts", "Dependabot Alerts"],
    ["dependabot_security_updates", "Dependabot Security Updates"],
    ["code_scanning_default_setup", "Code Scanning Setup"],
    ["code_scanning_delegated_alert_dismissal", "Scanning Dismissal"],
    ["secret_scanning", "Secret Scanning"],
    ["secret_scanning_push_protection", "Push Protection"],
    ["secret_scanning_delegated_bypass", "Bypass Delegation"],
    ["secret_scanning_validity_checks", "Validity Checks"],
    ["secret_scanning_non_provider_patterns", "Custom Patterns"],
    ["secret_scanning_generic_secrets", "Generic Secrets"],
    ["secret_scanning_delegated_alert_dismissal", "Secret Alert Dismissal"],
    ["private_vulnerability_reporting", "Private Vulnerabilities"],
  ];

  // Build chips for each feature flag present
  const featureChips: IAutoView.IAutoViewChipProps[] = featureFields
    .filter(([key]) => typeof input[key] === "string")
    .map(([key, label]) => ({
      type: "Chip",
      label,
      variant: "filled",
      color: statusColor(input[key] as string),
      size: "small",
    }));

  // Build list of general properties
  const dataListItems: IAutoView.IAutoViewDataListItemProps[] = [];

  // ID
  if (input.id !== undefined) {
    dataListItems.push({
      type: "DataListItem",
      label: { type: "Text", content: "ID", variant: "subtitle2" },
      value: { type: "Text", content: input.id.toString(), variant: "body2" },
    });
  }

  // Target type
  if (input.target_type) {
    dataListItems.push({
      type: "DataListItem",
      label: { type: "Text", content: "Scope", variant: "subtitle2" },
      value: { type: "Text", content: input.target_type, variant: "body2" },
    });
  }

  // URLs (link rendering via markdown)
  if (input.html_url) {
    dataListItems.push({
      type: "DataListItem",
      label: { type: "Text", content: "Config URL", variant: "subtitle2" },
      value: {
        type: "Markdown",
        content: `[Open](${input.html_url})`,
      },
    });
  }

  // Created / Updated timestamps
  if (input.created_at) {
    dataListItems.push({
      type: "DataListItem",
      label: { type: "Text", content: "Created", variant: "subtitle2" },
      value: {
        type: "Text",
        content: formatDate(input.created_at),
        variant: "body2",
      },
    });
  }
  if (input.updated_at) {
    dataListItems.push({
      type: "DataListItem",
      label: { type: "Text", content: "Updated", variant: "subtitle2" },
      value: {
        type: "Text",
        content: formatDate(input.updated_at),
        variant: "body2",
      },
    });
  }

  // Nested options: autosubmit runners
  if (input.dependency_graph_autosubmit_action_options?.labeled_runners !== undefined) {
    dataListItems.push({
      type: "DataListItem",
      label: { type: "Text", content: "Labeled Runners", variant: "subtitle2" },
      value: {
        type: "Text",
        content: input.dependency_graph_autosubmit_action_options.labeled_runners
          ? "Yes"
          : "No",
        variant: "body2",
      },
    });
  }

  // Code scanning runner options
  const codeOpts = input.code_scanning_default_setup_options;
  if (codeOpts) {
    if (codeOpts.runner_type) {
      dataListItems.push({
        type: "DataListItem",
        label: { type: "Text", content: "Runner Type", variant: "subtitle2" },
        value: { type: "Text", content: codeOpts.runner_type, variant: "body2" },
      });
    }
    if (codeOpts.runner_label) {
      dataListItems.push({
        type: "DataListItem",
        label: { type: "Text", content: "Runner Label", variant: "subtitle2" },
        value: { type: "Text", content: codeOpts.runner_label, variant: "body2" },
      });
    }
  }

  // Secret scanning bypass reviewers
  const bypassOpts = input.secret_scanning_delegated_bypass_options;
  if (bypassOpts?.reviewers?.length) {
    const list = bypassOpts.reviewers
      .map((r) => `${r.reviewer_type}#${r.reviewer_id}`)
      .join(", ");
    dataListItems.push({
      type: "DataListItem",
      label: { type: "Text", content: "Bypass Reviewers", variant: "subtitle2" },
      value: { type: "Text", content: list, variant: "body2" },
    });
  }

  // Assemble the UI as a vertical card with header, content, and footer
  return {
    type: "VerticalCard",
    childrenProps: [
      // Header with icon, name and description
      {
        type: "CardHeader",
        title: input.name ?? "Unnamed Configuration",
        description: input.description,
        startElement: {
          type: "Icon",
          id: "shield-alt",
          color: "blue",
          size: 24,
        },
      },
      // Main content: list of properties and feature chips
      {
        type: "CardContent",
        childrenProps: [
          // Data list of key properties
          {
            type: "DataList",
            childrenProps: dataListItems,
          },
          // Grouped chips showing each feature's status
          {
            type: "ChipGroup",
            childrenProps: featureChips,
          },
        ],
      },
      // Footer showing last update info in a footnote style
      {
        type: "CardFooter",
        childrenProps: {
          type: "Text",
          content: input.updated_at
            ? `Last updated: ${formatDate(input.updated_at)}`
            : "No update date",
          variant: "footnote",
        },
      },
    ],
  };
}

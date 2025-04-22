import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * A list of default code security configurations
    */
    export type code_security_default_configurations = {
        /**
         * The visibility of newly created repositories for which the code security configuration will be applied to by default
        */
        default_for_new_repos?: any;
        configuration?: Schema.code_security_configuration;
    }[];
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
type IAutoViewTransformerInputType = Schema.code_security_default_configurations;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // If there's no configuration to show, display a friendly message
  if (!Array.isArray(input) || input.length === 0) {
    return {
      type: "Text",
      content: "No code security configurations available.",
      variant: "body1",
    };
  }

  // Helper to map status strings to chip colors
  const getStatusColor = (status: string): IAutoView.IAutoViewChipProps["color"] => {
    switch (status) {
      case "enabled":
        return "green";
      case "disabled":
        return "red";
      default:
        return "gray";
    }
  };

  // Define which fields we want to visualize and their labels
  const featureFields: Array<[keyof Schema.code_security_configuration, string]> = [
    ["advanced_security", "Advanced Security"],
    ["dependency_graph", "Dependency Graph"],
    ["dependency_graph_autosubmit_action", "Autosubmit"],
    ["dependabot_alerts", "Dependabot Alerts"],
    ["dependabot_security_updates", "Security Updates"],
    ["code_scanning_default_setup", "Scanning Setup"],
    ["code_scanning_delegated_alert_dismissal", "Alert Dismissal"],
    ["secret_scanning", "Secret Scanning"],
    ["secret_scanning_push_protection", "Push Protection"],
    ["secret_scanning_delegated_bypass", "Bypass"],
    ["secret_scanning_validity_checks", "Validity Checks"],
    ["secret_scanning_non_provider_patterns", "Non-Provider Patterns"],
    ["secret_scanning_generic_secrets", "Generic Secrets"],
    ["private_vulnerability_reporting", "Vuln Reporting"],
  ];

  // Build a DataListItem for each entry in the input
  const items: IAutoView.IAutoViewDataListItemProps[] = input.map((entry, idx) => {
    const cfg = entry.configuration;

    // 1) Header text: show configuration name & ID
    const header: IAutoView.IAutoViewTextProps = {
      type: "Text",
      variant: "subtitle1",
      content: `${cfg?.name ?? "Unnamed"} (ID: ${cfg?.id ?? "–"})`,
    };

    // 2) If default_for_new_repos is set, show it as markdown
    const extras: IAutoView.IAutoViewPresentationComponentProps[] = [];
    if (entry.default_for_new_repos !== undefined) {
      extras.push({
        type: "Markdown",
        content: `**Default for new repos**: \`${JSON.stringify(
          entry.default_for_new_repos,
        )}\``,
      });
    }

    // 3) Build chips for each feature flag/status
    const chips: IAutoView.IAutoViewChipProps[] = [];
    featureFields.forEach(([field, label]) => {
      const status = cfg?.[field] as string | undefined;
      if (status !== undefined && status !== null) {
        chips.push({
          type: "Chip",
          label: `${label}: ${status}`,
          color: getStatusColor(status),
          variant: "outlined",
          size: "small",
        });
      }
    });

    // 4) Group the chips for a compact visual layout
    const chipGroup: IAutoView.IAutoViewChipGroupProps = {
      type: "ChipGroup",
      childrenProps: chips,
    };

    // 5) Assemble the "value" side: extras (markdown) + chip group
    const valueChildren: IAutoView.IAutoViewPresentationComponentProps[] = [
      ...extras,
      chipGroup,
    ];

    return {
      type: "DataListItem",
      label: [header],
      value: valueChildren,
    };
  });

  // Wrap everything in a DataList for a clean, responsive listing
  return {
    type: "DataList",
    childrenProps: items,
  };
}

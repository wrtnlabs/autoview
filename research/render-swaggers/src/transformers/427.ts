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
  // Map of feature status to chip color
  const statusColorMap: Record<string, IAutoView.IAutoViewChipProps["color"]> = {
    enabled: "green",
    disabled: "red",
    not_set: "gray",
  };

  // List of boolean/string statuses to show as chips, with friendly labels
  const statusFields: Array<{ key: keyof Schema.code_security_configuration; label: string }> = [
    { key: "advanced_security", label: "Advanced Security" },
    { key: "dependency_graph", label: "Dependency Graph" },
    { key: "dependency_graph_autosubmit_action", label: "Auto Dependency Submit" },
    { key: "dependabot_alerts", label: "Dependabot Alerts" },
    { key: "dependabot_security_updates", label: "Dependabot Security Updates" },
    { key: "code_scanning_default_setup", label: "Code Scanning Setup" },
    { key: "code_scanning_delegated_alert_dismissal", label: "Delegated Alert Dismissal" },
    { key: "secret_scanning", label: "Secret Scanning" },
    { key: "secret_scanning_push_protection", label: "Push Protection" },
    { key: "secret_scanning_delegated_bypass", label: "Delegated Bypass" },
    { key: "secret_scanning_validity_checks", label: "Validity Checks" },
    { key: "secret_scanning_non_provider_patterns", label: "Non‑Provider Patterns" },
    { key: "secret_scanning_generic_secrets", label: "Copilot Secret Scanning" },
    { key: "secret_scanning_delegated_alert_dismissal", label: "Delegated Alert Dismissal" },
    { key: "private_vulnerability_reporting", label: "Vulnerability Reporting" },
  ];

  // Transform each configuration entry into a DataListItem
  const items: IAutoView.IAutoViewDataListItemProps[] = input.map((entry) => {
    const cfg = entry.configuration;
    // Build an array of chips representing each feature status
    const chips: IAutoView.IAutoViewChipProps[] = [];
    if (cfg) {
      // Show the target type as a highlighted chip
      if (cfg.target_type) {
        chips.push({
          type: "Chip",
          label: `Type: ${cfg.target_type}`,
          color: "blue",
          variant: "filled",
        });
      }
      statusFields.forEach(({ key, label }) => {
        const val = (cfg as any)[key];
        if (val != null) {
          const color = statusColorMap[val as string] ?? "gray";
          chips.push({
            type: "Chip",
            label: `${label}: ${val}`,
            color,
            variant: "outlined",
          });
        }
      });
    }

    // Build markdown sections for defaults and timestamps
    const mdLines: string[] = [];
    if (cfg?.description) {
      // Show description in bold header
      mdLines.push(`**${cfg.description}**`);
    }
    if (entry.default_for_new_repos != null) {
      mdLines.push(
        `- **Default for New Repos:** \`${JSON.stringify(entry.default_for_new_repos)}\``
      );
    }
    if (cfg?.created_at) {
      mdLines.push(`- **Created At:** ${cfg.created_at}`);
    }
    if (cfg?.updated_at) {
      mdLines.push(`- **Updated At:** ${cfg.updated_at}`);
    }

    return {
      type: "DataListItem",
      // Use a headline text for the name
      label: {
        type: "Text",
        content: cfg?.name ?? "Unnamed Configuration",
        variant: "h6",
      },
      // Combine a chip group for statuses and markdown for details
      value: [
        {
          type: "ChipGroup",
          childrenProps: chips,
        },
        {
          type: "Markdown",
          content: mdLines.join("\n"),
        },
      ],
    };
  });

  // Return a DataList wrapping all items
  return {
    type: "DataList",
    childrenProps: items,
  };
}

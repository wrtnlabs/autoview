import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace IApiEnterprisesCodeSecurityConfigurationsDefaults {
        export type PutResponse = {
            /**
             * Specifies which types of repository this security configuration is applied to by default.
            */
            default_for_new_repos?: "all" | "none" | "private_and_internal" | "public";
            configuration?: Schema.code_security_configuration;
        };
    }
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
type IAutoViewTransformerInputType = Schema.IApiEnterprisesCodeSecurityConfigurationsDefaults.PutResponse;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  const config = input.configuration;
  // If there is no configuration, display a simple message
  if (!config) {
    return {
      type: "Text",
      content: "No configuration data available.",
      variant: "body1",
    };
  }

  // Helpers to map status strings to chip colors
  const statusColor = (status?: string): IAutoView.IAutoViewChipProps["color"] => {
    switch (status) {
      case "enabled":
        return "green";
      case "disabled":
        return "red";
      case "not_set":
        return "gray";
      default:
        return "gray";
    }
  };

  const enforcementColor = (status?: string): IAutoView.IAutoViewChipProps["color"] => {
    switch (status) {
      case "enforced":
        return "green";
      case "unenforced":
        return "orange";
      default:
        return "gray";
    }
  };

  const defaultForReposColor = (def?: string): IAutoView.IAutoViewChipProps["color"] => {
    switch (def) {
      case "all":
        return "success";
      case "none":
        return "gray";
      case "private_and_internal":
        return "info";
      case "public":
        return "blue";
      default:
        return "gray";
    }
  };

  // Build a list of DataListItemProps representing each setting
  const items: IAutoView.IAutoViewDataListItemProps[] = [];

  // 1) default_for_new_repos
  items.push({
    type: "DataListItem",
    label: {
      type: "Text",
      content: "Default for New Repos",
      variant: "body2",
    },
    value: {
      type: "Chip",
      label: input.default_for_new_repos ?? "not specified",
      color: defaultForReposColor(input.default_for_new_repos),
      variant: "filled",
    },
  });

  // 2) core boolean/enabled‑disabled statuses
  const booleanFields: Array<[keyof typeof config, string]> = [
    ["advanced_security", "Advanced Security"],
    ["dependency_graph", "Dependency Graph"],
    ["dependency_graph_autosubmit_action", "Dependency Graph Autosubmit"],
    ["dependabot_alerts", "Dependabot Alerts"],
    ["dependabot_security_updates", "Dependabot Security Updates"],
    ["code_scanning_default_setup", "Code Scanning Setup"],
    ["code_scanning_delegated_alert_dismissal", "Delegated Alert Dismissal"],
    ["secret_scanning", "Secret Scanning"],
    ["secret_scanning_push_protection", "Push Protection"],
    ["secret_scanning_delegated_bypass", "Delegated Bypass"],
    ["secret_scanning_validity_checks", "Validity Checks"],
    ["secret_scanning_non_provider_patterns", "Non‐Provider Patterns"],
    ["secret_scanning_generic_secrets", "Copilot Scanning"],
    ["secret_scanning_delegated_alert_dismissal", "Secret Delegated Dismissal"],
    ["private_vulnerability_reporting", "Private Vulnerability Reporting"],
  ];

  booleanFields.forEach(([key, label]) => {
    const value = (config as any)[key] as string | undefined;
    if (value !== undefined) {
      items.push({
        type: "DataListItem",
        label: {
          type: "Text",
          content: label,
          variant: "body2",
        },
        value: {
          type: "Chip",
          label: value,
          color: statusColor(value),
          variant: "filled",
        },
      });
    }
  });

  // 3) enforcement status
  if (config.enforcement !== undefined) {
    items.push({
      type: "DataListItem",
      label: {
        type: "Text",
        content: "Enforcement",
        variant: "body2",
      },
      value: {
        type: "Chip",
        label: config.enforcement,
        color: enforcementColor(config.enforcement),
        variant: "filled",
      },
    });
  }

  // 4) dependency_graph_autosubmit_action_options
  const depOpt = config.dependency_graph_autosubmit_action_options;
  if (depOpt && depOpt.labeled_runners !== undefined) {
    items.push({
      type: "DataListItem",
      label: {
        type: "Text",
        content: "Use Labeled Runners (Autosubmit)",
        variant: "body2",
      },
      value: {
        type: "Icon",
        id: depOpt.labeled_runners ? "check" : "times",
        color: depOpt.labeled_runners ? "green" : "red",
        size: 16,
      },
    });
  }

  // 5) code_scanning_default_setup_options
  const scanOpt = config.code_scanning_default_setup_options;
  if (scanOpt) {
    if (scanOpt.runner_type !== undefined && scanOpt.runner_type !== null) {
      items.push({
        type: "DataListItem",
        label: {
          type: "Text",
          content: "Scanning Runner Type",
          variant: "body2",
        },
        value: {
          type: "Chip",
          label: scanOpt.runner_type,
          color: statusColor(scanOpt.runner_type),
          variant: "filled",
        },
      });
    }
    if (scanOpt.runner_label) {
      items.push({
        type: "DataListItem",
        label: {
          type: "Text",
          content: "Runner Label",
          variant: "body2",
        },
        value: {
          type: "Text",
          content: scanOpt.runner_label,
          variant: "body2",
        },
      });
    }
  }

  // 6) secret_scanning_delegated_bypass_options.reviewers
  const bypassOpt = config.secret_scanning_delegated_bypass_options;
  if (bypassOpt && Array.isArray(bypassOpt.reviewers) && bypassOpt.reviewers.length > 0) {
    const chipList = bypassOpt.reviewers.map((r) => ({
      type: "Chip" as const,
      label: `${r.reviewer_type} #${r.reviewer_id}`,
      color: "primary" as const,
      variant: "outlined" as const,
      size: "small" as const,
    }));
    items.push({
      type: "DataListItem",
      label: {
        type: "Text",
        content: "Bypass Reviewers",
        variant: "body2",
      },
      value: {
        type: "ChipGroup",
        childrenProps: chipList,
      },
    });
  }

  // Finally assemble into a responsive VerticalCard
  return {
    type: "VerticalCard",
    childrenProps: [
      {
        type: "CardHeader",
        title: config.name ?? "Code Security Configuration",
        description: config.description,
        startElement: {
          type: "Icon",
          id: "shield-alt",
          color: "blue",
          size: 24,
        },
      },
      {
        type: "CardContent",
        childrenProps: [
          {
            type: "DataList",
            childrenProps: items,
          },
        ],
      },
    ],
  };
}

import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace IApiOrgsCodeSecurityConfigurationsDefaults {
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
type IAutoViewTransformerInputType = Schema.IApiOrgsCodeSecurityConfigurationsDefaults.PutResponse;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(
  input: IAutoViewTransformerInputType,
): IAutoView.IAutoViewComponentProps {
  // If there is no configuration, show a friendly markdown message
  if (!input.configuration) {
    return {
      type: "Markdown",
      content: "### No code security configuration data available.",
    };
  }

  const cfg = input.configuration;

  // Helper to create a status chip based on enabled/disabled/not_set
  function createStatusChip(status: string): IAutoView.IAutoViewChipProps {
    const isEnabled = status === "enabled" || status === "enforced";
    const isUnset = status === "not_set" || status === undefined;
    return {
      type: "Chip",
      label: status ?? "N/A",
      variant: isEnabled ? "filled" : "outlined",
      color: isEnabled
        ? "green"
        : isUnset
        ? "gray"
        : "secondary", // disabled or other
      size: "small",
    };
  }

  // Build a list of data list items for each relevant property
  const items: IAutoView.IAutoViewDataListItemProps[] = [];

  // Show the default_for_new_repos setting
  items.push({
    type: "DataListItem",
    label: {
      type: "Text",
      content: "Default for New Repositories",
      variant: "body1",
    },
    value: {
      type: "Text",
      content: input.default_for_new_repos ?? "N/A",
      variant: "body1",
    },
  });

  // Map of config fields to their display labels
  const featureMap: { key: keyof typeof cfg; label: string }[] = [
    { key: "advanced_security", label: "Advanced Security" },
    { key: "dependency_graph", label: "Dependency Graph" },
    {
      key: "dependency_graph_autosubmit_action",
      label: "Dependency Graph Auto-Submit",
    },
    { key: "dependabot_alerts", label: "Dependabot Alerts" },
    {
      key: "dependabot_security_updates",
      label: "Dependabot Security Updates",
    },
    {
      key: "code_scanning_default_setup",
      label: "Code Scanning Default Setup",
    },
    {
      key: "code_scanning_delegated_alert_dismissal",
      label: "Code Scanning Delegated Alert Dismissal",
    },
    { key: "secret_scanning", label: "Secret Scanning" },
    {
      key: "secret_scanning_push_protection",
      label: "Secret Scanning Push Protection",
    },
    {
      key: "secret_scanning_delegated_bypass",
      label: "Secret Scanning Delegated Bypass",
    },
    {
      key: "secret_scanning_validity_checks",
      label: "Secret Scanning Validity Checks",
    },
    {
      key: "secret_scanning_non_provider_patterns",
      label: "Secret Scanning Non-Provider Patterns",
    },
    {
      key: "secret_scanning_generic_secrets",
      label: "Copilot Secret Scanning",
    },
    {
      key: "secret_scanning_delegated_alert_dismissal",
      label: "Secret Scanning Delegated Alert Dismissal",
    },
    {
      key: "private_vulnerability_reporting",
      label: "Private Vulnerability Reporting",
    },
    { key: "enforcement", label: "Enforcement Status" },
  ];

  // Add each feature as a DataListItem
  featureMap.forEach(({ key, label }) => {
    // Only include if the property exists
    const value = (cfg as any)[key] as string | undefined;
    if (value !== undefined) {
      items.push({
        type: "DataListItem",
        label: { type: "Text", content: label, variant: "body1" },
        value: createStatusChip(value),
      });
    }
  });

  // Handle nested options: dependency_graph_autosubmit_action_options
  if (
    cfg.dependency_graph_autosubmit_action_options &&
    typeof cfg.dependency_graph_autosubmit_action_options.labeled_runners ===
      "boolean"
  ) {
    items.push({
      type: "DataListItem",
      label: {
        type: "Text",
        content: "Auto-Submit Uses Labeled Runners",
        variant: "body1",
      },
      value: {
        type: "Chip",
        label: cfg.dependency_graph_autosubmit_action_options.labeled_runners
          ? "Yes"
          : "No",
        variant: "filled",
        color: cfg.dependency_graph_autosubmit_action_options.labeled_runners
          ? "green"
          : "gray",
        size: "small",
      },
    });
  }

  // Handle nested options: code_scanning_default_setup_options
  if (cfg.code_scanning_default_setup_options) {
    const opt = cfg.code_scanning_default_setup_options;
    if (opt.runner_type !== null && opt.runner_type !== undefined) {
      items.push({
        type: "DataListItem",
        label: {
          type: "Text",
          content: "Scanning Runner Type",
          variant: "body1",
        },
        value: {
          type: "Text",
          content: opt.runner_type || "not_set",
          variant: "body1",
        },
      });
    }
    if (opt.runner_label) {
      items.push({
        type: "DataListItem",
        label: {
          type: "Text",
          content: "Scanning Runner Label",
          variant: "body1",
        },
        value: {
          type: "Text",
          content: opt.runner_label,
          variant: "body1",
        },
      });
    }
  }

  // Handle secret_scanning_delegated_bypass_options reviewers
  if (
    cfg.secret_scanning_delegated_bypass_options &&
    Array.isArray(cfg.secret_scanning_delegated_bypass_options.reviewers)
  ) {
    const reviewers = cfg.secret_scanning_delegated_bypass_options.reviewers.map(
      (r) => `${r.reviewer_type}:${r.reviewer_id}`,
    );
    items.push({
      type: "DataListItem",
      label: {
        type: "Text",
        content: "Bypass Reviewers",
        variant: "body1",
      },
      value: {
        type: "Text",
        content: reviewers,
        variant: "body1",
      },
    });
  }

  // Compose the final VerticalCard with a header and the data list
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: cfg.name ?? "Unnamed Configuration",
    description: cfg.description,
    startElement: {
      type: "Icon",
      id: "shield-alt",
      color: "blue",
      size: 24,
    },
  };

  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: [
      {
        type: "DataList",
        childrenProps: items,
      },
    ],
  };

  return {
    type: "VerticalCard",
    childrenProps: [header, content],
  };
}

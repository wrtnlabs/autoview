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



// Transforms a code security configuration into a visual AutoView card.
function visualizeData(
  input: IAutoViewTransformerInputType
): IAutoView.IAutoViewComponentProps {
  // Helper to create Chips for tri-state statuses.
  const createStatusChip = (
    status?: string
  ): IAutoView.IAutoViewChipProps => {
    const s = status ?? "not_set";
    let color: IAutoView.IAutoViewChipProps["color"] = "gray";
    let variant: IAutoView.IAutoViewChipProps["variant"] = "filled";
    if (s === "enabled") {
      color = "green";
    } else if (s === "disabled") {
      color = "red";
    } else {
      variant = "outlined";
    }
    return {
      type: "Chip",
      label: s.replace(/_/g, " "),
      color,
      variant,
    };
  };

  // Helper to create a yes/no chip.
  const createBooleanChip = (
    flag?: boolean
  ): IAutoView.IAutoViewChipProps => ({
    type: "Chip",
    label: flag ? "Yes" : "No",
    color: flag ? "green" : "red",
    variant: "filled",
  });

  // Format an ISO date to local string, fall back to raw or "N/A".
  const formatDate = (iso?: string): string => {
    if (!iso) return "N/A";
    const d = new Date(iso);
    return isNaN(d.getTime()) ? iso : d.toLocaleString();
  };

  // Map the configuration scope to a representative icon.
  const getTargetIcon = (t?: string): string => {
    switch (t) {
      case "global":
        return "globe";
      case "organization":
        return "building";
      case "enterprise":
        return "briefcase";
      default:
        return "cog";
    }
  };

  // Aggregate each feature into a DataListItem.
  const items: IAutoView.IAutoViewDataListItemProps[] = [];

  // Core on/off/not_set features.
  const features: Array<[string, string | undefined]> = [
    ["Advanced Security", input.advanced_security],
    ["Dependency Graph", input.dependency_graph],
    ["Dependabot Alerts", input.dependabot_alerts],
    ["Dependabot Security Updates", input.dependabot_security_updates],
    ["Code Scanning Default Setup", input.code_scanning_default_setup],
    ["Code Scanning Delegated Alert Dismissal", input.code_scanning_delegated_alert_dismissal],
    ["Secret Scanning", input.secret_scanning],
    ["Secret Scanning Push Protection", input.secret_scanning_push_protection],
    ["Secret Scanning Delegated Bypass", input.secret_scanning_delegated_bypass],
    ["Secret Scanning Validity Checks", input.secret_scanning_validity_checks],
    ["Secret Scanning Non-Provider Patterns", input.secret_scanning_non_provider_patterns],
    ["Copilot Secret Scanning", input.secret_scanning_generic_secrets],
    ["Secret Scanning Delegated Alert Dismissal", input.secret_scanning_delegated_alert_dismissal],
    ["Private Vulnerability Reporting", input.private_vulnerability_reporting],
    ["Enforcement", input.enforcement],
  ];
  for (const [label, status] of features) {
    items.push({
      type: "DataListItem",
      label: { type: "Text", content: label },
      value: createStatusChip(status),
    });
  }

  // Detail: dependency-graph auto-submit sub-option.
  if (input.dependency_graph_autosubmit_action !== undefined) {
    items.push({
      type: "DataListItem",
      label: { type: "Text", content: "Auto-Submit Action" },
      value: createStatusChip(input.dependency_graph_autosubmit_action),
    });
    const opt = input.dependency_graph_autosubmit_action_options;
    if (opt?.labeled_runners !== undefined) {
      items.push({
        type: "DataListItem",
        label: { type: "Text", content: "Use Labeled Runners" },
        value: createBooleanChip(opt.labeled_runners),
      });
    }
  }

  // Detail: code-scanning default setup runner options.
  const csOpt = input.code_scanning_default_setup_options;
  if (csOpt) {
    if (csOpt.runner_type) {
      items.push({
        type: "DataListItem",
        label: { type: "Text", content: "Runner Type" },
        value: {
          type: "Chip",
          label: csOpt.runner_type,
          color: "blue",
          variant: "filled",
        },
      });
    }
    if (csOpt.runner_label) {
      items.push({
        type: "DataListItem",
        label: { type: "Text", content: "Runner Label" },
        value: { type: "Text", content: csOpt.runner_label },
      });
    }
  }

  // Detail: list out delegated bypass reviewers as markdown.
  const reviewers = input.secret_scanning_delegated_bypass_options?.reviewers;
  if (reviewers?.length) {
    const mdList = reviewers
      .map((r) => `* **${r.reviewer_type}**: ${r.reviewer_id}`)
      .join("\n");
    items.push({
      type: "DataListItem",
      label: { type: "Text", content: "Bypass Reviewers" },
      value: { type: "Markdown", content: mdList },
    });
  }

  // Timestamps.
  items.push({
    type: "DataListItem",
    label: { type: "Text", content: "Created At" },
    value: { type: "Text", content: formatDate(input.created_at) },
  });
  items.push({
    type: "DataListItem",
    label: { type: "Text", content: "Updated At" },
    value: { type: "Text", content: formatDate(input.updated_at) },
  });

  // Return a vertical card with header, content, and footer actions.
  return {
    type: "VerticalCard",
    childrenProps: [
      {
        type: "CardHeader",
        title: input.name,
        description: input.description,
        startElement: {
          type: "Icon",
          id: getTargetIcon(input.target_type),
          size: 32,
          color: "blue",
        },
      },
      {
        type: "CardContent",
        childrenProps: {
          type: "DataList",
          childrenProps: items,
        },
      },
      {
        type: "CardFooter",
        childrenProps: [
          {
            type: "Button",
            label: "API Config",
            href: input.url,
            variant: "outlined",
            size: "small",
          },
          {
            type: "Button",
            label: "View UI",
            href: input.html_url,
            variant: "contained",
            size: "small",
          },
        ],
      },
    ],
  };
}

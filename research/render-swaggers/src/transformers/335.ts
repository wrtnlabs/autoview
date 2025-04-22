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
  // Card header with title, description, and a security icon
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: input.name ?? `Configuration #${input.id ?? "?"}`,
    description: input.description,
    startElement: {
      type: "Icon",
      id: "shield-alt",   // security icon
      color: "blue",
      size: 40,
    },
  };

  // Build a simple data list for core metadata: ID, target type, enforcement
  const dataItems: IAutoView.IAutoViewDataListItemProps[] = [];

  if (input.id != null) {
    dataItems.push({
      type: "DataListItem",
      label: {
        type: "Text",
        content: "ID",
        variant: "subtitle2",
      },
      value: {
        type: "Text",
        content: String(input.id),
        variant: "body2",
      },
    });
  }

  if (input.target_type) {
    dataItems.push({
      type: "DataListItem",
      label: {
        type: "Text",
        content: "Scope",
        variant: "subtitle2",
      },
      value: {
        type: "Text",
        content: input.target_type,
        variant: "body2",
      },
    });
  }

  if (input.enforcement) {
    dataItems.push({
      type: "DataListItem",
      label: {
        type: "Text",
        content: "Enforcement",
        variant: "subtitle2",
      },
      value: {
        type: "Text",
        content: input.enforcement,
        variant: "body2",
      },
    });
  }

  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: dataItems,
  };

  // Map feature flags to colored chips
  const featureFields: { key: keyof IAutoViewTransformerInputType; label: string }[] = [
    { key: "advanced_security", label: "Advanced Security" },
    { key: "dependency_graph", label: "Dependency Graph" },
    { key: "dependency_graph_autosubmit_action", label: "Dependency Graph Autosubmit" },
    { key: "dependabot_alerts", label: "Dependabot Alerts" },
    { key: "dependabot_security_updates", label: "Dependabot Security Updates" },
    { key: "code_scanning_default_setup", label: "Code Scanning Default Setup" },
    { key: "code_scanning_delegated_alert_dismissal", label: "Code Scanning Delegated Alert Dismissal" },
    { key: "secret_scanning", label: "Secret Scanning" },
    { key: "secret_scanning_push_protection", label: "Secret Scanning Push Protection" },
    { key: "secret_scanning_delegated_bypass", label: "Secret Scanning Delegated Bypass" },
    { key: "secret_scanning_validity_checks", label: "Secret Scanning Validity Checks" },
    { key: "secret_scanning_non_provider_patterns", label: "Secret Scanning Non-Provider Patterns" },
    { key: "secret_scanning_generic_secrets", label: "Copilot Secret Scanning" },
    { key: "secret_scanning_delegated_alert_dismissal", label: "Secret Scanning Delegated Alert Dismissal" },
    { key: "private_vulnerability_reporting", label: "Private Vulnerability Reporting" },
  ];

  const chips = featureFields
    .map(field => {
      const val = input[field.key] as string | undefined;
      if (val == null) return null;
      // decide color by status
      let color: IAutoView.IAutoViewChipProps["color"] = "gray";
      switch (val) {
        case "enabled":
        case "enforced":
          color = "success";
          break;
        case "disabled":
        case "unenforced":
          color = "error";
          break;
        case "not_set":
        default:
          color = "warning";
      }
      return {
        type: "Chip",
        label: `${field.label}: ${val}`,
        color,
        variant: "filled",
      } as IAutoView.IAutoViewChipProps;
    })
    .filter((c): c is IAutoView.IAutoViewChipProps => c !== null);

  const chipGroup: IAutoView.IAutoViewChipGroupProps = {
    type: "ChipGroup",
    childrenProps: chips,
  };

  // Footer with links to API and UI if present
  const footerButtons: IAutoView.IAutoViewButtonProps[] = [];
  if (input.url) {
    footerButtons.push({
      type: "Button",
      label: "API",
      href: input.url,
      variant: "text",
      color: "primary",
      startElement: {
        type: "Icon",
        id: "link",
        size: 12,
      },
    });
  }
  if (input.html_url) {
    footerButtons.push({
      type: "Button",
      label: "Open",
      href: input.html_url,
      variant: "text",
      color: "secondary",
      startElement: {
        type: "Icon",
        id: "external-link-alt",
        size: 12,
      },
    });
  }
  const footer: IAutoView.IAutoViewCardFooterProps = {
    type: "CardFooter",
    childrenProps: footerButtons,
  };

  // Assemble a vertical card with header, content, and footer
  return {
    type: "VerticalCard",
    childrenProps: [
      header,
      {
        type: "CardContent",
        childrenProps: [dataList, chipGroup],
      },
      footer,
    ],
  };
}

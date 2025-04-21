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
  // Helper to map a status string to a colored Chip component
  const statusChip = (status: string): IAutoView.IAutoViewChipProps => {
    // Determine chip color based on status
    let color: IAutoView.IAutoViewChipProps["color"];
    switch (status) {
      case "enabled":
        color = "green";
        break;
      case "disabled":
        color = "red";
        break;
      case "not_set":
        color = "gray";
        break;
      case "enforced":
        color = "teal";
        break;
      case "unenforced":
        color = "gray";
        break;
      default:
        color = "gray";
    }
    return {
      type: "Chip",
      label: status,
      color,
      variant: "filled",
      size: "small",
    };
  };

  // Collect the relevant configuration fields into DataListItems
  const items: IAutoView.IAutoViewDataListItemProps[] = [];

  /**
   * Utility to add a DataListItem if the property is defined.
   * @param labelText - human-readable label of the field
   * @param propValue - the value from the input to display
   */
  const addItem = (labelText: string, propValue: string | undefined): void => {
    if (propValue == null) return;
    items.push({
      type: "DataListItem",
      label: {
        type: "Text",
        content: labelText,
        variant: "body2",
        color: "secondary",
      },
      value: statusChip(propValue),
    });
  };

  // Standard security settings
  addItem("Target Type", input.target_type);
  addItem("Advanced Security", input.advanced_security);
  addItem("Dependency Graph", input.dependency_graph);
  addItem("Dependabot Alerts", input.dependabot_alerts);
  addItem("Secret Scanning", input.secret_scanning);
  addItem("Private Vulnerability Reporting", input.private_vulnerability_reporting);
  addItem("Enforcement", input.enforcement);

  // Assemble the DataList component
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: items,
  };

  // Compose the VerticalCard with a header, content, and footer
  const card: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [
      // Header with title, description, and an icon
      {
        type: "CardHeader",
        title: input.name,
        description: input.description,
        startElement: {
          type: "Icon",
          id: "shield-alt", // represents security context
          color: "blue",
          size: 24,
        },
      },
      // Content section containing the list of settings
      {
        type: "CardContent",
        childrenProps: dataList,
      },
      // Footer showing the last update timestamp
      {
        type: "CardFooter",
        childrenProps: {
          type: "Text",
          content: input.updated_at
            ? `Updated at: ${new Date(input.updated_at).toLocaleString()}`
            : "Updated at: N/A",
          variant: "caption",
          color: "gray",
        },
      },
    ],
  };

  return card;
}

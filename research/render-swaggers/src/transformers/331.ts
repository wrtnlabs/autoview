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
type IAutoViewTransformerInputType = Schema.code_security_configuration[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // If there's no data, show a friendly markdown message
    if (input.length === 0) {
        return {
            type: "Markdown",
            content: "**No security configurations found.**\n\nPlease check back later or add a new configuration.",
        };
    }

    // Helper to map enablement statuses to chip colors
    const statusToColor = (status: string | undefined): IAutoView.IAutoViewChipProps["color"] => {
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

    // List of togglable boolean-like features with human-friendly labels
    const featureMap: { key: keyof Schema.code_security_configuration; label: string }[] = [
        { key: "advanced_security", label: "Advanced Security" },
        { key: "dependency_graph", label: "Dependency Graph" },
        { key: "dependency_graph_autosubmit_action", label: "Auto dependency submission" },
        { key: "dependabot_alerts", label: "Dependabot Alerts" },
        { key: "dependabot_security_updates", label: "Dependabot Security Updates" },
        { key: "code_scanning_default_setup", label: "Code Scanning Setup" },
        { key: "code_scanning_delegated_alert_dismissal", label: "Delegated Alert Dismissal" },
        { key: "secret_scanning", label: "Secret Scanning" },
        { key: "secret_scanning_push_protection", label: "Push Protection" },
        { key: "secret_scanning_delegated_bypass", label: "Delegated Bypass" },
        { key: "secret_scanning_validity_checks", label: "Validity Checks" },
        { key: "secret_scanning_non_provider_patterns", label: "Non‐Provider Patterns" },
        { key: "secret_scanning_generic_secrets", label: "Generic Secrets" },
        { key: "secret_scanning_delegated_alert_dismissal", label: "Secret Alert Dismissal" },
        { key: "private_vulnerability_reporting", label: "Private Vulnerability Reporting" },
    ];

    // Build a carousel of vertical cards, one per configuration
    const cards: IAutoView.IAutoViewVerticalCardProps[] = input.map((cfg) => {
        // Build an array of chips for each feature that exists on this config
        const chips: IAutoView.IAutoViewChipProps[] = featureMap
            .filter(({ key }) => cfg[key] !== undefined)
            .map(({ key, label }) => ({
                type: "Chip",
                label: `${label}: ${cfg[key]}`,
                color: statusToColor(cfg[key] as string),
                size: "small",
                variant: "filled",
            }));

        // Card header: name and a summary line with target and enforcement
        const header: IAutoView.IAutoViewCardHeaderProps = {
            type: "CardHeader",
            title: cfg.name ?? "Unnamed Configuration",
            description: `Scope: ${cfg.target_type ?? "N/A"}  •  Enforcement: ${cfg.enforcement ?? "N/A"}`,
            startElement: {
                type: "Icon",
                id: "shield-alt",      // Using FontAwesome shield icon
                color: "blue",
                size: 24,
            },
        };

        // Card content: grouping all feature chips
        const content: IAutoView.IAutoViewCardContentProps = {
            type: "CardContent",
            childrenProps: {
                type: "ChipGroup",
                childrenProps: chips,
            },
        };

        // Card footer: show created and updated times in a data list
        const footer: IAutoView.IAutoViewCardFooterProps = {
            type: "CardFooter",
            childrenProps: {
                type: "DataList",
                childrenProps: [
                    {
                        type: "DataListItem",
                        label: { type: "Text", content: "Created At", variant: "body2" },
                        value: { type: "Text", content: cfg.created_at ?? "-", variant: "body2" },
                    },
                    {
                        type: "DataListItem",
                        label: { type: "Text", content: "Updated At", variant: "body2" },
                        value: { type: "Text", content: cfg.updated_at ?? "-", variant: "body2" },
                    },
                ],
            },
        };

        return {
            type: "VerticalCard",
            childrenProps: [header, content, footer],
        };
    });

    // Wrap the cards in a carousel for swipeable navigation on mobile
    return {
        type: "Carousel",
        autoPlay: false,
        infinite: false,
        navControls: true,
        indicators: true,
        gutter: 16,
        childrenProps: cards,
    };
}

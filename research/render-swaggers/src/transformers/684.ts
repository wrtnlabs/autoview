import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Code security configuration associated with a repository and attachment status
    */
    export type code_security_configuration_for_repository = {
        /**
         * The attachment status of the code security configuration on the repository.
        */
        status?: "attached" | "attaching" | "detached" | "removed" | "enforced" | "failed" | "updating" | "removed_by_enterprise";
        configuration?: Schema.code_security_configuration;
    };
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
type IAutoViewTransformerInputType = Schema.code_security_configuration_for_repository;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



// Transforms a code security configuration for a repository into an AutoView UI description.
function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    const config = input.configuration;

    // Fallback when there's no configuration object.
    if (!config) {
        return {
            type: "Text",
            content: "No configuration data available.",
        };
    }

    // Map repository-level status to a chip color.
    const statusColorMap: Record<string, IAutoView.IAutoViewChipProps["color"]> = {
        attached: "primary",
        attaching: "info",
        detached: "warning",
        removed: "error",
        enforced: "success",
        failed: "error",
        updating: "info",
        removed_by_enterprise: "error",
    };
    const repoStatus = input.status ?? "unknown";
    const statusChipColor = statusColorMap[repoStatus] ?? "gray";

    // List of feature flags and how to label them in the UI.
    const featureDefs: [keyof typeof config, string][] = [
        ["advanced_security", "Advanced Security"],
        ["dependency_graph", "Dependency Graph"],
        ["dependency_graph_autosubmit_action", "Dependency Graph Auto-submit"],
        ["dependabot_alerts", "Dependabot Alerts"],
        ["dependabot_security_updates", "Dependabot Security Updates"],
        ["code_scanning_default_setup", "Code Scanning Setup"],
        ["code_scanning_delegated_alert_dismissal", "Scanning Delegated Dismissal"],
        ["secret_scanning", "Secret Scanning"],
        ["secret_scanning_push_protection", "Secret Scanning Push Protection"],
        ["secret_scanning_delegated_bypass", "Secret Scanning Delegated Bypass"],
        ["secret_scanning_validity_checks", "Secret Validity Checks"],
        ["secret_scanning_non_provider_patterns", "Non-Provider Patterns"],
        ["secret_scanning_generic_secrets", "Copilot Secret Scanning"],
        ["secret_scanning_delegated_alert_dismissal", "Secret Alert Dismissal"],
        ["private_vulnerability_reporting", "Private Vulnerability Reporting"],
    ];

    // Produce a chip for each feature, coloring it green if it's "enabled".
    const featureChips: IAutoView.IAutoViewChipProps[] = featureDefs.map(
        ([key, label]) => {
            const raw = config[key] as string | boolean | null | undefined;
            // We treat only the string "enabled" as positive.
            const enabled = raw === "enabled";
            const displayValue = raw == null ? "not set" : String(raw);
            return {
                type: "Chip",
                label: `${label}: ${displayValue}`,
                color: enabled ? "success" : "gray",
                variant: enabled ? "filled" : "outlined",
            };
        }
    );

    // Human-readable created/updated timestamps
    const createdLabel = config.created_at
        ? new Date(config.created_at).toLocaleString()
        : "N/A";
    const updatedLabel = config.updated_at
        ? new Date(config.updated_at).toLocaleString()
        : "N/A";

    // Compose the VerticalCard containing a header (name + scope + status),
    // a chip group for features, and footer with timestamps.
    return {
        type: "VerticalCard",
        childrenProps: [
            {
                // Header with the configuration name and its scope.
                type: "CardHeader",
                title: config.name ?? "Unnamed Configuration",
                description: `Scope: ${config.target_type ?? "not set"}`,
                startElement: {
                    // Visual cue icon (shield) for security config.
                    type: "Icon",
                    id: "shield-alt",
                    color: "indigo",
                    size: 32,
                },
                endElement: {
                    // Status of the repository attachment.
                    type: "Chip",
                    label: repoStatus,
                    color: statusChipColor,
                    variant: "filled",
                },
            },
            {
                // Body content showing all feature flags as chips.
                type: "CardContent",
                childrenProps: {
                    type: "ChipGroup",
                    childrenProps: featureChips,
                    maxItems: 6, // Show first 6, group the rest.
                },
            },
            {
                // Footer with created and updated timestamps rendered in markdown for emphasis.
                type: "CardFooter",
                childrenProps: {
                    type: "Markdown",
                    content:
                        `**Created:** ${createdLabel}\n\n` +
                        `**Updated:** ${updatedLabel}`,
                },
            },
        ],
    };
}

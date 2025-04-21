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
    /**
     * Helper to render tri-state flags (enabled/disabled/not_set) as colored icons.
     */
    function renderFlag(
        value: "enabled" | "disabled" | "not_set" | undefined
    ): IAutoView.IAutoViewIconProps {
        if (value === "enabled") {
            return { type: "Icon", id: "check-circle", color: "green", size: 20 };
        } else if (value === "disabled") {
            return { type: "Icon", id: "times-circle", color: "red", size: 20 };
        } else {
            // not_set or undefined
            return { type: "Icon", id: "question-circle", color: "gray", size: 20 };
        }
    }

    /**
     * Helper to produce a small text chip for categorical fields
     */
    function renderChip(
        label: string,
        color: IAutoView.IAutoViewChipProps["color"] = "gray"
    ): IAutoView.IAutoViewChipProps {
        return {
            type: "Chip",
            label,
            variant: "outlined",
            size: "small",
            color,
        };
    }

    /**
     * Helper to render a link button
     */
    function renderLinkButton(
        href: string,
        label: string = "Open"
    ): IAutoView.IAutoViewButtonProps {
        return {
            type: "Button",
            variant: "text",
            size: "small",
            href,
            startElement: { type: "Icon", id: "link", size: 16, color: "blue" },
            label,
        };
    }

    /**
     * Build DataListItems from a label component and a value component
     */
    function makeItem(
        labelComp: IAutoView.IAutoViewTextProps,
        valueComp: IAutoView.IAutoViewPresentationComponentProps
    ): IAutoView.IAutoViewDataListItemProps {
        return {
            type: "DataListItem",
            label: labelComp,
            value: valueComp,
        };
    }

    // CardHeader: shows name + description + type icon
    const header: IAutoView.IAutoViewCardHeaderProps = {
        type: "CardHeader",
        title: input.name ?? `#${input.id}`,
        description: input.description,
        startElement: {
            type: "Icon",
            // map target_type to an icon
            id:
                input.target_type === "global"
                    ? "globe"
                    : input.target_type === "organization"
                    ? "building"
                    : "shield-alt",
            color:
                input.target_type === "global"
                    ? "teal"
                    : input.target_type === "organization"
                    ? "indigo"
                    : "violet",
            size: 28,
        },
        endElement: renderChip(input.target_type ?? "not_set", "primary"),
    };

    // Collect items
    const items: IAutoView.IAutoViewDataListItemProps[] = [];

    // ID
    if (input.id !== undefined) {
        items.push(
            makeItem(
                { type: "Text", content: String("ID:"), variant: "subtitle2" },
                { type: "Text", content: String(input.id), variant: "body1" }
            )
        );
    }

    // Enforcement
    if (input.enforcement) {
        const colorMap: Record<string, IAutoView.IAutoViewChipProps["color"]> = {
            enforced: "success",
            unenforced: "error",
        };
        items.push(
            makeItem(
                { type: "Text", content: "Enforcement:", variant: "subtitle2" },
                renderChip(input.enforcement, colorMap[input.enforcement])
            )
        );
    }

    // Tri-state flags
    const flags: Array<[string, keyof typeof input]> = [
        ["Advanced Security", "advanced_security"],
        ["Dependency Graph", "dependency_graph"],
        ["Auto-submit Dependencies", "dependency_graph_autosubmit_action"],
        ["Dependabot Alerts", "dependabot_alerts"],
        ["Dependabot Updates", "dependabot_security_updates"],
        ["Code Scanning Default", "code_scanning_default_setup"],
        ["Delegated Alert Dismissal", "code_scanning_delegated_alert_dismissal"],
        ["Secret Scanning", "secret_scanning"],
        ["Push Protection", "secret_scanning_push_protection"],
        ["Bypass Delegation", "secret_scanning_delegated_bypass"],
        ["Validity Checks", "secret_scanning_validity_checks"],
        ["Non-Provider Patterns", "secret_scanning_non_provider_patterns"],
        ["Generic Secrets", "secret_scanning_generic_secrets"],
        ["Delegated Alert Dismissal (Sec)", "secret_scanning_delegated_alert_dismissal"],
        ["Private Reporting", "private_vulnerability_reporting"],
    ];
    for (const [label, key] of flags) {
        const raw = input[key] as "enabled" | "disabled" | "not_set" | undefined;
        if (raw !== undefined) {
            items.push(
                makeItem(
                    { type: "Text", content: `${label}:`, variant: "subtitle2" },
                    renderFlag(raw)
                )
            );
        }
    }

    // Code scanning default setup options
    if (input.code_scanning_default_setup_options) {
        const opt = input.code_scanning_default_setup_options;
        if (opt.runner_type !== null && opt.runner_type !== undefined) {
            items.push(
                makeItem(
                    { type: "Text", content: "Runner Type:", variant: "subtitle2" },
                    renderChip(opt.runner_type)
                )
            );
        }
        if (opt.runner_label) {
            items.push(
                makeItem(
                    { type: "Text", content: "Runner Label:", variant: "subtitle2" },
                    { type: "Text", content: opt.runner_label, variant: "body2" }
                )
            );
        }
    }

    // Secret scanning bypass reviewers
    if (input.secret_scanning_delegated_bypass_options?.reviewers) {
        const list = input.secret_scanning_delegated_bypass_options.reviewers.map((r) =>
            makeItem(
                { type: "Text", content: `${r.reviewer_type}:`, variant: "subtitle2" },
                { type: "Text", content: String(r.reviewer_id), variant: "body2" }
            )
        );
        items.push({
            type: "DataListItem",
            label: { type: "Text", content: "Bypass Reviewers:", variant: "subtitle2" },
            value: {
                type: "DataList",
                childrenProps: list,
            },
        });
    }

    // URLs
    if (input.url) {
        items.push(
            makeItem(
                { type: "Text", content: "Config URL:", variant: "subtitle2" },
                renderLinkButton(input.url, "View")
            )
        );
    }
    if (input.html_url) {
        items.push(
            makeItem(
                { type: "Text", content: "HTML URL:", variant: "subtitle2" },
                renderLinkButton(input.html_url, "Open HTML")
            )
        );
    }

    // Timestamps
    if (input.created_at) {
        items.push(
            makeItem(
                { type: "Text", content: "Created:", variant: "subtitle2" },
                {
                    type: "Text",
                    content: new Date(input.created_at).toLocaleString(),
                    variant: "caption",
                }
            )
        );
    }
    if (input.updated_at) {
        items.push(
            makeItem(
                { type: "Text", content: "Updated:", variant: "subtitle2" },
                {
                    type: "Text",
                    content: new Date(input.updated_at).toLocaleString(),
                    variant: "caption",
                }
            )
        );
    }

    // Main content: DataList of all items
    const content: IAutoView.IAutoViewCardContentProps = {
        type: "CardContent",
        childrenProps: {
            type: "DataList",
            childrenProps: items,
        },
    };

    // Wrap into VerticalCard for responsive stacking
    const card: IAutoView.IAutoViewVerticalCardProps = {
        type: "VerticalCard",
        childrenProps: [header, content],
    };

    return card;
}

import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * A set of rules to apply when specified conditions are met.
     *
     * @title Repository ruleset
    */
    export type repository_ruleset = {
        /**
         * The ID of the ruleset
        */
        id: number & tags.Type<"int32">;
        /**
         * The name of the ruleset
        */
        name: string;
        /**
         * The target of the ruleset
        */
        target?: "branch" | "tag" | "push" | "repository";
        /**
         * The type of the source of the ruleset
        */
        source_type?: "Repository" | "Organization" | "Enterprise";
        /**
         * The name of the source
        */
        source: string;
        enforcement: Schema.repository_rule_enforcement;
        /**
         * The actors that can bypass the rules in this ruleset
        */
        bypass_actors?: Schema.repository_ruleset_bypass_actor[];
        /**
         * The bypass type of the user making the API request for this ruleset. This field is only returned when
         * querying the repository-level endpoint.
        */
        current_user_can_bypass?: "always" | "pull_requests_only" | "never";
        node_id?: string;
        _links?: {
            self?: {
                /**
                 * The URL of the ruleset
                */
                href?: string;
            };
            html?: {
                /**
                 * The html URL of the ruleset
                */
                href?: string;
            } | null;
        };
        conditions?: any | any | null;
        rules?: Schema.repository_rule[];
        created_at?: string & tags.Format<"date-time">;
        updated_at?: string & tags.Format<"date-time">;
    };
    /**
     * The enforcement level of the ruleset. `evaluate` allows admins to test rules before enforcing them. Admins can view insights on the Rule Insights page (`evaluate` is only available with GitHub Enterprise).
    */
    export type repository_rule_enforcement = "disabled" | "active" | "evaluate";
    /**
     * An actor that can bypass rules in a ruleset
     *
     * @title Repository Ruleset Bypass Actor
    */
    export type repository_ruleset_bypass_actor = {
        /**
         * The ID of the actor that can bypass a ruleset. If `actor_type` is `OrganizationAdmin`, this should be `1`. If `actor_type` is `DeployKey`, this should be null. `OrganizationAdmin` is not applicable for personal repositories.
        */
        actor_id?: (number & tags.Type<"int32">) | null;
        /**
         * The type of actor that can bypass a ruleset.
        */
        actor_type: "Integration" | "OrganizationAdmin" | "RepositoryRole" | "Team" | "DeployKey";
        /**
         * When the specified actor can bypass the ruleset. `pull_request` means that an actor can only bypass rules on pull requests. `pull_request` is not applicable for the `DeployKey` actor type. Also, `pull_request` is only applicable to branch rulesets.
        */
        bypass_mode?: "always" | "pull_request";
    };
    export type repository_ruleset_conditions = any;
    export type org_ruleset_conditions = any;
    /**
     * A repository rule.
     *
     * @title Repository Rule
    */
    export type repository_rule = any | any | any | any | any | any | any | any | any | any | any | any | any | any | any | any | any | any | any | any | any;
    export type repository_rule_creation = any;
    export type repository_rule_update = any;
    export type repository_rule_deletion = any;
    export type repository_rule_required_linear_history = any;
    export type repository_rule_merge_queue = any;
    export type repository_rule_required_deployments = any;
    export type repository_rule_required_signatures = any;
    export type repository_rule_pull_request = any;
    export type repository_rule_required_status_checks = any;
    export type repository_rule_non_fast_forward = any;
    export type repository_rule_commit_message_pattern = any;
    export type repository_rule_commit_author_email_pattern = any;
    export type repository_rule_committer_email_pattern = any;
    export type repository_rule_branch_name_pattern = any;
    export type repository_rule_tag_name_pattern = any;
    export type repository_rule_file_path_restriction = any;
    export type repository_rule_max_file_path_length = any;
    export type repository_rule_file_extension_restriction = any;
    export type repository_rule_max_file_size = any;
    export type repository_rule_workflows = any;
    export type repository_rule_code_scanning = any;
}
type IAutoViewTransformerInputType = Schema.repository_ruleset[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // If there are no rulesets, show a friendly markdown message.
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "### No repository rulesets found."
        };
    }

    // Helper: human-readable date formatting.
    function formatDate(dateTime?: string): string {
        if (!dateTime) return "N/A";
        const d = new Date(dateTime);
        // Use locale-sensitive formatting; falls back gracefully if invalid.
        return d.toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric"
        });
    }

    // Map rule enforcement to chip color.
    function enforcementColor(level: string): IAutoView.IAutoViewChipProps["color"] {
        switch (level) {
            case "active":
                return "green";
            case "evaluate":
                return "orange";
            case "disabled":
            default:
                return "gray";
        }
    }

    // Map target to an icon id.
    function targetIconId(target?: string): string {
        switch (target) {
            case "branch":
                return "code-branch";
            case "tag":
                return "tag";
            case "push":
                return "upload";
            case "repository":
                return "book";
            default:
                return "question-circle";
        }
    }

    // Compose a VerticalCard for each ruleset.
    const cards: IAutoView.IAutoViewVerticalCardProps[] = input.map((ruleset) => {
        // Badge for bypass actors count, if any.
        const bypassCount = Array.isArray(ruleset.bypass_actors) ? ruleset.bypass_actors.length : 0;
        const bypassBadge: IAutoView.IAutoViewBadgeProps | undefined = bypassCount > 0
            ? {
                type: "Badge",
                count: bypassCount,
                showZero: false,
                childrenProps: {
                    type: "Icon",
                    id: "users",
                    color: "teal",
                    size: 20
                }
            }
            : undefined;

        // Build CardHeader
        const header: IAutoView.IAutoViewCardHeaderProps = {
            type: "CardHeader",
            title: ruleset.name,
            description: `ID: ${ruleset.id}` + (ruleset.target ? ` • Target: ${ruleset.target}` : ""),
            startElement: {
                type: "Icon",
                id: targetIconId(ruleset.target),
                color: "blue",
                size: 28
            }
        };

        // Build CardContent with chips and badge
        const contentChildren: IAutoView.IAutoViewPresentationComponentProps[] = [];

        // Enforcement chip
        contentChildren.push({
            type: "Chip",
            label: ruleset.enforcement,
            color: enforcementColor(ruleset.enforcement),
            variant: "filled"
        });

        // Source type chip
        if (ruleset.source_type) {
            contentChildren.push({
                type: "Chip",
                label: ruleset.source_type,
                color: "violet",
                variant: "outlined"
            });
        }

        // Number of rules chip
        const rulesCount = Array.isArray(ruleset.rules) ? ruleset.rules.length : 0;
        contentChildren.push({
            type: "Chip",
            label: `${rulesCount} rule${rulesCount === 1 ? "" : "s"}`,
            color: "cyan",
            variant: "outlined"
        });

        // Bypass actors badge, if present
        if (bypassBadge) {
            contentChildren.push(bypassBadge);
        }

        const content: IAutoView.IAutoViewCardContentProps = {
            type: "CardContent",
            childrenProps: contentChildren
        };

        // Build CardFooter with creation/update timestamps
        const footerText = `Created: ${formatDate(ruleset.created_at)}  •  Updated: ${formatDate(ruleset.updated_at)}`;
        const footer: IAutoView.IAutoViewCardFooterProps = {
            type: "CardFooter",
            childrenProps: {
                type: "Text",
                content: footerText,
                variant: "caption",
                color: "gray"
            }
        };

        return {
            type: "VerticalCard",
            childrenProps: [header, content, footer]
        };
    });

    // Wrap all cards in a responsive carousel.
    const carousel: IAutoView.IAutoViewCarouselProps = {
        type: "Carousel",
        // Show the cards in a horizontal scrollable view.
        childrenProps: cards,
        navControls: true,
        indicators: true,
        infinite: false,
        gutter: 16,
        autoPlay: false
    };

    return carousel;
}

import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Response
     *
     * @title Rule Suite
    */
    export type rule_suite = {
        /**
         * The unique identifier of the rule insight.
        */
        id?: number & tags.Type<"int32">;
        /**
         * The number that identifies the user.
        */
        actor_id?: (number & tags.Type<"int32">) | null;
        /**
         * The handle for the GitHub user account.
        */
        actor_name?: string | null;
        /**
         * The first commit sha before the push evaluation.
        */
        before_sha?: string;
        /**
         * The last commit sha in the push evaluation.
        */
        after_sha?: string;
        /**
         * The ref name that the evaluation ran on.
        */
        ref?: string;
        /**
         * The ID of the repository associated with the rule evaluation.
        */
        repository_id?: number & tags.Type<"int32">;
        /**
         * The name of the repository without the `.git` extension.
        */
        repository_name?: string;
        pushed_at?: string & tags.Format<"date-time">;
        /**
         * The result of the rule evaluations for rules with the `active` enforcement status.
        */
        result?: "pass" | "fail" | "bypass";
        /**
         * The result of the rule evaluations for rules with the `active` and `evaluate` enforcement statuses, demonstrating whether rules would pass or fail if all rules in the rule suite were `active`. Null if no rules with `evaluate` enforcement status were run.
        */
        evaluation_result?: "pass" | "fail" | "bypass" | null;
        /**
         * Details on the evaluated rules.
        */
        rule_evaluations?: {
            rule_source?: {
                /**
                 * The type of rule source.
                */
                type?: string;
                /**
                 * The ID of the rule source.
                */
                id?: (number & tags.Type<"int32">) | null;
                /**
                 * The name of the rule source.
                */
                name?: string | null;
            };
            /**
             * The enforcement level of this rule source.
            */
            enforcement?: "active" | "evaluate" | "deleted ruleset";
            /**
             * The result of the evaluation of the individual rule.
            */
            result?: "pass" | "fail";
            /**
             * The type of rule.
            */
            rule_type?: string;
            /**
             * The detailed failure message for the rule. Null if the rule passed.
            */
            details?: string | null;
        }[];
    };
}
type IAutoViewTransformerInputType = Schema.rule_suite;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(
    input: IAutoViewTransformerInputType,
): IAutoView.IAutoViewComponentProps {
    // Map evaluation result to UI colors
    const statusColorMap: Record<string, IAutoView.IAutoViewChipProps["color"]> = {
        pass: "success",
        fail: "error",
        bypass: "warning",
    };

    // CARD HEADER: shows repo, ref, who pushed, time and overall result
    const header: IAutoView.IAutoViewCardHeaderProps = {
        type: "CardHeader",
        // Title: repository name and ref
        title: `${input.repository_name || "Unknown Repo"}@${input.ref || ""}`,
        // Subtitle: pushed time formatted
        description: input.pushed_at
            ? `Pushed at ${new Date(input.pushed_at).toLocaleString()}`
            : undefined,
        // Avatar for the actor (will render initials if no src)
        startElement: {
            type: "Avatar",
            name: input.actor_name || undefined,
        },
        // Overall result as a colored chip
        endElement: {
            type: "Chip",
            label: (input.result || "unknown").toUpperCase(),
            color:
                statusColorMap[input.result || ""] || "gray",
            size: "small",
            variant: "filled",
        },
    };

    // DATA LIST: one entry per rule evaluation
    const evaluations = input.rule_evaluations || [];
    const dataListItems: IAutoView.IAutoViewDataListItemProps[] = evaluations.map(
        (rule) => {
            // Markdown label with rule type and enforcement level
            const labelMd: IAutoView.IAutoViewMarkdownProps = {
                type: "Markdown",
                content: `**${rule.rule_type || "Unknown"}** (_${rule.enforcement || "n/a"}_)`,
            };

            // Chip indicating pass/fail of this rule
            const resultChip: IAutoView.IAutoViewChipProps = {
                type: "Chip",
                label: (rule.result || "unknown").toUpperCase(),
                color:
                    statusColorMap[rule.result || ""] ||
                    "gray",
                size: "small",
                variant: "filled",
            };

            // If there are details, attach a tooltip icon
            const valueChildren: IAutoView.IAutoViewPresentationComponentProps[] = [
                resultChip,
            ];
            if (rule.details) {
                const infoIcon: IAutoView.IAutoViewIconProps = {
                    type: "Icon",
                    id: "info-circle",
                    color: "gray",
                    size: 16,
                };
                const tooltip: IAutoView.IAutoViewTooltipProps = {
                    type: "Tooltip",
                    message: rule.details,
                    childrenProps: infoIcon,
                };
                valueChildren.push(tooltip);
            }

            return {
                type: "DataListItem",
                label: labelMd,
                value: valueChildren,
            };
        },
    );

    const dataList: IAutoView.IAutoViewDataListProps = {
        type: "DataList",
        childrenProps: dataListItems,
    };

    // CARD CONTENT: wrap the data list
    const content: IAutoView.IAutoViewCardContentProps = {
        type: "CardContent",
        childrenProps: dataList,
    };

    // Optionally show evaluation_result if present (e.g. "would pass/fail")
    let footer: IAutoView.IAutoViewCardFooterProps | undefined;
    if (input.evaluation_result != null) {
        const evalChip: IAutoView.IAutoViewChipProps = {
            type: "Chip",
            label: `Evaluated: ${(input.evaluation_result || "").toUpperCase()}`,
            color:
                statusColorMap[input.evaluation_result || ""] ||
                "gray",
            size: "small",
            variant: "outlined",
        };
        footer = {
            type: "CardFooter",
            childrenProps: evalChip,
        };
    }

    // Assemble the vertical card
    const card: IAutoView.IAutoViewVerticalCardProps = {
        type: "VerticalCard",
        childrenProps: footer
            ? [header, content, footer]
            : [header, content],
    };

    return card;
}

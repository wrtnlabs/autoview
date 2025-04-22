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



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // Build header start element: GitHub avatar if actor_id is known, otherwise a generic user icon
    const startElement: IAutoView.IAutoViewAvatarProps | IAutoView.IAutoViewIconProps = input.actor_id
        ? {
              type: "Avatar",
              src: `https://avatars.githubusercontent.com/u/${input.actor_id}`,
              name: input.actor_name || "",
              variant: "gray",
              size: 32,
          }
        : {
              type: "Icon",
              id: "user",
              color: "gray",
              size: 24,
          };

    // Repository title and descriptive text
    const title = input.repository_name || "Repository";
    const before = input.before_sha?.slice(0, 7);
    const after = input.after_sha?.slice(0, 7);
    const descParts: string[] = [`${input.actor_name || "Unknown user"} pushed`];
    if (before && after) descParts.push(`from ${before}`, `to ${after}`);
    if (input.ref) descParts.push(`on ${input.ref}`);
    const description = descParts.join(" ");

    // Footer end element: timestamp with a clock icon
    const formattedDate = input.pushed_at ? new Date(input.pushed_at).toLocaleString() : "";
    const endElement: IAutoView.IAutoViewTextProps = {
        type: "Text",
        variant: "caption",
        color: "gray",
        content: [
            { type: "Icon", id: "clock", size: 12, color: "gray" },
            ` ${formattedDate}`,
        ],
    };

    const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
        type: "CardHeader",
        title,
        description,
        startElement,
        endElement,
    };

    // Build a DataList of rule evaluations
    const evals = input.rule_evaluations || [];
    const dataListItems: IAutoView.IAutoViewDataListItemProps[] = evals.map((ev) => {
        const labelText = ev.rule_source?.name || ev.rule_type || "Unknown rule";
        const label: IAutoView.IAutoViewTextProps = {
            type: "Text",
            variant: "body2",
            content: labelText,
        };

        // Icon for pass/fail
        const passed = ev.result === "pass";
        const resultIcon: IAutoView.IAutoViewIconProps = {
            type: "Icon",
            id: passed ? "check-circle" : "times-circle",
            color: passed ? "green" : "red",
            size: 16,
        };

        // If failed and has details, add a tooltip
        const valueComponents: IAutoView.IAutoViewPresentationComponentProps[] = [resultIcon];
        if (!passed && ev.details) {
            const tooltip: IAutoView.IAutoViewTooltipProps = {
                type: "Tooltip",
                message: ev.details,
                childrenProps: {
                    type: "Icon",
                    id: "info-circle",
                    color: "blue",
                    size: 16,
                },
            };
            valueComponents.push(tooltip);
        }

        return {
            type: "DataListItem",
            label,
            value: valueComponents,
        };
    });

    const dataList: IAutoView.IAutoViewDataListProps = {
        type: "DataList",
        childrenProps: dataListItems,
    };
    const cardContent: IAutoView.IAutoViewCardContentProps = {
        type: "CardContent",
        childrenProps: dataList,
    };

    // Summary chips for overall and evaluation results
    const statusColor: Record<string, IAutoView.IAutoViewChipProps["color"]> = {
        pass: "green",
        fail: "error",
        bypass: "warning",
    };
    const chips: IAutoView.IAutoViewChipProps[] = [];
    if (input.result) {
        chips.push({
            type: "Chip",
            label: input.result.toUpperCase(),
            color: statusColor[input.result] || "gray",
            variant: "filled",
        });
    }
    if (input.evaluation_result) {
        chips.push({
            type: "Chip",
            label: `Eval: ${input.evaluation_result.toUpperCase()}`,
            color: statusColor[input.evaluation_result] || "gray",
            variant: "outlined",
        });
    }

    const cardFooter: IAutoView.IAutoViewCardFooterProps = {
        type: "CardFooter",
        childrenProps: chips,
    };

    // Assemble a vertical card with header, content, and footer
    return {
        type: "VerticalCard",
        childrenProps: [cardHeader, cardContent, cardFooter],
    };
}

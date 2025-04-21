import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Response
     *
     * @title Rule Suites
    */
    export type rule_suites = {
        /**
         * The unique identifier of the rule insight.
        */
        id?: number & tags.Type<"int32">;
        /**
         * The number that identifies the user.
        */
        actor_id?: number & tags.Type<"int32">;
        /**
         * The handle for the GitHub user account.
        */
        actor_name?: string;
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
         * The result of the rule evaluations for rules with the `active` and `evaluate` enforcement statuses, demonstrating whether rules would pass or fail if all rules in the rule suite were `active`.
        */
        evaluation_result?: "pass" | "fail" | "bypass";
    }[];
}
type IAutoViewTransformerInputType = Schema.rule_suites;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // If there is no data, render a simple markdown message.
    if (!Array.isArray(input) || input.length === 0) {
        return {
            type: "Markdown",
            content: "### No rule suite data available",
        } as IAutoView.IAutoViewMarkdownProps;
    }

    // Helper to map a result string to a coloured chip
    function makeResultChip(
        label: string,
        filled: boolean = true
    ): IAutoView.IAutoViewChipProps {
        // Choose a color based on the label
        const colorMap: Record<string, IAutoView.IAutoViewChipProps["color"]> = {
            pass: "green",
            fail: "red",
            bypass: "orange",
        };
        const color = colorMap[label] || "gray";
        return {
            type: "Chip",
            label: label.toUpperCase(),
            color,
            variant: filled ? "filled" : "outlined",
            size: "small",
        };
    }

    // Build a list item for each rule suite entry
    const items: IAutoView.IAutoViewDataListItemProps[] = input.map((suite) => {
        // Actor display: avatar + name
        const actorName = suite.actor_name || "Unknown";
        const actorAvatar: IAutoView.IAutoViewAvatarProps = {
            type: "Avatar",
            name: actorName,
            variant: "primary",
            size: 32,
        };

        // Repository display: icon + repo name
        const repoName = suite.repository_name || "Unknown repo";
        const repoIcon: IAutoView.IAutoViewIconProps = {
            type: "Icon",
            id: "code-branch",
            color: "blue",
            size: 16,
        };
        const repoText: IAutoView.IAutoViewTextProps = {
            type: "Text",
            content: repoName,
            variant: "body2",
            color: "primary",
        };

        // Main evaluation result: pass/fail/bypass
        const resultChip = makeResultChip(suite.result || "bypass", true);
        // Hypothetical evaluation result (what-if)
        const evalChip = makeResultChip(suite.evaluation_result || "bypass", false);

        // Compose the label (actor + ID + time)
        const timestamp = suite.pushed_at
            ? new Date(suite.pushed_at).toLocaleString()
            : "N/A";
        const timeText: IAutoView.IAutoViewTextProps = {
            type: "Text",
            content: timestamp,
            variant: "caption",
            color: "tertiary",
        };

        // The DataListItemProps
        return {
            type: "DataListItem",
            // Label side: avatar + actor name + timestamp
            label: [
                actorAvatar,
                {
                    type: "Text",
                    content: actorName,
                    variant: "body1",
                    color: "primary",
                },
                timeText,
            ] as IAutoView.IAutoViewPresentationComponentProps[],
            // Value side: repo + result chips
            value: [
                repoIcon,
                repoText,
                resultChip,
                evalChip,
            ] as IAutoView.IAutoViewPresentationComponentProps[],
        };
    });

    // Return a DataList to render all items in a responsive list
    const dataList: IAutoView.IAutoViewDataListProps = {
        type: "DataList",
        childrenProps: items,
    };

    return dataList;
}

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
    // If no data, show a friendly message using markdown
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "### No rule suite data available\n\nNo rule evaluations were returned from the API."
        };
    }

    // Avatar variants pool for consistent coloring per actor
    const avatarVariants: IAutoView.IAutoViewAvatarProps["variant"][] = [
        "primary","secondary","success","error","warning","info",
        "red","orange","yellow","lime","green","teal","cyan",
        "blue","indigo","violet","pink","gray","darkGray"
    ];

    // Map each rule suite entry to a ListItem component
    const listItems: IAutoView.IAutoViewListItemProps[] = input.map((entry) => {
        // Prepare avatar for the actor
        const actorName = entry.actor_name || "Unknown";
        const actorId = entry.actor_id ?? 0;
        // Choose a color variant by actor ID
        const variant = avatarVariants[actorId % avatarVariants.length];
        const avatar: IAutoView.IAutoViewAvatarProps = {
            type: "Avatar",
            name: actorName,
            variant,
            size: 24
        };

        // Helper to map result strings to chip colors
        const resultColorMap: Record<string, IAutoView.IAutoViewChipProps["color"]> = {
            pass: "green",
            fail: "red",
            bypass: "orange"
        };

        // Primary result chip (filled)
        const resultChip: IAutoView.IAutoViewChipProps = {
            type: "Chip",
            label: entry.result ?? "unknown",
            color: resultColorMap[entry.result!] ?? "gray",
            variant: "filled",
            size: "small"
        };

        // Evaluation-result chip (outlined)
        const evaluationChip: IAutoView.IAutoViewChipProps = {
            type: "Chip",
            label: entry.evaluation_result ?? "unknown",
            color: resultColorMap[entry.evaluation_result!] ?? "gray",
            variant: "outlined",
            size: "small"
        };

        // Format the push date for readability
        const pushedAt = entry.pushed_at
            ? new Date(entry.pushed_at).toLocaleDateString()
            : "unknown date";

        // Build the description string
        const descriptionParts: string[] = [];
        if (entry.ref) descriptionParts.push(`Ref: ${entry.ref}`);
        descriptionParts.push(`Pushed: ${pushedAt}`);
        const description = descriptionParts.join(" • ");

        // Compose the ListItem props
        const item: IAutoView.IAutoViewListItemProps = {
            type: "ListItem",
            title: entry.repository_name ?? "Unknown Repository",
            description,
            startElement: avatar,
            // Show both result chips side by side
            endElement: [resultChip, evaluationChip]
        };

        return item;
    });

    // Return the full list of items
    const list: IAutoView.IAutoViewListProps = {
        type: "List",
        childrenProps: listItems
    };

    return list;
}

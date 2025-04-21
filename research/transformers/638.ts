import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Status Check Policy
     *
     * @title Status Check Policy
    */
    export type status_check_policy = {
        url: string & tags.Format<"uri">;
        strict: boolean;
        contexts: string[];
        checks: {
            context: string;
            app_id: (number & tags.Type<"int32">) | null;
        }[];
        contexts_url: string & tags.Format<"uri">;
    };
}
type IAutoViewTransformerInputType = Schema.status_check_policy;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // We will use a VerticalCard to wrap the entire policy view
    // Header shows title, URL, and a chip indicating strictness
    const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
        type: "CardHeader",
        title: "Status Check Policy",
        description: input.url,
        // startElement: an icon to represent the policy list
        startElement: {
            type: "Icon",
            id: "tasks",
            color: "blue",
            size: 24,
        },
        // endElement: a chip showing whether the policy is strict
        endElement: {
            type: "Chip",
            label: input.strict ? "Strict" : "Non‑strict",
            color: input.strict ? "success" : "error",
            variant: "filled",
            size: "small",
        },
    };

    // A button to open the policy URL
    const openPolicyButton: IAutoView.IAutoViewButtonProps = {
        type: "Button",
        label: "Open Policy",
        href: input.url,
        variant: "text",
        color: "primary",
    };

    // A button to view all contexts via the contexts_url
    const viewContextsButton: IAutoView.IAutoViewButtonProps = {
        type: "Button",
        label: "View Contexts",
        href: input.contexts_url,
        variant: "text",
        color: "secondary",
    };

    // Render the list of contexts as a group of chips
    const contextsChips: IAutoView.IAutoViewChipGroupProps = {
        type: "ChipGroup",
        childrenProps: input.contexts.map((ctx) => ({
            type: "Chip",
            label: ctx,
            variant: "filled",
            color: "teal",
            size: "small",
        })),
    };

    // Prepare a data list of checks, each showing context and its app_id (or None)
    const checksDataList: IAutoView.IAutoViewDataListProps = {
        type: "DataList",
        childrenProps: input.checks.map((chk) => {
            const labelText: IAutoView.IAutoViewTextProps = {
                type: "Text",
                content: chk.context,
                variant: "body2",
            };
            const appIdLabel = chk.app_id !== null ? String(chk.app_id) : "None";
            const appIdChip: IAutoView.IAutoViewChipProps = {
                type: "Chip",
                label: appIdLabel,
                variant: "outlined",
                color: chk.app_id !== null ? "info" : "gray",
                size: "small",
            };
            return {
                type: "DataListItem",
                label: [labelText],
                value: appIdChip,
            };
        }),
    };

    // Assemble the content section with buttons, separators, contexts, and checks
    const cardContent: IAutoView.IAutoViewCardContentProps = {
        type: "CardContent",
        childrenProps: [
            openPolicyButton,
            viewContextsButton,
            { type: "Divider", orientation: "horizontal", color: "#e0e0e0" },
            // contexts section title
            {
                type: "Markdown",
                content: "### Contexts",
            },
            contextsChips,
            { type: "Divider", orientation: "horizontal", color: "#e0e0e0" },
            // checks section title
            {
                type: "Markdown",
                content: "### Checks",
            },
            checksDataList,
        ],
    };

    // Return the composed VerticalCard
    const card: IAutoView.IAutoViewVerticalCardProps = {
        type: "VerticalCard",
        childrenProps: [cardHeader, cardContent],
    };

    return card;
}

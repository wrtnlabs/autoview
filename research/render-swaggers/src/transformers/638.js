export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // We will use a VerticalCard to wrap the entire policy view
    // Header shows title, URL, and a chip indicating strictness
    const cardHeader = {
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
    const openPolicyButton = {
        type: "Button",
        label: "Open Policy",
        href: input.url,
        variant: "text",
        color: "primary",
    };
    // A button to view all contexts via the contexts_url
    const viewContextsButton = {
        type: "Button",
        label: "View Contexts",
        href: input.contexts_url,
        variant: "text",
        color: "secondary",
    };
    // Render the list of contexts as a group of chips
    const contextsChips = {
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
    const checksDataList = {
        type: "DataList",
        childrenProps: input.checks.map((chk) => {
            const labelText = {
                type: "Text",
                content: chk.context,
                variant: "body2",
            };
            const appIdLabel = chk.app_id !== null ? String(chk.app_id) : "None";
            const appIdChip = {
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
    const cardContent = {
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
    const card = {
        type: "VerticalCard",
        childrenProps: [cardHeader, cardContent],
    };
    return card;
}
//# sourceMappingURL=638.js.map
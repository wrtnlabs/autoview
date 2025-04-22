export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a;
    // Helper to map project state to a chip color
    const stateColor = (state) => {
        switch (state.toLowerCase()) {
            case "open":
                return "success";
            case "closed":
                return "error";
            default:
                return "gray";
        }
    };
    // Build the card header, including an avatar for the creator and a state chip
    const header = {
        type: "CardHeader",
        title: input.name,
        description: (_a = input.body) !== null && _a !== void 0 ? _a : undefined,
        // If we have a creator with an avatar, show it
        startElement: input.creator
            ? {
                type: "Avatar",
                src: input.creator.avatar_url,
                name: input.creator.login,
                variant: "primary",
                size: 40,
            }
            : undefined,
        // Show a chip indicating open/closed state
        endElement: {
            type: "Chip",
            label: input.state,
            color: stateColor(input.state),
            variant: "filled",
            size: "small",
        },
    };
    // Build a DataList of key project metadata
    const detailsList = {
        type: "DataList",
        childrenProps: [
            {
                type: "DataListItem",
                label: { type: "Text", content: ["ID"] },
                value: { type: "Text", content: [String(input.id)] },
            },
            {
                type: "DataListItem",
                label: { type: "Text", content: ["Number"] },
                value: { type: "Text", content: [String(input.number)] },
            },
            {
                type: "DataListItem",
                label: { type: "Text", content: ["Created"] },
                value: { type: "Text", content: [input.created_at] },
            },
            {
                type: "DataListItem",
                label: { type: "Text", content: ["Updated"] },
                value: { type: "Text", content: [input.updated_at] },
            },
        ],
    };
    // If the project has a non-null body, render it in markdown below the details
    const bodyContent = input.body
        ? {
            type: "CardContent",
            childrenProps: [
                {
                    type: "Markdown",
                    content: input.body,
                },
            ],
        }
        : undefined;
    // Footer with a button linking to the project page on GitHub
    const footer = {
        type: "CardFooter",
        childrenProps: {
            type: "Button",
            label: "View on GitHub",
            variant: "outlined",
            href: input.html_url,
            startElement: {
                type: "Icon",
                id: "github",
                size: 16,
                color: "gray",
            },
        },
    };
    // Compose the vertical card with header, details, optional body, and footer
    const cardChildren = [header, { type: "CardContent", childrenProps: detailsList }];
    if (bodyContent) {
        cardChildren.push(bodyContent);
    }
    cardChildren.push(footer);
    // Return a VerticalCard as the top-level component
    const card = {
        type: "VerticalCard",
        childrenProps: cardChildren,
    };
    return card;
}
//# sourceMappingURL=565.js.map
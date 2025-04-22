export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a;
    // Helper to format ISO date strings into a human‐readable form
    const formatDate = (iso) => iso ? new Date(iso).toLocaleDateString() : "";
    // Map the issue state to a chip color
    const stateColor = {
        open: "green",
        closed: "red",
        // fallback
        default: "gray",
    };
    // Build the header: issue title, number, user avatar, and state chip
    const header = {
        type: "CardHeader",
        title: input.title,
        // Show issue number and repository‐relative numbering as description
        description: `#${input.number}`,
        // If we have a user, show their avatar as the start element
        startElement: input.user
            ? {
                type: "Avatar",
                src: input.user.avatar_url,
                name: input.user.login,
                size: 40,
            }
            : undefined,
        // Display state as a colored chip on the right
        endElement: {
            type: "Chip",
            label: input.state,
            variant: "filled",
            color: stateColor[input.state] || stateColor.default,
            size: "small",
        },
    };
    // Build the content: description/body and timestamps
    const contentChildren = [];
    // Use Markdown component for the body, falling back if no body is provided
    contentChildren.push({
        type: "Markdown",
        content: (_a = input.body) !== null && _a !== void 0 ? _a : "*No description provided*",
    });
    // Created at timestamp
    contentChildren.push({
        type: "Text",
        variant: "caption",
        color: "gray",
        content: [
            { type: "Icon", id: "calendar", color: "gray", size: 16 },
            " Created: ",
            formatDate(input.created_at),
        ],
    });
    // Updated at timestamp
    if (input.updated_at) {
        contentChildren.push({
            type: "Text",
            variant: "caption",
            color: "gray",
            content: [
                { type: "Icon", id: "sync-alt", color: "gray", size: 16 },
                " Updated: ",
                formatDate(input.updated_at),
            ],
        });
    }
    // Closed at timestamp (if applicable)
    if (input.closed_at) {
        contentChildren.push({
            type: "Text",
            variant: "caption",
            color: "gray",
            content: [
                { type: "Icon", id: "times-circle", color: "gray", size: 16 },
                " Closed: ",
                formatDate(input.closed_at),
            ],
        });
    }
    const content = {
        type: "CardContent",
        childrenProps: contentChildren,
    };
    // Build the footer: labels and comment count
    const footerChildren = [];
    // Labels as a chip group
    if (Array.isArray(input.labels) && input.labels.length > 0) {
        const chips = input.labels.map((lbl) => {
            var _a, _b;
            // Labels can be strings or objects
            const name = typeof lbl === "string" ? lbl : (_a = lbl.name) !== null && _a !== void 0 ? _a : String((_b = lbl.id) !== null && _b !== void 0 ? _b : "");
            return {
                type: "Chip",
                label: name,
                variant: "outlined",
                size: "small",
            };
        });
        footerChildren.push({
            type: "ChipGroup",
            childrenProps: chips,
            maxItems: 8,
        });
    }
    // Comments count with an icon
    footerChildren.push({
        type: "Text",
        variant: "caption",
        color: "gray",
        content: [
            { type: "Icon", id: "comment", color: "gray", size: 16 },
            " ",
            String(input.comments),
        ],
    });
    const footer = {
        type: "CardFooter",
        childrenProps: footerChildren,
    };
    // Assemble the vertical card
    return {
        type: "VerticalCard",
        childrenProps: [header, content, footer],
    };
}
//# sourceMappingURL=782.js.map
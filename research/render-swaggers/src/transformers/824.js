export function transform($input) {
    return visualizeData($input);
}
// Utility function to format ISO dates into a human‐readable string.
function formatDate(iso) {
    const d = new Date(iso);
    // e.g., "Jan 1, 2023"
    return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}
function visualizeData(input) {
    var _a;
    // Map GitHub project state to a colored chip
    const stateColorMap = {
        open: "success",
        closed: "error",
    };
    const chipColor = (_a = stateColorMap[input.state]) !== null && _a !== void 0 ? _a : "gray";
    // Build a small avatar or fallback icon for the project creator
    const creatorAvatar = input.creator
        ? {
            type: "Avatar",
            src: input.creator.avatar_url,
            name: input.creator.login,
            variant: "primary",
            size: 40,
        }
        : {
            type: "Icon",
            id: "user-circle",
            color: "gray",
            size: 40,
        };
    // Build a data list of metadata: created/updated timestamps
    const metaList = {
        type: "DataList",
        childrenProps: [
            {
                type: "DataListItem",
                label: [
                    { type: "Icon", id: "clock", color: "gray", size: 16 },
                    { type: "Text", content: "Created" },
                ],
                value: { type: "Text", content: formatDate(input.created_at) },
            },
            {
                type: "DataListItem",
                label: [
                    { type: "Icon", id: "edit", color: "gray", size: 16 },
                    { type: "Text", content: "Updated" },
                ],
                value: { type: "Text", content: formatDate(input.updated_at) },
            },
        ],
    };
    // Optionally show the project description/body as markdown if provided
    const markdownSection = input.body
        ? {
            type: "Markdown",
            content: input.body,
        }
        : null;
    // Footer buttons: view project page & view columns
    const footerButtons = [
        {
            type: "Button",
            variant: "contained",
            color: "primary",
            label: "View Project",
            href: input.html_url,
            startElement: { type: "Icon", id: "external-link-alt", size: 16 },
        },
        {
            type: "Button",
            variant: "outlined",
            color: "primary",
            label: "Columns",
            href: input.columns_url,
            startElement: { type: "Icon", id: "columns", size: 16 },
        },
    ];
    return {
        // Use a vertical card to group project details cleanly
        type: "VerticalCard",
        childrenProps: [
            {
                // Header: show project title, number, creator icon/avatar, and state chip
                type: "CardHeader",
                title: input.name,
                description: `#${input.number}`,
                startElement: creatorAvatar,
                endElement: {
                    type: "Chip",
                    label: input.state,
                    color: chipColor,
                    size: "small",
                    variant: "filled",
                },
            },
            {
                // Content: markdown description (if any) + metadata list
                type: "CardContent",
                childrenProps: [
                    // Insert markdown section first if present
                    ...(markdownSection ? [markdownSection] : []),
                    // Always show metadata after
                    metaList,
                ],
            },
            {
                // Footer: quick action buttons
                type: "CardFooter",
                childrenProps: footerButtons,
            },
        ],
    };
}
//# sourceMappingURL=824.js.map
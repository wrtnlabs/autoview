export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b;
    // Helper to format date strings into a more readable format
    const formatDate = (dateStr) => dateStr ? new Date(dateStr).toLocaleDateString() : "N/A";
    // Build an Avatar component for the creator if available
    const creatorAvatar = input.creator
        ? {
            type: "Avatar",
            src: input.creator.avatar_url,
            name: (_a = input.creator.name) !== null && _a !== void 0 ? _a : input.creator.login,
            variant: "primary",
            size: 40,
        }
        : undefined;
    // Build a list of detail items for the milestone
    const details = [
        {
            type: "DataListItem",
            // Milestone number
            label: [
                {
                    type: "Text",
                    content: ["Number"],
                    variant: "subtitle2",
                },
            ],
            value: [
                {
                    type: "Text",
                    content: [`#${input.number}`],
                    variant: "body1",
                },
            ],
        },
        {
            type: "DataListItem",
            // State with a colored chip
            label: [
                {
                    type: "Text",
                    content: ["State"],
                    variant: "subtitle2",
                },
            ],
            value: {
                type: "Chip",
                label: input.state,
                color: input.state === "open" ? "success" : "error",
                variant: "filled",
                size: "small",
            },
        },
        {
            type: "DataListItem",
            // Open issues count
            label: [
                {
                    type: "Text",
                    content: ["Open Issues"],
                    variant: "subtitle2",
                },
            ],
            value: {
                type: "Chip",
                label: String(input.open_issues),
                color: "info",
                variant: "filled",
                size: "small",
            },
        },
        {
            type: "DataListItem",
            // Closed issues count
            label: [
                {
                    type: "Text",
                    content: ["Closed Issues"],
                    variant: "subtitle2",
                },
            ],
            value: {
                type: "Chip",
                label: String(input.closed_issues),
                color: "primary",
                variant: "filled",
                size: "small",
            },
        },
        {
            type: "DataListItem",
            // Due date
            label: [
                {
                    type: "Text",
                    content: ["Due Date"],
                    variant: "subtitle2",
                },
            ],
            value: [
                {
                    type: "Text",
                    content: [formatDate(input.due_on)],
                    variant: "body1",
                },
            ],
        },
        {
            type: "DataListItem",
            // Created at
            label: [
                {
                    type: "Text",
                    content: ["Created"],
                    variant: "subtitle2",
                },
            ],
            value: [
                {
                    type: "Text",
                    content: [formatDate(input.created_at)],
                    variant: "body1",
                },
            ],
        },
        {
            type: "DataListItem",
            // Last updated at
            label: [
                {
                    type: "Text",
                    content: ["Updated"],
                    variant: "subtitle2",
                },
            ],
            value: [
                {
                    type: "Text",
                    content: [formatDate(input.updated_at)],
                    variant: "body1",
                },
            ],
        },
    ];
    // Compose the final VerticalCard with header, content, and footer
    return {
        type: "VerticalCard",
        childrenProps: [
            // CardHeader: shows title, optional description, and the creator's avatar
            {
                type: "CardHeader",
                title: input.title,
                description: (_b = input.description) !== null && _b !== void 0 ? _b : undefined,
                startElement: creatorAvatar,
            },
            // CardContent: a DataList of the milestone details
            {
                type: "CardContent",
                childrenProps: {
                    type: "DataList",
                    childrenProps: details,
                },
            },
            // CardFooter: a button linking to the GitHub milestone page
            {
                type: "CardFooter",
                childrenProps: {
                    type: "Button",
                    label: "View on GitHub",
                    href: input.html_url,
                    variant: "text",
                    color: "primary",
                    size: "small",
                },
            },
        ],
    };
}
//# sourceMappingURL=809.js.map
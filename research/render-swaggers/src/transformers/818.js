export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a;
    // Map build status to a color for the status chip
    const statusColorMap = {
        success: "success",
        failure: "error",
        error: "error",
        pending: "warning",
        canceled: "gray",
    };
    const statusKey = input.status.toLowerCase();
    const chipColor = statusColorMap[statusKey] || "primary";
    // Shorten commit hash for display
    const shortCommit = input.commit.slice(0, 7);
    // Format timestamps for human readability
    const createdAt = new Date(input.created_at).toLocaleString();
    const updatedAt = new Date(input.updated_at).toLocaleString();
    // Prepare list items for the details section
    const details = [
        {
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Commit",
            },
            value: {
                type: "Text",
                content: shortCommit,
            },
        },
        {
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Duration",
            },
            value: {
                type: "Text",
                content: `${input.duration} ms`,
            },
        },
        {
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Created At",
            },
            value: {
                type: "Text",
                content: createdAt,
            },
        },
        {
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Updated At",
            },
            value: {
                type: "Text",
                content: updatedAt,
            },
        },
    ];
    // If there is an error message, include it in the details
    if ((_a = input.error) === null || _a === void 0 ? void 0 : _a.message) {
        details.push({
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Error",
            },
            // Use a markdown component to allow multiline stack traces or formatting
            value: {
                type: "Markdown",
                content: input.error.message,
            },
        });
    }
    // Determine the avatar or icon for the pusher
    const pusherElement = input.pusher
        ? {
            type: "Avatar",
            src: input.pusher.avatar_url,
            name: input.pusher.login,
            variant: "info",
            size: 32,
        }
        : {
            type: "Icon",
            id: "user",
            color: "gray",
            size: 32,
        };
    // Compose the vertical card view
    const card = {
        type: "VerticalCard",
        childrenProps: [
            // Header with pusher avatar, build status chip, and repository URL
            {
                type: "CardHeader",
                startElement: pusherElement,
                title: input.pusher ? input.pusher.login : "Unknown Pusher",
                description: input.url,
                endElement: {
                    type: "Chip",
                    label: input.status,
                    color: chipColor,
                    variant: "filled",
                    size: "small",
                },
            },
            // Content: a data list of build details
            {
                type: "CardContent",
                childrenProps: {
                    type: "DataList",
                    childrenProps: details,
                },
            },
            // Footer: a button to view the build URL
            {
                type: "CardFooter",
                childrenProps: {
                    type: "Button",
                    label: "View Build",
                    variant: "contained",
                    color: "primary",
                    href: input.url,
                    startElement: {
                        type: "Icon",
                        id: "link",
                        color: "blue",
                        size: 16,
                    },
                },
            },
        ],
    };
    return card;
}
//# sourceMappingURL=818.js.map
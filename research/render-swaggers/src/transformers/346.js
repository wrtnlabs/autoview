export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Helper: format ISO date string to a human-readable date
    const formatDate = (iso) => {
        if (!iso)
            return "";
        const date = new Date(iso);
        // Fallback to ISO if invalid date
        return isNaN(date.getTime()) ? iso : date.toLocaleString();
    };
    // Build a list of DataListItemProps to show key pieces of gist data
    const listItems = [];
    // Owner information (if present)
    if (input.owner && typeof input.owner === "object") {
        listItems.push({
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Owner",
                variant: "subtitle2",
            },
            value: {
                type: "Avatar",
                // using the avatar_url and login name
                src: input.owner.avatar_url,
                name: input.owner.login,
                size: 32,
                variant: "primary",
            },
        });
    }
    // Gist description rendered as Markdown for better text handling
    if (input.description != null) {
        listItems.push({
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Description",
                variant: "subtitle2",
            },
            value: {
                type: "Markdown",
                content: input.description || "_No description_",
            },
        });
    }
    // Number of files in the gist
    const fileCount = input.files ? Object.keys(input.files).length : 0;
    listItems.push({
        type: "DataListItem",
        label: {
            type: "Text",
            content: "Files",
            variant: "subtitle2",
        },
        value: {
            type: "Text",
            content: `${fileCount}`,
            variant: "body2",
        },
    });
    // Number of forks
    const forksCount = Array.isArray(input.forks) ? input.forks.length : 0;
    listItems.push({
        type: "DataListItem",
        label: {
            type: "Text",
            content: "Forks",
            variant: "subtitle2",
        },
        value: {
            type: "Badge",
            count: forksCount,
            childrenProps: {
                type: "Icon",
                id: "code-branch", // fontawesome branch icon
                size: 16,
                color: "gray",
            },
            maxCount: 99,
            showZero: true,
        },
    });
    // Created at date
    if (input.created_at) {
        listItems.push({
            type: "DataListItem",
            label: [
                {
                    type: "Icon",
                    id: "calendar-alt",
                    size: 16,
                    color: "gray",
                },
                {
                    type: "Text",
                    content: "Created",
                    variant: "subtitle2",
                },
            ],
            value: {
                type: "Text",
                content: formatDate(input.created_at),
                variant: "body2",
            },
        });
    }
    // Updated at date
    if (input.updated_at) {
        listItems.push({
            type: "DataListItem",
            label: [
                {
                    type: "Icon",
                    id: "sync",
                    size: 16,
                    color: "gray",
                },
                {
                    type: "Text",
                    content: "Updated",
                    variant: "subtitle2",
                },
            ],
            value: {
                type: "Text",
                content: formatDate(input.updated_at),
                variant: "body2",
            },
        });
    }
    // Compose the main visual: a vertical card with header + content
    return {
        type: "VerticalCard",
        childrenProps: [
            {
                // Card header shows gist ID and a small owner avatar if available
                type: "CardHeader",
                title: input.id ? `Gist: ${input.id}` : "Gist",
                description: input.description ? undefined : undefined,
                startElement: input.owner && input.owner.avatar_url
                    ? {
                        type: "Avatar",
                        src: input.owner.avatar_url,
                        name: input.owner.login,
                        size: 40,
                        variant: "primary",
                    }
                    : undefined,
            },
            {
                // Card content houses the data list
                type: "CardContent",
                childrenProps: {
                    type: "DataList",
                    childrenProps: listItems,
                },
            },
        ],
    };
}
//# sourceMappingURL=346.js.map
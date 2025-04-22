export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a;
    // Build an avatar element for the gist owner, fallback to a generic user icon
    const ownerElement = input.owner
        ? {
            type: "Avatar",
            src: input.owner.avatar_url,
            name: input.owner.login,
            variant: "blue",
            size: 40,
        }
        : {
            type: "Icon",
            id: "user",
            color: "gray",
            size: 24,
        };
    // Count number of files in the gist
    const fileCount = input.files ? Object.keys(input.files).length : 0;
    // Count forks and comments, using defaults for missing values
    const forksCount = Array.isArray(input.forks) ? input.forks.length : 0;
    const commentsCount = (_a = input.comments) !== null && _a !== void 0 ? _a : 0;
    // Compose a list of key/value pairs to display gist metadata
    const dataListItems = [
        {
            type: "DataListItem",
            label: {
                type: "Text",
                variant: "subtitle2",
                content: "Files",
            },
            value: {
                type: "Text",
                variant: "body1",
                content: `${fileCount}`,
            },
        },
        {
            type: "DataListItem",
            label: {
                type: "Text",
                variant: "subtitle2",
                content: "Forks",
            },
            value: {
                type: "Badge",
                count: forksCount,
                maxCount: 99,
                showZero: true,
                dot: false,
                childrenProps: {
                    type: "Icon",
                    id: "code-branch",
                    color: "blue",
                    size: 20,
                },
            },
        },
        {
            type: "DataListItem",
            label: {
                type: "Text",
                variant: "subtitle2",
                content: "Comments",
            },
            value: {
                type: "Text",
                variant: "body1",
                content: `${commentsCount}`,
            },
        },
    ];
    // If this gist is a fork of another, show the parent gist ID as a chip
    if (input.fork_of) {
        dataListItems.push({
            type: "DataListItem",
            label: {
                type: "Text",
                variant: "subtitle2",
                content: "Forked From",
            },
            value: {
                type: "Chip",
                label: input.fork_of.id,
                variant: "outlined",
                size: "small",
            },
        });
    }
    // Wrap the metadata items in a DataList component
    const dataList = {
        type: "DataList",
        childrenProps: dataListItems,
    };
    // Header for the card: gist description or ID and creation timestamp
    const header = {
        type: "CardHeader",
        title: input.description || `Gist ${input.id}`,
        description: input.created_at
            ? new Date(input.created_at).toLocaleString()
            : undefined,
        startElement: ownerElement,
    };
    // Assemble a vertical card with header and content
    const card = {
        type: "VerticalCard",
        childrenProps: [
            header,
            {
                type: "CardContent",
                childrenProps: dataList,
            },
        ],
    };
    return card;
}
//# sourceMappingURL=354.js.map
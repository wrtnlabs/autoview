export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a;
    // Extract user information, handling the case when user is null
    const user = input.user;
    const userName = (_a = user === null || user === void 0 ? void 0 : user.login) !== null && _a !== void 0 ? _a : "Unknown user";
    const userAvatarUrl = user === null || user === void 0 ? void 0 : user.avatar_url;
    // Format dates for display in locale-sensitive format
    const createdAt = new Date(input.created_at).toLocaleString();
    const updatedAt = new Date(input.updated_at).toLocaleString();
    return {
        // Use a vertical card to stack header, content, and footer vertically
        type: "VerticalCard",
        childrenProps: [
            {
                // Card header with user avatar, name, and association
                type: "CardHeader",
                startElement: {
                    type: "Avatar",
                    src: userAvatarUrl,
                    name: userName,
                    variant: "primary",
                    size: 40,
                },
                title: userName,
                description: input.author_association,
            },
            {
                // Card content rendering the body as markdown for rich text & links
                type: "CardContent",
                childrenProps: {
                    type: "Markdown",
                    content: input.body,
                },
            },
            {
                // Card footer summarizing meta information in a data list
                type: "CardFooter",
                childrenProps: {
                    type: "DataList",
                    childrenProps: [
                        {
                            type: "DataListItem",
                            label: {
                                type: "Text",
                                content: "Created",
                                variant: "caption",
                                color: "gray",
                            },
                            value: {
                                type: "Text",
                                content: createdAt,
                                variant: "caption",
                                color: "gray",
                            },
                        },
                        {
                            type: "DataListItem",
                            label: {
                                type: "Text",
                                content: "Updated",
                                variant: "caption",
                                color: "gray",
                            },
                            value: {
                                type: "Text",
                                content: updatedAt,
                                variant: "caption",
                                color: "gray",
                            },
                        },
                        {
                            // Show the comment ID with an icon for clarity
                            type: "DataListItem",
                            label: {
                                type: "Icon",
                                id: "hashtag",
                                color: "teal",
                                size: 16,
                            },
                            value: {
                                type: "Text",
                                content: `#${input.id}`,
                                variant: "caption",
                                color: "teal",
                            },
                        },
                    ],
                },
            },
        ],
    };
}
//# sourceMappingURL=350.js.map
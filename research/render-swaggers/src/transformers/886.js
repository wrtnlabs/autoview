export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Destructure input for easier usage
    const { subscribed, ignored, reason, created_at, repository_url } = input;
    // Extract a friendly repository name (owner/repo) from the URL
    // e.g. "https://api.github.com/repos/owner/repo" -> "owner/repo"
    const segments = repository_url.split("/");
    const repoName = segments.slice(-2).join("/");
    // Build an array of DataListItemProps to display each field visually
    const items = [];
    // Show subscription status as an icon (bell = subscribed, bell-slash = unsubscribed)
    items.push({
        type: "DataListItem",
        label: [
            {
                type: "Text",
                content: "Subscribed",
            },
        ],
        value: {
            type: "Icon",
            id: subscribed ? "bell" : "bell-slash",
            color: subscribed ? "green" : "gray",
            size: 20,
        },
    });
    // Show ignored status as an icon (ban = ignored, check-circle = not ignored)
    items.push({
        type: "DataListItem",
        label: [
            {
                type: "Text",
                content: "Ignored",
            },
        ],
        value: {
            type: "Icon",
            id: ignored ? "ban" : "check-circle",
            color: ignored ? "orange" : "green",
            size: 20,
        },
    });
    // If a reason is provided, render it using markdown to allow richer text
    if (reason) {
        items.push({
            type: "DataListItem",
            label: [
                {
                    type: "Text",
                    content: "Reason",
                },
            ],
            value: {
                type: "Markdown",
                content: reason,
            },
        });
    }
    // Format the creation date into a human-readable string
    const formattedDate = new Date(created_at).toLocaleString();
    items.push({
        type: "DataListItem",
        label: [
            {
                type: "Text",
                content: "Created At",
            },
        ],
        value: {
            type: "Text",
            content: formattedDate,
        },
    });
    // Assemble the DataList component
    const dataList = {
        type: "DataList",
        childrenProps: items,
    };
    // Convert the API URL to a user-facing GitHub URL
    const browserUrl = repository_url.replace("https://api.github.com/repos", "https://github.com");
    // Build the final VerticalCard component to layout header, content, and footer
    const card = {
        type: "VerticalCard",
        childrenProps: [
            {
                type: "CardHeader",
                // Display the repository identifier
                title: repoName,
                description: "Repository Subscription Details",
                // Use a book-open icon to represent a repository
                startElement: {
                    type: "Icon",
                    id: "book-open",
                    color: "blue",
                    size: 24,
                },
            },
            {
                type: "CardContent",
                // Embed our data list inside the card content
                childrenProps: [dataList],
            },
            {
                type: "CardFooter",
                // Provide a button linking back to the repository page
                childrenProps: {
                    type: "Button",
                    label: "View Repository",
                    href: browserUrl,
                    variant: "outlined",
                    startElement: {
                        type: "Icon",
                        id: "external-link-alt",
                        color: "blue",
                        size: 16,
                    },
                },
            },
        ],
    };
    return card;
}
//# sourceMappingURL=886.js.map
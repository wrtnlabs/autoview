export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    const redir = input.redirection;
    // If there's no redirection data, show an informative message
    if (!redir) {
        return {
            type: "Text",
            content: "No redirection data available.",
            variant: "body1",
        };
    }
    // Build a list of items to display each field
    const items = [];
    // 1. Short URL: prominent button for the shortened link
    if (redir.shortUrl) {
        items.push({
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Short URL",
                variant: "subtitle1",
            },
            value: {
                type: "Button",
                label: redir.shortUrl,
                href: redir.shortUrl,
                variant: "contained",
                color: "primary",
                size: "medium",
                // icon to indicate this is a link
                startElement: {
                    type: "Icon",
                    id: "link",
                    size: 20,
                },
            },
        });
    }
    // 2. Original URL: text link button, smaller than short URL
    if (redir.originalUrl) {
        items.push({
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Original URL",
                variant: "subtitle1",
            },
            value: {
                type: "Button",
                label: redir.originalUrl,
                href: redir.originalUrl,
                variant: "text",
                size: "small",
                startElement: {
                    type: "Icon",
                    id: "external-link-alt",
                    size: 16,
                },
            },
        });
    }
    // 3. Expiration timestamp: formatted date/time
    if (redir.expireAt != null) {
        const formatted = new Date(redir.expireAt).toLocaleString();
        items.push({
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Expires At",
                variant: "subtitle1",
            },
            value: {
                type: "Text",
                content: formatted,
                variant: "body2",
            },
        });
    }
    // Card header with an overall icon and title
    const header = {
        type: "CardHeader",
        title: "Redirection Details",
        startElement: {
            type: "Icon",
            id: "link",
            size: 24,
        },
    };
    // Card content wraps a DataList of the items above
    const content = {
        type: "CardContent",
        childrenProps: {
            type: "DataList",
            childrenProps: items,
        },
    };
    // Wrap everything in a vertical card for a clean, responsive layout
    return {
        type: "VerticalCard",
        childrenProps: [header, content],
    };
}
//# sourceMappingURL=256.js.map
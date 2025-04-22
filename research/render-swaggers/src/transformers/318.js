export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a;
    // Determine if the authorization has expired
    const now = new Date();
    const expiresAt = input.expires_at ? new Date(input.expires_at) : null;
    const isExpired = expiresAt ? expiresAt < now : false;
    // Helper to render a single text field as DataListItem
    const makeTextItem = (label, value) => ({
        type: "DataListItem",
        label: { type: "Text", content: label },
        value: { type: "Text", content: value !== null && value !== void 0 ? value : "-" },
    });
    // Build the list of DataListItem props
    const dataListItems = [];
    // ID
    dataListItems.push(makeTextItem("ID", String(input.id)));
    // URL as a button link
    dataListItems.push({
        type: "DataListItem",
        label: { type: "Text", content: "URL" },
        value: {
            type: "Button",
            label: "Open",
            href: input.url,
            variant: "text",
        },
    });
    // Scopes: if null => show none; otherwise a ChipGroup
    if (input.scopes && Array.isArray(input.scopes)) {
        const chips = input.scopes.map((scope) => ({
            type: "Chip",
            label: scope,
            size: "small",
            variant: "filled",
        }));
        dataListItems.push({
            type: "DataListItem",
            label: { type: "Text", content: "Scopes" },
            value: {
                type: "ChipGroup",
                childrenProps: chips,
            },
        });
    }
    else {
        dataListItems.push(makeTextItem("Scopes", "None"));
    }
    // Token last eight characters
    dataListItems.push(makeTextItem("Token (last 8)", input.token_last_eight ? `••••${input.token_last_eight}` : null));
    // Created and updated timestamps
    dataListItems.push(makeTextItem("Created At", input.created_at));
    dataListItems.push(makeTextItem("Updated At", input.updated_at));
    // Expiration
    dataListItems.push(makeTextItem("Expires At", (_a = input.expires_at) !== null && _a !== void 0 ? _a : "Never"));
    // Fingerprint
    dataListItems.push(makeTextItem("Fingerprint", input.fingerprint));
    // Note as markdown, if provided
    if (input.note) {
        dataListItems.push({
            type: "DataListItem",
            label: { type: "Text", content: "Note" },
            value: {
                type: "Markdown",
                content: input.note,
            },
        });
    }
    // User avatar and login, if available
    if (input.user) {
        dataListItems.push({
            type: "DataListItem",
            label: { type: "Text", content: "User" },
            value: {
                type: "Avatar",
                src: input.user.avatar_url,
                name: input.user.login,
                variant: "info",
                size: 40,
            },
        });
    }
    // Installation info, if available
    if (input.installation) {
        const selection = input.installation.repository_selection === "all"
            ? "All repositories"
            : "Selected repositories";
        dataListItems.push(makeTextItem("Installation", selection));
    }
    // Compose the vertical card with header, content, and footer
    return {
        type: "VerticalCard",
        childrenProps: [
            {
                // Card header with app name and status badge
                type: "CardHeader",
                title: input.app.name,
                description: `Authorization #${input.id}`,
                startElement: {
                    type: "Icon",
                    id: "key",
                    color: "teal",
                    size: 24,
                },
                endElement: {
                    type: "Chip",
                    label: isExpired ? "Expired" : "Active",
                    color: isExpired ? "error" : "success",
                    size: "small",
                    variant: "filled",
                },
            },
            {
                // Card content with a data list of fields
                type: "CardContent",
                childrenProps: {
                    type: "DataList",
                    childrenProps: dataListItems,
                },
            },
            {
                // Card footer with a primary action
                type: "CardFooter",
                childrenProps: {
                    type: "Button",
                    label: "View Details",
                    href: input.url,
                    color: "primary",
                    variant: "contained",
                },
            },
        ],
    };
}
//# sourceMappingURL=318.js.map
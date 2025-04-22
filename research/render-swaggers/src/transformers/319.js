export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b;
    // Helper to render a text component
    const makeText = (content) => ({
        type: "Text",
        content,
    });
    // Helper to render a DataListItem with label and a single child component as value
    const makeDataListItem = (label, value) => ({
        type: "DataListItem",
        label,
        value,
    });
    // Build the list of authorization details
    const listItems = [];
    // ID
    listItems.push(makeDataListItem(makeText("ID"), makeText(input.id.toString())));
    // Scopes: render as a group of chips if any, otherwise a "None" text
    const scopesValue = Array.isArray(input.scopes) && input.scopes.length > 0
        ? {
            type: "ChipGroup",
            // Map each scope string to a filled info-colored chip
            childrenProps: input.scopes.map((scope) => ({
                type: "Chip",
                label: scope,
                variant: "filled",
                color: "info",
            })),
        }
        : makeText("None");
    listItems.push(makeDataListItem(makeText("Scopes"), scopesValue));
    // Note: free-form text, use Markdown to allow richer formatting
    const noteContent = typeof input.note === "string" && input.note.trim() !== ""
        ? input.note
        : "_No note provided_";
    listItems.push(makeDataListItem(makeText("Note"), {
        type: "Markdown",
        content: noteContent,
    }));
    // Created and Updated timestamps
    listItems.push(makeDataListItem(makeText("Created At"), makeText(input.created_at)), makeDataListItem(makeText("Updated At"), makeText(input.updated_at)));
    // Expires At: null means "Never"
    listItems.push(makeDataListItem(makeText("Expires At"), makeText((_a = input.expires_at) !== null && _a !== void 0 ? _a : "Never")));
    // Fingerprint: show or dash if missing
    listItems.push(makeDataListItem(makeText("Fingerprint"), makeText((_b = input.fingerprint) !== null && _b !== void 0 ? _b : "-")));
    // Build the DataList component
    const dataList = {
        type: "DataList",
        childrenProps: listItems,
    };
    // Optionally render the user avatar if we have user info
    const userAvatar = input.user && typeof input.user === "object"
        ? {
            type: "Avatar",
            src: input.user.avatar_url,
            name: input.user.login,
            variant: "secondary",
        }
        : undefined;
    // Footer actions: show a masked token chip and a link button to the authorization URL
    const tokenChip = {
        type: "Chip",
        label: input.token_last_eight
            ? `•••••••${input.token_last_eight}`
            : "Token hidden",
        variant: "filled",
        color: "secondary",
    };
    const manageButton = {
        type: "Button",
        label: "Manage",
        href: input.url,
        variant: "outlined",
        color: "primary",
    };
    // Compose the overall card
    const card = {
        type: "VerticalCard",
        childrenProps: [
            {
                // Header with app name, client ID, and optional user avatar
                type: "CardHeader",
                title: input.app.name,
                description: `Client ID: ${input.app.client_id}`,
                startElement: userAvatar,
            },
            {
                // Main content: the details list
                type: "CardContent",
                childrenProps: dataList,
            },
            {
                // Footer: token chip and manage button
                type: "CardFooter",
                childrenProps: [tokenChip, manageButton],
            },
        ],
    };
    return card;
}
//# sourceMappingURL=319.js.map
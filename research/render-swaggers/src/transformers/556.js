export function transform($input) {
    return visualizeData($input);
}
// Transforms a GitHub project_card into a responsive Visual AutoView card
function visualizeData(input) {
    var _a;
    // Helper: create a Text component for labels
    const labelText = (text) => ({
        type: "Text",
        content: text,
        variant: "subtitle2",
    });
    // Helper: create a Text component for values
    const valueText = (text) => ({
        type: "Text",
        content: text,
        variant: "body2",
    });
    // Build a list of DataListItem components dynamically
    const dataListItems = [];
    // Utility to push a label/value pair
    const pushItem = (label, value) => {
        dataListItems.push({
            type: "DataListItem",
            label,
            value,
        });
    };
    // Card ID
    pushItem(labelText("Card ID"), valueText(input.id.toString()));
    // Node ID
    pushItem(labelText("Node ID"), valueText(input.node_id));
    // Creator avatar
    if (input.creator) {
        const creatorAvatar = {
            type: "Avatar",
            src: input.creator.avatar_url,
            name: input.creator.login,
        };
        pushItem(labelText("Creator"), creatorAvatar);
    }
    // Creation & update timestamps (localized)
    pushItem(labelText("Created At"), valueText(new Date(input.created_at).toLocaleString()));
    pushItem(labelText("Updated At"), valueText(new Date(input.updated_at).toLocaleString()));
    // Column name, if present
    if (input.column_name) {
        pushItem(labelText("Column"), valueText(input.column_name));
    }
    // Project URL button
    pushItem(labelText("Project Link"), {
        type: "Button",
        label: "Open",
        href: input.project_url,
        variant: "text",
        size: "small",
        color: "primary",
    });
    // Content URL button, if present
    if (input.content_url) {
        pushItem(labelText("Content Link"), {
            type: "Button",
            label: "View Content",
            href: input.content_url,
            variant: "text",
            size: "small",
            color: "primary",
        });
    }
    // Archived status chip
    if (input.archived !== undefined) {
        pushItem(labelText("Archived"), {
            type: "Chip",
            label: input.archived ? "Yes" : "No",
            color: input.archived ? "error" : "success",
            variant: "outlined",
        });
    }
    // Footer call-to-action button
    const footerButton = {
        type: "Button",
        label: "View Details",
        href: input.url,
        variant: "contained",
        color: "primary",
    };
    // Compose the VerticalCard with header, content, and footer
    return {
        type: "VerticalCard",
        childrenProps: [
            // Header with optional note or fallback title, and creator avatar
            {
                type: "CardHeader",
                title: (_a = input.note) !== null && _a !== void 0 ? _a : `Card #${input.id}`,
                description: input.column_name,
                startElement: input.creator
                    ? {
                        type: "Avatar",
                        src: input.creator.avatar_url,
                        name: input.creator.login,
                    }
                    : undefined,
            },
            // Content containing a DataList of all key/value fields
            {
                type: "CardContent",
                childrenProps: {
                    type: "DataList",
                    childrenProps: dataListItems,
                },
            },
            // Footer with a primary action button
            {
                type: "CardFooter",
                childrenProps: footerButton,
            },
        ],
    };
}
//# sourceMappingURL=556.js.map
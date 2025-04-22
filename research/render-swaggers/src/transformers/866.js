export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b;
    // Format the update timestamp into a human-friendly string.
    const updatedDate = new Date(input.updated_at);
    const formattedDate = updatedDate.toLocaleString([], {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
    // Safely extract actor details, falling back to placeholders if missing.
    const actorId = input.actor.id != null ? String(input.actor.id) : "N/A";
    const actorType = (_a = input.actor.type) !== null && _a !== void 0 ? _a : "Unknown";
    // Build a DataListItem for the actor ID.
    const actorIdItem = {
        type: "DataListItem",
        label: {
            type: "Text",
            variant: "body2",
            content: "Actor ID",
        },
        value: {
            type: "Text",
            variant: "body2",
            content: actorId,
        },
    };
    // Build a DataListItem for the actor type.
    const actorTypeItem = {
        type: "DataListItem",
        label: {
            type: "Text",
            variant: "body2",
            content: "Actor Type",
        },
        value: {
            type: "Text",
            variant: "body2",
            content: actorType,
        },
    };
    // Serialize the state object; if empty, note that explicitly.
    const stateKeys = Object.keys((_b = input.state) !== null && _b !== void 0 ? _b : {});
    const stateContent = stateKeys.length > 0
        ? JSON.stringify(input.state, null, 2)
        : "{}";
    // Render the state as a JSON code block via Markdown for readability.
    const stateItem = {
        type: "DataListItem",
        label: {
            type: "Text",
            variant: "body2",
            content: "State",
        },
        value: {
            type: "Markdown",
            content: "json\n" + stateContent + "\n```",
        },
    };
    // Compose the DataList containing actor and state details.
    const detailsList = {
        type: "DataList",
        childrenProps: [actorIdItem, actorTypeItem, stateItem],
    };
    // Compose the card header with an avatar and a clock icon.
    const header = {
        type: "CardHeader",
        title: `Version ${input.version_id}`,
        description: `Updated: ${formattedDate}`,
        // Show a placeholder avatar with the actor type initial.
        startElement: {
            type: "Avatar",
            name: actorType,
            variant: "info",
            size: 32,
        },
        // Show a clock icon next to the update time.
        endElement: {
            type: "Icon",
            id: "clock",
            color: "gray",
            size: 16,
        },
    };
    // Wrap the details list inside a CardContent.
    const content = {
        type: "CardContent",
        childrenProps: detailsList,
    };
    // Return a vertical card combining header and content for a clean, responsive layout.
    return {
        type: "VerticalCard",
        childrenProps: [header, content],
    };
}
//# sourceMappingURL=866.js.map
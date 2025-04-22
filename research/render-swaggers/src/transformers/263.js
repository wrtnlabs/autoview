export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b;
    // If there's no meaningful data, display a simple markdown notice
    const hasData = input.user ||
        input.userChat ||
        input.session ||
        (input.chatTags && input.chatTags.length > 0) ||
        input.message ||
        input.campaign ||
        input.oneTimeMsg;
    if (!hasData) {
        return {
            type: "Markdown",
            content: "No data available."
        };
    }
    // Helper: create a simple text element
    const createText = (text, variant = "body2") => ({
        type: "Text",
        content: text,
        variant
    });
    // Helper: map backend tag color variants to AutoView chip colors
    const mapTagColor = (variant) => {
        switch (variant) {
            case "red":
                return "red";
            case "orange":
                return "orange";
            case "yellow":
                return "yellow";
            case "olive":
                return "lime";
            case "green":
                return "green";
            case "cobalt":
                return "blue";
            case "purple":
                return "violet";
            case "pink":
                return "pink";
            case "navy":
                return "indigo";
            default:
                return "gray";
        }
    };
    // Build a list of DataListItems for the details pane
    const items = [];
    // 1. User section: avatar + name
    if (input.user) {
        items.push({
            type: "DataListItem",
            label: createText("User"),
            value: [
                {
                    type: "Avatar",
                    src: input.user.avatarUrl,
                    name: input.user.name,
                    size: 40
                },
                createText(input.user.name || "Unknown", "body1")
            ]
        });
    }
    // 2. Session ID
    if (input.session && input.session.id) {
        items.push({
            type: "DataListItem",
            label: createText("Session"),
            value: createText(input.session.id, "body2")
        });
    }
    // 3. Chat Tags as chips
    if (input.chatTags && input.chatTags.length > 0) {
        const chips = input.chatTags.map((tag) => ({
            type: "Chip",
            label: tag.name,
            color: mapTagColor(tag.colorVariant),
            size: "small",
            variant: "filled"
        }));
        items.push({
            type: "DataListItem",
            label: createText("Tags"),
            value: {
                type: "ChipGroup",
                childrenProps: chips,
                maxItems: 5
            }
        });
    }
    // 4. Last message content (as markdown for richer formatting)
    if (input.message && input.message.plainText) {
        // Prefix with > to indicate blockquote style
        const quoted = input.message.plainText
            .split("\n")
            .map((line) => `> ${line}`)
            .join("\n");
        items.push({
            type: "DataListItem",
            label: createText("Last Message"),
            value: {
                type: "Markdown",
                content: quoted
            }
        });
    }
    // 5. Campaign info
    if (input.campaign) {
        const name = input.campaign.name;
        const state = input.campaign.state || "unknown";
        items.push({
            type: "DataListItem",
            label: createText("Campaign"),
            value: createText(`${name} (${state})`)
        });
    }
    // 6. One-Time Message info
    if (input.oneTimeMsg) {
        const msgName = input.oneTimeMsg.name;
        const msgState = input.oneTimeMsg.state;
        items.push({
            type: "DataListItem",
            label: createText("One-Time Msg"),
            value: createText(`${msgName} [${msgState}]`)
        });
    }
    // Wrap all items into a DataList component
    const dataList = {
        type: "DataList",
        childrenProps: items
    };
    // Build the card header: show chat title, description, avatar and online status
    const header = {
        type: "CardHeader",
        title: ((_a = input.userChat) === null || _a === void 0 ? void 0 : _a.title) || "Chat View",
        description: (_b = input.userChat) === null || _b === void 0 ? void 0 : _b.description,
        startElement: input.user
            ? {
                type: "Avatar",
                src: input.user.avatarUrl,
                name: input.user.name
            }
            : undefined,
        endElement: {
            // small status dot: green if online info present, gray otherwise
            type: "Icon",
            id: "circle",
            color: input.userOnline ? "green" : "gray",
            size: 12
        }
    };
    // Compose the content section containing all data in a list
    const content = {
        type: "CardContent",
        childrenProps: dataList
    };
    // Finally, return a vertical card with header and content
    return {
        type: "VerticalCard",
        childrenProps: [header, content]
    };
}
//# sourceMappingURL=263.js.map
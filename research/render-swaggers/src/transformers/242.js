export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Helper to turn blocks into a single markdown string
    function flattenBlocks(blocks) {
        return blocks
            .map((block) => {
            switch (block.type) {
                case "code":
                    // Render code fences
                    return [
                        "" + (block.language || ""),
                        block.value || "",
                        "```",
                    ].join("\n");
                case "bullets":
                    // Render each sub-block as a bullet point
                    if (block.blocks) {
                        return block.blocks
                            .map((sub) => "- " + (sub.value || ""))
                            .join("\n");
                    }
                    return "";
                case "text":
                default:
                    // Plain text
                    return block.value || "";
            }
        })
            .filter((segment) => segment.length > 0)
            .join("\n\n");
    }
    // If there are no messages, show a placeholder text
    if (!input.messages || input.messages.length === 0) {
        return {
            type: "Text",
            content: "No messages in this thread.",
        };
    }
    // Map each message to a DataListItem
    const items = input.messages.map((msg) => {
        // Determine an avatar variant by person type
        const isBot = msg.personType === "bot";
        const avatar = {
            type: "Avatar",
            name: msg.personType.charAt(0).toUpperCase(),
            variant: isBot ? "violet" : "blue",
            size: 28,
        };
        // Format timestamp
        const date = new Date(msg.createdAt);
        const timeLabel = date.toLocaleTimeString([], { hour12: false });
        // Compose the label: avatar + name + time
        const labelComponents = [
            avatar,
            {
                type: "Text",
                content: [` ${msg.personType} • ${timeLabel}`],
            },
        ];
        // Determine the message body
        let bodyMarkdown = "";
        if (msg.plainText) {
            // Prefer plainText if available
            bodyMarkdown = msg.plainText;
        }
        else if (msg.blocks) {
            // Otherwise flatten structured blocks
            bodyMarkdown = flattenBlocks(msg.blocks);
        }
        const valueComponents = [];
        if (bodyMarkdown.trim().length > 0) {
            valueComponents.push({
                type: "Markdown",
                content: bodyMarkdown,
            });
        }
        else {
            // Fallback if there's no body
            valueComponents.push({
                type: "Text",
                content: "[No content]",
            });
        }
        return {
            type: "DataListItem",
            label: labelComponents,
            value: valueComponents,
        };
    });
    // Return a DataList containing all message items
    return {
        type: "DataList",
        childrenProps: items,
    };
}
//# sourceMappingURL=242.js.map
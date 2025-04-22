export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Derive a human-readable writer display
    const writerDisplay = (() => {
        if (typeof input.writer === "string")
            return input.writer;
        // Try common name or username property
        const maybeName = input.writer.name || input.writer.username;
        if (typeof maybeName === "string" && maybeName.length > 0)
            return maybeName;
        // Fallback to JSON representation (truncated)
        try {
            const json = JSON.stringify(input.writer);
            return json.length > 20 ? json.slice(0, 17) + "..." : json;
        }
        catch (_a) {
            return "Unknown";
        }
    })();
    // Build the CardHeader: shows writer avatar, name, ID and creation time
    const header = {
        type: "CardHeader",
        // Use an avatar with writerDisplay initials
        startElement: {
            type: "Avatar",
            name: writerDisplay,
        },
        // Title is writer name or fallback
        title: writerDisplay,
        // Secondary text is the comment ID
        description: `Comment ID: ${input.id}`,
        // Show the creation timestamp on the right
        endElement: {
            type: "Text",
            variant: "caption",
            content: input.created_at,
        },
    };
    // Prepare snapshot list items
    const snapshotItems = input.snapshots.map(snapshot => {
        // Build markdown for attachments if any
        let attachmentsSection = "";
        if (Array.isArray(snapshot.files) && snapshot.files.length > 0) {
            attachmentsSection =
                "\n\n**Attachments**:\n" +
                    snapshot.files
                        .map(file => {
                        const filename = file.name && file.extension
                            ? `${file.name}.${file.extension}`
                            : file.name || file.extension
                                ? file.name + file.extension
                                : "file";
                        return `- [${filename}](${file.url})`;
                    })
                        .join("\n");
        }
        // Combine body and attachments into one markdown string
        const markdownContent = snapshot.body + attachmentsSection;
        return {
            type: "DataListItem",
            // Show the snapshot timestamp in the label
            label: [
                {
                    type: "Text",
                    variant: "subtitle2",
                    content: snapshot.created_at,
                },
            ],
            // Render the markdown of the snapshot content
            value: [
                {
                    type: "Markdown",
                    content: markdownContent,
                },
            ],
        };
    });
    // If there are no snapshots, show a placeholder message
    const contentChildren = [];
    if (input.parent_id) {
        // Indicate this is a reply comment
        contentChildren.push({
            type: "Chip",
            label: `Reply to: ${input.parent_id}`,
            color: "info",
            variant: "outlined",
        });
    }
    if (snapshotItems.length > 0) {
        contentChildren.push({
            type: "DataList",
            childrenProps: snapshotItems,
        });
    }
    else {
        contentChildren.push({
            type: "Text",
            variant: "body2",
            content: "No snapshots available.",
        });
    }
    // Compose the VerticalCard with header and content
    const cardContent = {
        type: "CardContent",
        childrenProps: contentChildren,
    };
    return {
        type: "VerticalCard",
        childrenProps: [header, cardContent],
    };
}
//# sourceMappingURL=23.js.map
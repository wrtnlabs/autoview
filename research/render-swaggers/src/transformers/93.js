export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Pick the most recent snapshot (last in the array)
    const lastSnapshot = Array.isArray(input.snapshots) && input.snapshots.length > 0
        ? input.snapshots[input.snapshots.length - 1]
        : undefined;
    // Fallback title and body if snapshots are missing
    const title = (lastSnapshot === null || lastSnapshot === void 0 ? void 0 : lastSnapshot.title) || "No Title";
    const bodyContent = (lastSnapshot === null || lastSnapshot === void 0 ? void 0 : lastSnapshot.body) || "_No content available_";
    // Format creation timestamp for display
    const formattedCreatedAt = (() => {
        try {
            return new Date(input.created_at).toLocaleString();
        }
        catch (_a) {
            return input.created_at;
        }
    })();
    // Build the card header, showing user icon, title, creation time, and secret/public chip
    const header = {
        type: "CardHeader",
        title,
        description: `Asked: ${formattedCreatedAt}`,
        startElement: {
            type: "Icon",
            id: "user",
            color: "blue",
            size: 24,
        },
        endElement: {
            type: "Chip",
            label: input.secret ? "Secret" : "Public",
            color: input.secret ? "error" : "success",
            size: "small",
            variant: "outlined",
        },
    };
    // Build the main content: markdown of the question body
    const contentChildren = [
        {
            type: "Markdown",
            content: bodyContent,
        },
    ];
    // If there are attached files in the snapshot, list them with download buttons
    if (lastSnapshot && Array.isArray(lastSnapshot.files) && lastSnapshot.files.length > 0) {
        const attachmentsList = {
            type: "DataList",
            childrenProps: lastSnapshot.files.map((file) => {
                // Construct filename with extension if present
                const filename = file.extension
                    ? `${file.name}.${file.extension}`
                    : file.name || "(no name)";
                return {
                    type: "DataListItem",
                    label: {
                        type: "Text",
                        content: filename,
                    },
                    value: {
                        type: "Button",
                        label: "Download",
                        variant: "outlined",
                        size: "small",
                        color: "primary",
                        href: file.url,
                    },
                };
            }),
        };
        contentChildren.push(attachmentsList);
    }
    const content = {
        type: "CardContent",
        childrenProps: contentChildren,
    };
    // Build footer if an answer exists
    const footerChildren = [];
    if (input.answer != null) {
        footerChildren.push({
            type: "Chip",
            label: "Answered",
            color: "success",
            size: "small",
            variant: "filled",
        });
        // Render the answer as markdown for rich formatting
        footerChildren.push({
            type: "Markdown",
            content: String(input.answer),
        });
    }
    else {
        // Indicate unread or unanswered
        footerChildren.push({
            type: "Chip",
            label: input.read_by_seller ? "Viewed by Seller" : "Unviewed",
            color: input.read_by_seller ? "info" : "warning",
            size: "small",
            variant: "outlined",
        });
    }
    const footer = {
        type: "CardFooter",
        childrenProps: footerChildren,
    };
    // Compose the vertical card with header, content, and footer
    const card = {
        type: "VerticalCard",
        childrenProps: [header, content, footer],
    };
    return card;
}
//# sourceMappingURL=93.js.map
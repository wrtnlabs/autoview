export function transform($input) {
    return visualizeData($input);
}
// Transforms a GitHub page_build object into an AutoView data list for visual presentation.
function visualizeData(input) {
    var _a;
    // Aggregate list items
    const items = [];
    // 1. URL: clickable link with a link icon
    items.push({
        type: "DataListItem",
        label: { type: "Text", content: "URL", variant: "subtitle2" },
        value: {
            type: "Button",
            variant: "text",
            color: "primary",
            size: "small",
            href: input.url,
            startElement: { type: "Icon", id: "link", size: 16, color: "blue" },
            label: input.url
        }
    });
    // 2. Status: colored chip based on status string
    const statusColor = (() => {
        switch (input.status.toLowerCase()) {
            case "success":
                return "success";
            case "failure":
            case "error":
                return "error";
            case "pending":
            case "in_progress":
                return "warning";
            default:
                return "secondary";
        }
    })();
    items.push({
        type: "DataListItem",
        label: { type: "Text", content: "Status", variant: "subtitle2" },
        value: {
            type: "Chip",
            variant: "filled",
            color: statusColor,
            size: "small",
            label: input.status
        }
    });
    // 3. Error message (if any): red chip
    if ((_a = input.error) === null || _a === void 0 ? void 0 : _a.message) {
        items.push({
            type: "DataListItem",
            label: { type: "Text", content: "Error", variant: "subtitle2", color: "error" },
            value: {
                type: "Chip",
                variant: "filled",
                color: "error",
                size: "small",
                label: input.error.message
            }
        });
    }
    // 4. Pusher: avatar + username
    if (input.pusher) {
        const { avatar_url, login, name } = input.pusher;
        items.push({
            type: "DataListItem",
            label: { type: "Text", content: "Pusher", variant: "subtitle2" },
            // Render as an array: avatar + text
            value: [
                { type: "Avatar", src: avatar_url, name: name !== null && name !== void 0 ? name : login, size: 32, variant: "primary" },
                { type: "Text", content: login, variant: "body2" }
            ]
        });
    }
    // 5. Commit SHA: monospace-like text
    items.push({
        type: "DataListItem",
        label: { type: "Text", content: "Commit", variant: "subtitle2" },
        value: {
            type: "Text",
            content: input.commit,
            variant: "body2",
            color: "gray"
        }
    });
    // 6. Duration: display in ms or seconds
    const durationLabel = input.duration >= 1000
        ? `${(input.duration / 1000).toFixed(2)} s`
        : `${input.duration} ms`;
    items.push({
        type: "DataListItem",
        label: { type: "Text", content: "Duration", variant: "subtitle2" },
        value: { type: "Text", content: durationLabel, variant: "body2" }
    });
    // 7. Created at: formatted datetime
    const createdAt = new Date(input.created_at).toLocaleString();
    items.push({
        type: "DataListItem",
        label: { type: "Text", content: "Created At", variant: "subtitle2" },
        value: { type: "Text", content: createdAt, variant: "body2", color: "gray" }
    });
    // 8. Updated at: formatted datetime
    const updatedAt = new Date(input.updated_at).toLocaleString();
    items.push({
        type: "DataListItem",
        label: { type: "Text", content: "Updated At", variant: "subtitle2" },
        value: { type: "Text", content: updatedAt, variant: "body2", color: "gray" }
    });
    // Return as a responsive data list
    return {
        type: "DataList",
        childrenProps: items
    };
}
//# sourceMappingURL=817.js.map
export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Sort builds by newest first for better UX
    const sortedBuilds = [...input].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    // Map each build record to a ListItem component
    const items = sortedBuilds.map((build) => {
        // Prepare an avatar for the pusher if available
        const avatarProps = build.pusher
            ? {
                type: "Avatar",
                src: build.pusher.avatar_url,
                name: build.pusher.login,
                size: 32, // compact size for list
                variant: "primary",
            }
            : undefined;
        // Derive a chip color from the status string
        const status = build.status.toLowerCase();
        let chipColor = "secondary";
        switch (status) {
            case "success":
                chipColor = "success";
                break;
            case "failure":
            case "error":
                chipColor = "error";
                break;
            case "cancelled":
                chipColor = "warning";
                break;
        }
        // Chip showing build status
        const statusChip = {
            type: "Chip",
            label: build.status,
            color: chipColor,
            variant: "outlined",
            size: "small",
        };
        // Human-readable timestamp
        const timestamp = new Date(build.created_at).toLocaleString();
        const dateText = {
            type: "Text",
            content: timestamp,
            variant: "caption",
            color: "gray",
        };
        // Button to open the build URL in a new tab
        const openButton = {
            type: "Button",
            label: "Open",
            href: build.url,
            variant: "text",
            size: "small",
        };
        // Compose the list item
        return {
            type: "ListItem",
            href: build.url,
            startElement: avatarProps,
            title: build.commit.slice(0, 7), // short SHA for brevity
            description: build.error.message
                ? `Error: ${build.error.message}`
                : `Duration: ${build.duration}s`,
            endElement: [statusChip, dateText, openButton],
        };
    });
    // Return the complete List component
    return {
        type: "List",
        childrenProps: items,
    };
}
//# sourceMappingURL=815.js.map
export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Helper: convert bytes to human-readable string
    function humanFileSize(bytes) {
        const thresh = 1024;
        if (Math.abs(bytes) < thresh) {
            return bytes + ' B';
        }
        const units = ['KB', 'MB', 'GB', 'TB'];
        let u = -1;
        let value = bytes;
        do {
            value /= thresh;
            u++;
        } while (Math.abs(value) >= thresh && u < units.length - 1);
        return value.toFixed(1) + ' ' + units[u];
    }
    // If no data, show a friendly markdown message
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "### No CodeQL databases available.\n\nThere are no databases to display at this time."
        };
    }
    // Sort databases by creation date (newest first)
    const sorted = [...input].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    // Map each database to a ListItem component
    const children = sorted.map(db => {
        // Truncate commit SHA if present
        const commitSha = db.commit_oid ? db.commit_oid.substring(0, 7) : null;
        // Build endElement array: content type chip, commit chip (if any), download button
        const endElements = [];
        // Content type chip
        endElements.push({
            type: "Chip",
            label: db.content_type,
            size: "small",
            variant: "outlined"
        });
        // Commit SHA chip
        if (commitSha) {
            endElements.push({
                type: "Chip",
                label: `\u{1F5D3} ${commitSha}`, // calendar icon unicode as leading indicator
                size: "small",
                variant: "outlined",
                color: "primary"
            });
        }
        // Download button with download icon
        endElements.push({
            type: "Button",
            label: "Download",
            href: db.url,
            variant: "text",
            size: "small",
            startElement: {
                type: "Icon",
                id: "download",
                color: "blue",
                size: 16
            }
        });
        return {
            type: "ListItem",
            title: db.name,
            description: `Language: ${db.language} | Size: ${humanFileSize(db.size)}`,
            // Uploader avatar as leading element
            startElement: {
                type: "Avatar",
                src: db.uploader.avatar_url,
                name: db.uploader.login,
                variant: "info",
                size: 40
            },
            endElement: endElements
        };
    });
    // Compose and return the List component
    return {
        type: "List",
        childrenProps: children
    };
}
//# sourceMappingURL=676.js.map
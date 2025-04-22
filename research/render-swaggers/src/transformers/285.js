export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    const comments = input.data.list;
    // If no comments, show a friendly markdown message
    if (!comments || comments.length === 0) {
        return {
            type: "Markdown",
            content: "**No comments available.**"
        };
    }
    // Helper to safely format dates
    const formatDate = (raw) => {
        try {
            const d = new Date(raw);
            if (isNaN(d.getTime()))
                throw new Error("Invalid date");
            return d.toLocaleString();
        }
        catch (_a) {
            // Fall back to raw string if parsing fails
            return String(raw);
        }
    };
    // Build DataListItemProps for each comment
    const items = comments.map((comment) => {
        var _a;
        const { writer, contents, createdAt, xPosition, yPosition } = comment;
        // Avatar for the commenter, will show initials if profileImage is missing
        const avatar = {
            type: "Avatar",
            src: (_a = writer.profileImage) !== null && _a !== void 0 ? _a : undefined,
            name: writer.nickname,
            variant: "primary",
            size: 32
        };
        // Main comment text as markdown (supports richer formatting)
        const commentMarkdown = {
            type: "Markdown",
            content: contents
        };
        // Timestamp text in a caption style
        const timestampText = {
            type: "Text",
            variant: "caption",
            content: formatDate(createdAt)
        };
        // If coordinates exist, show them as chips for quick visual scanning
        const coordinateChips = [];
        if (xPosition != null) {
            coordinateChips.push({
                type: "Chip",
                label: `x: ${xPosition}`,
                color: "info",
                variant: "outlined",
                size: "small"
            });
        }
        if (yPosition != null) {
            coordinateChips.push({
                type: "Chip",
                label: `y: ${yPosition}`,
                color: "info",
                variant: "outlined",
                size: "small"
            });
        }
        const coordinateGroup = coordinateChips.length > 0
            ? {
                type: "ChipGroup",
                childrenProps: coordinateChips
            }
            : undefined;
        // Assemble the DataListItem: label shows avatar + name, value shows content, timestamp, and optional coords
        const labelComponents = [
            avatar,
            {
                type: "Text",
                variant: "subtitle2",
                content: writer.nickname
            }
        ];
        const valueComponents = [
            commentMarkdown,
            timestampText
        ];
        if (coordinateGroup) {
            valueComponents.push(coordinateGroup);
        }
        return {
            type: "DataListItem",
            label: labelComponents,
            value: valueComponents
        };
    });
    // Wrap all items in a DataList for a clean, responsive list layout
    const dataList = {
        type: "DataList",
        childrenProps: items
    };
    return dataList;
}
//# sourceMappingURL=285.js.map
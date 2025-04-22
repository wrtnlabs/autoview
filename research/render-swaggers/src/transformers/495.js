export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Helper to format ISO datetime strings to a user-friendly string.
    const formatDate = (iso) => iso ? new Date(iso).toLocaleString() : "Never";
    // Build a DataListItem for simple label/value pairs.
    const buildDetailItem = (labelText, value) => ({
        type: "DataListItem",
        label: {
            type: "Text",
            variant: "body2",
            content: labelText,
        },
        value: typeof value === "string"
            ? { type: "Text", variant: "body2", content: value }
            : value,
    });
    // Transform each request into a VerticalCard.
    const cards = input.map((req) => {
        const { owner, reason, repository_selection, repositories_url, created_at, id, token_name, token_id, token_expired, token_expires_at, token_last_used_at, permissions, } = req;
        // Card header: owner's avatar, login, and creation date.
        const header = {
            type: "CardHeader",
            title: owner.login,
            description: new Date(created_at).toLocaleDateString(),
            startElement: {
                type: "Avatar",
                src: owner.avatar_url,
                name: owner.login,
                variant: "primary",
                size: 32,
            },
        };
        // Assemble the content of the card.
        const contentChildren = [];
        // 1) Reason section via Markdown for rich text.
        contentChildren.push({
            type: "Markdown",
            content: reason
                ? `**Reason for Access**\n\n${reason}`
                : "**Reason for Access**\n\n_None provided_",
        });
        // 2) Divider
        contentChildren.push({
            type: "Divider",
            orientation: "horizontal",
            color: "#CCCCCC",
        });
        // 3) Permissions broken out into colored chips.
        contentChildren.push({
            type: "Text",
            variant: "subtitle2",
            content: "Permissions",
        });
        const permissionChips = [];
        // Organization-level permissions
        if (permissions.organization) {
            for (const key in permissions.organization) {
                permissionChips.push({
                    type: "Chip",
                    label: `${key}: ${permissions.organization[key]}`,
                    color: "teal",
                    size: "small",
                    variant: "filled",
                });
            }
        }
        // Repository-level permissions
        if (permissions.repository) {
            for (const key in permissions.repository) {
                permissionChips.push({
                    type: "Chip",
                    label: `${key}: ${permissions.repository[key]}`,
                    color: "cyan",
                    size: "small",
                    variant: "filled",
                });
            }
        }
        // Other permissions
        if (permissions.other) {
            for (const key in permissions.other) {
                permissionChips.push({
                    type: "Chip",
                    label: `${key}: ${permissions.other[key]}`,
                    color: "gray",
                    size: "small",
                    variant: "filled",
                });
            }
        }
        contentChildren.push({
            type: "ChipGroup",
            childrenProps: permissionChips,
            maxItems: 8,
        });
        // 4) Divider
        contentChildren.push({
            type: "Divider",
            orientation: "horizontal",
            color: "#CCCCCC",
        });
        // 5) Detailed fields using a DataList.
        const detailItems = [];
        detailItems.push(buildDetailItem("Request ID", id.toString()), buildDetailItem("Repository Selection", repository_selection), buildDetailItem("Repositories List", {
            type: "Button",
            variant: "text",
            color: "primary",
            size: "small",
            label: "View Repositories",
            href: repositories_url,
        }), buildDetailItem("Token Name", token_name), buildDetailItem("Token ID", token_id.toString()), buildDetailItem("Expires At", formatDate(token_expires_at)), buildDetailItem("Last Used At", formatDate(token_last_used_at)), buildDetailItem("Token Expired", token_expired ? "Yes" : "No"));
        contentChildren.push({
            type: "DataList",
            childrenProps: detailItems,
        });
        // Wrap the content in CardContent.
        const content = {
            type: "CardContent",
            childrenProps: contentChildren,
        };
        return {
            type: "VerticalCard",
            childrenProps: [header, content],
        };
    });
    // If only one card, return it directly; otherwise wrap in a carousel.
    if (cards.length === 1) {
        return cards[0];
    }
    return {
        type: "Carousel",
        infinite: true,
        navControls: true,
        indicators: true,
        childrenProps: cards,
    };
}
//# sourceMappingURL=495.js.map
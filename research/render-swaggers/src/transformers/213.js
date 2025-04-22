export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there's no user data, show a friendly markdown message.
    if (!input.user) {
        return {
            type: "Markdown",
            content: "## No user data available\nPlease check back later or verify the user ID."
        };
    }
    const user = input.user;
    // Determine online status
    const isOnline = Boolean(input.online && input.online.id);
    // --- Card Header ---
    const header = {
        type: "CardHeader",
        // Use avatar if available, otherwise fallback to initials
        startElement: {
            type: "Avatar",
            src: user.avatarUrl,
            name: user.name,
            variant: "primary",
            size: 40
        },
        title: user.name || "Unknown User",
        description: (user.city && user.country)
            ? `${user.city}, ${user.country}`
            : user.country || user.city || undefined,
        // Show a colored chip for online/offline status
        endElement: {
            type: "Chip",
            label: isOnline ? "Online" : "Offline",
            color: isOnline ? "success" : "gray",
            size: "small",
            variant: "filled"
        }
    };
    // --- Data List Items ---
    const items = [];
    // Email
    if (user.email) {
        items.push({
            type: "DataListItem",
            label: {
                type: "Icon",
                id: "envelope",
                size: 16,
                color: "gray"
            },
            value: {
                type: "Text",
                content: user.email
            }
        });
    }
    // Location (city, country)
    if (user.city || user.country) {
        const location = [user.city, user.country].filter(Boolean).join(", ");
        items.push({
            type: "DataListItem",
            label: {
                type: "Icon",
                id: "map-marker-alt",
                size: 16,
                color: "gray"
            },
            value: {
                type: "Text",
                content: location
            }
        });
    }
    // Sessions count
    if (typeof user.sessionsCount === "number") {
        items.push({
            type: "DataListItem",
            label: {
                type: "Icon",
                id: "users",
                size: 16,
                color: "gray"
            },
            value: {
                type: "Text",
                content: user.sessionsCount.toString()
            }
        });
    }
    // Last seen
    if (typeof user.lastSeenAt === "number") {
        items.push({
            type: "DataListItem",
            label: {
                type: "Icon",
                id: "clock",
                size: 16,
                color: "gray"
            },
            value: {
                type: "Text",
                content: new Date(user.lastSeenAt).toLocaleString()
            }
        });
    }
    // Account creation
    if (typeof user.createdAt === "number") {
        items.push({
            type: "DataListItem",
            label: {
                type: "Icon",
                id: "calendar-plus",
                size: 16,
                color: "gray"
            },
            value: {
                type: "Text",
                content: new Date(user.createdAt).toLocaleDateString()
            }
        });
    }
    // --- Card Content with DataList ---
    const cardContent = {
        type: "CardContent",
        childrenProps: {
            type: "DataList",
            childrenProps: items
        }
    };
    // --- Tags as Chip Group in Footer ---
    let cardFooter;
    if (Array.isArray(user.tags) && user.tags.length > 0) {
        const chipItems = user.tags.map((tag) => ({
            type: "Chip",
            label: tag,
            size: "small",
            variant: "filled",
            color: "primary"
        }));
        cardFooter = {
            type: "CardFooter",
            childrenProps: {
                type: "ChipGroup",
                childrenProps: chipItems,
                maxItems: 10
            }
        };
    }
    // Assemble the vertical card components
    const children = [header, cardContent];
    if (cardFooter) {
        children.push(cardFooter);
    }
    // Return the composed VerticalCard
    return {
        type: "VerticalCard",
        childrenProps: children
    };
}
//# sourceMappingURL=213.js.map
export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    /**
     * Safely formats an ISO date string into a localized date.
     * Falls back to the raw value on parse failure.
     */
    const formatDate = (iso) => {
        if (!iso)
            return undefined;
        const date = new Date(iso);
        return isNaN(date.getTime())
            ? iso
            : date.toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
            });
    };
    // Map each deploy key into a ListItem component
    const items = input.map((key) => {
        var _a;
        // Determine chip for verification status
        const verificationChip = {
            type: "Chip",
            label: key.verified ? "Verified" : "Unverified",
            color: key.verified ? "success" : "error",
            variant: "filled",
            size: "small",
        };
        // Determine chip for read/write status
        const accessChip = {
            type: "Chip",
            label: key.read_only ? "Read‑Only" : "Read/Write",
            color: key.read_only ? "warning" : "info",
            variant: "outlined",
            size: "small",
        };
        // Assemble description parts
        const created = formatDate(key.created_at);
        const lastUsed = formatDate(key.last_used);
        const enabledText = key.enabled === false
            ? "Disabled"
            : key.enabled === true
                ? "Enabled"
                : undefined;
        const addedBy = (_a = key.added_by) !== null && _a !== void 0 ? _a : undefined;
        const descriptionParts = [];
        if (created)
            descriptionParts.push(`Created: ${created}`);
        if (lastUsed)
            descriptionParts.push(`Last used: ${lastUsed}`);
        if (enabledText)
            descriptionParts.push(enabledText);
        if (addedBy)
            descriptionParts.push(`Added by: ${addedBy}`);
        return {
            type: "ListItem",
            title: key.title,
            description: descriptionParts.join(" | "),
            // Make the title clickable to the URL of the deploy key
            href: key.url,
            // Use a key icon to represent the SSH key visually
            startElement: {
                type: "Icon",
                id: "key",
                color: "gray",
                size: 24,
            },
            // Show verification and access chips on the right
            endElement: [verificationChip, accessChip],
        };
    });
    // Return a responsive list component containing all items
    return {
        type: "List",
        // Stick header to top on mobile for usability
        childrenProps: items,
    };
}
//# sourceMappingURL=796.js.map
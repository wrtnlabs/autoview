export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Transform an array of Schema.hook objects into a DataList of DataListItems
    const items = input.map((hook) => {
        var _a;
        // 1. Prepare a ChipGroup showing all subscribed events
        const eventChips = hook.events.map((evt) => ({
            type: "Chip",
            label: evt,
            size: "small",
            variant: "outlined",
        }));
        // 2. Prepare a list of presentation components for the "value" column
        const valueComponents = [];
        if (eventChips.length) {
            valueComponents.push({
                type: "ChipGroup",
                childrenProps: eventChips,
            });
        }
        // Format dates; fall back to raw string if invalid
        let createdLabel = hook.created_at;
        let updatedLabel = hook.updated_at;
        try {
            createdLabel = new Date(hook.created_at).toLocaleString();
            updatedLabel = new Date(hook.updated_at).toLocaleString();
        }
        catch (_b) {
            // leave raw if parsing fails
        }
        valueComponents.push({
            type: "Text",
            variant: "caption",
            // Array of two lines: created and updated
            content: [
                `Created: ${createdLabel}`,
                `Updated: ${updatedLabel}`,
            ],
        });
        // Last response info
        const resp = hook.last_response;
        if (resp !== undefined && resp !== null) {
            const status = (_a = resp.status) !== null && _a !== void 0 ? _a : "N/A";
            const code = resp.code != null ? resp.code : "-";
            valueComponents.push({
                type: "Text",
                variant: "caption",
                content: `Last response: ${status} (${code})`,
            });
        }
        // Add action buttons for URLs, only if present
        if (hook.url) {
            valueComponents.push({
                type: "Button",
                label: "View",
                size: "small",
                variant: "text",
                href: hook.url,
            });
        }
        if (hook.test_url) {
            valueComponents.push({
                type: "Button",
                label: "Test",
                size: "small",
                variant: "text",
                href: hook.test_url,
            });
        }
        if (hook.ping_url) {
            valueComponents.push({
                type: "Button",
                label: "Ping",
                size: "small",
                variant: "text",
                href: hook.ping_url,
            });
        }
        // 3. Prepare the label column: name + active/inactive icon
        const labelComponents = [
            {
                type: "Text",
                // Hook name as the primary identifier
                content: hook.name,
                variant: "body1",
            },
            {
                type: "Icon",
                id: hook.active ? "check-circle" : "times-circle",
                color: hook.active ? "green" : "red",
                size: 16,
            },
        ];
        // 4. Assemble the DataListItem
        return {
            type: "DataListItem",
            label: labelComponents,
            value: valueComponents,
        };
    });
    // 5. Return a DataList containing all hook items
    return {
        type: "DataList",
        childrenProps: items,
    };
}
//# sourceMappingURL=756.js.map
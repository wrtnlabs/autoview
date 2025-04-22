export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there are no managers, show a friendly markdown message
    if (!input.managers || input.managers.length === 0) {
        return {
            type: "Markdown",
            content: "### No managers available\n\nThere are currently no managers to display."
        };
    }
    // Map each manager into a DataListItem with rich visual elements
    const childrenProps = input.managers.map((manager) => {
        // Build the "label" column: avatar + name + optional description
        const labelComponents = [];
        // Avatar: use the URL if available, otherwise fallback to initials via `name`
        labelComponents.push({
            type: "Avatar",
            src: manager.avatarUrl,
            name: manager.name,
            variant: "primary",
            size: 40
        });
        // Manager name as a subtitle
        labelComponents.push({
            type: "Text",
            content: manager.name,
            variant: "subtitle1"
        });
        // If allowed, insert their description as markdown for better readability
        if (manager.showDescriptionToFront && manager.description) {
            labelComponents.push({
                type: "Markdown",
                content: manager.description
            });
        }
        // Build the "value" column: contact chips (email & phone)
        const valueComponents = [];
        if (manager.email && manager.showEmailToFront) {
            valueComponents.push({
                type: "Chip",
                label: manager.email,
                size: "small",
                variant: "outlined",
                color: "cyan",
                startElement: {
                    type: "Icon",
                    id: "envelope",
                    size: 12,
                    color: "gray"
                }
            });
        }
        if (manager.mobileNumber && manager.showMobileNumberToFront) {
            valueComponents.push({
                type: "Chip",
                label: manager.mobileNumber,
                size: "small",
                variant: "outlined",
                color: "teal",
                startElement: {
                    type: "Icon",
                    id: "phone",
                    size: 12,
                    color: "gray"
                }
            });
        }
        return {
            type: "DataListItem",
            // An array of components for the left column
            label: labelComponents,
            // Only include "value" if we have at least one contact chip
            value: valueComponents.length > 0 ? valueComponents : undefined
        };
    });
    // Wrap all items in a responsive two-column data list
    return {
        type: "DataList",
        childrenProps
    };
}
//# sourceMappingURL=247.js.map
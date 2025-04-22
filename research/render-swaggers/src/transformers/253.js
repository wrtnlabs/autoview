export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a;
    // Extract plugins array, defaulting to empty for robustness
    const plugins = (_a = input.plugins) !== null && _a !== void 0 ? _a : [];
    // Build the main content: either a DataList when we have plugins, or a Markdown notice when empty
    const contentComponent = plugins.length > 0
        ? {
            // Render each plugin as a list item
            type: "DataList",
            childrenProps: plugins.map((plugin) => {
                var _a, _b;
                // --- Label: Plugin icon + name ---
                const labelItems = [
                    {
                        type: "Icon",
                        id: plugin.iconButton, // FontAwesome icon name in kebab-case
                        size: 20,
                        color: "blue",
                    },
                    {
                        type: "Text",
                        content: plugin.name,
                        variant: "body1",
                    },
                ];
                // --- Value: status chip, appearance chip, optional image, optional action button ---
                const valueItems = [];
                // 1. State chip (waiting/active)
                const stateLabel = (_a = plugin.state) !== null && _a !== void 0 ? _a : "unknown";
                const stateColor = stateLabel === "active"
                    ? "success"
                    : stateLabel === "waiting"
                        ? "warning"
                        : "gray";
                valueItems.push({
                    type: "Chip",
                    label: stateLabel,
                    color: stateColor,
                    size: "small",
                    variant: "outlined",
                });
                // 2. Appearance chip (light/dark/system)
                if (plugin.appearance) {
                    const appearanceColor = plugin.appearance === "light"
                        ? "yellow"
                        : plugin.appearance === "dark"
                            ? "darkGray"
                            : "info";
                    valueItems.push({
                        type: "Chip",
                        label: plugin.appearance,
                        color: appearanceColor,
                        size: "small",
                        variant: "outlined",
                    });
                }
                // 3. Custom image (if provided) to give a visual hint
                if (plugin.customImageUrl) {
                    valueItems.push({
                        type: "Image",
                        src: plugin.customImageUrl,
                        alt: plugin.name,
                    });
                }
                // 4. Label button (if enabled) to let users trigger plugin action
                if (plugin.labelButton) {
                    valueItems.push({
                        type: "Button",
                        label: (_b = plugin.labelButtonText) !== null && _b !== void 0 ? _b : "Action",
                        variant: "text",
                        size: "small",
                        color: "primary",
                    });
                }
                // Compose the DataListItem
                return {
                    type: "DataListItem",
                    label: labelItems,
                    value: valueItems,
                };
            }),
        }
        : {
            // Fallback markdown when no plugins are found
            type: "Markdown",
            content: "### No plugins available.\nThere are currently no plugins to display.",
        };
    // Card header summarizing the list
    const header = {
        type: "CardHeader",
        title: "Plugins",
        description: `Showing ${plugins.length} plugin${plugins.length !== 1 ? "s" : ""}`,
    };
    // Card content wraps the list or markdown
    const content = {
        type: "CardContent",
        childrenProps: contentComponent,
    };
    // Optional footer: a "Load more" button if pagination cursor is provided
    const footer = typeof input.next === "number"
        ? {
            type: "CardFooter",
            childrenProps: [
                {
                    type: "Button",
                    label: "Load more",
                    variant: "text",
                    size: "medium",
                    color: "primary",
                },
            ],
        }
        : undefined;
    // Assemble the final vertical card
    const cardProps = {
        type: "VerticalCard",
        childrenProps: footer ? [header, content, footer] : [header, content],
    };
    return cardProps;
}
//# sourceMappingURL=253.js.map
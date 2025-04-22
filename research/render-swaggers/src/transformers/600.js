export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Helper to pick an icon and color based on approval state
    function getStateVisuals(state) {
        switch (state) {
            case "approved":
                return { icon: "check-circle", color: "green" };
            case "rejected":
                return { icon: "times-circle", color: "red" };
            case "pending":
            default:
                return { icon: "hourglass", color: "orange" };
        }
    }
    // If there's no data, show a friendly placeholder
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "### No environment approval records to display."
        };
    }
    // Map each approval record to a VerticalCard
    const cards = input.map((record) => {
        const { icon, color } = getStateVisuals(record.state);
        // Build chips for each environment entry
        const envChips = Array.isArray(record.environments) && record.environments.length > 0
            ? record.environments.map((env) => {
                var _a, _b;
                return ({
                    type: "Chip",
                    label: (_b = (_a = env.name) !== null && _a !== void 0 ? _a : env.url) !== null && _b !== void 0 ? _b : "Unknown",
                    variant: "outlined",
                    size: "small"
                });
            })
            : [
                {
                    type: "Chip",
                    label: "No environments",
                    variant: "outlined",
                    size: "small"
                }
            ];
        // CardHeader: user info + state icon
        const header = {
            type: "CardHeader",
            title: record.user.login,
            // Show avatar if available
            startElement: {
                type: "Avatar",
                src: record.user.avatar_url,
                name: record.user.login,
                variant: "gray",
                size: 32
            },
            endElement: {
                type: "Icon",
                id: icon,
                color: color,
                size: 24
            },
            description: record.state.charAt(0).toUpperCase() + record.state.slice(1)
        };
        // CardContent: list of environment chips
        const envSection = {
            type: "CardContent",
            childrenProps: envChips
        };
        // CardContent: comment rendered as markdown
        const commentSection = {
            type: "CardContent",
            childrenProps: {
                type: "Markdown",
                content: record.comment && record.comment.trim().length > 0
                    ? `**Comment**:\n\n${record.comment}`
                    : "*No comment provided.*"
            }
        };
        return {
            type: "VerticalCard",
            childrenProps: [header, envSection, commentSection]
        };
    });
    // Wrap all cards in a Carousel for horizontal scrolling on mobile & desktop
    const carousel = {
        type: "Carousel",
        autoPlay: false,
        infinite: false,
        gutter: 16,
        navControls: true,
        indicators: false,
        childrenProps: cards
    };
    return carousel;
}
//# sourceMappingURL=600.js.map
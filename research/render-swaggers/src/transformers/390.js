export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Destructure input settings
    const { github_owned_allowed, verified_allowed, patterns_allowed } = input;
    // Helper to create a chip group for boolean flags
    function booleanChip(label, flag) {
        return {
            type: "Chip",
            label,
            // Use green for true, red for false or undefined (treat undefined as false)
            color: flag ? "success" : "error",
            variant: "filled",
            size: "medium",
        };
    }
    // Build each DataListItem for the boolean settings
    const githubItem = {
        type: "DataListItem",
        label: {
            type: "Text",
            content: "GitHub‐owned Actions",
            variant: "body2",
        },
        value: {
            type: "ChipGroup",
            // Only one chip for this boolean
            childrenProps: [booleanChip(github_owned_allowed ? "Allowed" : "Not allowed", github_owned_allowed)],
        },
    };
    const verifiedItem = {
        type: "DataListItem",
        label: {
            type: "Text",
            content: "Verified Marketplace Actions",
            variant: "body2",
        },
        value: {
            type: "ChipGroup",
            childrenProps: [booleanChip(verified_allowed ? "Allowed" : "Not allowed", verified_allowed)],
        },
    };
    // Build the patterns list: if no patterns, show a gray "None" chip
    const patterns = Array.isArray(patterns_allowed) ? patterns_allowed : [];
    const patternChips = patterns.length > 0
        ? patterns.map((p) => ({
            type: "Chip",
            label: p,
            color: "primary",
            variant: "outlined",
            size: "medium",
        }))
        : [
            {
                type: "Chip",
                label: "None",
                color: "gray",
                variant: "outlined",
                size: "medium",
            },
        ];
    const patternsItem = {
        type: "DataListItem",
        label: {
            type: "Text",
            content: "Allowed Patterns",
            variant: "body2",
        },
        value: {
            type: "ChipGroup",
            // Wrap long lists into a responsive chip group
            childrenProps: patternChips,
            maxItems: 5, // on mobile, collapse into "+N" if too many
        },
    };
    // Compose the data list of settings
    const dataList = {
        type: "DataList",
        childrenProps: [githubItem, verifiedItem, patternsItem],
    };
    // Use a vertical card to give a clear, responsive container
    const cardHeader = {
        type: "CardHeader",
        title: "Selected Actions Configuration",
        description: "Manage which GitHub Actions are allowed in your workflows",
    };
    const cardContent = {
        type: "CardContent",
        childrenProps: dataList,
    };
    return {
        type: "VerticalCard",
        childrenProps: [cardHeader, cardContent],
    };
}
//# sourceMappingURL=390.js.map
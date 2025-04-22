export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Helper to build a ChipProps for a boolean status
    const makeStatusChip = (label, status) => ({
        type: "Chip",
        label,
        size: "small",
        variant: "filled",
        // if status is truthy => success, if false/null => error, if undefined => default gray
        color: status === true ? "success" : status === false || status === null ? "error" : "gray",
    });
    // If there's no primary domain data, show a simple text fallback
    if (!input.domain) {
        return {
            type: "Text",
            content: "No domain health check data available.",
            variant: "body1",
        };
    }
    // Prepare an array of domain entries: primary plus alt if present
    const entries = [
        { label: "Primary Domain", data: input.domain },
    ];
    if (input.alt_domain) {
        entries.push({ label: "Alternative Domain", data: input.alt_domain });
    }
    // Map each domain entry to a VerticalCardProps
    const cards = entries.map(({ label, data }) => {
        var _a, _b;
        // Determine overall validity for icon in header
        const overallValid = data.is_valid_domain && data.dns_resolves && data.responds_to_https;
        // Define a set of key/label to visualize as chips
        const booleanFields = [
            ["dns_resolves", "DNS Resolves"],
            ["responds_to_https", "HTTPS Responds"],
            ["enforces_https", "HTTPS Enforced"],
            ["is_valid_domain", "Valid Domain"],
            ["is_pages_domain", "GitHub Pages"],
        ];
        const chips = booleanFields
            // include only fields that exist (not undefined)
            .filter(([key]) => data[key] !== undefined)
            .map(([key, title]) => makeStatusChip(title, data[key]));
        return {
            type: "VerticalCard",
            childrenProps: [
                // Card header with domain name, URI, and an icon indicating overall status
                {
                    type: "CardHeader",
                    title: (_a = data.host) !== null && _a !== void 0 ? _a : "–",
                    description: (_b = data.uri) !== null && _b !== void 0 ? _b : undefined,
                    startElement: {
                        type: "Icon",
                        id: overallValid ? "check-circle" : "exclamation-circle",
                        color: overallValid ? "green" : "red",
                        size: 24,
                    },
                },
                // Card content showing a chip group of statuses
                {
                    type: "CardContent",
                    childrenProps: {
                        type: "ChipGroup",
                        maxItems: 5,
                        childrenProps: chips,
                    },
                },
            ],
        };
    });
    // If there's only one card, return it directly; otherwise wrap in a carousel
    if (cards.length === 1) {
        return cards[0];
    }
    else {
        return {
            type: "Carousel",
            autoPlay: false,
            infinite: false,
            navControls: true,
            indicators: true,
            interval: 40,
            effect: "slide",
            childrenProps: cards,
        };
    }
}
//# sourceMappingURL=821.js.map
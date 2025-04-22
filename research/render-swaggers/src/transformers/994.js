export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there are no keys, show a friendly message
    if (!input || input.length === 0) {
        return {
            type: "Text",
            variant: "subtitle1",
            content: "No GPG keys available.",
        };
    }
    // Map each GPG key to a VerticalCardProps
    const cards = input.map((key) => {
        var _a;
        // Card header with key name, key ID, and an icon
        const header = {
            type: "CardHeader",
            title: (_a = key.name) !== null && _a !== void 0 ? _a : "Unnamed Key",
            description: key.key_id,
            startElement: {
                type: "Icon",
                id: "key",
                color: "blue",
                size: 24,
            },
        };
        // Build a list of chips for each positive capability
        const capabilityChips = [];
        if (key.can_sign) {
            capabilityChips.push({
                type: "Chip",
                label: "Sign",
                variant: "outlined",
                color: "success",
                size: "small",
                startElement: {
                    type: "Icon",
                    id: "pen",
                    color: "green",
                    size: 16,
                },
            });
        }
        if (key.can_encrypt_comms) {
            capabilityChips.push({
                type: "Chip",
                label: "Encrypt Comm",
                variant: "outlined",
                color: "success",
                size: "small",
                startElement: {
                    type: "Icon",
                    id: "envelope",
                    color: "teal",
                    size: 16,
                },
            });
        }
        if (key.can_encrypt_storage) {
            capabilityChips.push({
                type: "Chip",
                label: "Encrypt Storage",
                variant: "outlined",
                color: "success",
                size: "small",
                startElement: {
                    type: "Icon",
                    id: "lock",
                    color: "cyan",
                    size: 16,
                },
            });
        }
        if (key.can_certify) {
            capabilityChips.push({
                type: "Chip",
                label: "Certify",
                variant: "outlined",
                color: "success",
                size: "small",
                startElement: {
                    type: "Icon",
                    id: "check-circle",
                    color: "green",
                    size: 16,
                },
            });
        }
        // Markdown summary of creation, expiration, and revocation
        const mdLines = [
            `**Created:** ${new Date(key.created_at).toLocaleDateString()}`,
            `**Expires:** ${key.expires_at ? new Date(key.expires_at).toLocaleDateString() : "N/A"}`,
            `**Revoked:** ${key.revoked ? "Yes" : "No"}`,
        ];
        const summary = {
            type: "Markdown",
            content: mdLines.join("\n\n"),
        };
        const content = {
            type: "CardContent",
            // Show capability chips first, then the markdown summary
            childrenProps: [...capabilityChips, summary],
        };
        // Build a DataList of associated emails and their verification status
        const emailItems = key.emails.map((e) => {
            var _a;
            return ({
                type: "DataListItem",
                label: {
                    type: "Text",
                    content: (_a = e.email) !== null && _a !== void 0 ? _a : "Unknown Email",
                },
                value: {
                    type: "Icon",
                    id: e.verified ? "check" : "times",
                    color: e.verified ? "green" : "red",
                    size: 16,
                },
            });
        });
        const emailList = {
            type: "DataList",
            childrenProps: emailItems,
        };
        const footer = {
            type: "CardFooter",
            childrenProps: emailList,
        };
        // Assemble the vertical card
        return {
            type: "VerticalCard",
            childrenProps: [header, content, footer],
        };
    });
    // Wrap all cards in a carousel for responsive display
    return {
        type: "Carousel",
        navControls: true,
        indicators: true,
        infinite: false,
        childrenProps: cards,
    };
}
//# sourceMappingURL=994.js.map
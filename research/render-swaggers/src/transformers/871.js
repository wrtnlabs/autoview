export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b, _c;
    // Map bypass reasons to human-readable labels and color codes
    const reasonMap = {
        false_positive: { label: "False Positive", color: "success" },
        used_in_tests: { label: "Used in Tests", color: "info" },
        will_fix_later: { label: "Will Fix Later", color: "warning" },
    };
    // Determine human-readable reason and its visual color
    const rawReason = (_a = input.reason) !== null && _a !== void 0 ? _a : "";
    const { label: reasonLabel, color: reasonColor } = (_b = reasonMap[rawReason]) !== null && _b !== void 0 ? _b : { label: "Unknown Reason", color: "gray" };
    // Create a Chip to represent the bypass reason
    const reasonChip = {
        type: "Chip",
        label: reasonLabel,
        color: reasonColor,
        variant: "outlined",
        size: "medium",
    };
    // Handle expiration date: parse and format or show "No Expiry"
    const expireRaw = input.expire_at;
    let expireLabel;
    if (expireRaw == null) {
        expireLabel = "No Expiry";
    }
    else {
        // Attempt to format in user's locale; fallback to raw string on error
        try {
            const dt = new Date(expireRaw);
            expireLabel = isNaN(dt.getTime())
                ? expireRaw
                : dt.toLocaleString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                });
        }
        catch (_d) {
            expireLabel = expireRaw;
        }
    }
    const expireChip = {
        type: "Chip",
        label: expireLabel,
        color: expireRaw == null ? "darkGray" : "primary",
        variant: expireRaw == null ? "filled" : "outlined",
        size: "small",
    };
    // Token type chip
    const tokenTypeLabel = ((_c = input.token_type) === null || _c === void 0 ? void 0 : _c.trim()) || "Unknown Token";
    const tokenTypeChip = {
        type: "Chip",
        label: tokenTypeLabel,
        color: "secondary",
        variant: "outlined",
        size: "small",
    };
    // Compose a DataList to display the three fields
    const dataList = {
        type: "DataList",
        childrenProps: [
            {
                type: "DataListItem",
                // Field name
                label: {
                    type: "Text",
                    content: "Reason",
                    variant: "subtitle2",
                    color: "tertiary",
                },
                // Visual chip for reason
                value: reasonChip,
            },
            {
                type: "DataListItem",
                label: {
                    type: "Text",
                    content: "Expires At",
                    variant: "subtitle2",
                    color: "tertiary",
                },
                value: expireChip,
            },
            {
                type: "DataListItem",
                label: {
                    type: "Text",
                    content: "Token Type",
                    variant: "subtitle2",
                    color: "tertiary",
                },
                value: tokenTypeChip,
            },
        ],
    };
    // Card header with icon and title
    const header = {
        type: "CardHeader",
        title: "Push Protection Bypass",
        description: "Overview of the bypass settings",
        // Unlock icon as a visual cue
        startElement: {
            type: "Icon",
            id: "unlock",
            color: "blue",
            size: 24,
        },
    };
    // Card content wrapping the DataList
    const content = {
        type: "CardContent",
        childrenProps: dataList,
    };
    // Combine header and content into a vertical card
    const card = {
        type: "VerticalCard",
        childrenProps: [header, content],
    };
    return card;
}
//# sourceMappingURL=871.js.map
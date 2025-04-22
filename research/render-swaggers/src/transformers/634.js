export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    // Helper to render a boolean value as a colored icon (check or cross)
    const renderBooleanIcon = (value) => ({
        type: "Icon",
        id: value ? "check-circle" : "times-circle",
        color: value ? "green" : "red",
        size: 20,
    });
    // Helper to render counts of users/teams/apps as a ChipGroup
    const renderCountChips = (counts) => ({
        type: "ChipGroup",
        childrenProps: [
            { type: "Chip", label: `Users: ${counts.users}`, variant: "outlined", size: "small" },
            { type: "Chip", label: `Teams: ${counts.teams}`, variant: "outlined", size: "small" },
            { type: "Chip", label: `Apps: ${counts.apps}`, variant: "outlined", size: "small" },
        ],
    });
    // Build the list of DataListItemProps to display each field
    const items = [];
    // 1) URL (if provided)
    if (input.url) {
        items.push({
            type: "DataListItem",
            label: { type: "Text", content: "URL", variant: "body2", color: "primary" },
            value: {
                type: "Button",
                variant: "text",
                label: "View",
                href: input.url,
                color: "primary",
            },
        });
    }
    // 2) Boolean flags rendered as icons
    items.push({
        type: "DataListItem",
        label: { type: "Text", content: "Dismiss Stale Reviews", variant: "body2" },
        value: renderBooleanIcon(input.dismiss_stale_reviews),
    });
    items.push({
        type: "DataListItem",
        label: { type: "Text", content: "Require Code Owner Reviews", variant: "body2" },
        value: renderBooleanIcon(input.require_code_owner_reviews),
    });
    // 3) Numeric count (if set)
    if (input.required_approving_review_count !== undefined) {
        items.push({
            type: "DataListItem",
            label: { type: "Text", content: "Required Approving Review Count", variant: "body2" },
            value: {
                type: "Text",
                content: String(input.required_approving_review_count),
                variant: "body2",
            },
        });
    }
    // 4) Optional last-push-approval flag
    if (input.require_last_push_approval !== undefined) {
        items.push({
            type: "DataListItem",
            label: { type: "Text", content: "Require Last Push Approval", variant: "body2" },
            value: renderBooleanIcon(input.require_last_push_approval),
        });
    }
    // 5) Dismissal restrictions summary
    if (input.dismissal_restrictions) {
        const dr = input.dismissal_restrictions;
        items.push({
            type: "DataListItem",
            label: { type: "Text", content: "Dismissal Restrictions", variant: "body2" },
            value: renderCountChips({
                users: (_b = (_a = dr.users) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0,
                teams: (_d = (_c = dr.teams) === null || _c === void 0 ? void 0 : _c.length) !== null && _d !== void 0 ? _d : 0,
                apps: (_f = (_e = dr.apps) === null || _e === void 0 ? void 0 : _e.length) !== null && _f !== void 0 ? _f : 0,
            }),
        });
    }
    // 6) Bypass pull request allowances summary
    if (input.bypass_pull_request_allowances) {
        const bp = input.bypass_pull_request_allowances;
        items.push({
            type: "DataListItem",
            label: { type: "Text", content: "Bypass PR Allowances", variant: "body2" },
            value: renderCountChips({
                users: (_h = (_g = bp.users) === null || _g === void 0 ? void 0 : _g.length) !== null && _h !== void 0 ? _h : 0,
                teams: (_k = (_j = bp.teams) === null || _j === void 0 ? void 0 : _j.length) !== null && _k !== void 0 ? _k : 0,
                apps: (_m = (_l = bp.apps) === null || _l === void 0 ? void 0 : _l.length) !== null && _m !== void 0 ? _m : 0,
            }),
        });
    }
    // Compose the DataList component
    const dataList = {
        type: "DataList",
        childrenProps: items,
    };
    // Return a vertical card containing a header and the data list
    return {
        type: "VerticalCard",
        childrenProps: [
            {
                type: "CardHeader",
                title: "Protected Branch Pull Request Review",
                description: "",
                // Use a shield icon to represent protection
                startElement: {
                    type: "Icon",
                    id: "shield-alt",
                    color: "blue",
                    size: 24,
                },
            },
            {
                type: "CardContent",
                // Pass the DataList as the content of the card
                childrenProps: dataList,
            },
        ],
    };
}
//# sourceMappingURL=634.js.map
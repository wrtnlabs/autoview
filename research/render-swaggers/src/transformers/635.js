export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    // Utility to create a text component
    const makeText = (content) => ({
        type: "Text",
        content,
    });
    // Utility to create a chip for boolean flags
    const makeFlagChip = (flag, label) => ({
        type: "Chip",
        label,
        variant: "filled",
        color: flag ? "success" : "error",
    });
    // Build list of DataListItemProps for each setting
    const listItems = [];
    // 1. dismiss_stale_reviews
    listItems.push({
        type: "DataListItem",
        label: [makeText("Dismiss Stale Reviews")],
        value: makeFlagChip(input.dismiss_stale_reviews, input.dismiss_stale_reviews ? "Enabled" : "Disabled"),
    });
    // 2. require_code_owner_reviews
    listItems.push({
        type: "DataListItem",
        label: [makeText("Require Code Owner Reviews")],
        value: makeFlagChip(input.require_code_owner_reviews, input.require_code_owner_reviews ? "Enabled" : "Disabled"),
    });
    // 3. required_approving_review_count
    listItems.push({
        type: "DataListItem",
        label: [makeText("Required Approving Reviews")],
        value: {
            type: "Text",
            content: (input.required_approving_review_count != null)
                ? String(input.required_approving_review_count)
                : "None",
        },
    });
    // 4. require_last_push_approval (optional)
    if (input.require_last_push_approval !== undefined) {
        listItems.push({
            type: "DataListItem",
            label: [makeText("Last Push Approved by Others")],
            value: makeFlagChip(input.require_last_push_approval, input.require_last_push_approval ? "Yes" : "No"),
        });
    }
    // 5. dismissal_restrictions – show users, teams, apps counts via markdown
    if (input.dismissal_restrictions) {
        const dr = input.dismissal_restrictions;
        const usersCount = (_b = (_a = dr.users) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0;
        const teamsCount = (_d = (_c = dr.teams) === null || _c === void 0 ? void 0 : _c.length) !== null && _d !== void 0 ? _d : 0;
        const appsCount = (_f = (_e = dr.apps) === null || _e === void 0 ? void 0 : _e.length) !== null && _f !== void 0 ? _f : 0;
        const mdLines = [
            `**Users:** ${usersCount}`,
            `**Teams:** ${teamsCount}`,
            `**Apps:** ${appsCount}`,
        ].join("  \n");
        listItems.push({
            type: "DataListItem",
            label: [makeText("Dismissal Restrictions")],
            value: {
                type: "Markdown",
                content: mdLines,
            },
        });
    }
    // 6. bypass_pull_request_allowances – show users, teams, apps counts via markdown
    if (input.bypass_pull_request_allowances) {
        const bp = input.bypass_pull_request_allowances;
        const usersCount = (_h = (_g = bp.users) === null || _g === void 0 ? void 0 : _g.length) !== null && _h !== void 0 ? _h : 0;
        const teamsCount = (_k = (_j = bp.teams) === null || _j === void 0 ? void 0 : _j.length) !== null && _k !== void 0 ? _k : 0;
        const appsCount = (_m = (_l = bp.apps) === null || _l === void 0 ? void 0 : _l.length) !== null && _m !== void 0 ? _m : 0;
        const mdLines = [
            `**Users:** ${usersCount}`,
            `**Teams:** ${teamsCount}`,
            `**Apps:** ${appsCount}`,
        ].join("  \n");
        listItems.push({
            type: "DataListItem",
            label: [makeText("Bypass PR Allowances")],
            value: {
                type: "Markdown",
                content: mdLines,
            },
        });
    }
    // Compose the DataList component
    const dataList = {
        type: "DataList",
        childrenProps: listItems,
    };
    // Compose the card header
    const header = {
        type: "CardHeader",
        title: "Protected Branch Review Settings",
        description: input.url ? input.url : undefined,
        startElement: {
            type: "Icon",
            id: "shield-alt", // using a shield icon for protection
            color: "blue",
            size: 20,
        },
    };
    // Compose the card content
    const content = {
        type: "CardContent",
        childrenProps: [dataList],
    };
    // Return a vertical card wrapping the header and content
    const card = {
        type: "VerticalCard",
        childrenProps: [header, content],
    };
    return card;
}
//# sourceMappingURL=635.js.map
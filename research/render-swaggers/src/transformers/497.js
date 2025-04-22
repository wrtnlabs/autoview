export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there are no grants, show a friendly markdown message
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "### No Programmatic Access Grants\n\nThere are currently no organization programmatic access grants to display.",
        };
    }
    // Map each grant to a DataListItem for compact, responsive display
    const dataListItems = input.map((grant) => {
        var _a;
        // Choose an icon and color based on expiration status
        const isExpired = grant.token_expired;
        const statusIconId = isExpired ? "calendar-times" : "calendar-check";
        const statusColor = isExpired ? "red" : "green";
        const expiresText = isExpired
            ? "Expired"
            : `Expires at ${(_a = grant.token_expires_at) !== null && _a !== void 0 ? _a : "Never"}`;
        // Compose the label: avatar + token name + repository selection
        const labelComponents = [
            {
                // Owner's avatar
                type: "Avatar",
                src: grant.owner.avatar_url,
                name: grant.owner.login,
                variant: "primary",
                size: 40,
            },
            {
                // Token name as subtitle
                type: "Text",
                content: grant.token_name,
                variant: "subtitle1",
            },
            {
                // Repository selection detail
                type: "Text",
                content: `Repo selection: ${grant.repository_selection}`,
                variant: "caption",
                color: "gray",
            },
        ];
        // Compose the value: expiration icon + expiration text
        const valueComponents = [
            {
                type: "Icon",
                id: statusIconId,
                color: statusColor,
                size: 20,
            },
            {
                type: "Text",
                content: expiresText,
                variant: "caption",
                color: statusColor,
            },
        ];
        return {
            type: "DataListItem",
            label: labelComponents,
            value: valueComponents,
        };
    });
    // Return a DataList container wrapping all items
    return {
        type: "DataList",
        childrenProps: dataListItems,
    };
}
//# sourceMappingURL=497.js.map
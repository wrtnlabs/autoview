export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b, _c, _d;
    // Destructure input with sensible defaults
    const total = (_c = (_a = input.total_count) !== null && _a !== void 0 ? _a : (_b = input.roles) === null || _b === void 0 ? void 0 : _b.length) !== null && _c !== void 0 ? _c : 0;
    const roles = (_d = input.roles) !== null && _d !== void 0 ? _d : [];
    // If there are no roles, display a friendly markdown message.
    if (roles.length === 0) {
        return {
            type: "Markdown",
            content: `## No Roles Found

There are no organization roles to display.`
        };
    }
    // Build a DataListItem for each role
    const items = roles.map(role => {
        var _a, _b, _c;
        // Prepare an avatar for the organization that owns the role
        const orgAvatar = {
            type: "Avatar",
            src: (_a = role.organization) === null || _a === void 0 ? void 0 : _a.avatar_url,
            name: (_c = (_b = role.organization) === null || _b === void 0 ? void 0 : _b.login) !== null && _c !== void 0 ? _c : "Org",
            variant: "primary",
            size: 32
        };
        // Prepare the role name as a header text
        const roleTitle = {
            type: "Text",
            variant: "h6",
            content: role.name
        };
        // Prepare a chip summarizing the number of permissions
        const permissionChip = {
            type: "Chip",
            label: `${role.permissions.length} permission${role.permissions.length !== 1 ? "s" : ""}`,
            size: "small",
            variant: "outlined",
            color: "primary"
        };
        // If the role has a base_role, display it as an additional colored chip
        const baseRoleChip = role.base_role
            ? {
                type: "Chip",
                label: role.base_role,
                size: "small",
                variant: "filled",
                color: "secondary"
            }
            : undefined;
        // Compose the left label: [avatar, roleTitle]
        const labelComponents = [
            orgAvatar,
            roleTitle
        ];
        // Compose the right value: permissionChip + optional baseRoleChip
        const valueComponents = [
            permissionChip
        ];
        if (baseRoleChip)
            valueComponents.push(baseRoleChip);
        return {
            type: "DataListItem",
            label: labelComponents,
            value: valueComponents
        };
    });
    // Wrap items into a DataList
    const list = {
        type: "DataList",
        childrenProps: items
    };
    // Build the header of the card
    const header = {
        type: "CardHeader",
        title: "Organization Roles",
        description: `Total: ${total}`
    };
    // Build the content of the card containing the list
    const content = {
        type: "CardContent",
        childrenProps: list
    };
    // Return a vertical card that holds the header and the list
    const card = {
        type: "VerticalCard",
        childrenProps: [header, content]
    };
    return card;
}
//# sourceMappingURL=486.js.map
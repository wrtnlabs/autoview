export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Map GitHub permission strings to UI chip colors
    const permissionColorMap = {
        read: "success",
        write: "info",
        admin: "error",
        triage: "warning",
        maintain: "primary",
    };
    // Build a DataList where each item represents one repository invitation
    const items = input.map((invitation) => {
        // 1. Owner avatar + repository full name as the label
        const ownerAvatar = {
            type: "Avatar",
            src: invitation.repository.owner.avatar_url,
            name: invitation.repository.owner.login,
            // primary color to highlight repository owner
            variant: "primary",
            size: 32,
        };
        const repoNameText = {
            type: "Text",
            content: invitation.repository.full_name,
            variant: "body1",
        };
        // 2. Invitation details as the value: inviter & invitee avatars, permission chip, date, and link button
        // Gather inviter/invitee avatars if present
        const avatarChildren = [];
        if (invitation.inviter) {
            avatarChildren.push({
                type: "Avatar",
                src: invitation.inviter.avatar_url,
                name: invitation.inviter.login,
                variant: "secondary",
                size: 24,
            });
        }
        if (invitation.invitee) {
            avatarChildren.push({
                type: "Avatar",
                src: invitation.invitee.avatar_url,
                name: invitation.invitee.login,
                variant: "secondary",
                size: 24,
            });
        }
        const inviteeGroup = {
            type: "AvatarGroup",
            childrenProps: avatarChildren,
            maxItems: avatarChildren.length,
        };
        // Permission chip
        const permissionChip = {
            type: "Chip",
            label: invitation.permissions,
            color: permissionColorMap[invitation.permissions] || "primary",
            variant: "outlined",
            size: "small",
        };
        // Created date, formatted for display
        const createdAtText = {
            type: "Text",
            content: new Date(invitation.created_at).toLocaleDateString(),
            variant: "caption",
        };
        // Link to the invitation page
        const openButton = {
            type: "Button",
            label: "View",
            href: invitation.html_url,
            variant: "outlined",
            color: "primary",
            size: "small",
        };
        return {
            type: "DataListItem",
            // Label shows repository owner + name
            label: [ownerAvatar, repoNameText],
            // Value shows inviter/invitee, permission, date, and action button
            value: [inviteeGroup, permissionChip, createdAtText, openButton],
        };
    });
    // Return the composed DataList component
    return {
        type: "DataList",
        childrenProps: items,
    };
}
//# sourceMappingURL=977.js.map
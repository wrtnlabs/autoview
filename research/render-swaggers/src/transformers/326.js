export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a;
    // Prepare organization display name (fall back to login if name is null)
    const orgDisplayName = (_a = input.organization.name) !== null && _a !== void 0 ? _a : input.organization.login;
    // Avatar for the organization
    const orgAvatar = {
        type: "Avatar",
        src: input.organization.avatar_url,
        name: input.organization.login,
        variant: "primary",
        size: 40,
    };
    // Chip for archived status, only shown when archived
    const archivedChip = {
        type: "Chip",
        label: "Archived",
        color: "error",
        variant: "filled",
        size: "small",
    };
    // Chip for organization identity
    const orgChip = {
        type: "Chip",
        label: orgDisplayName,
        color: "primary",
        variant: "outlined",
        size: "small",
        startElement: orgAvatar, // show avatar inside chip
    };
    // Button to open the classroom URL
    const viewClassroomButton = {
        type: "Button",
        label: "View Classroom",
        variant: "contained",
        color: "primary",
        size: "medium",
        href: input.url,
        startElement: {
            type: "Icon",
            id: "external-link-alt", // using a FontAwesome-style icon
            color: "blue",
            size: 16,
        },
    };
    // Card header: displays classroom name and ID with an avatar
    const cardHeader = {
        type: "CardHeader",
        title: input.name,
        description: `ID: ${input.id}`,
        startElement: orgAvatar,
    };
    // Card content: chips for archived status and organization
    const cardContent = {
        type: "CardContent",
        childrenProps: [
            // Show archived chip only if classroom is archived
            ...(input.archived ? [archivedChip] : []),
            // Always show organization chip
            orgChip,
        ],
    };
    // Card footer: action button
    const cardFooter = {
        type: "CardFooter",
        childrenProps: viewClassroomButton,
    };
    // Assemble into a vertical card for a clear, mobile-friendly layout
    const verticalCard = {
        type: "VerticalCard",
        childrenProps: [cardHeader, cardContent, cardFooter],
    };
    return verticalCard;
}
//# sourceMappingURL=326.js.map
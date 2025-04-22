export function transform($input) {
    return visualizeData($input);
}
// Transforms an array of GitHub simple_user objects into a DataList UI component.
// Each list item shows the user's avatar, login name, a "Profile" link, and (if present) an "Email" link.
function visualizeData(input) {
    // Handle empty or null input gracefully.
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "No users available to display.",
        };
    }
    // Map each user to a DataListItemProps object.
    const childrenProps = input.map((user) => {
        // Avatar shown at the beginning of the row.
        const avatar = {
            type: "Avatar",
            src: user.avatar_url,
            name: user.login,
            size: 40,
            variant: "gray",
        };
        // Text component for the GitHub login.
        const loginText = {
            type: "Text",
            content: user.login,
            variant: "body1",
            color: "primary",
        };
        // Button linking to the user's GitHub profile.
        const profileButton = {
            type: "Button",
            variant: "text",
            label: "Profile",
            href: user.html_url,
            startElement: {
                type: "Icon",
                id: "external-link-alt", // FontAwesome icon name in kebab-case
                size: 16,
                color: "blue",
            },
        };
        // If the user has an email, add an email button.
        const emailButton = user.email
            ? {
                type: "Button",
                variant: "text",
                label: "Email",
                href: `mailto:${user.email}`,
                startElement: {
                    type: "Icon",
                    id: "envelope",
                    size: 16,
                    color: "green",
                },
            }
            : undefined;
        // Assemble the right-hand side components for this row.
        const valueComponents = emailButton
            ? [profileButton, emailButton]
            : [profileButton];
        return {
            type: "DataListItem",
            // Render avatar and login name side by side.
            label: [avatar, loginText],
            // Render action buttons (profile/email).
            value: valueComponents,
        };
    });
    // Return the DataList with all user items.
    return {
        type: "DataList",
        childrenProps,
    };
}
//# sourceMappingURL=656.js.map
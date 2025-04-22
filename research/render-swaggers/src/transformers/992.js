export function transform($input) {
    return visualizeData($input);
}
// Transforms an array of GitHub simple_user objects into an AutoView DataList
function visualizeData(input) {
    // If there is no data, present a simple text message
    if (!input || input.length === 0) {
        return {
            type: 'Text',
            content: 'No users to display',
        };
    }
    // Sort users by login for a consistent UI order
    const users = [...input].sort((a, b) => a.login.localeCompare(b.login));
    // Map each user into a DataListItem
    const childrenProps = users.map((user) => {
        // Avatar for the user
        const avatar = {
            type: 'Avatar',
            src: user.avatar_url,
            name: user.login,
            size: 32,
            variant: 'blue',
        };
        // Text component for the username
        const loginText = {
            type: 'Text',
            variant: 'body1',
            content: user.login,
        };
        // A button linking to the user's GitHub profile
        const profileButton = {
            type: 'Button',
            variant: 'text',
            color: 'primary',
            size: 'small',
            startElement: {
                type: 'Icon',
                id: 'github',
                color: 'gray',
                size: 16,
            },
            label: 'Profile',
            href: user.html_url,
        };
        // Optional email text
        const emailText = user.email
            ? {
                type: 'Text',
                variant: 'body2',
                content: user.email,
            }
            : undefined;
        // Build the value array: always include the profile button, then email if present
        const valueComponents = [
            profileButton,
        ];
        if (emailText) {
            valueComponents.push(emailText);
        }
        return {
            type: 'DataListItem',
            // Label displays avatar next to the login name
            label: [avatar, loginText],
            // Value shows the actionable profile link (and email)
            value: valueComponents,
        };
    });
    // Return a DataList that holds all user items
    return {
        type: 'DataList',
        childrenProps,
    };
}
//# sourceMappingURL=992.js.map
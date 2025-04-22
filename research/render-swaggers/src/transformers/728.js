export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Map deployment state to a friendly chip color
    const stateColorMap = {
        error: 'error',
        failure: 'error',
        inactive: 'gray',
        pending: 'warning',
        queued: 'info',
        in_progress: 'blue',
        success: 'success',
    };
    // Construct a chip to represent the state
    const stateChip = {
        type: 'Chip',
        label: input.state,
        color: stateColorMap[input.state] || 'gray',
        variant: 'filled',
        size: 'small',
    };
    // Build the list of key-value pairs to display in a DataList
    const dataListItems = [
        {
            type: 'DataListItem',
            label: { type: 'Text', content: 'Status' },
            value: stateChip,
        },
        {
            type: 'DataListItem',
            label: { type: 'Text', content: 'Created At' },
            // Format dates into a human-readable string
            value: {
                type: 'Text',
                content: new Date(input.created_at).toLocaleString(),
            },
        },
        {
            type: 'DataListItem',
            label: { type: 'Text', content: 'Updated At' },
            value: {
                type: 'Text',
                content: new Date(input.updated_at).toLocaleString(),
            },
        },
    ];
    // Optionally show environment
    if (input.environment) {
        dataListItems.push({
            type: 'DataListItem',
            label: { type: 'Text', content: 'Environment' },
            value: { type: 'Text', content: input.environment },
        });
    }
    // Prepare buttons for all relevant URLs
    const urlButtons = [
        { label: 'View Deployment', href: input.deployment_url },
        { label: 'View Repository', href: input.repository_url },
    ];
    if (input.log_url) {
        urlButtons.push({ label: 'View Logs', href: input.log_url });
    }
    if (input.environment_url) {
        urlButtons.push({ label: 'Environment Link', href: input.environment_url });
    }
    if (input.target_url) {
        urlButtons.push({ label: 'Target URL', href: input.target_url });
    }
    const footerButtons = urlButtons.map((btn) => ({
        type: 'Button',
        label: btn.label,
        href: btn.href,
        size: 'small',
        variant: 'outlined',
    }));
    // Compose the card header, showing deployment id, description, and creator avatar
    const header = {
        type: 'CardHeader',
        title: `Deployment #${input.id}`,
        description: input.description || undefined,
    };
    if (input.creator) {
        header.startElement = {
            type: 'Avatar',
            src: input.creator.avatar_url,
            name: input.creator.login,
            variant: 'info',
            size: 32,
        };
    }
    // Show environment as an end chip if available
    if (input.environment) {
        header.endElement = {
            type: 'Chip',
            label: input.environment,
            variant: 'outlined',
            size: 'small',
            color: 'primary',
        };
    }
    // Wrap our data list inside a CardContent
    const content = {
        type: 'CardContent',
        childrenProps: {
            type: 'DataList',
            childrenProps: dataListItems,
        },
    };
    // Footer with action buttons
    const footer = {
        type: 'CardFooter',
        childrenProps: footerButtons,
    };
    // Final vertical card combining header, content, and footer
    const card = {
        type: 'VerticalCard',
        childrenProps: [header, content, footer],
    };
    return card;
}
//# sourceMappingURL=728.js.map
export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Pick the latest snapshot for display; fallback to an empty snapshot if none exist
    const latestSnapshot = input.snapshots && input.snapshots.length > 0
        ? input.snapshots[input.snapshots.length - 1]
        : { id: '', created_at: input.created_at, title: 'No Title', body: 'No content available.', format: 'txt', files: [] };
    // Compose header with an icon and a secret lock indicator if needed
    const header = Object.assign({ type: 'CardHeader', title: latestSnapshot.title, description: `Asked at ${new Date(input.created_at).toLocaleString()}`, 
        // Use a question icon to denote a question
        startElement: {
            type: 'Icon',
            id: 'question-circle',
            color: 'blue',
            size: 24,
        } }, (input.secret
        ? {
            endElement: {
                type: 'Icon',
                id: 'lock',
                color: 'gray',
                size: 20,
            },
        }
        : {}));
    // Display the question body as markdown for rich formatting
    const content = {
        type: 'CardContent',
        childrenProps: {
            type: 'Markdown',
            content: 
            // Prepend a heading if markdown format; otherwise just show body
            latestSnapshot.format === 'md'
                ? latestSnapshot.body
                : `**${latestSnapshot.title}**\n\n${latestSnapshot.body}`,
        },
    };
    // If the seller has answered, show the answer; otherwise show an "Unanswered" chip
    const footer = {
        type: 'CardFooter',
        childrenProps: input.answer != null
            ? {
                type: 'Markdown',
                content: `### Answer\n\n${String(input.answer)}`,
            }
            : {
                type: 'Chip',
                label: 'Unanswered',
                color: 'warning',
                variant: 'outlined',
            },
    };
    // Return a vertical card combining header, content, and footer
    return {
        type: 'VerticalCard',
        childrenProps: [header, content, footer],
    };
}
//# sourceMappingURL=143.js.map
export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Handle the empty case by showing a simple text message
    if (!input || input.length === 0) {
        return {
            type: "Text",
            content: "No accepted assignments available.",
            variant: "body1",
        };
    }
    // Map each accepted assignment to a vertical card
    const cards = input.map((item) => {
        const { students, repository, commit_count, grade, submitted, passing, assignment } = item;
        // Build a group of student avatars (max 5 visible, show total count)
        const avatarGroup = {
            type: "AvatarGroup",
            childrenProps: students.map((user) => ({
                type: "Avatar",
                src: user.avatar_url,
                name: user.login,
            })),
            maxItems: 5,
            totalItems: students.length,
        };
        // Use the first student as the header avatar (if exists)
        const firstStudent = students[0];
        const headerAvatar = firstStudent
            ? {
                type: "Avatar",
                src: firstStudent.avatar_url,
                name: firstStudent.login,
            }
            : undefined;
        // Create an icon to represent pass/fail status
        const statusIcon = {
            type: "Icon",
            id: passing ? "check-circle" : "times-circle",
            color: passing ? "green" : "red",
            size: 20,
        };
        // Compose a markdown summary of the assignment details
        const markdownContent = `
**Grade**: ${grade}  
**Commits**: ${commit_count}  
**Submitted**: ${submitted ? "✅" : "❌"}  
**Passing**: ${passing ? "✅" : "❌"}  
**Repository**: [View on GitHub](${repository.html_url})
`.trim();
        const detailsMarkdown = {
            type: "Markdown",
            content: markdownContent,
        };
        // Card header with assignment title, avatar, and status
        const cardHeader = {
            type: "CardHeader",
            title: assignment.title,
            startElement: headerAvatar,
            endElement: statusIcon,
        };
        // Card content containing the avatar group and markdown details
        const cardContent = {
            type: "CardContent",
            childrenProps: [avatarGroup, detailsMarkdown],
        };
        // Assemble the vertical card
        return {
            type: "VerticalCard",
            childrenProps: [cardHeader, cardContent],
        };
    });
    // Wrap all cards in a carousel for a responsive, swipeable experience
    const carousel = {
        type: "Carousel",
        childrenProps: cards,
        navControls: true,
        indicators: true,
        infinite: false,
        gutter: 16,
        autoPlay: false,
        interval: 20,
        effect: "slide",
    };
    return carousel;
}
//# sourceMappingURL=323.js.map
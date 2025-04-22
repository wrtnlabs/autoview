export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Extract user safely; GitHub API allows nullable user
    const user = input.user;
    const userName = user ? (user.name || user.login) : "Unknown User";
    // Prepare avatar or fallback icon for the reviewer
    const avatarProps = user && user.avatar_url
        ? {
            type: "Avatar",
            src: user.avatar_url,
            name: userName,
            size: 40,
            variant: "gray",
        }
        : undefined;
    // Map GitHub review state to a user-friendly label and color
    const rawState = (input.state || "").toUpperCase();
    const stateLabel = rawState
        .split("_")
        .map(s => s.charAt(0) + s.slice(1).toLowerCase())
        .join(" ");
    let stateColor;
    switch (rawState) {
        case "APPROVED":
            stateColor = "success";
            break;
        case "CHANGES_REQUESTED":
            stateColor = "error";
            break;
        case "COMMENTED":
            stateColor = "info";
            break;
        case "PENDING":
            stateColor = "warning";
            break;
        default:
            stateColor = "secondary";
    }
    // Render the review state as a colored chip for quick visual cue
    const stateChip = {
        type: "Chip",
        label: stateLabel,
        color: stateColor,
        variant: "filled",
        size: "medium",
    };
    // Format submission date into a human-readable string; fallback to empty if missing
    const submittedAt = input.submitted_at
        ? new Date(input.submitted_at).toLocaleString()
        : "";
    // Card header shows the reviewer's avatar, name, submission date, and state chip
    const cardHeader = Object.assign(Object.assign({ type: "CardHeader", title: userName, description: submittedAt }, (avatarProps ? { startElement: avatarProps } : {})), { endElement: stateChip });
    // Use Markdown component for the review body to preserve formatting and render links
    const bodyContent = input.body || "";
    const cardContent = {
        type: "CardContent",
        childrenProps: {
            type: "Markdown",
            content: bodyContent,
        },
    };
    // Footer provides a button to view the review on GitHub
    const viewButton = {
        type: "Button",
        label: "View on GitHub",
        href: input.html_url,
        variant: "text",
        color: "primary",
        size: "medium",
    };
    const cardFooter = {
        type: "CardFooter",
        childrenProps: viewButton,
    };
    // Assemble all sections into a vertical card for responsive display
    return {
        type: "VerticalCard",
        childrenProps: [cardHeader, cardContent, cardFooter],
    };
}
//# sourceMappingURL=840.js.map
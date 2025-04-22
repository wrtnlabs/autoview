export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Extract the attestation ID (may be undefined)
    const attestationId = input.id;
    // Construct a descriptive title and description for the card header
    const headerTitle = "Attestation Created";
    const headerDescription = attestationId !== undefined
        ? `ID: ${attestationId}`
        : "ID not available";
    // Choose an icon to represent the attestation; uses FontAwesome kebab-case naming
    const headerIcon = {
        type: "Icon",
        id: "id-badge", // visualize as an ID badge icon
        color: "blue",
        size: 24,
    };
    // Display the raw ID in a Chip for quick visual reference
    const idChip = {
        type: "Chip",
        label: attestationId !== undefined ? attestationId.toString() : "N/A",
        variant: "filled",
        color: attestationId !== undefined ? "success" : "warning",
        size: "medium",
    };
    // CardHeader: shows title, description and icon
    const cardHeader = {
        type: "CardHeader",
        title: headerTitle,
        description: headerDescription,
        startElement: headerIcon,
    };
    // CardContent: wraps the Chip in the card body
    const cardContent = {
        type: "CardContent",
        childrenProps: idChip,
    };
    // Return a vertical card that is responsive and mobile-friendly
    const verticalCard = {
        type: "VerticalCard",
        childrenProps: [cardHeader, cardContent],
    };
    return verticalCard;
}
//# sourceMappingURL=622.js.map
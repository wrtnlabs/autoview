export function transform($input) {
    return visualizeData($input);
}
/**
 * Formats bytes into human-readable strings (KB, MB, GB, etc.).
 * @param bytes The size in bytes.
 * @returns A formatted string with appropriate unit.
 */
function humanFileSize(bytes) {
    const thresh = 1024;
    if (bytes < thresh)
        return bytes + ' B';
    const units = ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    let u = -1;
    let value = bytes;
    do {
        value /= thresh;
        u++;
    } while (value >= thresh && u < units.length - 1);
    return value.toFixed(1) + ' ' + units[u];
}
function visualizeData(input) {
    // Map each artifact to a DataListItem with an icon, name, size, and status chip
    const items = input.artifacts.map((artifact) => {
        // Compose the label: a file icon followed by the artifact name
        const label = [
            {
                type: "Icon",
                id: "file-zipper", // FontAwesome icon for zipped archive
                size: 20,
                color: "blue"
            },
            {
                type: "Text",
                content: artifact.name, // Name of the artifact
                variant: "body1",
                color: "primary"
            }
        ];
        // Compose the value: human-readable size and a status chip (Expired/Active)
        const value = [
            {
                type: "Text",
                content: humanFileSize(artifact.size_in_bytes),
                variant: "body2",
                color: "gray"
            },
            {
                type: "Chip",
                label: artifact.expired ? "Expired" : "Active",
                color: artifact.expired ? "error" : "success",
                size: "small",
                variant: "filled"
            }
        ];
        return {
            type: "DataListItem",
            label,
            value
        };
    });
    // Wrap the list into a DataList component; it's responsive for desktop and mobile
    return {
        type: "DataList",
        childrenProps: items
    };
}
//# sourceMappingURL=572.js.map
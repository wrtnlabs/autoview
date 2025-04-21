import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Porter Large File
     *
     * @title Porter Large File
    */
    export type porter_large_file = {
        ref_name: string;
        path: string;
        oid: string;
        size: number & tags.Type<"int32">;
    };
}
type IAutoViewTransformerInputType = Schema.porter_large_file[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



/**
 * Transforms an array of porter_large_file into an AutoView List component
 * displaying file details with icons and size chips.
 */
function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // Helper: format bytes into human-readable string
    const formatBytes = (bytes: number, decimals = 2): string => {
        if (bytes === 0) return "0 B";
        const k = 1024;
        const dm = Math.max(0, decimals);
        const sizes = ["B", "KB", "MB", "GB", "TB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        const value = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));
        return `${value} ${sizes[i]}`;
    };

    // Helper: pick an icon name based on file extension
    const getIconId = (path: string): string => {
        const ext = path.split(".").pop()?.toLowerCase() || "";
        switch (ext) {
            case "pdf":
                return "file-pdf";
            case "js":
            case "ts":
            case "jsx":
            case "tsx":
                return "file-code";
            case "md":
            case "markdown":
                return "file-lines";
            case "png":
            case "jpg":
            case "jpeg":
            case "gif":
            case "svg":
                return "file-image";
            case "zip":
            case "tar":
            case "gz":
            case "rar":
                return "file-zipper";
            default:
                return "file";
        }
    };

    // If no files, show a friendly markdown message
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "### 📂 No large files detected\n\nYour repository does not contain any large files."
        };
    }

    // Compose list items for each file
    const items: IAutoView.IAutoViewListItemProps[] = input.map(file => {
        const iconId = getIconId(file.path);
        const humanSize = formatBytes(file.size);

        return {
            type: "ListItem",
            title: file.ref_name,
            description: file.path,
            // Show a file-type icon on the left
            startElement: {
                type: "Icon",
                id: iconId,
                color: "teal",
                size: 24
            },
            // Show file size as a chip on the right
            endElement: {
                type: "Chip",
                label: humanSize,
                size: "small",
                variant: "outlined",
                color: "primary",
                startElement: {
                    type: "Icon",
                    id: "hdd",
                    size: 12,
                    color: "gray"
                }
            },
            // Allow click to download or open if path is a URI
            // We rely on generated validation if path is a valid URI
            href: file.path
        };
    });

    // Return a responsive List component containing all file items
    return {
        type: "List",
        childrenProps: items
    };
}

import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Content File
     *
     * @title Content File
    */
    export type content_file = {
        type: "file";
        encoding: string;
        size: number & tags.Type<"int32">;
        name: string;
        path: string;
        content: string;
        sha: string;
        url: string & tags.Format<"uri">;
        git_url: (string & tags.Format<"uri">) | null;
        html_url: (string & tags.Format<"uri">) | null;
        download_url: (string & tags.Format<"uri">) | null;
        _links: {
            git: (string & tags.Format<"uri">) | null;
            html: (string & tags.Format<"uri">) | null;
            self: string & tags.Format<"uri">;
        };
        target?: string;
        submodule_git_url?: string;
    };
}
type IAutoViewTransformerInputType = Schema.content_file;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // Helper to convert bytes into human-readable format
    function formatBytes(bytes: number): string {
        const thresholds = ["B", "KB", "MB", "GB", "TB"];
        let idx = 0;
        let size = bytes;
        while (size >= 1024 && idx < thresholds.length - 1) {
            size /= 1024;
            idx++;
        }
        return `${size.toFixed(1)} ${thresholds[idx]}`;
    }

    // Build a key/value list of metadata for display
    const dataListItems: IAutoView.IAutoViewDataListItemProps[] = [
        {
            type: "DataListItem",
            // Label "Type"
            label: {
                type: "Text",
                content: "Encoding",
                variant: "body2",
            },
            // Value of encoding
            value: {
                type: "Text",
                content: input.encoding,
                variant: "body1",
            },
        },
        {
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Size",
                variant: "body2",
            },
            value: {
                type: "Text",
                content: formatBytes(input.size),
                variant: "body1",
            },
        },
        {
            type: "DataListItem",
            label: {
                type: "Text",
                content: "SHA",
                variant: "body2",
            },
            value: {
                type: "Text",
                content: input.sha,
                variant: "body1",
                // clamp long SHA
                lineClamp: 1,
            },
        },
        {
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Path",
                variant: "body2",
            },
            value: {
                type: "Text",
                content: input.path,
                variant: "body1",
                lineClamp: 2,
            },
        },
    ];

    // Conditionally add git/git_url if present
    if (input.git_url) {
        dataListItems.push({
            type: "DataListItem",
            label: { type: "Text", content: "Git URL", variant: "body2" },
            value: { type: "Text", content: input.git_url, variant: "body1", lineClamp: 1 },
        });
    }
    if (input.submodule_git_url) {
        dataListItems.push({
            type: "DataListItem",
            label: { type: "Text", content: "Submodule URL", variant: "body2" },
            value: { type: "Text", content: input.submodule_git_url, variant: "body1", lineClamp: 1 },
        });
    }

    // Compose action buttons for downloading or viewing the file
    const actionButtons: IAutoView.IAutoViewButtonProps[] = [];
    if (input.download_url) {
        actionButtons.push({
            type: "Button",
            label: "Download",
            variant: "outlined",
            startElement: {
                type: "Icon",
                id: "file-download",
                size: 16,
                color: "blue",
            },
            href: input.download_url,
            size: "small",
        });
    }
    if (input.html_url) {
        actionButtons.push({
            type: "Button",
            label: "View on GitHub",
            variant: "contained",
            startElement: {
                type: "Icon",
                id: "github",
                size: 16,
                color: "gray",
            },
            href: input.html_url,
            size: "small",
        });
    }

    // Assemble the vertical card
    return {
        type: "VerticalCard",
        childrenProps: [
            {
                // Header with file icon, name, and a chip for file size
                type: "CardHeader",
                startElement: {
                    type: "Icon",
                    id: "file",
                    size: 24,
                    color: "blue",
                },
                title: input.name,
                description: input.target ?? undefined, // show target if present
                endElement: {
                    type: "Chip",
                    label: formatBytes(input.size),
                    variant: "outlined",
                },
            },
            {
                // Content: display metadata in a data list
                type: "CardContent",
                childrenProps: {
                    type: "DataList",
                    childrenProps: dataListItems,
                },
            },
            {
                // Footer: action buttons to download or view
                type: "CardFooter",
                childrenProps: actionButtons,
            },
        ],
    };
}

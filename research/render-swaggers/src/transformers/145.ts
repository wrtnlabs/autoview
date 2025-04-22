import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace IShoppingSaleInquiryAnswer {
        export type ISnapshot = {
            /**
             * Primary Key.
             *
             * @title Primary Key
            */
            id: string;
            /**
             * Creation time of snapshot record.
             *
             * In other words, creation time or update time or article.
             *
             * @title Creation time of snapshot record
            */
            created_at: string;
            /**
             * Format of body.
             *
             * Same meaning with extension like `html`, `md`, `txt`.
             *
             * @title Format of body
            */
            format: "html" | "md" | "txt";
            /**
             * Title of article.
             *
             * @title Title of article
            */
            title: string;
            /**
             * Content body of article.
             *
             * @title Content body of article
            */
            body: string;
            /**
             * List of attachment files.
             *
             * @title List of attachment files
            */
            files: Schema.IAttachmentFile.ICreate[];
        };
    }
    export namespace IAttachmentFile {
        export type ICreate = {
            /**
             * File name, except extension.
             *
             * If there's file `.gitignore`, then its name is an empty string.
             *
             * @title File name, except extension
            */
            name: string;
            /**
             * Extension.
             *
             * Possible to omit like `README` case.
             *
             * @title Extension
            */
            extension: null | (string & tags.MinLength<1> & tags.MaxLength<8>);
            /**
             * URL path of the real file.
             *
             * @title URL path of the real file
            */
            url: string;
        };
    }
}
type IAutoViewTransformerInputType = Schema.IShoppingSaleInquiryAnswer.ISnapshot;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // Helper: format ISO date to a readable string
    const formattedDate = (() => {
        try {
            const d = new Date(input.created_at);
            // Fallback to the raw string if invalid
            return isNaN(d.getTime()) ? input.created_at : d.toLocaleString();
        } catch {
            return input.created_at;
        }
    })();

    // Build the card header
    const header: IAutoView.IAutoViewCardHeaderProps = {
        type: "CardHeader",
        title: input.title,
        // Show creation date in description
        description: `Created: ${formattedDate}`,
        // Show an icon to represent the article
        startElement: {
            type: "Icon",
            id: "file-alt", // fontawesome file icon
            size: 24,
            color: "blue",
        },
        // Show format (html/md/txt) as a chip on the right
        endElement: {
            type: "Chip",
            label: input.format.toUpperCase(),
            variant: "outlined",
            color: input.format === "html" ? "blue"
                 : input.format === "md" ? "teal"
                 : "gray",
            size: "small",
        },
    };

    // Build the main content: use Markdown component for flexibility
    const content: IAutoView.IAutoViewCardContentProps = {
        type: "CardContent",
        childrenProps: {
            type: "Markdown",
            content: input.body || "",
        },
    };

    // If there are files, build a DataList in the footer
    let footer: IAutoView.IAutoViewCardFooterProps | undefined;
    if (Array.isArray(input.files) && input.files.length > 0) {
        const items = input.files.map((file) => {
            // Compose file name with extension
            const fileName = file.extension ? `${file.name}.${file.extension}` : file.name;
            return {
                type: "DataListItem" as const,
                // Label: file name
                label: {
                    type: "Text",
                    content: fileName,
                    variant: "body2",
                },
                // Value: download button
                value: {
                    type: "Button",
                    variant: "text",
                    size: "small",
                    href: file.url,
                    startElement: {
                        type: "Icon",
                        id: "download",
                        size: 16,
                        color: "green",
                    },
                    label: "Download",
                },
            } as IAutoView.IAutoViewDataListItemProps;
        });

        footer = {
            type: "CardFooter",
            childrenProps: {
                type: "DataList",
                childrenProps: items,
            },
        };
    }

    // Assemble the vertical card with header, content, and optional footer
    const card: IAutoView.IAutoViewVerticalCardProps = {
        type: "VerticalCard",
        childrenProps: footer ? [header, content, footer] : [header, content],
    };

    return card;
}

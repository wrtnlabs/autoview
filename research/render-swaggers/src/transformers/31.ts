import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace IShoppingSaleInquiryComment {
        /**
         * Snapshot content of the comment.
        */
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
             * In other words, creation time or update time or comment.
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
             * Content body of comment.
             *
             * @title Content body of comment
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
type IAutoViewTransformerInputType = Schema.IShoppingSaleInquiryComment.ISnapshot;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // Format the creation timestamp into a human-readable string.
    // Fallback to raw string if invalid date.
    let formattedDate: string;
    const date = new Date(input.created_at);
    if (isNaN(date.getTime())) {
        formattedDate = input.created_at;
    } else {
        formattedDate = date.toLocaleString();
    }

    // Build the card header: show a comment icon, snapshot ID and creation time.
    const header: IAutoView.IAutoViewCardHeaderProps = {
        type: "CardHeader",
        title: `Snapshot #${input.id}`,
        description: formattedDate,
        startElement: {
            type: "Icon",
            id: "comment",
            color: "gray",
            size: 24,
        },
    };

    // Build the card content: render the body using Markdown for better formatting.
    // Even if the format is html or txt, Markdown component will display plain text if no markdown syntax.
    const content: IAutoView.IAutoViewCardContentProps = {
        type: "CardContent",
        childrenProps: {
            type: "Markdown",
            content: input.body,
        },
    };

    // If there are attachments, render them as a labeled DataList with download buttons.
    let footer: IAutoView.IAutoViewCardFooterProps | undefined;
    if (Array.isArray(input.files) && input.files.length > 0) {
        // Header label for attachments
        const attachmentLabel: IAutoView.IAutoViewTextProps = {
            type: "Text",
            variant: "subtitle2",
            content: "Attachments",
        };

        // Transform each file into a DataListItem with a download button
        const items: IAutoView.IAutoViewDataListItemProps[] = input.files.map((file) => {
            // Compose the display name: omit dot if extension is null
            const nameWithExt = file.extension
                ? `${file.name}.${file.extension}`
                : file.name;

            const labelText: IAutoView.IAutoViewTextProps = {
                type: "Text",
                variant: "body1",
                content: nameWithExt || "(unnamed)",
            };

            // Download button with a file icon
            const downloadButton: IAutoView.IAutoViewButtonProps = {
                type: "Button",
                variant: "text",
                color: "primary",
                size: "small",
                label: "Download",
                startElement: {
                    type: "Icon",
                    id: "download",
                    color: "blue",
                    size: 16,
                },
                href: file.url,
            };

            return {
                type: "DataListItem",
                label: labelText,
                value: downloadButton,
            };
        });

        const dataList: IAutoView.IAutoViewDataListProps = {
            type: "DataList",
            childrenProps: items,
        };

        footer = {
            type: "CardFooter",
            childrenProps: [attachmentLabel, dataList],
        };
    }

    // Assemble the vertical card with header, content, and optional footer.
    const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
        type: "VerticalCard",
        childrenProps: footer
            ? [header, content, footer]
            : [header, content],
    };

    return verticalCard;
}

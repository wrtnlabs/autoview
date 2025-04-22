import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * A page.
     *
     * Collection of records with pagination indformation.
    */
    export type IPageIShoppingSaleInquiryComment = {
        /**
         * Page information.
         *
         * @title Page information
        */
        pagination: Schema.IPage.IPagination;
        /**
         * List of records.
         *
         * @title List of records
        */
        data: Schema.IShoppingSaleInquiryComment[];
    };
    export namespace IPage {
        /**
         * Page information.
        */
        export type IPagination = {
            /**
             * Current page number.
             *
             * @title Current page number
            */
            current: number & tags.Type<"int32">;
            /**
             * Limitation of records per a page.
             *
             * @title Limitation of records per a page
            */
            limit: number & tags.Type<"int32">;
            /**
             * Total records in the database.
             *
             * @title Total records in the database
            */
            records: number & tags.Type<"int32">;
            /**
             * Total pages.
             *
             * Equal to {@link records} / {@link limit} with ceiling.
             *
             * @title Total pages
            */
            pages: number & tags.Type<"int32">;
        };
    }
    /**
     * A comment written on an inquiry article.
     *
     * `IShoppingSaleInquiryComment` is a subtype entity of {@link IBbsArticleComment},
     * and is used when you want to communicate with multiple people about an
     * {@link IShoppingSaleInquiry inquiry} written by a
     * {@link IShoppingCustomer customer}.
     *
     * For reference, only related parties can write comments for
     * {@link IShoppingSeller sellers}, but there is no limit to
     * {@link IShoppingCustomer customers}. In other words, anyone customer can
     * freely write a comment, even if they are not the person who wrote the inquiry.
    */
    export type IShoppingSaleInquiryComment = {
        /**
         * Writer of the comment.
         *
         * Both customer and seller can write comment on the sale inquiry.
         *
         * By the way, no restriction on the customer, but seller must be the
         * person who've registered the sale.
         *
         * @title Writer of the comment
        */
        writer: any | any | any;
        /**
         * Primary Key.
         *
         * @title Primary Key
        */
        id: string;
        /**
         * Parent comment's ID.
         *
         * @title Parent comment's ID
        */
        parent_id: null | (string & tags.Format<"uuid">);
        /**
         * List of snapshot contents.
         *
         * It is created for the first time when a comment being created, and is
         * accumulated every time the comment is modified.
         *
         * @title List of snapshot contents
        */
        snapshots: Schema.IBbsArticleComment.ISnapshot[];
        /**
         * Creation time of comment.
         *
         * @title Creation time of comment
        */
        created_at: string;
    };
    export namespace IShoppingAdministrator {
        export type IInvert = any;
    }
    export type IShoppingCustomer = any;
    export namespace IShoppingSeller {
        export type IInvert = any;
    }
    export namespace IBbsArticleComment {
        /**
         * Snapshot of comment.
         *
         * `IBbsArticleComment.ISnapshot` is a snapshot entity that contains
         * the contents of the comment.
         *
         * As mentioned in {@link IBbsArticleComment}, designed to keep evidence
         * and prevent fraud.
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
type IAutoViewTransformerInputType = Schema.IPageIShoppingSaleInquiryComment;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // If there are no comments, show a friendly markdown message
    if (!input.data || input.data.length === 0) {
        return {
            type: "Markdown",
            content: "**No comments available**"
        };
    }

    // Build a DataList of comments
    const items: IAutoView.IAutoViewDataListItemProps[] = input.data.map(comment => {
        // Use the last snapshot as the current content
        const snapshots = comment.snapshots || [];
        const latest = snapshots[snapshots.length - 1];

        // Derive a displayable writer name if possible, otherwise serialize
        let writerName: string;
        try {
            // assume writer may have a "name" property
            writerName = (comment.writer && (comment.writer.name || comment.writer.username)) 
                ? String((comment.writer as any).name || (comment.writer as any).username)
                : JSON.stringify(comment.writer);
        } catch {
            writerName = String(comment.writer);
        }

        // Prepare the header label components: writer and timestamp
        const labelComponents: IAutoView.IAutoViewPresentationComponentProps[] = [
            {
                type: "Text",
                content: `Comment by ${writerName}`,
                variant: "subtitle2"
            },
            {
                type: "Text",
                content: comment.created_at,
                variant: "caption",
                color: "gray"
            }
        ];

        // Prepare the body content: markdown for the comment text
        const valueComponents: IAutoView.IAutoViewPresentationComponentProps[] = [];
        if (latest && typeof latest.body === "string") {
            valueComponents.push({
                type: "Markdown",
                content: latest.body
            });
        }

        // If there are attachments, show them as a group of chips
        if (latest && Array.isArray(latest.files) && latest.files.length > 0) {
            const chips: IAutoView.IAutoViewChipProps[] = latest.files.map(file => {
                const ext = file.extension ? `.${file.extension}` : "";
                return {
                    type: "Chip",
                    label: `${file.name}${ext}`,
                    variant: "outlined",
                    startElement: {
                        type: "Icon",
                        id: "file",
                        size: 16,
                        color: "gray"
                    }
                };
            });
            valueComponents.push({
                type: "ChipGroup",
                childrenProps: chips
            });
        }

        return {
            type: "DataListItem",
            label: labelComponents,
            value: valueComponents.length > 0 ? valueComponents : undefined
        };
    });

    // Return the complete DataList component
    return {
        type: "DataList",
        childrenProps: items
    };
}

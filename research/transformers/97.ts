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
    // Extract the list of comments from the paginated input
    const comments = input.data ?? [];

    // If there are no comments, show a friendly message
    if (comments.length === 0) {
        return {
            type: "Text",
            // Single string is also allowed for content
            content: "No comments available",
            variant: "body1",
        };
    }

    // Transform each comment into a DataListItemProps
    const listItems: IAutoView.IAutoViewDataListItemProps[] = comments.map((comment) => {
        // Safely get the snapshots array
        const snapshots = comment.snapshots ?? [];
        // Use the latest snapshot for display; fallback to a placeholder
        const latestSnapshot = snapshots.length > 0
            ? snapshots[snapshots.length - 1]
            : undefined;
        const bodyContent = latestSnapshot?.body ?? "_No content available_";

        // Build Markdown component for the comment body
        const commentMarkdown: IAutoView.IAutoViewMarkdownProps = {
            type: "Markdown",
            content: bodyContent,
        };

        // If there are any attached files in the latest snapshot, show them as chips
        let fileGroup: IAutoView.IAutoViewChipGroupProps | undefined;
        if (latestSnapshot && Array.isArray(latestSnapshot.files) && latestSnapshot.files.length > 0) {
            const fileChips: IAutoView.IAutoViewChipProps[] = latestSnapshot.files.map((file) => {
                const fileName = file.extension
                    ? `${file.name}.${file.extension}`
                    : file.name;
                return {
                    type: "Chip",
                    label: fileName,
                    size: "small",
                    variant: "outlined",
                    // Use a generic file icon to indicate attachments
                    startElement: {
                        type: "Icon",
                        id: "file",
                        color: "gray",
                        size: 16,
                    },
                };
            });
            fileGroup = {
                type: "ChipGroup",
                childrenProps: fileChips,
            };
        }

        // Compose the array of value components: markdown + optional file list
        const valueComponents: IAutoView.IAutoViewPresentationComponentProps[] = [
            commentMarkdown,
        ];
        if (fileGroup) {
            valueComponents.push(fileGroup);
        }

        // Build the DataListItem label showing created time & snapshot count
        const labelComponents: IAutoView.IAutoViewPresentationComponentProps[] = [];

        // Created timestamp
        labelComponents.push({
            type: "Text",
            content: [`📅 ${new Date(comment.created_at).toLocaleString()}`],
            variant: "subtitle2",
        });

        // Number of versions
        if (snapshots.length > 1) {
            labelComponents.push({
                type: "Text",
                content: [`🔄 ${snapshots.length} versions`],
                variant: "caption",
                color: "secondary",
            });
        }

        return {
            type: "DataListItem",
            // Use the composed label elements
            label: labelComponents,
            // Use the composed value elements
            value: valueComponents,
        };
    });

    // Return a DataList containing all comment items
    return {
        type: "DataList",
        childrenProps: listItems,
    };
}

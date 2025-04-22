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
    // Create list items for each comment
    const listItems: IAutoView.IAutoViewDataListItemProps[] = input.data.map((comment) => {
        // Use the latest snapshot (last in the array), or fallback to first if empty
        const snapshots = comment.snapshots || [];
        const latestSnapshot = snapshots[snapshots.length - 1] || snapshots[0];

        // Build a label with a user icon and comment identifier
        const labelComponents: IAutoView.IAutoViewPresentationComponentProps[] = [
            {
                type: "Icon",
                id: "user",       // user silhouette icon
                color: "gray",
                size: 20,
            },
            {
                type: "Text",
                // Fallback to comment.id if writer has no name property
                content: [typeof (comment as any).writer?.name === "string"
                    ? (comment as any).writer.name
                    : comment.id],
                variant: "subtitle2",
            },
        ];

        // If the snapshot has markdown or html, we render it directly
        // Use Markdown component for richer formatting support
        const valueComponent: IAutoView.IAutoViewMarkdownProps = {
            type: "Markdown",
            content: latestSnapshot?.body ?? "",
        };

        return {
            type: "DataListItem",
            label: labelComponents,
            value: valueComponent,
        };
    });

    // Build a DataList or fallback text if no comments
    const commentsSection: IAutoView.IAutoViewPresentationComponentProps = listItems.length > 0
        ? {
            type: "DataList",
            childrenProps: listItems,
        }
        : {
            type: "Text",
            // Inform the user there are no comments
            content: ["No comments found for this inquiry."],
            variant: "body2",
        };

    // Wrap everything in a VerticalCard to be responsive on mobile
    return {
        type: "VerticalCard",
        childrenProps: [
            {
                type: "CardHeader",
                title: `Comments (Page ${input.pagination.current} of ${input.pagination.pages})`,
                description: `Total: ${input.pagination.records}`,
                startElement: {
                    type: "Icon",
                    id: "comment",  // comment bubble icon
                    color: "blue",
                    size: 24,
                },
            },
            {
                type: "CardContent",
                // Embed the comments list or empty message
                childrenProps: commentsSection,
            },
        ],
    };
}

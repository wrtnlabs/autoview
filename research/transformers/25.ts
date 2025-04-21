import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
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
type IAutoViewTransformerInputType = Schema.IShoppingSaleInquiryComment;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    const { snapshots } = input;
    // If there are no snapshots, render a simple text message
    if (!Array.isArray(snapshots) || snapshots.length === 0) {
        return {
            type: "Text",
            content: "No comment available.",
            variant: "body2",
        };
    }

    // Helper: format ISO timestamp into local date/time string
    const formatDate = (iso: string): string => {
        try {
            return new Date(iso).toLocaleString();
        } catch {
            return iso;
        }
    };

    // Build a DataListItem for each snapshot record
    const dataListItems: IAutoView.IAutoViewDataListItemProps[] = snapshots.map((snapshot) => {
        // Render attachments (if any) as images under the snapshot body
        const attachmentImages: IAutoView.IAutoViewImageProps[] = (snapshot.files || []).map((file) => ({
            type: "Image",
            src: file.url,
            alt: file.name || file.extension || "attachment",
        }));

        // Value section: first the markdown body, then any attachments
        const valueComponents: IAutoView.IAutoViewPresentationComponentProps[] = [
            {
                type: "Markdown",
                content: snapshot.body,
            },
            // Spread attachments images if present
            ...attachmentImages,
        ];

        return {
            type: "DataListItem",
            // Show the snapshot timestamp in the label (lighter caption style)
            label: [
                {
                    type: "Text",
                    content: formatDate(snapshot.created_at),
                    variant: "caption",
                },
            ],
            value: valueComponents,
        };
    });

    const dataListProps: IAutoView.IAutoViewDataListProps = {
        type: "DataList",
        childrenProps: dataListItems,
    };

    // Identify the latest snapshot for the collapse header
    const latestSnapshot = snapshots[snapshots.length - 1];
    const headerMarkdown: IAutoView.IAutoViewMarkdownProps = {
        type: "Markdown",
        content: latestSnapshot.body,
    };
    const headerTimestamp: IAutoView.IAutoViewTextProps = {
        type: "Text",
        content: `Last updated: ${formatDate(latestSnapshot.created_at)}`,
        variant: "caption",
    };

    // Main UI: a collapsible panel showing the latest comment,
    // with history of edits in a DataList inside the content.
    return {
        type: "Collapse",
        header: {
            type: "CollapseHeader",
            // Provide a clear toggle icon
            toggleIcon: {
                type: "Icon",
                id: "chevron-down",
                size: 16,
            },
            childrenProps: [headerMarkdown, headerTimestamp],
        },
        content: {
            type: "CollapseContent",
            // Embed the data list of snapshot history
            childrenProps: [dataListProps],
        },
    };
}

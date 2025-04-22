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
    // Derive a human-readable writer display
    const writerDisplay: string = (() => {
        if (typeof input.writer === "string") return input.writer;
        // Try common name or username property
        const maybeName = (input.writer as any).name || (input.writer as any).username;
        if (typeof maybeName === "string" && maybeName.length > 0) return maybeName;
        // Fallback to JSON representation (truncated)
        try {
            const json = JSON.stringify(input.writer);
            return json.length > 20 ? json.slice(0, 17) + "..." : json;
        } catch {
            return "Unknown";
        }
    })();

    // Build the CardHeader: shows writer avatar, name, ID and creation time
    const header: IAutoView.IAutoViewCardHeaderProps = {
        type: "CardHeader",
        // Use an avatar with writerDisplay initials
        startElement: {
            type: "Avatar",
            name: writerDisplay,
        },
        // Title is writer name or fallback
        title: writerDisplay,
        // Secondary text is the comment ID
        description: `Comment ID: ${input.id}`,
        // Show the creation timestamp on the right
        endElement: {
            type: "Text",
            variant: "caption",
            content: input.created_at,
        },
    };

    // Prepare snapshot list items
    const snapshotItems: IAutoView.IAutoViewDataListItemProps[] = input.snapshots.map(snapshot => {
        // Build markdown for attachments if any
        let attachmentsSection = "";
        if (Array.isArray(snapshot.files) && snapshot.files.length > 0) {
            attachmentsSection =
                "\n\n**Attachments**:\n" +
                snapshot.files
                    .map(file => {
                        const filename =
                            file.name && file.extension
                                ? `${file.name}.${file.extension}`
                                : file.name || file.extension
                                ? file.name + file.extension
                                : "file";
                        return `- [${filename}](${file.url})`;
                    })
                    .join("\n");
        }

        // Combine body and attachments into one markdown string
        const markdownContent = snapshot.body + attachmentsSection;

        return {
            type: "DataListItem",
            // Show the snapshot timestamp in the label
            label: [
                {
                    type: "Text",
                    variant: "subtitle2",
                    content: snapshot.created_at,
                },
            ],
            // Render the markdown of the snapshot content
            value: [
                {
                    type: "Markdown",
                    content: markdownContent,
                },
            ],
        };
    });

    // If there are no snapshots, show a placeholder message
    const contentChildren: IAutoView.IAutoViewPresentationComponentProps[] = [];
    if (input.parent_id) {
        // Indicate this is a reply comment
        contentChildren.push({
            type: "Chip",
            label: `Reply to: ${input.parent_id}`,
            color: "info",
            variant: "outlined",
        });
    }
    if (snapshotItems.length > 0) {
        contentChildren.push({
            type: "DataList",
            childrenProps: snapshotItems,
        });
    } else {
        contentChildren.push({
            type: "Text",
            variant: "body2",
            content: "No snapshots available.",
        });
    }

    // Compose the VerticalCard with header and content
    const cardContent: IAutoView.IAutoViewCardContentProps = {
        type: "CardContent",
        childrenProps: contentChildren,
    };

    return {
        type: "VerticalCard",
        childrenProps: [header, cardContent],
    };
}

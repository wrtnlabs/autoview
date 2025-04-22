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
    // Safely extract writer's name if available
    const writerName =
        input.writer && typeof (input.writer as any).name === "string"
            ? (input.writer as any).name
            : "Unknown";
    // Prepare a chip for the comment ID
    const idChip: IAutoView.IAutoViewChipProps = {
        type: "Chip",
        label: `#${input.id}`,
        variant: "outlined",
        color: "primary",
        size: "small",
    };
    // Optionally prepare a chip for the parent ID if it exists
    const parentChip: IAutoView.IAutoViewChipProps | undefined =
        input.parent_id
            ? {
                  type: "Chip",
                  label: `Parent: ${input.parent_id}`,
                  variant: "outlined",
                  color: "secondary",
                  size: "small",
              }
            : undefined;
    // Build the header: show writer, creation time, and ID chips
    const header: IAutoView.IAutoViewCardHeaderProps = {
        type: "CardHeader",
        title: writerName,
        description: `Created at: ${input.created_at}`,
        startElement: idChip,
        // only include parent chip if we have a parent_id
        ...(parentChip && { endElement: parentChip }),
    };
    // Build the content: list snapshots if any, else show a placeholder text
    let contentChildren: IAutoView.IAutoViewPresentationComponentProps;
    if (input.snapshots.length === 0) {
        // No snapshots: show a friendly message
        contentChildren = {
            type: "Text",
            variant: "body2",
            content: "No revisions available.",
        };
    } else {
        // Transform each snapshot into a DataListItemProps
        const items: IAutoView.IAutoViewDataListItemProps[] = input.snapshots.map(
            (snapshot, index) => {
                // Compose markdown content for body and attachments
                let md = snapshot.body;
                if (snapshot.files && snapshot.files.length > 0) {
                    const attachmentsMd = snapshot.files
                        .map(
                            (f) =>
                                `- [${f.name}${f.extension ? "." + f.extension : ""}](${f.url})`
                        )
                        .join("\n");
                    md += `\n\n**Attachments:**\n${attachmentsMd}`;
                }
                return {
                    type: "DataListItem",
                    // Use Text components for label: snapshot index and timestamp
                    label: [
                        {
                            type: "Text",
                            variant: "subtitle2",
                            content: `Revision ${index + 1} (${snapshot.id})`,
                        },
                        {
                            type: "Text",
                            variant: "caption",
                            content: `At: ${snapshot.created_at}`,
                        },
                    ],
                    // Render the snapshot content as markdown
                    value: {
                        type: "Markdown",
                        content: md,
                    },
                };
            }
        );
        // Wrap the items array into a DataList component
        contentChildren = {
            type: "DataList",
            childrenProps: items,
        };
    }
    const content: IAutoView.IAutoViewCardContentProps = {
        type: "CardContent",
        childrenProps: contentChildren,
    };
    // Footer: show total number of snapshots
    const footer: IAutoView.IAutoViewCardFooterProps = {
        type: "CardFooter",
        childrenProps: {
            type: "Chip",
            label: `Revisions: ${input.snapshots.length}`,
            color: "info",
            size: "small",
        },
    };
    // Compose final VerticalCard to display the comment
    return {
        type: "VerticalCard",
        childrenProps: [header, content, footer],
    };
}

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
  // Determine a displayable label for the writer
  // If `writer.id` exists, use it; otherwise fallback to a generic "User"
  const writerLabel: string =
    typeof input.writer === "object" && input.writer !== null && "id" in input.writer && typeof (input.writer as any).id === "string"
      ? (input.writer as any).id
      : "User";

  // Grab the latest snapshot for display (most recent edit)
  const latestSnapshot = input.snapshots[input.snapshots.length - 1];

  // Prepare a list of attachment items (if any) to show as a DataList
  const attachmentItems: IAutoView.IAutoViewDataListItemProps[] =
    Array.isArray(latestSnapshot.files) && latestSnapshot.files.length > 0
      ? latestSnapshot.files.map((file) => {
          // Compose a filename with extension
          const filename = file.extension ? `${file.name}.${file.extension}` : file.name;
          return {
            type: "DataListItem",
            // Use a Text component for the filename label
            label: {
              type: "Text",
              variant: "body2",
              content: filename,
            },
            // A button to download or open the file
            value: {
              type: "Button",
              variant: "text",
              label: "Download",
              href: file.url,
            },
          };
        })
      : [];

  // If there are attachments, wrap them in a DataList component
  const attachmentsDataList: IAutoView.IAutoViewDataListProps | undefined =
    attachmentItems.length > 0
      ? {
          type: "DataList",
          childrenProps: attachmentItems,
        }
      : undefined;

  return {
    // Use a vertical card to lay out the comment cleanly and responsively
    type: "VerticalCard",
    childrenProps: [
      {
        // Card header with the writer's label and creation timestamp
        type: "CardHeader",
        title: writerLabel,
        description: `Posted: ${new Date(input.created_at).toLocaleString()}`,
        startElement: {
          // A simple user icon
          type: "Icon",
          id: "user",
          color: "gray",
          size: 24,
        },
      },
      {
        // Main content of the card: the body rendered as markdown
        type: "CardContent",
        childrenProps: [
          {
            type: "Markdown",
            content: latestSnapshot.body,
          },
          // Include attachments list if any
          ...(attachmentsDataList ? [attachmentsDataList] : []),
        ],
      },
      {
        // Footer showing number of revisions (snapshots)
        type: "CardFooter",
        childrenProps: {
          type: "Chip",
          label: `Revisions: ${input.snapshots.length}`,
          color: "info",
          size: "small",
          variant: "outlined",
        },
      },
    ],
  };
}

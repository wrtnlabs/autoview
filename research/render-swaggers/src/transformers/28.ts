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
  // Sort snapshots chronologically and pick the latest
  const sortedSnapshots = [...input.snapshots].sort((a, b) =>
    a.created_at.localeCompare(b.created_at)
  );
  const latestSnapshot = sortedSnapshots[sortedSnapshots.length - 1];

  // Helper to render attachment list if files are present
  function renderAttachments() : IAutoView.IAutoViewDataListProps | undefined {
    if (!latestSnapshot || !latestSnapshot.files || latestSnapshot.files.length === 0) {
      return undefined;
    }
    return {
      type: "DataList",
      childrenProps: latestSnapshot.files.map((file) => {
        // Compose a button linking to the file URL, labeled by its full name
        const fileName = file.extension ? `${file.name}.${file.extension}` : file.name;
        return {
          type: "DataListItem",
          label: {
            type: "Icon",
            id: "file",
            color: "gray",
            size: 20
          },
          value: {
            type: "Button",
            variant: "text",
            label: fileName,
            href: file.url
          }
        };
      })
    };
  }

  // Build the list of children for the card content
  const contentChildren: IAutoView.IAutoViewPresentationComponentProps[] = [];

  if (latestSnapshot) {
    // Use Markdown component for the body (supports md, txt, html)
    contentChildren.push({
      type: "Markdown",
      content: latestSnapshot.body
    });
    // Push attachments list if any
    const attachmentsList = renderAttachments();
    if (attachmentsList) {
      contentChildren.push(attachmentsList);
    }
  } else {
    // Fallback text if there is no snapshot
    contentChildren.push({
      type: "Text",
      content: "No content available.",
      variant: "body2"
    });
  }

  // Main UI: a vertical card showing writer, timestamp, content, and attachments
  return {
    type: "VerticalCard",
    childrenProps: [
      {
        type: "CardHeader",
        // Display writer identity as the title (fallback to string conversion)
        title: String(input.writer),
        // Show creation time of the comment
        description: `Posted at ${new Date(input.created_at).toLocaleString()}`,
        // Use an avatar with the writer's name initials
        startElement: {
          type: "Avatar",
          name: String(input.writer),
          variant: "gray",
          size: 32
        }
      },
      {
        type: "CardContent",
        childrenProps: contentChildren
      }
    ]
  };
}

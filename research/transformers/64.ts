import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
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
type IShoppingSaleInquiryComment = {
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
    snapshots: IBbsArticleComment.ISnapshot[];
    /**
     * Creation time of comment.
     *
     * @title Creation time of comment
    */
    created_at: string;
};
namespace IShoppingAdministrator {
    export type IInvert = any;
}
type IShoppingCustomer = any;
namespace IShoppingSeller {
    export type IInvert = any;
}
namespace IBbsArticleComment {
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
        files: IAttachmentFile.ICreate[];
    };
}
namespace IAttachmentFile {
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
type IAutoViewTransformerInputType = IShoppingSaleInquiryComment;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Construct a card header to display writer information and creation time.
  // Use an icon to visually indicate the writer.
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    // If writer is a string, use it; otherwise, if not available or not a string, fallback to "Anonymous"
    title: typeof input.writer === "string" ? input.writer : "Anonymous",
    description: `Comment created at: ${input.created_at}`,
    startElement: {
      type: "Icon",
      id: "user", // using a generic user icon
      color: "blue",
      size: 24,
    },
  };

  // Combine all snapshot data into a markdown content block.
  // For each snapshot, include the creation time as a header and the body.
  // If there are file attachments, include them as markdown image links.
  let combinedMarkdown = "";
  if (input.snapshots && input.snapshots.length > 0) {
    // Sort snapshots by creation time (ascending) so the earliest appears first.
    const sortedSnapshots = [...input.snapshots].sort((a, b) => a.created_at.localeCompare(b.created_at));
    combinedMarkdown = sortedSnapshots.map(snapshot => {
      // Start with the snapshot timestamp and body text.
      let snapshotMd = `#### Snapshot from ${snapshot.created_at}\n${snapshot.body}`;
      // If there are file attachments, append an image markdown for each file.
      if (snapshot.files && snapshot.files.length > 0) {
        const attachmentsMd = snapshot.files.map(file => {
          // Build the file name with extension if available.
          const fileName = file.extension ? `${file.name}.${file.extension}` : file.name;
          // Use markdown image syntax to visually represent the attachment.
          return `![](${file.url})\n*${fileName}*`;
        }).join("\n");
        snapshotMd += `\n\n${attachmentsMd}`;
      }
      return snapshotMd;
    }).join("\n\n---\n\n"); // Separate snapshots with a horizontal rule in markdown.
  } else {
    // In case there are no snapshots available, show a default message.
    combinedMarkdown = "#### No snapshot available\nNo content to display.";
  }

  // Create a markdown component to render the combined snapshot content.
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: {
      type: "Markdown",
      content: combinedMarkdown,
    },
  };

  // Create a footer to display additional metadata such as Comment ID and Parent Comment ID.
  // Use a text component for a compact and declarative display.
  const footer: IAutoView.IAutoViewCardFooterProps = {
    type: "CardFooter",
    childrenProps: {
      type: "Text",
      // Use markdown-like text to clearly denote metadata.
      content: `Comment ID: ${input.id}${input.parent_id ? ` (Reply to: ${input.parent_id})` : ""}`,
      variant: "caption",
      color: "gray",
    },
  };

  // Combine the header, content, and footer into a vertical card
  // This vertical card provides a unified visual representation that is both responsive and engaging.
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [
      header,
      content,
      footer,
    ],
  };

  // Return the composed vertical card as the final transformed UI component.
  return verticalCard;
}

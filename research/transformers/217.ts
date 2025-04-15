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
  // Transform the input comment data into a visually engaging vertical card

  // Prepare the writer information: if writer is not a string, convert it to a string representation.
  // In production, the writer can be an object, so using JSON.stringify may be acceptable
  const writerDisplay: string =
    typeof input.writer === "string"
      ? input.writer
      : (input.writer ? JSON.stringify(input.writer) : "Unknown");

  // Prepare markdown content from snapshots.
  // For each snapshot, create a bullet list with details.
  // If there are no snapshots, include a fallback message.
  const snapshotContent = input.snapshots && input.snapshots.length > 0
    ? input.snapshots
        .map((snapshot) => {
          // Escape any markdown-sensitive characters if necessary.
          return `- **Snapshot ID:** ${snapshot.id}
   - **Time:** ${snapshot.created_at}
   - **Format:** ${snapshot.format}
   - **Content:** ${snapshot.body}`;
        })
        .join("\n\n")
    : "No snapshot content available.";

  // Create header using a CardHeader component with an icon to represent the writer.
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: `Comment from ${writerDisplay}`,
    description: `Created at ${input.created_at}`,
    // Display a user icon to make the header visually engaging.
    startElement: {
      type: "Icon",
      id: "user", // icon name: "user" (assume this icon exists in the icon library)
      color: "blue",
      size: 24
    }
  };

  // Create content using a Markdown component that displays snapshot details.
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    // Use a markdown component to render rich formatted text.
    childrenProps: {
      type: "Markdown",
      content: snapshotContent
    }
  };

  // Create a footer using a Text component summarizing comment identifiers.
  const footer: IAutoView.IAutoViewCardFooterProps = {
    type: "CardFooter",
    childrenProps: {
      type: "Text",
      // Compose a message that includes the comment ID and, if available, the parent comment ID.
      content: `Comment ID: ${input.id}${input.parent_id ? " (Reply to " + input.parent_id + ")" : ""}`,
      variant: "caption",
      color: "secondary"
    }
  };

  // Assemble the final vertical card which contains header, content, and footer
  const card: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    // The childrenProps can be an array of presentation components.
    childrenProps: [header, content, footer]
  };

  return card;
}

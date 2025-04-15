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
  // Create a CardHeader to display key metadata about the comment.
  // We use an Icon as the start element to add a visual cue.
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    // If input.writer is a string, use it directly; otherwise, we default to a generic label.
    title: typeof input.writer === "string" ? `Comment by ${input.writer}` : "Comment",
    description: `Created at: ${input.created_at}`,
    startElement: {
      type: "Icon",
      id: "comment", // using a comment icon (must be in kebab-case)
      size: 20,
      color: "blue"
    }
  };

  // Process each snapshot from the comment to provide rich markdown details.
  // If there are no snapshots, we display a fallback markdown message.
  let markdownComponents: IAutoView.IAutoViewMarkdownProps[] = [];
  if (Array.isArray(input.snapshots) && input.snapshots.length > 0) {
    markdownComponents = input.snapshots.map((snapshot) => {
      // Prepare attachment details if available.
      let attachmentsMarkdown = "";
      if (Array.isArray(snapshot.files) && snapshot.files.length > 0) {
        // Each attachment will be shown as a markdown list item with a hyperlink.
        attachmentsMarkdown = "\n\n**Attachments:**\n" + snapshot.files.map((file) => {
          // If file.name is empty, a fallback will be used.
          const fileName = file.name || "file";
          // Display as a link; the markdown is responsive and works well on all screen sizes.
          return `- [${fileName}${file.extension ? "." + file.extension : ""}](${file.url})`;
        }).join("\n");
      }
      // Construct markdown content with snapshot metadata and content body.
      const content = `**Snapshot ID:** ${snapshot.id}\n\n` +
                      `**Created at:** ${snapshot.created_at}\n\n` +
                      `${snapshot.body}` +
                      attachmentsMarkdown;
      return {
        type: "Markdown",
        content
      };
    });
  } else {
    // If snapshots array is empty, provide a friendly message.
    markdownComponents = [{
      type: "Markdown",
      content: "No snapshot details available for this comment."
    }];
  }

  // Compose the CardContent by including the markdown components.
  // If there is only one markdown component, we pass it directly; otherwise, we pass as an array.
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: markdownComponents.length === 1 ? markdownComponents[0] : markdownComponents
  };

  // Finally, combine the header and content into a VerticalCard.
  // VerticalCard supports responsive layouts on desktop and mobile.
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [cardHeader, cardContent]
  };

  return verticalCard;
}

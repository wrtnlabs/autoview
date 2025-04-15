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
  // Extract the latest snapshot if available.
  // The latest snapshot will be used to render the comment body and attachments.
  const latestSnapshot =
    input.snapshots && input.snapshots.length > 0
      ? input.snapshots[input.snapshots.length - 1]
      : null;

  // Build the header component.
  // Displays the comment ID and creation time.
  // Uses an icon (a user icon) as a visual cue for the writer.
  const headerComponent: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: `Comment ID: ${input.id}`,
    description: `Created At: ${input.created_at}`,
    // The startElement only accepts certain types.
    // We create an icon component to represent the writer (this could be enhanced if writer details are more complex).
    startElement: {
      id: "user", // Using a generic user icon identifier in kebab-case without prefix.
      type: "Icon",
      size: 20,
      color: "blue"
    }
  };

  // Build the content component.
  // We prefer a markdown presentation for the comment body.
  // This allows richer formatting (and even support for diagrams with mermaid syntax).
  const contentText = latestSnapshot ? latestSnapshot.body : "No content available.";
  const contentComponent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    // The IAutoViewMarkdownProps component is embedded here for proper markdown rendering.
    childrenProps: {
      content: contentText,
      type: "Markdown"
    }
  };

  // Build the footer component if there are any attachment files in the latest snapshot.
  // In this case, we display a button with a file icon to indicate that attachments are available.
  let footerComponent: IAutoView.IAutoViewCardFooterProps | null = null;
  if (latestSnapshot && latestSnapshot.files && latestSnapshot.files.length > 0) {
    // Create a button that shows the number of attachments.
    const attachmentsButton: IAutoView.IAutoViewButtonProps = {
      type: "Button",
      variant: "outlined",
      color: "primary",
      // Use a label that visually informs the user about available attachments.
      label: `View Attachments (${latestSnapshot.files.length})`,
      // Use an icon to draw attention to the attachments.
      startElement: {
        id: "file", // Assuming "file" is a valid icon name in kebab-case (without the prefix as required).
        type: "Icon",
        size: 16,
        color: "gray"
      }
    };

    footerComponent = {
      type: "CardFooter",
      // childrenProps can accept a single component.
      childrenProps: attachmentsButton
    };
  }

  // Compose the overall UI as a Vertical Card.
  // This ensures a responsive layout suitable for both desktops and mobile devices.
  const verticalCardComponent: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    // The card contains a header, content, and (optionally) a footer.
    childrenProps: footerComponent
      ? [headerComponent, contentComponent, footerComponent]
      : [headerComponent, contentComponent]
  };

  // Return the final UI component.
  return verticalCardComponent;
}

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
  // Determine the writer's name.
  // We assume that if "writer" is a string, then it's the name; if not, default to "Anonymous".
  const writerName = typeof input.writer === "string" && input.writer.trim().length > 0
    ? input.writer
    : "Anonymous";

  // Choose the most recent snapshot (if any) from the snapshots array.
  // We assume the last snapshot is the most current version.
  const latestSnapshot = Array.isArray(input.snapshots) && input.snapshots.length > 0
    ? input.snapshots[input.snapshots.length - 1]
    : null;

  // Prepare markdown content for the comment body.
  // If there's no snapshot available, we use a fallback message.
  const markdownContent = latestSnapshot && typeof latestSnapshot.body === "string"
    ? latestSnapshot.body
    : "No content available.";

  // Create a visual avatar element to represent the writer.
  // We use the Avatar component with a primary color and a moderate size.
  const avatarElement: IAutoView.IAutoViewAvatarProps = {
    type: "Avatar",
    name: writerName,
    // Optionally, if there was a URL for an image in future, we can assign src.
    variant: "primary",
    size: 40
  };

  // Create a card header to display the writer information.
  // Here we use the CardHeader component and include the avatar element as the startElement.
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: `Comment by: ${writerName}`,
    // The startElement is allowed to be an Avatar component.
    startElement: avatarElement,
    // Optionally, a description can be added if more writer info is available.
  };

  // Create a card content section using a Markdown component.
  // This ensures that text is rendered in a visually engaging way rather than plain text.
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: {
      type: "Markdown",
      content: markdownContent
    }
  };

  // Create a card footer to display meta information such as the creation time.
  // Here we use a text component with a "caption" variant for subtle display.
  const footerText: IAutoView.IAutoViewTextProps = {
    type: "Text",
    variant: "caption",
    // Render the creation timestamp.
    content: `Created at: ${input.created_at}`
  };

  const cardFooter: IAutoView.IAutoViewCardFooterProps = {
    type: "CardFooter",
    childrenProps: footerText
  };

  // Assemble the vertical card.
  // The VerticalCard component accepts multiple child components including CardHeader, CardContent, and CardFooter.
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [
      cardHeader,
      cardContent,
      cardFooter
    ]
  };

  // Return the final aggregated UI component.
  return verticalCard;
}

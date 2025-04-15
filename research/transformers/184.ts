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
  // Extract the most recent snapshot from the snapshots array.
  // If there is no snapshot available, we will fallback to an empty content string.
  const snapshots = input.snapshots || [];
  const latestSnapshot = snapshots.length > 0 ? snapshots[snapshots.length - 1] : null;
  const markdownContent = latestSnapshot ? latestSnapshot.body : "No content available";

  // Prepare the card header.
  // We try to extract a writer name if available; if not, default to "Unknown Author"
  let writerName = "Unknown Author";
  // If writer is a string, use it directly; if it's an object with a name, use that.
  if (typeof input.writer === "string") {
    writerName = input.writer;
  } else if (input.writer && typeof input.writer === "object" && "name" in input.writer && typeof input.writer.name === "string") {
    writerName = input.writer.name;
  }

  // Create a CardHeader component.
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: `Comment by ${writerName}`,
    description: `Posted at ${input.created_at}`,
    // Use an icon representing a user as the start element.
    startElement: {
      type: "Icon",
      id: "user", // using a generic user icon name
      size: 20,
      color: "blue"
    }
  };

  // Create a CardContent component.
  // We leverage the Markdown component for rich text rendering.
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    // Directly nest a Markdown component here to render the comment body.
    childrenProps: {
      type: "Markdown",
      content: markdownContent
    }
  };

  // Create a CardFooter component.
  // If there are any attachments from the latest snapshot, display them as icons.
  let attachmentIcons: IAutoView.IAutoViewIconProps[] = [];
  if (latestSnapshot && Array.isArray(latestSnapshot.files) && latestSnapshot.files.length > 0) {
    attachmentIcons = latestSnapshot.files.map(file => {
      // Here we use a paperclip icon to visually represent an attachment.
      // We do not display file details but use the icon as a cue that there is an attachment.
      return {
        type: "Icon",
        id: "paperclip",
        size: 16,
        color: "gray"
      };
    });
  }

  // Additionally, include a text component to show the creation date.
  const footerText: IAutoView.IAutoViewTextProps = {
    type: "Text",
    variant: "caption",
    // Use markdown-friendly text display as fallback if there are no attachments.
    content: `Created at ${input.created_at}`
  };

  const footerChildren: (IAutoView.IAutoViewIconProps | IAutoView.IAutoViewTextProps)[] =
    attachmentIcons.length > 0 ? [...attachmentIcons, footerText] : [footerText];

  const footer: IAutoView.IAutoViewCardFooterProps = {
    type: "CardFooter",
    childrenProps: footerChildren
  };

  // Compose and return a Vertical Card component that aggregates the header, content and footer.
  // This card layout is chosen for its responsive nature, and its children will automatically
  // stack on small screens.
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [header, content, footer]
  };

  return verticalCard;
}

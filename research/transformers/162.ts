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
  // Determine a display name for the writer.
  // If the writer has a "name" property, use it; otherwise, convert it to a string.
  const writerName =
    input.writer && typeof input.writer === "object" && "name" in input.writer
      ? (input.writer as any).name
      : String(input.writer);

  // Create an avatar component that will be used in the header.
  // Using a neutral size (32) so that it's visible on both desktop and mobile.
  const avatarHeader: IAutoView.IAutoViewAvatarProps = {
    type: "Avatar",
    name: writerName,
    size: 32,
  };

  // Build a CardHeader to display general information about the comment.
  // The header uses the avatar as its startElement.
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: `Comment ID: ${input.id}`,
    description: `Created at: ${input.created_at}`,
    startElement: avatarHeader,
    // endElement could be used for additional metadata if available.
  };

  // Retrieve the most recent snapshot if available.
  const latestSnapshot = input.snapshots && input.snapshots.length > 0
    ? input.snapshots[input.snapshots.length - 1]
    : null;

  // Construct markdown content.
  // We use a markdown component rather than plain text to allow for more engaging UI formatting.
  // In this case, we insert the snapshot body into a markdown block.
  const markdownContent: IAutoView.IAutoViewMarkdownProps = {
    type: "Markdown",
    content: latestSnapshot
      ? `### Comment Snapshot\n\n${latestSnapshot.body}`
      : "### No snapshot available",
  };

  // Prepare the main content of the card by embedding the markdown.
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: markdownContent,
  };

  // If the latest snapshot includes file attachments, create a list to display them.
  // Each attachment is represented as a DataListItem with a textual label and a download button.
  let cardFooter: IAutoView.IAutoViewCardFooterProps | undefined = undefined;
  if (latestSnapshot && latestSnapshot.files && latestSnapshot.files.length > 0) {
    // Transform each attachment file into a DataListItem.
    const attachmentItems: IAutoView.IAutoViewDataListItemProps[] = latestSnapshot.files.map((file) => {
      // Create a text component to show the file name with its extension (if any)
      const fileName = file.extension ? `${file.name}.${file.extension}` : file.name;
      const fileText: IAutoView.IAutoViewTextProps = {
        type: "Text",
        content: fileName,
        variant: "body1",
      };

      // Create a button component linking to the file URL for downloading.
      const downloadButton: IAutoView.IAutoViewButtonProps = {
        type: "Button",
        label: "Download",
        href: file.url,
        variant: "outlined",
        size: "small",
      };

      // Return a DataListItem combining both the file name and the download button.
      return {
        type: "DataListItem",
        // Using label to display the file name; additional info is provided in the value.
        label: fileText,
        value: downloadButton,
      };
    });

    // Create a DataList to encapsulate all attachment items.
    const attachmentsList: IAutoView.IAutoViewDataListProps = {
      type: "DataList",
      childrenProps: attachmentItems,
    };

    // Place the DataList inside a CardFooter for visual separation.
    cardFooter = {
      type: "CardFooter",
      childrenProps: [
        // Optionally, include a header text via a Text component.
        {
          type: "Text",
          content: "Attachments",
          variant: "subtitle2",
        },
        attachmentsList,
      ],
    };
  }

  // Compose the final UI component using a Vertical Card.
  // The vertical card arranges the header, content, and (optionally) footer vertically.
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: cardFooter
      ? [cardHeader, cardContent, cardFooter]
      : [cardHeader, cardContent],
  };

  return verticalCard;
}

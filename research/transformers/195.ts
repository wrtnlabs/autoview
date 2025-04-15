import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace IShoppingSaleInquiryComment {
    /**
     * Snapshot content of the comment.
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
type IAutoViewTransformerInputType = IShoppingSaleInquiryComment.ISnapshot;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // The goal is to transform the snapshot data into a card-style view
  // We use a VerticalCard that composes a header (with an icon), a markdown body for the comment,
  // and if there are any attachment files, a footer with chips representing each file.

  // Create a header component using CardHeader props.
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    // Title includes the primary identifier of the comment.
    title: `Comment ID: ${input.id}`,
    // Description shows a formatted creation date.
    description: `Created at: ${input.created_at}`,
    // Use an icon to visually indicate a comment.
    startElement: {
      type: "Icon",
      // Using "message" icon to denote discussion/comment. This should be a valid kebab-case icon.
      id: "message",
      color: "blue",
      size: 20,
    }
  };

  // Create a content section using the Markdown component.
  // We assume the body content is suitable for rendering as markdown regardless of its original format.
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    // We wrap the text body in a markdown component for improved presentation.
    childrenProps: {
      type: "Markdown",
      content: input.body
    }
  };

  // Prepare an array to hold any attachment file chips.
  let attachmentChips: IAutoView.IAutoViewChipProps[] = [];
  // Only create chips if there exists at least one file attachment.
  if (input.files && input.files.length > 0) {
    attachmentChips = input.files.map(file => {
      // Concatenate file name and extension (if provided) for display.
      const displayName = file.extension ? `${file.name}.${file.extension}` : file.name;
      return {
        type: "Chip",
        label: displayName,
        // Use a chip with an icon to indicate the file attachment.
        startElement: {
          type: "Icon",
          // Using "attachment" icon to represent files.
          id: "attachment",
          color: "gray",
          size: 16,
        },
        // Use a subtle outlined style for chip presentation.
        variant: "outlined",
        size: "small"
      };
    });
  }

  // Create a footer component only if there are attachment chips to display.
  let footer: IAutoView.IAutoViewCardFooterProps | undefined = undefined;
  if (attachmentChips.length > 0) {
    // Use a ChipGroup to visually group attachment chips.
    const chipGroup: IAutoView.IAutoViewChipGroupProps = {
      type: "ChipGroup",
      childrenProps: attachmentChips,
      // Optionally, you might limit the number of visible items.
      maxItems: attachmentChips.length
    };
    footer = {
      type: "CardFooter",
      // The footer holds the chip group as its child.
      childrenProps: chipGroup
    };
  }

  // Compose the Vertical Card which organizes header, content, and footer.
  // The childrenProps accepts either a single component or an array.
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: footer
      ? [header, content, footer]
      : [header, content]
  };

  // Return the final composed component.
  return verticalCard;
}

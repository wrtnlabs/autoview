import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace IShoppingSaleInquiryComment {
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
type IAutoViewTransformerInputType = Schema.IShoppingSaleInquiryComment.ISnapshot;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Helper: Format the created_at timestamp into a human-readable string
  const formattedDate = (() => {
    try {
      const date = new Date(input.created_at);
      // Fallback to raw string if invalid
      return isNaN(date.getTime())
        ? input.created_at
        : date.toLocaleString();
    } catch {
      return input.created_at;
    }
  })();

  // Helper: Map file format to an appropriate icon name
  const formatIconMap: Record<string, string> = {
    html: "file-code",
    md: "file-alt",
    txt: "file-alt",
  };
  const formatIconId = formatIconMap[input.format] || "file-alt";

  // Build the CardHeader with an icon chip for the format and timestamp in description
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: `Comment ID: ${input.id}`,
    description: `Created: ${formattedDate}`,
    // Show the format as a chip with an icon
    startElement: {
      type: "Chip",
      label: input.format.toUpperCase(),
      size: "small",
      variant: "outlined",
      // Prepend an icon inside the chip
      startElement: {
        type: "Icon",
        id: formatIconId,
        size: 16,
        color: "gray",
      },
    },
  };

  // Build the CardContent, selecting markdown when possible
  let contentComponent: IAutoView.IAutoViewComponentProps;
  if (input.format === "md" || input.format === "html") {
    // Use Markdown renderer for markdown or HTML content
    contentComponent = {
      type: "Markdown",
      content: input.body || "_No content provided_",
    };
  } else {
    // Fall back to plain text for other formats
    contentComponent = {
      type: "Text",
      variant: "body2",
      content: input.body || "No content provided.",
    };
  }
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: contentComponent,
  };

  // Build the CardFooter with attachment buttons if any
  let footer: IAutoView.IAutoViewCardFooterProps | undefined;
  if (Array.isArray(input.files) && input.files.length > 0) {
    const buttons: IAutoView.IAutoViewButtonProps[] = input.files.map((file) => {
      // Compose a label including extension if present
      const filename = file.extension
        ? `${file.name}.${file.extension}`
        : file.name || "file";
      return {
        type: "Button",
        variant: "text",
        size: "small",
        color: "primary",
        label: filename,
        href: file.url,
        startElement: {
          type: "Icon",
          id: "file",
          size: 16,
          color: "gray",
        },
      };
    });
    footer = {
      type: "CardFooter",
      // Render each attachment as a button
      childrenProps: buttons,
    };
  }

  // Assemble the VerticalCard with header, content, and optional footer
  const card: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: footer
      ? [header, content, footer]
      : [header, content],
  };

  return card;
}

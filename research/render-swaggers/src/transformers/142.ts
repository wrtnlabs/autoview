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
  // Helper to safely format the creation date
  const formattedDate = (() => {
    const date = new Date(input.created_at);
    // If invalid date, fallback to original string
    return isNaN(date.getTime())
      ? input.created_at
      : date.toLocaleString();
  })();

  // Prepare the markdown content based on the input format
  const markdownContent = (() => {
    switch (input.format) {
      case "md":
        // Already markdown
        return input.body;
      case "txt":
        // Wrap plain text in a code block for readability
        return "\n" + input.body + "\n```";
      case "html":
        // Show raw HTML inside a fenced code block to avoid unintended rendering
        return "```html\n" + input.body + "\n```";
      default:
        // Unknown format, treat as plain text
        return input.body;
    }
  })();

  // If there are attachments, build a DataList of download buttons
  const attachmentsList: IAutoView.IAutoViewDataListProps | undefined = 
    Array.isArray(input.files) && input.files.length > 0
      ? {
          type: "DataList",
          childrenProps: input.files.map((file) => {
            // Construct display name with extension, handling null extension
            const displayName = file.name + (file.extension ? "." + file.extension : "");
            return {
              type: "DataListItem",
              // Label consisting of a file icon and the file name
              label: [
                {
                  type: "Icon",
                  id: "file", // generic file icon
                  color: "gray",
                  size: 20,
                },
                {
                  type: "Text",
                  content: displayName,
                },
              ],
              // A "Download" button linking to the file URL
              value: {
                type: "Button",
                label: "Download",
                variant: "text",
                color: "primary",
                href: file.url,
              },
            };
          }),
        }
      : undefined;

  // Build the card header with an icon and key metadata
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: `Comment ${input.id}`,
    description: formattedDate,
    startElement: {
      type: "Icon",
      id: "comment",
      color: "blue",
      size: 24,
    },
  };

  // Card content: the comment body as markdown and optionally the attachments
  const contentChildren: IAutoView.IAutoViewPresentationComponentProps[] = [
    {
      type: "Markdown",
      content: markdownContent,
    },
  ];
  if (attachmentsList) {
    contentChildren.push(attachmentsList);
  }
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: contentChildren,
  };

  // If there are attachments, include a footer summarizing the count
  const footer: IAutoView.IAutoViewCardFooterProps | undefined =
    attachmentsList
      ? {
          type: "CardFooter",
          childrenProps: {
            type: "Text",
            content: `Attachments: ${input.files.length}`,
            variant: "body2",
            color: "tertiary",
          },
        }
      : undefined;

  // Compose the vertical card
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [
      header,
      content,
      // Only include footer if attachments exist
      ...(footer ? [footer] : []),
    ],
  };

  return verticalCard;
}

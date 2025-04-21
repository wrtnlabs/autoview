import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace IShoppingSaleInquiryAnswer {
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
             * In other words, creation time or update time or article.
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
             * Title of article.
             *
             * @title Title of article
            */
            title: string;
            /**
             * Content body of article.
             *
             * @title Content body of article
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
type IAutoViewTransformerInputType = Schema.IShoppingSaleInquiryAnswer.ISnapshot;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Attempt to parse and format the creation date; fallback to raw string if invalid
  const parsedDate = new Date(input.created_at);
  const formattedDate =
    isNaN(parsedDate.getTime()) 
      ? input.created_at 
      : parsedDate.toLocaleString();

  // Choose a renderer for the body: Markdown for markup formats, Text for plain text
  const bodyComponent: IAutoView.IAutoViewPresentationComponentProps =
    input.format === "txt"
      ? {
          type: "Text",
          content: input.body,
          variant: "body1",
        }
      : {
          type: "Markdown",
          content: input.body,
        };

  // Build a DataListItem for each attachment: label is file name, value is a download button
  const attachmentItems: IAutoView.IAutoViewDataListItemProps[] = input.files.map(
    (file) => {
      // Construct display name with extension if present
      const filename = file.extension
        ? `${file.name}.${file.extension}`
        : file.name || "(unnamed)";
      return {
        type: "DataListItem",
        // Show the file name
        label: {
          type: "Text",
          content: filename,
          variant: "body2",
        },
        // Provide a download link
        value: {
          type: "Button",
          label: "Download",
          variant: "text",
          size: "small",
          href: file.url,
        },
      };
    }
  );

  // Compose the card: header with icon, content with body, and footer with attachments (if any)
  const cardChildren: Array<
    IAutoView.IAutoViewCardHeaderProps |
    IAutoView.IAutoViewCardContentProps |
    IAutoView.IAutoViewCardFooterProps
  > = [];

  // Header: show title and creation date, with a file icon
  cardChildren.push({
    type: "CardHeader",
    title: input.title,
    description: formattedDate,
    startElement: {
      type: "Icon",
      id: "file",
      color: "blue",
      size: 20,
    },
  });

  // Content: render the body
  cardChildren.push({
    type: "CardContent",
    childrenProps: [bodyComponent],
  });

  // Footer: show attachments list if there are any files
  if (attachmentItems.length > 0) {
    cardChildren.push({
      type: "CardFooter",
      childrenProps: {
        type: "DataList",
        childrenProps: attachmentItems,
      },
    });
  }

  // Return a VerticalCard that adapts well to mobile and desktop
  return {
    type: "VerticalCard",
    childrenProps: cardChildren,
  };
}

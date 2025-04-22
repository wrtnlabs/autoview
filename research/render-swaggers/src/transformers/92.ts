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
  // 1. Format the timestamp for human readability
  let formattedDate: string;
  try {
    formattedDate = new Date(input.created_at).toLocaleString();
  } catch {
    // Fallback to raw string if parsing fails
    formattedDate = input.created_at;
  }

  // 2. Build the card header with an icon and the timestamp
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: `Snapshot ${input.id}`,
    description: formattedDate,
    startElement: {
      type: "Icon",
      id: "comment",    // FontAwesome comment icon
      color: "gray",
      size: 24
    }
  };

  // 3. Build the body content:
  //    - Use Markdown for markdown-formatted input
  //    - Fall back to plain Text for HTML or plain text
  let contentComponent: IAutoView.IAutoViewComponentProps;
  if (input.format === "md") {
    contentComponent = {
      type: "Markdown",
      content: input.body
    };
  } else {
    contentComponent = {
      type: "Text",
      variant: "body1",
      content: input.body
    };
  }
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: contentComponent
  };

  // 4. Build the attachments list (if any)
  let attachmentsComponent: IAutoView.IAutoViewComponentProps;
  if (Array.isArray(input.files) && input.files.length > 0) {
    const items: IAutoView.IAutoViewDataListItemProps[] = input.files.map(file => {
      // Compose the filename with extension if present
      const name = file.extension != null && file.extension !== ""
        ? `${file.name}.${file.extension}`
        : file.name;

      // Label: the filename
      const label: IAutoView.IAutoViewTextProps = {
        type: "Text",
        variant: "body2",
        content: name
      };

      // Value: a download button linking to the file
      const downloadButton: IAutoView.IAutoViewButtonProps = {
        type: "Button",
        variant: "text",
        color: "primary",
        size: "small",
        label: "Download",
        href: file.url
      };

      return {
        type: "DataListItem",
        label,
        value: downloadButton
      };
    });

    attachmentsComponent = {
      type: "DataList",
      childrenProps: items
    };
  } else {
    // No files: show a simple notice
    attachmentsComponent = {
      type: "Text",
      variant: "body2",
      content: "No attachments"
    };
  }
  const footer: IAutoView.IAutoViewCardFooterProps = {
    type: "CardFooter",
    childrenProps: attachmentsComponent
  };

  // 5. Combine header, content, and footer into a vertical card
  const card: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [header, content, footer]
  };

  return card;
}

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
  // 1. Compose the card header: show a comment icon and identifier & timestamp
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: `Comment ${input.id}`,
    // Render a human‐friendly timestamp
    description: new Date(input.created_at).toLocaleString(),
    startElement: {
      type: "Icon",
      id: "comment",
      color: "blue",
      size: 24,
    },
  };

  // 2. Render the comment body: prefer Markdown if format is markdown
  let bodyComponent: IAutoView.IAutoViewPresentationComponentProps;
  if (input.format === "md") {
    bodyComponent = {
      type: "Markdown",
      content: input.body,
    };
  } else {
    // For HTML or plain text, fall back to a Text component
    bodyComponent = {
      type: "Text",
      content: input.body,
      variant: "body1",
    };
  }

  // 3. Collect children for the card content
  const contentChildren: IAutoView.IAutoViewPresentationComponentProps[] = [bodyComponent];

  // 4. If there are attachments, render them as a DataList of download buttons
  if (input.files && input.files.length > 0) {
    // Divider before attachments for visual separation
    contentChildren.push({
      type: "Divider",
      orientation: "horizontal",
      color: "#e0e0e0",
    });

    // Map each file to a DataListItem
    const dataListItems: IAutoView.IAutoViewDataListItemProps[] = input.files.map((file) => {
      // Build a filename with extension if present
      const filename = file.extension ? `${file.name}.${file.extension}` : file.name;

      // Label showing the filename
      const labelText: IAutoView.IAutoViewTextProps = {
        type: "Text",
        content: filename,
        variant: "body2",
      };

      // Download button with icon
      const downloadButton: IAutoView.IAutoViewButtonProps = {
        type: "Button",
        variant: "text",
        color: "teal",
        startElement: {
          type: "Icon",
          id: "download",
          color: "teal",
          size: 16,
        },
        label: "Download",
        href: file.url,
      };

      return {
        type: "DataListItem",
        label: labelText,
        value: downloadButton,
      };
    });

    // Assemble the DataList component
    const attachmentsList: IAutoView.IAutoViewDataListProps = {
      type: "DataList",
      childrenProps: dataListItems,
    };

    contentChildren.push(attachmentsList);
  }

  // Wrap the body and optional attachments in CardContent
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: contentChildren,
  };

  // 5. Footer: show the format of the comment in a colored chip
  const formatColorMap: Record<string, IAutoView.IAutoViewChipProps["color"]> = {
    html: "orange",
    md: "green",
    txt: "gray",
  };
  const footer: IAutoView.IAutoViewCardFooterProps = {
    type: "CardFooter",
    childrenProps: {
      type: "Chip",
      label: input.format.toUpperCase(),
      color: formatColorMap[input.format] || "gray",
      variant: "outlined",
      size: "small",
    },
  };

  // 6. Assemble into a VerticalCard for a responsive, stacked layout
  const card: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [header, content, footer],
  };

  return card;
}

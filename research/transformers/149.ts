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
  const { id, created_at, format, body, files } = input;

  // Format creation timestamp into a human-readable form; fall back to raw if invalid
  let formattedDate: string;
  const parsed = new Date(created_at);
  if (!isNaN(parsed.getTime())) {
    formattedDate = parsed.toLocaleString();
  } else {
    formattedDate = created_at;
  }

  // Card header with a comment icon, truncated ID, and timestamp
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: `Comment ${id.slice(0, 8)}`,
    description: `Created at ${formattedDate}`,
    startElement: {
      type: "Icon",
      id: "comment",
      color: "blue",
      size: 24,
    },
  };

  // Pick Markdown for markdown-format bodies, otherwise plain text
  const bodyComponent:
    | IAutoView.IAutoViewMarkdownProps
    | IAutoView.IAutoViewTextProps =
    format === "md"
      ? {
          type: "Markdown",
          content: body,
        }
      : {
          type: "Text",
          content: body,
          variant: "body1",
        };

  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: [bodyComponent],
  };

  // If attachments exist, render a DataList of download buttons
  let footerComponent: IAutoView.IAutoViewCardFooterProps | undefined;
  if (files && files.length > 0) {
    const listItems: IAutoView.IAutoViewDataListItemProps[] = files.map((file) => {
      // Build display name including extension
      const name = file.extension ? `${file.name}.${file.extension}` : file.name;

      return {
        type: "DataListItem",
        label: [
          {
            type: "Icon",
            id: "file",
            color: "gray",
            size: 20,
          },
          {
            type: "Text",
            content: name,
            variant: "body1",
          },
        ],
        value: {
          type: "Button",
          label: "Download",
          href: file.url,
          variant: "text",
        },
      };
    });

    footerComponent = {
      type: "CardFooter",
      childrenProps: {
        type: "DataList",
        childrenProps: listItems,
      },
    };
  }

  // Assemble into a vertical card
  const card: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: footerComponent
      ? [header, content, footerComponent]
      : [header, content],
  };

  return card;
}

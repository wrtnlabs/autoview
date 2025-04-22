import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
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
    export type IShoppingSaleInquiryComment = {
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
        snapshots: Schema.IBbsArticleComment.ISnapshot[];
        /**
         * Creation time of comment.
         *
         * @title Creation time of comment
        */
        created_at: string;
    };
    export namespace IShoppingAdministrator {
        export type IInvert = any;
    }
    export type IShoppingCustomer = any;
    export namespace IShoppingSeller {
        export type IInvert = any;
    }
    export namespace IBbsArticleComment {
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
type IAutoViewTransformerInputType = Schema.IShoppingSaleInquiryComment;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Helper: format the writer field into a display string.
  const writerDisplay: string = (() => {
    if (typeof input.writer === "string") return input.writer;
    // Attempt to pull out a 'name' property if it's an object
    if (input.writer && typeof input.writer === "object" && "name" in input.writer && typeof (input.writer as any).name === "string") {
      return (input.writer as any).name;
    }
    // Fallback to JSON string
    try {
      return JSON.stringify(input.writer);
    } catch {
      return String(input.writer);
    }
  })();

  // Format creation timestamp in local representation
  const createdAtDisplay: string = (() => {
    const date = new Date(input.created_at);
    // If invalid date, return raw string
    return isNaN(date.getTime())
      ? input.created_at
      : date.toLocaleString();
  })();

  // If there are no snapshots, render an empty state
  if (!Array.isArray(input.snapshots) || input.snapshots.length === 0) {
    return {
      type: "VerticalCard",
      childrenProps: [
        {
          type: "CardHeader",
          title: writerDisplay,
          description: createdAtDisplay,
          startElement: {
            type: "Icon",
            id: "user",
            size: 24,
            color: "gray",
          },
        },
        {
          type: "CardContent",
          childrenProps: [
            {
              type: "Text",
              content: "No content available.",
            },
          ],
        },
      ],
    };
  }

  // Use the latest snapshot for display
  const latest = input.snapshots[input.snapshots.length - 1];

  // Prepare Markdown component for the body
  const markdownComponent: IAutoView.IAutoViewMarkdownProps = {
    type: "Markdown",
    content: latest.body,
  };

  // Prepare image attachments, if any
  const attachmentImages: IAutoView.IAutoViewImageProps[] = (latest.files || []).map((file) => {
    // Build an alt text: name + extension
    const ext = file.extension ? `.${file.extension}` : "";
    const alt = file.name + ext;
    return {
      type: "Image",
      src: file.url,
      alt,
    };
  });

  // Assemble childrenProps for the card
  const cardChildren: Array<
    | IAutoView.IAutoViewCardHeaderProps
    | IAutoView.IAutoViewCardContentProps
    | IAutoView.IAutoViewCardFooterProps
  > = [
    {
      type: "CardHeader",
      title: writerDisplay,
      description: createdAtDisplay,
      // Display a user icon in the header
      startElement: {
        type: "Icon",
        id: "user",
        size: 24,
        color: "gray",
      },
    },
    {
      type: "CardContent",
      // Show the markdown body first
      childrenProps: markdownComponent,
    },
  ];

  // Only add a footer with attachments if there are images
  if (attachmentImages.length > 0) {
    cardChildren.push({
      type: "CardFooter",
      childrenProps: attachmentImages,
    });
  }

  // Return a vertical card containing header, content, and optional footer
  return {
    type: "VerticalCard",
    childrenProps: cardChildren,
  };
}

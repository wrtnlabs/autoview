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
  // Determine a display name for the writer (fallback to JSON if unknown)
  const writerName: string = (() => {
    const w = input.writer as any;
    if (w == null) return "Unknown";
    if (typeof w === "string") return w;
    if (typeof w === "object") {
      if (typeof w.name === "string") return w.name;
      if (typeof w.username === "string") return w.username;
    }
    // Fallback to stringify the object
    try {
      return JSON.stringify(w);
    } catch {
      return String(w);
    }
  })();

  // Format the creation timestamp in a locale‐sensitive way (fallback to raw string)
  const createdAtLabel: string = (() => {
    try {
      return new Date(input.created_at).toLocaleString();
    } catch {
      return input.created_at;
    }
  })();

  // Pick the latest snapshot for display (or empty stub)
  const snapshots = input.snapshots || [];
  const latestSnapshot = snapshots[snapshots.length - 1];
  const bodyContent: string = latestSnapshot?.body ?? "_No content_";

  // Build an attachments list if there are any files in the snapshot
  let attachmentsList: IAutoView.IAutoViewDataListProps | undefined;
  if (latestSnapshot?.files?.length) {
    attachmentsList = {
      type: "DataList",
      childrenProps: latestSnapshot.files.map((file) => {
        const filename = file.extension
          ? `${file.name}.${file.extension}`
          : file.name;
        const item: IAutoView.IAutoViewDataListItemProps = {
          type: "DataListItem",
          // Show file name in bold via Markdown
          label: {
            type: "Markdown",
            content: `**${filename}**`,
          },
          // Provide a text button with an attachment icon linking to the file URL
          value: {
            type: "Button",
            variant: "text",
            label: filename,
            href: file.url,
            startElement: {
              type: "Icon",
              id: "paperclip",
              size: 16,
            },
          },
        };
        return item;
      }),
    };
  }

  // Compose the CardContent children: main Markdown and optional attachments
  const cardContentChildren: IAutoView.IAutoViewPresentationComponentProps[] = [
    {
      type: "Markdown",
      content: bodyContent,
    },
  ];
  if (attachmentsList) {
    cardContentChildren.push(attachmentsList);
  }

  // Header showing writer and timestamp
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: writerName,
    description: createdAtLabel,
  };

  // Main body of the comment
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: cardContentChildren,
  };

  // Footer indicating edit count if more than one snapshot
  const cardFooter: IAutoView.IAutoViewCardFooterProps | undefined =
    snapshots.length > 1
      ? {
          type: "CardFooter",
          childrenProps: {
            type: "Text",
            content: [`Edited ${snapshots.length} times`],
          },
        }
      : undefined;

  // Assemble a vertical card with header, content, and optional footer
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: cardFooter
      ? [cardHeader, cardContent, cardFooter]
      : [cardHeader, cardContent],
  };

  return verticalCard;
}

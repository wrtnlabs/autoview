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
  // Safely extract a displayable writer name
  let writerName = "User";
  const w = input.writer as any;
  if (typeof w === "string") {
    writerName = w;
  } else if (typeof w?.name === "string") {
    writerName = w.name;
  } else if (typeof w?.id === "string") {
    writerName = w.id;
  }

  // Choose the latest snapshot; fallback to a placeholder if none
  const snapshots = Array.isArray(input.snapshots) ? input.snapshots : [];
  const latestSnapshot = snapshots.length
    ? snapshots.reduce((prev, cur) =>
        prev.created_at > cur.created_at ? prev : cur
      )
    : null;
  const bodyContent = latestSnapshot
    ? latestSnapshot.body
    : "_No content available._";

  // Build a list of attachment items if there are any files
  let attachmentsList: IAutoView.IAutoViewDataListProps | undefined;
  if (latestSnapshot && Array.isArray(latestSnapshot.files) && latestSnapshot.files.length > 0) {
    const items: IAutoView.IAutoViewDataListItemProps[] = latestSnapshot.files.map(
      (file) => {
        // Compose a filename with extension
        const ext = file.extension ? `.${file.extension}` : "";
        const filename = `${file.name}${ext}`;

        const labelText: IAutoView.IAutoViewTextProps = {
          type: "Text",
          content: filename,
          variant: "body2",
        };
        const downloadButton: IAutoView.IAutoViewButtonProps = {
          type: "Button",
          label: "Download",
          variant: "text",
          size: "small",
          href: file.url,
        };
        return {
          type: "DataListItem",
          label: labelText,
          value: downloadButton,
        };
      }
    );
    attachmentsList = {
      type: "DataList",
      childrenProps: items,
    };
  }

  // Optional chip to show parent comment linkage
  let replyChip: IAutoView.IAutoViewChipProps | undefined;
  if (typeof input.parent_id === "string" && input.parent_id.length > 0) {
    replyChip = {
      type: "Chip",
      label: `Reply to ${input.parent_id}`,
      variant: "outlined",
      size: "small",
      color: "secondary",
    };
  }

  // Card header with an icon for the user
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: `Comment by ${writerName}`,
    description: new Date(input.created_at).toLocaleString(),
    startElement: {
      type: "Icon",
      id: "user",
      size: 24,
      color: "blue",
    },
    endElement: replyChip,
  };

  // Card content: markdown of body + attachments list if any
  const contentChildren: IAutoView.IAutoViewPresentationComponentProps[] = [
    {
      type: "Markdown",
      content: bodyContent,
    },
  ];
  if (attachmentsList) {
    contentChildren.push(attachmentsList);
  }
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: contentChildren,
  };

  // Assemble into a vertical card for responsive display
  const card: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [header, content],
  };

  return card;
}

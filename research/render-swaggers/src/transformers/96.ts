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
  // Helper: format dates in locale string
  const formatDate = (iso: string): string => {
    try {
      return new Date(iso).toLocaleString();
    } catch {
      return iso;
    }
  };

  // Determine writer display (fallback to JSON string)
  let writerInfo: string;
  if (input.writer && typeof input.writer === "object") {
    writerInfo =
      // @ts-ignore
      input.writer.name ||
      // @ts-ignore
      input.writer.id ||
      JSON.stringify(input.writer);
  } else {
    writerInfo = String(input.writer);
  }

  // Sort snapshots chronologically and pick the latest
  const snapshots = [...input.snapshots].sort(
    (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  );
  const latestSnapshot =
    snapshots.length > 0
      ? snapshots[snapshots.length - 1]
      : { id: "", created_at: "", format: "txt", body: "", files: [] };

  // Compute number of edits (initial snapshot excluded)
  const editCount = Math.max(0, snapshots.length - 1);

  // Build CardHeader: shows comment ID, creation time, and writer info
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: `Comment #${input.id}`,
    description: formatDate(input.created_at),
    startElement: {
      type: "Icon",
      id: "user",
      color: "blue",
      size: 24,
    },
    endElement: {
      type: "Text",
      content: writerInfo,
      variant: "body2",
      color: "secondary",
      lineClamp: 1,
    },
  };

  // Build CardContent: markdown body plus attachment buttons
  const contentChildren: IAutoView.IAutoViewPresentationComponentProps[] = [];

  // Render the latest snapshot body as markdown
  contentChildren.push({
    type: "Markdown",
    content: latestSnapshot.body,
  });

  // Render attachments (if any) as text buttons with a file icon
  latestSnapshot.files.forEach((file) => {
    const filename = file.extension
      ? `${file.name}.${file.extension}`
      : file.name;
    contentChildren.push({
      type: "Button",
      variant: "text",
      color: "primary",
      size: "small",
      label: filename,
      href: file.url,
      startElement: {
        type: "Icon",
        id: "file",
        size: 16,
        color: "gray",
      },
    });
  });

  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: contentChildren,
  };

  // Build CardFooter: chip indicating edit status
  const footer: IAutoView.IAutoViewCardFooterProps = {
    type: "CardFooter",
    childrenProps: {
      type: "Chip",
      label: editCount > 0 ? `Edited ${editCount} times` : "New",
      variant: "outlined",
      color: editCount > 0 ? "warning" : "success",
      size: "small",
    },
  };

  // Assemble a responsive vertical card
  return {
    type: "VerticalCard",
    childrenProps: [header, content, footer],
  };
}

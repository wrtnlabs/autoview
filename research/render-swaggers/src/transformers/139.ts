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



function visualizeData(
  input: IAutoViewTransformerInputType
): IAutoView.IAutoViewComponentProps {
  // Choose the latest snapshot to display (most recent edit)
  const latestSnapshot = input.snapshots[input.snapshots.length - 1];

  // Format creation date for display
  const formattedDate = new Date(input.created_at).toLocaleString();

  // Build the "startElement" for the header:
  // Try to use writer.avatarUrl & writer.name if available, else fall back to a user icon
  let startElement: IAutoView.IAutoViewAvatarProps | IAutoView.IAutoViewIconProps;
  if (
    input.writer &&
    typeof input.writer === "object" &&
    typeof (input.writer as any).avatarUrl === "string"
  ) {
    startElement = {
      type: "Avatar",
      src: (input.writer as any).avatarUrl,
      name: (input.writer as any).name ?? undefined,
      variant: "primary",
      size: 40,
    };
  } else {
    startElement = {
      type: "Icon",
      id: "user",
      size: 32,
      color: "gray",
    };
  }

  // Build CardHeader: shows writer name, date, and a "Reply" chip if this is a reply
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    startElement,
    title: (input.writer as any).name ?? "Anonymous",
    description: formattedDate,
    // If this comment is a reply to another, show a "Reply" chip on the right
    ...(input.parent_id && {
      endElement: {
        type: "Chip",
        label: "Reply",
        variant: "outlined",
        color: "info",
      },
    }),
  };

  // Build CardContent children: markdown body plus any images from attachments
  const contentChildren: IAutoView.IAutoViewPresentationComponentProps[] = [];

  // Render the comment body as markdown for rich text support
  contentChildren.push({
    type: "Markdown",
    content: latestSnapshot
      ? latestSnapshot.body
      : "_No content available_",
  });

  // If there are attached files, render each as an image below the markdown
  if (
    latestSnapshot &&
    Array.isArray(latestSnapshot.files) &&
    latestSnapshot.files.length > 0
  ) {
    for (const file of latestSnapshot.files) {
      // Skip if url is invalid
      if (!file.url) continue;
      contentChildren.push({
        type: "Image",
        src: file.url,
        alt: file.name
          ? `${file.name}${file.extension ? "." + file.extension : ""}`
          : undefined,
      });
    }
  }

  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: contentChildren,
  };

  // Wrap the comment in a vertical card for responsive display on all devices
  return {
    type: "VerticalCard",
    childrenProps: [header, content],
  };
}

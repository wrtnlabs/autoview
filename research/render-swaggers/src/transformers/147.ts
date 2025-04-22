import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * A page.
     *
     * Collection of records with pagination indformation.
    */
    export type IPageIShoppingSaleInquiryComment = {
        /**
         * Page information.
         *
         * @title Page information
        */
        pagination: Schema.IPage.IPagination;
        /**
         * List of records.
         *
         * @title List of records
        */
        data: Schema.IShoppingSaleInquiryComment[];
    };
    export namespace IPage {
        /**
         * Page information.
        */
        export type IPagination = {
            /**
             * Current page number.
             *
             * @title Current page number
            */
            current: number & tags.Type<"int32">;
            /**
             * Limitation of records per a page.
             *
             * @title Limitation of records per a page
            */
            limit: number & tags.Type<"int32">;
            /**
             * Total records in the database.
             *
             * @title Total records in the database
            */
            records: number & tags.Type<"int32">;
            /**
             * Total pages.
             *
             * Equal to {@link records} / {@link limit} with ceiling.
             *
             * @title Total pages
            */
            pages: number & tags.Type<"int32">;
        };
    }
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
type IAutoViewTransformerInputType = Schema.IPageIShoppingSaleInquiryComment;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Destructure pagination and comment list from input
  const { pagination, data: comments } = input;

  // Helper to format ISO date strings into human-readable form
  const formatDate = (iso: string): string => {
    try {
      return new Date(iso).toLocaleString();
    } catch {
      return iso;
    }
  };

  // Build a DataListItemProps for each comment
  const listItems: IAutoView.IAutoViewDataListItemProps[] = comments.map(comment => {
    const { writer, created_at, snapshots } = comment;
    // Attempt to extract a display name from writer object
    const name =
      writer && typeof writer === "object" && "name" in writer && typeof (writer as any).name === "string"
        ? (writer as any).name
        : "Unknown";

    // Build label: avatar (if available) or a user icon + name and timestamp
    const labelElements: IAutoView.IAutoViewPresentationComponentProps[] = [];

    if (
      writer &&
      typeof writer === "object" &&
      "avatarUrl" in writer &&
      typeof (writer as any).avatarUrl === "string"
    ) {
      // Use an Avatar component if the writer provided an avatar URL
      labelElements.push({
        type: "Avatar",
        src: (writer as any).avatarUrl,
        name,
      });
    } else {
      // Fallback to a generic user icon
      labelElements.push({
        type: "Icon",
        id: "user",
        size: 24,
        color: "gray",
      });
    }

    // Append the writer name and creation timestamp
    labelElements.push({
      type: "Text",
      variant: "subtitle2",
      content: [`${name} • ${formatDate(created_at)}`],
    });

    // Pick the most recent snapshot for display
    const lastSnapshot = snapshots && snapshots.length > 0
      ? snapshots[snapshots.length - 1]
      : { body: "No content available", files: [] as any[] };

    // Build value: markdown body + any attachments as images
    const valueElements: IAutoView.IAutoViewPresentationComponentProps[] = [
      {
        type: "Markdown",
        content: lastSnapshot.body,
      },
    ];

    if (Array.isArray(lastSnapshot.files) && lastSnapshot.files.length > 0) {
      lastSnapshot.files.forEach(file => {
        // Each attachment rendered as an image
        valueElements.push({
          type: "Image",
          src: file.url,
          alt: file.name,
        });
      });
    }

    return {
      type: "DataListItem",
      label: labelElements,
      value: valueElements,
    };
  });

  // Compose the main data list of comments
  const commentList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: listItems,
  };

  // Wrap the list in a vertical card with header and footer for context
  const card: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [
      {
        type: "CardHeader",
        title: "Comments",
        description: `Page ${pagination.current} of ${pagination.pages}`,
      },
      {
        type: "CardContent",
        // Nest the comment list; childrenProps accepts a single PresentationComponent
        childrenProps: commentList,
      },
      {
        type: "CardFooter",
        // Show total record count in a caption text
        childrenProps: {
          type: "Text",
          variant: "caption",
          content: [`Total comments: ${pagination.records}`],
        },
      },
    ],
  };

  return card;
}

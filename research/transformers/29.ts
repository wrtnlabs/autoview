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



function visualizeData(
  input: IAutoViewTransformerInputType
): IAutoView.IAutoViewComponentProps {
  // Destructure pagination and comments list
  const {
    pagination: { current, pages, records },
    data: comments,
  } = input;

  // Helper: extract latest snapshot from a comment
  function getLatestSnapshot(
    comment: Schema.IShoppingSaleInquiryComment
  ): Schema.IBbsArticleComment.ISnapshot | null {
    const { snapshots } = comment;
    if (!Array.isArray(snapshots) || snapshots.length === 0) return null;
    return snapshots[snapshots.length - 1];
  }

  // Build DataListItemProps for each comment
  const dataListItems: IAutoView.IAutoViewDataListItemProps[] = comments.map(
    (comment) => {
      // Safely derive a display name for the writer
      let writerName: string = "Anonymous";
      try {
        if (comment.writer && typeof comment.writer === "object") {
          const w = comment.writer as any;
          writerName = w.name || w.id || JSON.stringify(w);
        } else if (comment.writer != null) {
          writerName = String(comment.writer);
        }
      } catch {
        /* fallback to Anonymous */
      }

      // Prepare an icon for the user
      const userIcon: IAutoView.IAutoViewIconProps = {
        type: "Icon",
        id: "user",    // FontAwesome "user" icon
        size: 20,
        color: "gray",
      };

      // Text component for writer
      const writerText: IAutoView.IAutoViewTextProps = {
        type: "Text",
        content: writerName,
        variant: "body1",
        color: "primary",
      };

      const latest = getLatestSnapshot(comment);
      // If there's no snapshot, show placeholder text
      const bodyContent = latest
        ? latest.body
        : "_No content available_";

      // Use markdown renderer for comment body, allowing rich formatting
      const bodyMarkdown: IAutoView.IAutoViewMarkdownProps = {
        type: "Markdown",
        content: bodyContent,
      };

      // Compose DataListItemProps: label shows writer, value shows the comment body
      const item: IAutoView.IAutoViewDataListItemProps = {
        type: "DataListItem",
        // label can be an array of presentational components
        label: [userIcon, writerText],
        // value can also be an array; here a single markdown component
        value: [bodyMarkdown],
      };

      return item;
    }
  );

  // If there are no comments, show a simple Text notification
  const contentComponent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps:
      dataListItems.length > 0
        ? {
            type: "DataList",
            childrenProps: dataListItems,
          }
        : {
            type: "Text",
            content: "_No comments to display_",
            variant: "body2",
            color: "disabled",
          },
  };

  // Card header summarizing pagination
  const headerComponent: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: `Comments (Page ${current}/${pages})`,
    description: `${records} total`,
    startElement: {
      type: "Icon",
      id: "comments",
      size: 24,
      color: "blue",
    },
  };

  // Compose a vertical card wrapping header and content
  const card: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [headerComponent, contentComponent],
  };

  return card;
}

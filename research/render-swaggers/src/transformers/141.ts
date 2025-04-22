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
  // Helper to detect image files by extension
  const imageExtensions = new Set(["png", "jpg", "jpeg", "gif", "bmp", "webp", "svg"]);

  // Transform each snapshot into a DataListItem
  const snapshotItems: IAutoView.IAutoViewDataListItemProps[] =
    input.snapshots.map((snapshot) => {
      // Build attachment components: images or download buttons
      const attachmentComponents: IAutoView.IAutoViewPresentationComponentProps[] =
        snapshot.files.map((file) => {
          const ext = file.extension?.toLowerCase() || "";
          if (imageExtensions.has(ext)) {
            // Render inline image preview for image attachments
            return {
              type: "Image",
              src: file.url,
              alt: file.name || "attachment",
            } as IAutoView.IAutoViewImageProps;
          } else {
            // Non-image attachments: provide a download link button
            return {
              type: "Button",
              label: `Download ${file.name}${ext ? "." + ext : ""}`,
              href: file.url,
              variant: "text",
            } as IAutoView.IAutoViewButtonProps;
          }
        });

      return {
        type: "DataListItem",
        // Use the snapshot timestamp as the label
        label: [
          {
            type: "Text",
            content: snapshot.created_at,
            variant: "caption",
          },
        ],
        // Show markdown content followed by any attachments
        value: [
          {
            type: "Markdown",
            content: snapshot.body,
          } as IAutoView.IAutoViewMarkdownProps,
          // Spread attachments (if any)
          ...attachmentComponents,
        ],
      };
    });

  // Compose the DataList of snapshots
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: snapshotItems,
  };

  // Finally wrap everything in a collapsible comment section
  return {
    type: "Collapse",
    header: {
      type: "CollapseHeader",
      // Prepend a user icon and writer info
      childrenProps: [
        {
          type: "Icon",
          id: "user",
          size: 24,
          color: "blue",
        } as IAutoView.IAutoViewIconProps,
        {
          type: "Text",
          content: `Writer: ${String(input.writer)}`,
          variant: "subtitle2",
        } as IAutoView.IAutoViewTextProps,
        {
          type: "Text",
          content: `Comment ID: ${input.id}`,
          variant: "caption",
        } as IAutoView.IAutoViewTextProps,
      ],
      // Use a caret icon for expand/collapse toggle
      toggleIcon: {
        type: "Icon",
        id: "caret-down",
        size: 20,
        color: "gray",
      } as IAutoView.IAutoViewIconProps,
    },
    content: {
      type: "CollapseContent",
      // Embed the DataList of snapshot history
      childrenProps: [
        dataList as IAutoView.IAutoViewDataListProps,
      ],
    },
  } as IAutoView.IAutoViewCollapseProps;
}

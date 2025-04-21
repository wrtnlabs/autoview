import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Answers to questions about sale snapshots.
     *
     * `IShoppingSaleInquiryAnswer` is an entity that embodies the official
     * answer written by the {@link IShoppingSeller seller} to the
     * {@link IShoppingSaleInquiry inquiry} written by the
     * {@link IShoppingCustomer customer}.
     *
     * Of course, in addition to writing an official response like this, it is
     * also possible for the seller to communicate with the inqjuiry written
     * customer and multiple customers through
     * {@link IShoppingSaleInquiryComment comments} in the attribution inquiry.
     *
     * For reference, it is not possible to write comments on this answer.
     * Encourage people to write comments on the inquiry article. This is to
     * prevent comments from being scattered in both inquiry and answer
     * articles.
    */
    export type IShoppingSaleInquiryAnswer = {
        /**
         * Seller who've written the answer.
         *
         * @title Seller who've written the answer
        */
        seller: Schema.IShoppingSeller;
        /**
         * Primary Key.
         *
         * @title Primary Key
        */
        id: string;
        /**
         * List of snapshot contents.
         *
         * It is created for the first time when an article is created, and is
         * accumulated every time the article is modified.
         *
         * @title List of snapshot contents
        */
        snapshots: Schema.IBbsArticle.ISnapshot[];
        /**
         * Creation time of article.
         *
         * @title Creation time of article
        */
        created_at: string;
    };
    /**
     * Seller information.
     *
     * `IShoppingSeller` is an entity that embodies a person who registers
     * {@link IShoppingSale sales} to operate selling activities, with
     * {@link IShoppingMember membership} joining.
     *
     * For reference, unlike {@link IShoppingCustomer customers} which can
     * participate even without membership joining, seller must join membership
     * to operate sales. Also, seller must do the
     * {@link IShoppingCitizen real-name and mobile authentication}, too.
    */
    export type IShoppingSeller = {
        /**
         * Primary Key.
         *
         * @title Primary Key
        */
        id: string;
        /**
         * Creation tmie of record.
         *
         * Another words, the time when the seller has signed up.
         *
         * @title Creation tmie of record
        */
        created_at: string;
    };
    export namespace IBbsArticle {
        /**
         * Snapshot of article.
         *
         * `IBbsArticle.ISnapshot` is a snapshot entity that contains the contents of
         * the article, as mentioned in {@link IBbsArticle}, the contents of the article
         * are separated from the article record to keep evidence and prevent fraud.
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
             * In other words, creation time or update time or article.
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
             * Title of article.
             *
             * @title Title of article
            */
            title: string;
            /**
             * Content body of article.
             *
             * @title Content body of article
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
type IAutoViewTransformerInputType = Schema.IShoppingSaleInquiryAnswer;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Utility: format ISO date to user-friendly string
  const formatDate = (iso: string): string => {
    try {
      const d = new Date(iso);
      return d.toLocaleString();
    } catch {
      return iso;
    }
  };

  // Seller info as a DataList: shows seller ID and signup date
  const sellerList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: [
      {
        type: "DataListItem",
        label: { type: "Text", content: "Seller ID", variant: "body2" },
        value: { type: "Text", content: input.seller.id, variant: "body1" },
      },
      {
        type: "DataListItem",
        label: { type: "Text", content: "Seller Since", variant: "body2" },
        value: {
          type: "Text",
          content: formatDate(input.seller.created_at),
          variant: "body1",
        },
      },
    ],
  };

  // For each snapshot, create a DataListItem showing title, body, and attachments
  const snapshotItems: IAutoView.IAutoViewDataListItemProps[] = input.snapshots.map(
    (snap) => {
      // Body component: use Markdown if format is md, else plain Text
      const bodyComponent:
        | IAutoView.IAutoViewMarkdownProps
        | IAutoView.IAutoViewTextProps = snap.format === "md"
        ? { type: "Markdown", content: snap.body }
        : {
            type: "Text",
            content: snap.body,
            variant: "body1",
            lineClamp: 5, // limit long text
          };

      // Attachments list under this snapshot, if any
      let attachmentsComponent: IAutoView.IAutoViewDataListProps | undefined;
      if (Array.isArray(snap.files) && snap.files.length > 0) {
        const items: IAutoView.IAutoViewDataListItemProps[] = snap.files.map(
          (file) => {
            // Construct display name: e.g. "README.md" or ".gitignore"
            const namePart = file.name || "";
            const extPart = file.extension ? "." + file.extension : "";
            const labelName = namePart
              ? `${namePart}${extPart}`
              : extPart || file.url;

            // Button to download/view file
            const fileButton: IAutoView.IAutoViewButtonProps = {
              type: "Button",
              variant: "text",
              size: "small",
              label: labelName,
              startElement: {
                type: "Icon",
                id: "link",
                size: 12,
                color: "blue",
              },
              href: file.url,
            };

            return {
              type: "DataListItem",
              label: { type: "Text", content: labelName, variant: "body2" },
              value: fileButton,
            };
          }
        );
        attachmentsComponent = {
          type: "DataList",
          childrenProps: items,
        };
      }

      // Compose the snapshot's value: first body, then attachments if present
      const valueComponents: IAutoView.IAutoViewPresentationComponentProps[] = [
        bodyComponent,
      ];
      if (attachmentsComponent) valueComponents.push(attachmentsComponent);

      return {
        type: "DataListItem",
        // Use title in label, with snapshot creation date
        label: {
          type: "Text",
          content: `${snap.title} (${formatDate(snap.created_at)})`,
          variant: "subtitle2",
        },
        value: valueComponents,
      };
    }
  );

  // If no snapshots, show a placeholder text
  const snapshotsBlock:
    | IAutoView.IAutoViewDataListProps
    | IAutoView.IAutoViewTextProps = snapshotItems.length
    ? {
        type: "DataList",
        childrenProps: snapshotItems,
      }
    : {
        type: "Text",
        content: "No snapshots available.",
        variant: "body2",
        color: "#888888",
      };

  // Assemble the card: header and content sections
  const card: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [
      {
        type: "CardHeader",
        title: `Sale Inquiry Answer: ${input.id}`,
        description: `Answered at ${formatDate(input.created_at)}`,
        startElement: {
          type: "Icon",
          id: "user-circle",
          size: 24,
          color: "blue",
        },
      },
      {
        type: "CardContent",
        childrenProps: [
          // Section: Seller Info
          {
            type: "Text",
            content: "Seller Information",
            variant: "subtitle1",
          },
          sellerList,
          // Section: Snapshots
          {
            type: "Text",
            content: "Snapshots",
            variant: "subtitle1",
          },
          snapshotsBlock,
        ],
      },
    ],
  };

  return card;
}

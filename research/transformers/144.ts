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



// Transforms a shopping sale inquiry answer into an AutoView component tree.
function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Attempt to format the creation timestamp for readability.
  let formattedDate = input.created_at;
  try {
    const d = new Date(input.created_at);
    if (!isNaN(d.getTime())) formattedDate = d.toLocaleString();
  } catch {
    // swallow any formatting errors and fall back to raw string
  }

  // Build a list item for each snapshot in the answer's history.
  const snapshotItems: IAutoView.IAutoViewDataListItemProps[] = input.snapshots.map(snapshot => {
    // If there are attachments, render them as markdown links under the body.
    const attachmentsMd = snapshot.files && snapshot.files.length > 0
      ? "\n\n**Attachments:**\n" +
        snapshot.files
          .map(file => {
            const ext = file.extension ? `.${file.extension}` : "";
            const name = file.name || "(no name)";
            return `- [${name}${ext}](${file.url})`;
          })
          .join("\n")
      : "";

    // Merge the body and attachments into one markdown string.
    const markdownBody = `${snapshot.body}${attachmentsMd}`;

    return {
      type: "DataListItem",
      // Use a heading text component to show the snapshot title.
      label: [
        {
          type: "Text",
          variant: "h6",
          content: [snapshot.title],
        },
      ],
      // Render the body (and attachments) via the markdown component.
      value: [
        {
          type: "Markdown",
          content: markdownBody,
        },
      ],
    };
  });

  // If there are no snapshots, show a friendly placeholder.
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps:
      snapshotItems.length > 0
        ? snapshotItems
        : [
            {
              type: "DataListItem",
              label: [
                {
                  type: "Text",
                  variant: "body2",
                  content: ["No snapshots available."],
                },
              ],
            },
          ],
  };

  // Card header shows seller ID and when the answer was created.
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: `Seller: ${input.seller.id}`,
    description: `Answered on ${formattedDate}`,
    // A simple user icon to make the header more visual.
    startElement: {
      type: "Icon",
      id: "user",
      color: "blue",
      size: 32,
    },
  };

  // Card content holds the chronological list of snapshots.
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: dataList,
  };

  // Card footer summarizes the answer ID and snapshot count.
  const cardFooter: IAutoView.IAutoViewCardFooterProps = {
    type: "CardFooter",
    childrenProps: [
      {
        type: "Text",
        variant: "caption",
        content: [`Answer ID: ${input.id}`],
      },
      {
        type: "Text",
        variant: "caption",
        content: [`Total snapshots: ${input.snapshots.length}`],
      },
    ],
  };

  // Assemble everything into a vertical card for responsive rendering.
  return {
    type: "VerticalCard",
    childrenProps: [cardHeader, cardContent, cardFooter],
  };
}

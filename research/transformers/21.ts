import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
/**
 * Reviews for sale snapshots.
 *
 * `IShoppingSaleReview` is a subtype entity of {@link IShoppingSaleInquiry},
 * and is used when a {@link IShoppingCustomer customer} purchases a
 * {@link IShoppingSale sale} ({@link IShoppingSaleSnapshot snapshot} at the time)
 * registered by the {@link IShoppingSeller seller} as a product and leaves a
 * review and rating for it.
 *
 * For reference, `IShoppingSaleReview` and
 * {@link IShoppingOrderGod shopping_order_goods} have a logarithmic relationship
 * of N: 1, but this does not mean that customers can continue to write reviews
 * for the same product indefinitely. Wouldn't there be restrictions, such as
 * if you write a review once, you can write an additional review a month later?
*/
type IShoppingSaleReview = {
    /**
     * Type of the derived inquiry.
     *
     * - `question`: {@link IShoppingSaleQuestion}
     * - `review`: {@link IShoppingSaleReview}
     *
     * @title Type of the derived inquiry
    */
    type: "review";
    /**
     * Customer who wrote the inquiry.
     *
     * @title Customer who wrote the inquiry
    */
    customer: IShoppingCustomer;
    /**
     * Formal answer for the inquiry by the seller.
     *
     * @title Formal answer for the inquiry by the seller
    */
    answer: null | any;
    /**
     * Whether the seller has viewed the inquiry or not.
     *
     * @title Whether the seller has viewed the inquiry or not
    */
    read_by_seller: boolean;
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
    snapshots: IShoppingSaleReview.ISnapshot[];
    /**
     * Creation time of article.
     *
     * @title Creation time of article
    */
    created_at: string;
};
namespace IShoppingSaleReview {
    /**
     * Snapshot content of the review article.
    */
    export type ISnapshot = {
        /**
         * Score of the review.
         *
         * @title Score of the review
        */
        score: number;
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
        files: IAttachmentFile.ICreate[];
    };
}
/**
 * Customer information, but not a person but a connection basis.
 *
 * `IShoppingCustomer` is an entity that literally embodies the information of
 * those who participated in the market as customers. By the way, the
 * `IShoppingCustomer` does not mean a person, but a connection basis. Therefore,
 * even if the same person connects to the shopping mall multiple, multiple
 * records are created in `IShoppingCustomer`.
 *
 * The first purpose of this is to track the customer's inflow path in detail,
 * and it is for cases where the same person enters as a non-member,
 * {@link IShoppingCartCommodity puts items in the shopping cart} in advance,
 * and only authenticates their {@link IShoppingCitizen real name} or
 * registers/logs in at the moment of {@link IShoppingOrderPublish payment}.
 * It is the second. Lastly, it is to accurately track the activities that
 * a person performs at the shopping mall in various ways like below.
 *
 * - Same person comes from an {@link IShoppingExternalUser external service}
 * - Same person creates multiple accounts
 * - Same person makes a {@link IShoppingOrderPublish purchase} as a non-member with only {@link IShoppingCitizen real name authentication}
 * - Same person acts both {@link IShoppingSeller seller} and {@link IShoppingAdministrator admin} at the same time
 *
 * Therefore, `IShoppingCustomer` can have multiple records with the same
 * {@link IShoppingCitizen}, {@link IShoppingMember}, and
 * {@link IShoppingExternalUser}. Additionally, if a customer signs up for
 * membership after verifying their real name or signs up for our service after
 * being a user of an external service, all related records are changed at once.
 * Therefore, identification and tracking of customers can be done very
 * systematically.
*/
type IShoppingCustomer = {
    /**
     * Discriminant for the type of customer.
     *
     * @title Discriminant for the type of customer
    */
    type: "customer";
    /**
     * Membership information.
     *
     * If the customer has joined as a member.
     *
     * @title Membership information
    */
    member: null | any;
    /**
     * Citizen information.
     *
     * If the customer has verified his real name and mobile number.
     *
     * @title Citizen information
    */
    citizen: null | any;
    /**
     * Primary Key.
     *
     * @title Primary Key
    */
    id: string;
    /**
     * Belonged channel.
     *
     * @title Belonged channel
    */
    channel: IShoppingChannel;
    /**
     * External user information.
     *
     * When the customer has come from an external service.
     *
     * @title External user information
    */
    external_user: null | any;
    /**
     * Connection address.
     *
     * Same with {@link window.location.href} of client.
     *
     * @title Connection address
    */
    href: string;
    /**
     * Referrer address.
     *
     * Same with {@link window.document.referrer} of client.
     *
     * @title Referrer address
    */
    referrer: null | (string & tags.Format<"uri">) | (string & tags.MaxLength<0>);
    /**
     * Connection IP Address.
     *
     * @title Connection IP Address
    */
    ip: (string & tags.Format<"ipv4">) | (string & tags.Format<"ipv6">);
    /**
     * Creation time of the connection record.
     *
     * @title Creation time of the connection record
    */
    created_at: string;
};
type IShoppingMember = any;
type IShoppingCitizen = any;
/**
 * Channel information.
 *
 * `IShoppingChannel` is a concept that shapes the distribution channel in the
 * market. Therefore, the difference in the channel in this e-commerce system
 * means that it is another site or application.
 *
 * By the way, if your shopping mall system requires only one channel, then
 * just use only one. This concept is designed to be expandable in the future.
*/
type IShoppingChannel = {
    /**
     * Primary Key.
     *
     * @title Primary Key
    */
    id: string;
    /**
     * Creation time of record.
     *
     * @title Creation time of record
    */
    created_at: string;
    /**
     * Identifier code.
     *
     * @title Identifier code
    */
    code: string;
    /**
     * Name of the channel.
     *
     * @title Name of the channel
    */
    name: string;
};
type IShoppingExternalUser = any;
type IShoppingSaleInquiryAnswer = any;
namespace IAttachmentFile {
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
type IAutoViewTransformerInputType = IShoppingSaleReview;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



// This function transforms an IShoppingSaleReview input into a visual component tree.
// We choose to represent the review using a VerticalCard that contains:
// 1. A CardHeader which displays primary information such as review ID, creation date,
//    and a visual avatar for the customer.
// 2. A CardContent which displays each snapshot in markdown format.
// 3. Optionally, a CardFooter displaying the seller's answer if available.
function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Build the CardHeader using customer's information.
  // We use the customer's id as the name for the avatar (since no other display name is provided).
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: `Review ${input.id}`,
    description: `Created at: ${input.created_at}`,
    // startElement accepts only specific types; here we use the Avatar type.
    startElement: {
      type: "Avatar",
      name: input.customer.id,
      variant: "primary",
      size: 32, // chosen size for a balanced visual
    }
  };

  // Helper function: construct markdown content from the snapshots array.
  // Each snapshot is formatted with header, score, creation time, and a list of attachment files (if any).
  const buildSnapshotsMarkdown = (): string => {
    if (!input.snapshots || input.snapshots.length === 0) {
      return "No snapshots available for this review.";
    }
    // Use markdown header formatting to clearly delineate snapshots.
    let markdown = "## Review Snapshots\n";
    input.snapshots.forEach((snapshot) => {
      markdown += `\n### ${snapshot.title}\n`;
      markdown += `- **Score:** ${snapshot.score}\n`;
      markdown += `- **Created:** ${snapshot.created_at}\n`;
      markdown += `- **Format:** ${snapshot.format}\n`;
      // Display a preview of the body content.
      // If the body is lengthy, we might wish to truncate it; here we assume the viewer can scroll.
      markdown += `\n${snapshot.body}\n`;
      
      // If there are any attachment files, list them as markdown links.
      if (snapshot.files && snapshot.files.length > 0) {
        markdown += "\n**Attachments:**\n";
        snapshot.files.forEach((file) => {
          // Construct file full name, handling potential null for extension.
          const fullName = file.extension ? `${file.name}.${file.extension}` : file.name;
          markdown += `- [${fullName}](${file.url})\n`;
        });
      }
    });
    return markdown;
  };

  // Build the CardContent using a Markdown component.
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: [
      {
        type: "Markdown",
        content: buildSnapshotsMarkdown(),
      }
    ]
  };

  // Optionally add a CardFooter if a seller's answer exists.
  let cardFooter: IAutoView.IAutoViewCardFooterProps | undefined = undefined;
  if (input.answer) {
    cardFooter = {
      type: "CardFooter",
      childrenProps: [
        {
          type: "Markdown",
          content: `**Seller Answer:**\n\n${input.answer}`,
        }
      ]
    };
  }

  // Compose the final VerticalCard.
  // The VerticalCard's childrenProps accepts an array of the contained components.
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: cardFooter ? [header, cardContent, cardFooter] : [header, cardContent],
  };

  return verticalCard;
}

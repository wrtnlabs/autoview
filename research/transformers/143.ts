import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Question about sale snapshot.
     *
     * `IShoppingSaleQuestion` is a subtype entity of {@link IShoppingSaleInquiry},
     * and is used when a {@link IShoppingCustomer customer} wants to ask something
     * about a {@link IShoppingSale sale} ({@link IShoppingSaleSnapshot snapshot} at
     * the time) registered by the {@link IShoppingSeller seller}.
     *
     * And, like most shopping malls, `IShoppingSaleQuestion` also provides
     * a {@link secret} attribute, allowing you to create a "secret message" that can
     * only be viewed by the seller and the customer who wrote the question.
    */
    export type IShoppingSaleQuestion = {
        /**
         * Whether the question article is secret or not.
         *
         * If secret article, only the writer customer and related seller can see
         * the detailed content.
         *
         * @title Whether the question article is secret or not
        */
        secret: boolean;
        /**
         * Type of the derived inquiry.
         *
         * - `question`: {@link IShoppingSaleQuestion}
         * - `review`: {@link IShoppingSaleReview}
         *
         * @title Type of the derived inquiry
        */
        type: "question";
        /**
         * Customer who wrote the inquiry.
         *
         * @title Customer who wrote the inquiry
        */
        customer: Schema.IShoppingCustomer;
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
        snapshots: Schema.IBbsArticle.ISnapshot[];
        /**
         * Creation time of article.
         *
         * @title Creation time of article
        */
        created_at: string;
    };
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
    export type IShoppingCustomer = {
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
        channel: Schema.IShoppingChannel;
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
    export type IShoppingMember = any;
    export type IShoppingCitizen = any;
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
    export type IShoppingChannel = {
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
    export type IShoppingExternalUser = any;
    export type IShoppingSaleInquiryAnswer = any;
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
type IAutoViewTransformerInputType = Schema.IShoppingSaleQuestion;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Pick the latest snapshot for display; fallback to an empty snapshot if none exist
  const latestSnapshot = input.snapshots && input.snapshots.length > 0
    ? input.snapshots[input.snapshots.length - 1]
    : { id: '', created_at: input.created_at, title: 'No Title', body: 'No content available.', format: 'txt' as const, files: [] };

  // Compose header with an icon and a secret lock indicator if needed
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: 'CardHeader',
    title: latestSnapshot.title,
    description: `Asked at ${new Date(input.created_at).toLocaleString()}`,
    // Use a question icon to denote a question
    startElement: {
      type: 'Icon',
      id: 'question-circle',
      color: 'blue',
      size: 24,
    },
    // If the question is secret, show a lock icon on the right
    ...(input.secret
      ? {
          endElement: {
            type: 'Icon',
            id: 'lock',
            color: 'gray',
            size: 20,
          },
        }
      : {}),
  };

  // Display the question body as markdown for rich formatting
  const content: IAutoView.IAutoViewCardContentProps = {
    type: 'CardContent',
    childrenProps: {
      type: 'Markdown',
      content:
        // Prepend a heading if markdown format; otherwise just show body
        latestSnapshot.format === 'md'
          ? latestSnapshot.body
          : `**${latestSnapshot.title}**\n\n${latestSnapshot.body}`,
    },
  };

  // If the seller has answered, show the answer; otherwise show an "Unanswered" chip
  const footer: IAutoView.IAutoViewCardFooterProps = {
    type: 'CardFooter',
    childrenProps:
      input.answer != null
        ? {
            type: 'Markdown',
            content: `### Answer\n\n${String(input.answer)}`,
          }
        : {
            type: 'Chip',
            label: 'Unanswered',
            color: 'warning',
            variant: 'outlined',
          },
  };

  // Return a vertical card combining header, content, and footer
  return {
    type: 'VerticalCard',
    childrenProps: [header, content, footer],
  };
}

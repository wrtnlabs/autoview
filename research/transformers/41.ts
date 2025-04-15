import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace IShoppingSeller {
    /**
     * Invert information starting from seller info.
     *
     * Instead of accessing to the seller information from the
     * {@link IShoppingCustomer.member} -> {@link IShoppingMember.seller},
     * `IShoppingSeller.IInvert` starts from the seller information
     * and access to the customer, member and {@link IShoppingCitizen citizen}
     * information inversely.
    */
    export type IInvert = {
        /**
         * Discriminant for the type of seller.
         *
         * @title Discriminant for the type of seller
        */
        type: "seller";
        /**
         * Membership joining information.
         *
         * @title Membership joining information
        */
        member: IShoppingMember.IInvert;
        /**
         * Customer, the connection information.
         *
         * @title Customer, the connection information
        */
        customer: IShoppingCustomer.IInvert;
        /**
         * Real-name and mobile number authentication information.
         *
         * @title Real-name and mobile number authentication information
        */
        citizen: IShoppingCitizen;
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
}
namespace IShoppingMember {
    /**
     * Invert information of member.
     *
     * This invert member information has been designed to be used for another
     * invert information of sellers and administrators like below.
     *
     * - {@link IShoppingSeller.IInvert}
     * - {@link IShoppingAdministrator.IInvert}
    */
    export type IInvert = {
        /**
         * Primary Key.
         *
         * @title Primary Key
        */
        id: string;
        /**
         * Nickname that uniquely identifies the member.
         *
         * @title Nickname that uniquely identifies the member
        */
        nickname: string;
        /**
         * List of emails.
         *
         * @title List of emails
        */
        emails: IShoppingMemberEmail[];
        /**
         * Creation time of record.
         *
         * Another words, the time when the member has signed up.
         *
         * @title Creation time of record
        */
        created_at: string;
    };
}
/**
 * Email address of member.
 *
 * This shopping mall system allows multiple email addresses to be
 * registered for one {@link IShoppingMember member}. If you don't have to
 * plan such multiple email addresses, just use only one.
*/
type IShoppingMemberEmail = {
    /**
     * Primary Key.
     *
     * @title Primary Key
    */
    id: string;
    /**
     * Email address value.
     *
     * @title Email address value
    */
    value: string;
    /**
     * Creation time of record.
     *
     * @title Creation time of record
    */
    created_at: string;
};
namespace IShoppingCustomer {
    /**
     * Inverted customer information.
     *
     * This inverted customer information has been designed to be used for
     * another invert information of sellers and administrators like below.
     *
     * - {@link IShoppingSeller.IInvert}
     * - {@link IShoppingAdministrator.IInvert}
    */
    export type IInvert = {
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
}
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
/**
 * Citizen verification information.
 *
 * `IShoppingCitizen` is an entity that records the user's
 * {@link name real name} and {@link mobile} input information.
 *
 * For reference, in South Korea, real name authentication is required for
 * e-commerce participants, so the name attribute is important. However, the
 * situation is different overseas, so in reality, mobile attributes are the
 * most important, and identification of individual person is also done based
 * on this mobile.
 *
 * Of course, real name and mobile phone authentication information are
 * encrypted and stored.
*/
type IShoppingCitizen = {
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
     * Mobile number.
     *
     * @title Mobile number
    */
    mobile: string & tags.JsonSchemaPlugin<{
        "x-wrtn-payment-order-mobile": true
    }>;
    /**
     * Real name, or equivalent nickname.
     *
     * @title Real name, or equivalent nickname
    */
    name: string & tags.JsonSchemaPlugin<{
        "x-wrtn-payment-order-citizen": true
    }>;
};
type IAutoViewTransformerInputType = IShoppingSeller.IInvert;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // We will create a vertical card to present the seller information visually.
  // The vertical card will include:
  // 1. A header with a seller icon, seller nickname, and seller id.
  // 2. A markdown content section showing detailed info from the member, customer and citizen objects.
  // 3. A footer with a timestamp indicating when the seller joined.
  
  // Construct the CardHeader component props.
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: `Seller: ${input.member.nickname}`,
    description: `Seller ID: ${input.id}`,
    // Using an icon to make the header visually engaging.
    startElement: {
      type: "Icon",
      // The icon name "user" (in kebab-case) can represent the seller.
      id: "user",
      color: "blue",
      size: 24
    }
  };

  // Construct the markdown content that summarizes the details.
  // We use markdown to organize the details in a well-structured format.
  const markdownContentLines: string[] = [];
  markdownContentLines.push("## Member Information");
  markdownContentLines.push(`**Nickname:** ${input.member.nickname}`);
  if (input.member.emails && input.member.emails.length > 0) {
    // list emails as bullet points
    markdownContentLines.push("**Emails:**");
    input.member.emails.forEach(email => {
      markdownContentLines.push(`- ${email.value}`);
    });
  }
  markdownContentLines.push("");
  markdownContentLines.push("## Customer Information");
  markdownContentLines.push(`**Channel:** ${input.customer.channel.name}`);
  // Show referrer information if available
  if (input.customer.referrer) {
    markdownContentLines.push(`**Referrer:** ${input.customer.referrer}`);
  }
  markdownContentLines.push("");
  markdownContentLines.push("## Citizen Verification");
  markdownContentLines.push(`**Name:** ${input.citizen.name}`);
  markdownContentLines.push(`**Mobile:** ${input.citizen.mobile}`);
  // Joining the markdown lines with newline characters.
  const detailedMarkdownContent: string = markdownContentLines.join("\n");

  // Construct the CardContent component using Markdown.
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    // Markdown is preferred over plain text, so we include a markdown component.
    childrenProps: {
      type: "Markdown",
      content: detailedMarkdownContent
    }
  };

  // Construct the CardFooter component, which displays the creation time.
  // Using a textual component with a caption style.
  const cardFooter: IAutoView.IAutoViewCardFooterProps = {
    type: "CardFooter",
    childrenProps: {
      type: "Text",
      variant: "footnote",
      content: `Signed up on: ${input.created_at}`,
      color: "gray"
    }
  };

  // Finally, compose the vertical card with header, content, and footer.
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [cardHeader, cardContent, cardFooter]
  };

  // Return the final component props.
  return verticalCard;
}

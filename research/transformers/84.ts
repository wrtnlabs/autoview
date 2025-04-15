import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
type IShoppingMileageDonation = {
    id: string & tags.Format<"uuid">;
    administrator: IShoppingAdministrator.IInvert;
    citizen: IShoppingCitizen;
    value: number;
    reason: string;
    created_at: string & tags.Format<"date-time">;
};
namespace IShoppingAdministrator {
    /**
     * Invert information starting from administrator info.
     *
     * Instead of accessing to the administrator information from the
     * {@link IShoppingCustomer.member} -> {@link IShoppingMember.administrator},
     * `IShoppingAdministrator.IInvert` starts from the administrator information
     * and access to the customer, member and {@link IShoppingCitizen citizen}
     * information inversely.
    */
    export type IInvert = {
        /**
         * Discriminant for the type of customer.
         *
         * @title Discriminant for the type of customer
        */
        type: "administrator";
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
         * Creation time of record.
         *
         * Another words, the time when the administrator has signed up.
         *
         * @title Creation time of record
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
type IAutoViewTransformerInputType = IShoppingMileageDonation;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // The goal here is to transform a mileage donation record into a visual component.
  // We choose a vertical card layout that will display the essential donation data
  // such as donation value, donation purpose (reason), administrator, citizen and creation time.
  //
  // We use the following AutoView components:
  // - A Card Header (IAutoViewCardHeaderProps) to show a prominent icon and brief summary.
  // - A Markdown component (IAutoViewMarkdownProps) inside the Card Content (IAutoViewCardContentProps)
  //   to elegantly display the donation reason and additional details.
  // - A Card Footer (IAutoViewCardFooterProps) to display auxiliary information like administrator,
  //   citizen and creation timestamp in a caption style.
  //
  // We incorporate visual elements (icons) instead of plain text where possible.

  // Create the header component.
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    // Combining the donation value into the title.
    title: `Donation of ${input.value} units`,
    // Use a short informative description.
    description: "New Mileage Donation Received",
    // Use an icon to represent donation (e.g., a 'gift' icon).
    startElement: {
      type: "Icon",
      id: "gift", // Assumes the icon name exists in the icon library in kebab-case.
      color: "blue",
      size: 24,
    },
    // Use an icon to represent the donor (using a generic 'user' icon).
    endElement: {
      type: "Icon",
      id: "user",
      color: "green",
      size: 24,
    },
  };

  // Create the content component using markdown to avoid plain text.
  // Markdown helps in rendering formatted text and is responsive on mobile devices.
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    // The markdown content includes donation reason and details.
    childrenProps: {
      type: "Markdown",
      content: `**Donation Reason:** ${input.reason}\n\n` +
               `> Received on: _${input.created_at}_`,
    },
  };

  // Create the footer component with additional donor information.
  // We include administrator nickname and citizen's name.
  const cardFooter: IAutoView.IAutoViewCardFooterProps = {
    type: "CardFooter",
    childrenProps: [
      {
        type: "Text",
        variant: "caption",
        // Display the administrator's member nickname.
        content: `Admin: ${input.administrator.member.nickname}`,
      } as IAutoView.IAutoViewTextProps,
      {
        type: "Text",
        variant: "caption",
        content: `Citizen: ${input.citizen.name}`,
      } as IAutoView.IAutoViewTextProps,
      {
        type: "Text",
        variant: "caption",
        content: `Record Created: ${input.created_at}`,
      } as IAutoView.IAutoViewTextProps,
    ],
  };

  // Assemble all parts together into a vertical card.
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [cardHeader, cardContent, cardFooter],
  };

  return verticalCard;
}

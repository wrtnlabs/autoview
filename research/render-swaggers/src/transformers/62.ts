import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export type IShoppingDepositCharge = {
        id: string & tags.Format<"uuid">;
        customer: Schema.IShoppingCustomer;
        publish: null | any;
        created_at: string & tags.Format<"date-time">;
        value: number;
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
    export type IShoppingDepositChargePublish = any;
}
type IAutoViewTransformerInputType = Schema.IShoppingDepositCharge;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // 1. CardHeader: show the type of record and the timestamp with an icon
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: 'CardHeader',
    title: 'Deposit Charge',
    description: new Date(input.created_at).toLocaleString(),
    startElement: {
      type: 'Icon',
      id: 'money-bill',     // FontAwesome "money-bill" icon
      size: 24,
      color: 'green',
    },
  };

  // 2. Build a list of key/value pairs to display the details
  const items: IAutoView.IAutoViewDataListItemProps[] = [];

  // 2.a. Unique ID
  items.push({
    type: 'DataListItem',
    label: {
      type: 'Text',
      content: 'ID',
      variant: 'body2',
      color: '#888',      // subtle gray
    },
    value: {
      type: 'Text',
      content: input.id,
    },
  });

  // 2.b. Creation date
  items.push({
    type: 'DataListItem',
    label: {
      type: 'Text',
      content: 'Date',
      variant: 'body2',
      color: '#888',
    },
    value: {
      type: 'Text',
      content: new Date(input.created_at).toLocaleString(),
    },
  });

  // 2.c. Monetary value rendered as a colored chip
  items.push({
    type: 'DataListItem',
    label: {
      type: 'Text',
      content: 'Amount',
      variant: 'body2',
      color: '#888',
    },
    value: {
      type: 'Chip',
      label: `$${input.value.toFixed(2)}`,
      color: 'success',
      size: 'medium',
      variant: 'filled',
    },
  });

  // 2.d. Customer identifier
  items.push({
    type: 'DataListItem',
    label: {
      type: 'Text',
      content: 'Customer ID',
      variant: 'body2',
      color: '#888',
    },
    value: {
      type: 'Text',
      content: input.customer.id,
    },
  });

  // 2.e. Channel through which the customer connected
  const channelName = input.customer.channel.name || input.customer.channel.code;
  items.push({
    type: 'DataListItem',
    label: {
      type: 'Text',
      content: 'Channel',
      variant: 'body2',
      color: '#888',
    },
    value: {
      type: 'Text',
      content: channelName,
    },
  });

  // 2.f. Customer IP address
  items.push({
    type: 'DataListItem',
    label: {
      type: 'Text',
      content: 'IP Address',
      variant: 'body2',
      color: '#888',
    },
    value: {
      type: 'Text',
      content: input.customer.ip,
    },
  });

  // 2.g. Referrer URL (clickable if present)
  if (input.customer.referrer) {
    const href = input.customer.referrer;
    items.push({
      type: 'DataListItem',
      label: {
        type: 'Text',
        content: 'Referrer',
        variant: 'body2',
        color: '#888',
      },
      value: {
        type: 'Markdown',
        // Markdown link for a more interactive UI
        content: `[${href}](${href})`,
      },
    });
  }

  // 2.h. Published status
  const isPublished = input.publish != null;
  items.push({
    type: 'DataListItem',
    label: {
      type: 'Text',
      content: 'Published',
      variant: 'body2',
      color: '#888',
    },
    value: {
      type: 'Chip',
      label: isPublished ? 'Yes' : 'No',
      color: isPublished ? 'primary' : 'gray',
      size: 'small',
      variant: 'filled',
    },
  });

  // 3. Wrap the items in a DataList for structured layout
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: 'DataList',
    childrenProps: items,
  };

  // 4. CardContent to hold our DataList
  const content: IAutoView.IAutoViewCardContentProps = {
    type: 'CardContent',
    childrenProps: dataList,
  };

  // 5. Compose everything into a VerticalCard for responsive presentation
  return {
    type: 'VerticalCard',
    childrenProps: [header, content],
  };
}

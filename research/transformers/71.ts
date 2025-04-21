import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export type IShoppingMileageHistory = {
        id: string & tags.Format<"uuid">;
        citizen: Schema.IShoppingCitizen;
        mileage: Schema.IShoppingMileage;
        source_id: string & tags.Format<"uuid">;
        value: number;
        balance: number;
        created_at: string & tags.Format<"date-time">;
    };
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
    export type IShoppingCitizen = {
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
        mobile: string;
        /**
         * Real name, or equivalent nickname.
         *
         * @title Real name, or equivalent nickname
        */
        name: string;
    };
    export type IShoppingMileage = {
        id: string & tags.Format<"uuid">;
        value: null | number;
        created_at: string & tags.Format<"date-time">;
        code: string;
        source: string;
        direction: -1 | 1;
    };
}
type IAutoViewTransformerInputType = Schema.IShoppingMileageHistory;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Destructure input for easier access
  const { citizen, mileage, value, balance, source_id, created_at } = input;

  // Format the timestamp into a human-readable string
  const date = new Date(created_at);
  const formattedDate = isNaN(date.getTime())
    ? 'Invalid date'
    : date.toLocaleString(); // e.g. "9/1/2023, 10:23 AM"

  // Determine transaction direction and styling
  const direction = mileage.direction;
  const amount = typeof value === 'number' ? value : 0;
  const sign = direction === 1 ? '+' : '-';
  // Use semantic color names for better UX
  const transactionColor = direction === 1 ? 'success' : 'error';

  // Card header: Avatar (initials), user name, and a colored chip showing the delta
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: 'CardHeader',
    title: citizen.name || 'Unknown User',
    description: formattedDate,
    startElement: {
      type: 'Avatar',
      name: citizen.name || 'User',
      variant: 'primary',
    },
    endElement: {
      type: 'Chip',
      label: `${sign}${amount}`,
      color: transactionColor,
      size: 'medium',
      variant: 'filled',
    },
  };

  // Build a data list of key-value pairs for the transaction details
  const dataListItems: IAutoView.IAutoViewDataListItemProps[] = [
    {
      type: 'DataListItem',
      label: { type: 'Text', content: 'Mobile' },
      value: { type: 'Text', content: citizen.mobile || 'N/A' },
    },
    {
      type: 'DataListItem',
      label: { type: 'Text', content: 'Source' },
      value: { type: 'Text', content: mileage.source },
    },
    {
      type: 'DataListItem',
      label: { type: 'Text', content: 'Code' },
      value: { type: 'Text', content: mileage.code },
    },
    {
      type: 'DataListItem',
      label: { type: 'Text', content: 'Balance' },
      value: { type: 'Text', content: balance.toString() },
    },
  ];

  // Wrap the data list into a CardContent component
  const content: IAutoView.IAutoViewCardContentProps = {
    type: 'CardContent',
    childrenProps: {
      type: 'DataList',
      childrenProps: dataListItems,
    },
  };

  // Footer with a button linking to a detailed view (responsive and accessible)
  const footer: IAutoView.IAutoViewCardFooterProps = {
    type: 'CardFooter',
    childrenProps: {
      type: 'Button',
      label: 'View Details',
      variant: 'text',
      color: 'primary',
      href: `/mileage/${source_id}`, // assumes a route to view details by source_id
    },
  };

  // Combine header, content, and footer into a vertical card for responsive display
  return {
    type: 'VerticalCard',
    childrenProps: [header, content, footer],
  };
}

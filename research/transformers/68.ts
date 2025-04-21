import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export type IShoppingDepositHistory = {
        id: string & tags.Format<"uuid">;
        citizen: Schema.IShoppingCitizen;
        deposit: Schema.IShoppingDeposit;
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
    export type IShoppingDeposit = {
        id: string & tags.Format<"uuid">;
        created_at: string & tags.Format<"date-time">;
        code: string;
        source: string;
        direction: -1 | 1;
    };
}
type IAutoViewTransformerInputType = Schema.IShoppingDepositHistory;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Destructure for easier access
  const { citizen, deposit, source_id, value, balance, created_at } = input;

  // Format the timestamp into a human-readable string
  const formattedDate = new Date(created_at).toLocaleString();

  // Determine sign and formatting for the amount
  const amountLabel = deposit.direction === 1 ? 'Credit' : 'Debit';
  const amountColor = deposit.direction === 1 ? 'success' : 'error';
  const formattedValue = `${deposit.direction === 1 ? '+' : '-'}$${Math.abs(value).toFixed(2)}`;

  return {
    // Use a vertical card to stack header, content, and footer
    type: "VerticalCard",
    childrenProps: [
      {
        // Card header with avatar for the citizen and a chip indicating credit/debit
        type: "CardHeader",
        title: citizen.name,
        description: `${deposit.source} (${deposit.code})`,
        startElement: {
          type: "Avatar",
          name: citizen.name,
          variant: "info",
        },
        endElement: {
          type: "Chip",
          label: amountLabel,
          color: amountColor,
          size: "small",
          variant: "filled",
        },
      },
      {
        // Card content: a data list showing key fields
        type: "CardContent",
        childrenProps: [
          {
            type: "DataList",
            childrenProps: [
              {
                type: "DataListItem",
                // Label for the row
                label: {
                  type: "Text",
                  content: "Amount",
                  variant: "subtitle2",
                },
                // Visualize the transaction amount with color coding
                value: {
                  type: "Text",
                  content: formattedValue,
                  color: amountColor,
                  variant: "body1",
                },
              },
              {
                type: "DataListItem",
                label: {
                  type: "Text",
                  content: "Balance",
                  variant: "subtitle2",
                },
                value: {
                  type: "Text",
                  content: `$${balance.toFixed(2)}`,
                  variant: "body1",
                },
              },
              {
                type: "DataListItem",
                label: {
                  type: "Text",
                  content: "Date",
                  variant: "subtitle2",
                },
                value: {
                  type: "Text",
                  content: formattedDate,
                  variant: "body2",
                },
              },
              {
                type: "DataListItem",
                label: {
                  type: "Text",
                  content: "Source ID",
                  variant: "subtitle2",
                },
                value: {
                  type: "Text",
                  content: source_id,
                  variant: "body2",
                },
              },
            ],
          },
        ],
      },
      {
        // Card footer: show citizen's mobile with an icon
        type: "CardFooter",
        childrenProps: [
          {
            type: "Icon",
            id: "phone",
            color: "gray",
            size: 16,
          },
          {
            type: "Text",
            content: citizen.mobile,
            variant: "body2",
          },
        ],
      },
    ],
  };
}

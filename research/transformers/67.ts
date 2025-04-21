import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * A page.
     *
     * Collection of records with pagination indformation.
    */
    export type IPageIShoppingDepositHistory = {
        /**
         * Page information.
         *
         * @title Page information
        */
        pagination: Schema.IPage.IPagination;
        /**
         * List of records.
         *
         * @title List of records
        */
        data: Schema.IShoppingDepositHistory[];
    };
    export namespace IPage {
        /**
         * Page information.
        */
        export type IPagination = {
            /**
             * Current page number.
             *
             * @title Current page number
            */
            current: number & tags.Type<"int32">;
            /**
             * Limitation of records per a page.
             *
             * @title Limitation of records per a page
            */
            limit: number & tags.Type<"int32">;
            /**
             * Total records in the database.
             *
             * @title Total records in the database
            */
            records: number & tags.Type<"int32">;
            /**
             * Total pages.
             *
             * Equal to {@link records} / {@link limit} with ceiling.
             *
             * @title Total pages
            */
            pages: number & tags.Type<"int32">;
        };
    }
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
type IAutoViewTransformerInputType = Schema.IPageIShoppingDepositHistory;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Extract pagination and data array
  const { pagination, data } = input;

  // Safely get the first citizen for header display (all records belong to the same citizen)
  const firstCitizen = data[0]?.citizen;
  const citizenName = firstCitizen?.name ?? "";
  const citizenMobile = firstCitizen?.mobile;

  // Build the CardHeader: show citizen avatar, name and mobile
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: citizenName ? `${citizenName}'s Deposit History` : "Deposit History",
    description: citizenMobile,
    // Show initials avatar if name is available
    ...(citizenName
      ? {
          startElement: {
            type: "Avatar",
            name: citizenName,
            // Optional: choose a variant color
            variant: "primary",
          } as IAutoView.IAutoViewAvatarProps,
        }
      : {}),
  };

  // Build a DataList of each deposit history record
  const dataListItems: IAutoView.IAutoViewDataListItemProps[] = data.map((item) => {
    // Direction arrow icon: up for deposit, down for withdrawal
    const directionIcon: IAutoView.IAutoViewIconProps = {
      type: "Icon",
      id: item.deposit.direction === 1 ? "arrow-up" : "arrow-down",
      color: item.deposit.direction === 1 ? "green" : "red",
      size: 16,
    };

    // Format date string (fallback to raw if Date parsing fails)
    let dateLabel: string = item.created_at;
    try {
      dateLabel = new Date(item.created_at).toLocaleString();
    } catch {
      // keep raw timestamp
    }

    // Text components for label: date, deposit code, source
    const labelComponents: IAutoView.IAutoViewPresentationComponentProps[] = [
      directionIcon,
      {
        type: "Text",
        variant: "subtitle2",
        content: dateLabel,
      } as IAutoView.IAutoViewTextProps,
      {
        type: "Text",
        variant: "caption",
        content: `Code: ${item.deposit.code}`,
        color: "#666", // subdued color for metadata
      } as IAutoView.IAutoViewTextProps,
      {
        type: "Text",
        variant: "caption",
        content: `Via: ${item.deposit.source}`,
        color: "#666",
      } as IAutoView.IAutoViewTextProps,
    ];

    // Text components for value: deposit amount and resulting balance
    const valueComponents: IAutoView.IAutoViewPresentationComponentProps[] = [
      {
        type: "Text",
        variant: "body1",
        content: `$${item.value.toFixed(2)}`,
        color: item.deposit.direction === 1 ? "green" : "red",
      } as IAutoView.IAutoViewTextProps,
      {
        type: "Text",
        variant: "body2",
        content: `Balance: $${item.balance.toFixed(2)}`,
        color: "#333",
      } as IAutoView.IAutoViewTextProps,
    ];

    // Return a DataListItem combining label and value
    return {
      type: "DataListItem",
      label: labelComponents,
      value: valueComponents,
    };
  });

  // Compose the DataList component
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: dataListItems,
  };

  // Footer showing current page / total pages
  const pageInfoText: IAutoView.IAutoViewTextProps = {
    type: "Text",
    variant: "caption",
    content: `Page ${pagination.current} of ${pagination.pages}`,
    color: "#888",
  };

  const cardFooter: IAutoView.IAutoViewCardFooterProps = {
    type: "CardFooter",
    childrenProps: pageInfoText,
  };

  // Assemble the VerticalCard with header, content (DataList), and footer
  const verticalCard: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [
      cardHeader,
      {
        type: "CardContent",
        childrenProps: dataList,
      } as IAutoView.IAutoViewCardContentProps,
      cardFooter,
    ],
  };

  return verticalCard;
}

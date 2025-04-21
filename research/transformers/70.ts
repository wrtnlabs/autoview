import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * A page.
     *
     * Collection of records with pagination indformation.
    */
    export type IPageIShoppingMileageHistory = {
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
        data: Schema.IShoppingMileageHistory[];
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
type IAutoViewTransformerInputType = Schema.IPageIShoppingMileageHistory;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // If there are no history records, show a friendly message using markdown
    if (!input.data || input.data.length === 0) {
        return {
            type: "Markdown",
            content: "### No mileage history available"
        } as IAutoView.IAutoViewMarkdownProps;
    }

    // Map each record to a DataListItemProps
    const items: IAutoView.IAutoViewDataListItemProps[] = input.data.map(record => {
        // Format the created_at timestamp in a locale-aware way
        const dateLabel = new Date(record.created_at).toLocaleString();

        // Choose direction icon and color based on positive/negative direction
        const directionIcon: IAutoView.IAutoViewIconProps = {
            type: "Icon",
            id: record.mileage.direction === 1 ? "arrow-up" : "arrow-down",
            color: record.mileage.direction === 1 ? "green" : "red",
            size: 16
        };

        // Chip to visualize the change in mileage
        const changeChip: IAutoView.IAutoViewChipProps = {
            type: "Chip",
            label: `${record.value > 0 ? "+" : ""}${record.value}`,
            color: record.value > 0 ? "green" : "red",
            variant: "filled",
            size: "small",
            startElement: directionIcon
        };

        // Text showing the resulting balance after the change
        const balanceText: IAutoView.IAutoViewTextProps = {
            type: "Text",
            content: `Balance: ${record.balance}`,
            variant: "caption",
            color: "secondary"
        };

        // Text showing the citizen's name
        const nameText: IAutoView.IAutoViewTextProps = {
            type: "Text",
            content: record.citizen.name,
            variant: "body1",
            color: "primary"
        };

        // Text showing the transaction code for reference
        const codeText: IAutoView.IAutoViewTextProps = {
            type: "Text",
            content: record.mileage.code,
            variant: "body2",
            color: "gray"
        };

        return {
            type: "DataListItem",
            // Label section combines a calendar icon and the date text
            label: [
                {
                    type: "Icon",
                    id: "calendar",
                    size: 16,
                    color: "blue"
                },
                {
                    type: "Text",
                    content: dateLabel,
                    variant: "body2",
                    color: "gray"
                }
            ],
            // Value section shows name, change chip, balance, and transaction code
            value: [nameText, changeChip, balanceText, codeText]
        } as IAutoView.IAutoViewDataListItemProps;
    });

    // Return a DataList of all items, suitable for responsive display
    return {
        type: "DataList",
        childrenProps: items
    } as IAutoView.IAutoViewDataListProps;
}

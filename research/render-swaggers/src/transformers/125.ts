import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Journey of delivery.
     *
     * `IShoppingDeliveryJourney` is a subsidiary entity of {@link IShoppingDelivery},
     * describing each journey of the delivery. For reference, the word journey
     * means each step of the delivery process, such as preparing, shipping, and
     * delivering {@link IShoppingOrderGood goods} to the
     * {@link IShoppingCustomer customer}.
    */
    export type IShoppingDeliveryJourney = {
        /**
         * Primary Key.
         *
         * @title Primary Key
        */
        id: string;
        /**
         * Creation time of the record.
         *
         * @title Creation time of the record
        */
        created_at: string;
        /**
         * Deletion time of the record.
         *
         * @title Deletion time of the record
        */
        deleted_at: null | (string & tags.Format<"date-time">);
        /**
         * Type of journey.
         *
         * - preparing
         * - manufacturing
         * - shipping
         * - delivering
         *
         * @title Type of journey
        */
        type: "preparing" | "manufacturing" | "shipping" | "delivering";
        /**
         * Title of journey.
         *
         * @title Title of journey
        */
        title: null | string;
        /**
         * Description of journey.
         *
         * @title Description of journey
        */
        description: null | string;
        /**
         * Start time of the journey.
         *
         * @title Start time of the journey
        */
        started_at: null | (string & tags.Format<"date-time">);
        /**
         * Completion time of the journey.
         *
         * @title Completion time of the journey
        */
        completed_at: null | (string & tags.Format<"date-time">);
    };
}
type IAutoViewTransformerInputType = Schema.IShoppingDeliveryJourney;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  /**
   * Map each journey type to a font-awesome icon.
   * You can adjust icon names to match your available set.
   */
  const typeIconMap: Record<
    IAutoViewTransformerInputType['type'],
    IAutoView.IAutoViewIconProps
  > = {
    preparing: { type: 'Icon', id: 'box-open', color: 'blue', size: 24 },
    manufacturing: { type: 'Icon', id: 'industry', color: 'orange', size: 24 },
    shipping: { type: 'Icon', id: 'truck', color: 'teal', size: 24 },
    delivering: { type: 'Icon', id: 'home', color: 'green', size: 24 },
  };

  /**
   * Format an ISO date-time string into a localized human-readable form.
   * If the value is null or undefined, returns "N/A".
   */
  function formatDate(dateTime: string | null): string {
    if (!dateTime) return 'N/A';
    const d = new Date(dateTime);
    // toLocaleString will adapt to user's locale and is responsive
    return isNaN(d.getTime()) ? 'Invalid Date' : d.toLocaleString();
  }

  /**
   * Capitalize the first letter of a word.
   */
  function capitalize(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  // Build the CardHeader: uses an icon, title, and optional description.
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: 'CardHeader',
    title: input.title ?? capitalize(input.type),
    // Only include description if non-null and non-empty
    ...(input.description ? { description: input.description } : {}),
    startElement: typeIconMap[input.type] ?? { type: 'Icon', id: 'info-circle' },
  };

  // Prepare a DataList of key fields: type, started_at, completed_at
  const listItems: IAutoView.IAutoViewDataListItemProps[] = [
    {
      type: 'DataListItem',
      label: { type: 'Text', content: 'Journey Type' },
      value: { type: 'Text', content: capitalize(input.type) },
    },
    {
      type: 'DataListItem',
      label: { type: 'Icon', id: 'calendar-day', color: 'blue', size: 16 },
      value: { type: 'Text', content: formatDate(input.started_at) },
    },
    {
      type: 'DataListItem',
      label: { type: 'Icon', id: 'check-circle', color: 'green', size: 16 },
      value: { type: 'Text', content: formatDate(input.completed_at) },
    },
  ];

  const content: IAutoView.IAutoViewCardContentProps = {
    type: 'CardContent',
    // Use a DataList for structured display; it's responsive on small screens.
    childrenProps: {
      type: 'DataList',
      childrenProps: listItems,
    },
  };

  // Assemble a vertical card: header + content.
  return {
    type: 'VerticalCard',
    childrenProps: [header, content],
  };
}

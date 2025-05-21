import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * Section information.
     *
     * `IShoppingSection` is a concept that refers to the spatial information of
     * the market.
     *
     * If we compare the section mentioned here to the offline market, it means a
     * spatially separated area within the store, such as the "fruit corner" or
     * "butcher corner". Therefore, in the {@link IShoppingSale sale} entity, it is
     * not possible to classify multiple sections simultaneously, but only one section
     * can be classified.
     *
     * By the way, if your shopping mall system requires only one section, then just
     * use only one. This concept is designed to be expandable in the future.
    */
    export type IShoppingSection = {
        /**
         * Primary Key.
         *
         * @title Primary Key
        */
        id: string;
        /**
         * Identifier code.
         *
         * @title Identifier code
        */
        code: string;
        /**
         * Representative name of the section.
         *
         * @title Representative name of the section
        */
        name: string;
        /**
         * Creation time of record.
         *
         * @title Creation time of record
        */
        created_at: string;
    };
}
export type AutoViewInput = AutoViewInputSubTypes.IShoppingSection;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const createdDate = new Date(value.created_at);
  const formattedCreatedAt = createdDate.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Semantic elements: heading for name, time for date.
  return (
    <div className="max-w-sm w-full p-4 bg-white rounded-lg shadow-md flex flex-col space-y-2">
      <h2 className="text-xl font-semibold text-gray-900 truncate">
        {value.name}
      </h2>
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium text-gray-600">Section Code:</span>
        <span className="text-sm text-gray-800 bg-gray-100 px-2 py-1 rounded">
          {value.code}
        </span>
      </div>
      <div className="text-sm text-gray-500">
        Created on{' '}
        <time dateTime={value.created_at}>{formattedCreatedAt}</time>
      </div>
    </div>
  );
}

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
  // 1. Data transformation: format the creation date for readability
  const formattedDate = new Date(value.created_at).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  // 2. Compose the visual structure using JSX and Tailwind CSS
  return (
    <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-md">
      {/* Section Name */}
      <h2 className="text-lg font-semibold text-gray-900 truncate">
        {value.name}
      </h2>

      {/* Section Code Badge */}
      <span className="inline-block mt-2 px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-800 rounded">
        {value.code.toUpperCase()}
      </span>

      {/* Creation Date */}
      <p className="mt-3 text-xs text-gray-500">
        Created on {formattedDate}
      </p>
    </div>
  );
}

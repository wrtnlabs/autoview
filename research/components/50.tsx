import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
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
    export interface IShoppingSection {
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
    }
}
export type AutoViewInput = AutoViewInputSubTypes.IShoppingSection;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  //    Format the creation date into a human-readable form.
  const formattedDate = new Date(value.created_at).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Display only the section's name, identifier code, and formatted creation date.
  return (
    <div className="w-full max-w-sm p-4 bg-white rounded-lg shadow-md">
      {/* Section Name */}
      <h2 className="text-xl font-semibold text-gray-800 mb-3 truncate">
        {value.name}
      </h2>

      {/* Identifier Code */}
      <div className="flex items-center text-sm text-gray-600 mb-2">
        <LucideReact.Hash size={16} className="text-gray-400 mr-1" />
        <span className="font-medium">Code:</span>
        <span className="ml-1 truncate">{value.code}</span>
      </div>

      {/* Creation Date */}
      <div className="flex items-center text-sm text-gray-600">
        <LucideReact.Calendar size={16} className="text-gray-400 mr-1" />
        <span className="font-medium">Created:</span>
        <time dateTime={value.created_at} className="ml-1">
          {formattedDate}
        </time>
      </div>
    </div>
  );
}

import * as LucideReact from "lucide-react";
import React, { JSX } from "react";

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
  //    Here we format the ISO date into a human-readable format.
  const formattedDate = new Date(value.created_at).toLocaleDateString(
    undefined,
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  );

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    We omit internal IDs and focus on the section name, code, and creation date.
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm max-w-xs w-full mx-auto">
      <div className="flex items-center mb-2">
        <LucideReact.Folder className="text-blue-500 mr-2" size={20} />
        <h2 className="text-lg font-semibold text-gray-900 truncate">
          {value.name}
        </h2>
      </div>

      <div className="flex items-center text-sm text-gray-600 mb-1">
        <LucideReact.Tag className="mr-1 text-gray-500" size={16} />
        <span className="truncate">{value.code}</span>
      </div>

      <div className="flex items-center text-sm text-gray-600">
        <LucideReact.Calendar className="mr-1 text-gray-500" size={16} />
        <span>Created on {formattedDate}</span>
      </div>
    </div>
  );
}

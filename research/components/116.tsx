import LucideReact from "lucide-react";
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
  const formattedDate: string = new Date(value.created_at).toLocaleDateString(
    undefined,
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  );

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  return (
    <div className="max-w-sm mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-3">
        <LucideReact.Tag className="text-blue-500 mr-2" size={20} />
        <h2 className="text-xl font-semibold text-gray-800 truncate">
          {value.name}
        </h2>
      </div>
      <div className="space-y-2 text-gray-600 text-sm">
        <div className="flex items-center">
          <LucideReact.Hash className="text-gray-400 mr-1" size={16} />
          <span>
            Code:{" "}
            <span className="font-medium text-gray-800">{value.code}</span>
          </span>
        </div>
        <div className="flex items-center">
          <LucideReact.Calendar className="text-gray-400 mr-1" size={16} />
          <span>
            Created:{" "}
            <span className="font-medium text-gray-800">{formattedDate}</span>
          </span>
        </div>
      </div>
    </div>
  );
}

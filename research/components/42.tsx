import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * Channel information.
     *
     * `IShoppingChannel` is a concept that shapes the distribution channel in the
     * market. Therefore, the difference in the channel in this e-commerce system
     * means that it is another site or application.
     *
     * By the way, if your shopping mall system requires only one channel, then
     * just use only one. This concept is designed to be expandable in the future.
    */
    export type IShoppingChannel = {
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
         * Identifier code.
         *
         * @title Identifier code
        */
        code: string;
        /**
         * Name of the channel.
         *
         * @title Name of the channel
        */
        name: string;
    };
}
export type AutoViewInput = AutoViewInputSubTypes.IShoppingChannel;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { name, code, created_at } = value;
  const createdDate = new Date(created_at);
  const formattedCreatedAt = createdDate.toLocaleDateString('default', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  return (
    <div className="w-full max-w-sm mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-gray-900 text-lg font-semibold truncate">{name}</h2>
      <div className="mt-2 flex items-center space-x-2">
        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded">
          {code}
        </span>
      </div>
      <p className="mt-3 text-gray-500 text-sm">
        Created on {formattedCreatedAt}
      </p>
    </div>
  );
}

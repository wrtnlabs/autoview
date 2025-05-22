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
  const formattedDate = createdDate.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Derive a relative time string (e.g., "2 days ago")
  const now = Date.now();
  const diffMs = now - createdDate.getTime();
  const diffSec = diffMs / 1000;
  const diffMin = diffSec / 60;
  const diffHrs = diffMin / 60;
  const diffDays = diffHrs / 24;

  let relativeTime: string;
  if (diffSec < 60) {
    relativeTime = 'just now';
  } else if (diffMin < 60) {
    relativeTime = `${Math.floor(diffMin)} minute${Math.floor(diffMin) !== 1 ? 's' : ''} ago`;
  } else if (diffHrs < 24) {
    relativeTime = `${Math.floor(diffHrs)} hour${Math.floor(diffHrs) !== 1 ? 's' : ''} ago`;
  } else {
    relativeTime = `${Math.floor(diffDays)} day${Math.floor(diffDays) !== 1 ? 's' : ''} ago`;
  }

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilize semantic HTML elements where appropriate.
  //    This is a simple, mobile-first card for a shopping section.
  return (
    <div className="max-w-sm w-full bg-white rounded-lg shadow-md p-4 mx-auto">
      <header className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800 truncate" title={value.name}>
          {value.name}
        </h2>
        <span className="px-2 py-0.5 text-xs font-medium text-gray-600 uppercase bg-gray-100 rounded">
          {value.code}
        </span>
      </header>
      <section className="mt-3 text-sm text-gray-600 space-y-1">
        <p>
          <span className="font-medium text-gray-700">Created:</span>{' '}
          <time dateTime={value.created_at}>{formattedDate}</time>
        </p>
        <p className="text-gray-500 italic">{relativeTime}</p>
      </section>
    </div>
  );
}

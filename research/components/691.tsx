import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * Permission check result for a given devcontainer config.
     *
     * @title Codespaces Permissions Check
    */
    export type codespaces_permissions_check_for_devcontainer = {
        /**
         * Whether the user has accepted the permissions defined by the devcontainer config
        */
        accepted: boolean;
    };
}
export type AutoViewInput = AutoViewInputSubTypes.codespaces_permissions_check_for_devcontainer;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const statusText = value.accepted ? 'Accepted' : 'Not Accepted';
  const statusClasses = value.accepted
    ? 'text-green-700 bg-green-100'
    : 'text-red-700 bg-red-100';
  const description = value.accepted
    ? 'You have accepted the permissions defined by the devcontainer config.'
    : 'You have not accepted the permissions defined by the devcontainer config.';

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilizing semantic HTML elements and utility classes for styling.
  const element = (
    <div className="p-4 bg-white rounded-lg shadow-md w-full max-w-sm mx-auto">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        Codespaces Permissions Check
      </h3>
      <span
        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-2 ${statusClasses}`}
      >
        {statusText}
      </span>
      <p className="text-gray-600 text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );

  // 3. Return the React element.
  return element;
}

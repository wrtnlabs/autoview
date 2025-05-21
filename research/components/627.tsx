import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * Check Dependabot security updates
     *
     * @title Check Dependabot security updates
    */
    export type check_automated_security_fixes = {
        /**
         * Whether Dependabot security updates are enabled for the repository.
        */
        enabled: boolean;
        /**
         * Whether Dependabot security updates are paused for the repository.
        */
        paused: boolean;
    };
}
export type AutoViewInput = AutoViewInputSubTypes.check_automated_security_fixes;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const isEnabled = value.enabled;
  const isPaused = value.paused;

  const enabledBadge = (
    <span
      className={`px-2 py-1 text-xs font-semibold rounded ${
        isEnabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
      }`}
    >
      {isEnabled ? 'Enabled' : 'Disabled'}
    </span>
  );

  const pausedBadge = (
    <span
      className={`px-2 py-1 text-xs font-semibold rounded ${
        isPaused ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
      }`}
    >
      {isPaused ? 'Paused' : 'Running'}
    </span>
  );

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilize semantic HTML elements where appropriate.
  const content = (
    <div className="max-w-xs mx-auto p-4 bg-white rounded-lg shadow">
      <h2 className="text-lg font-medium text-gray-900 mb-2 truncate">
        Dependabot Security Updates
      </h2>
      <div className="flex flex-wrap items-center space-x-2">
        {enabledBadge}
        {pausedBadge}
      </div>
    </div>
  );

  // 3. Return the React element.
  return content;
}

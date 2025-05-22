import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * Configuration for code scanning default setup.
    */
    export type code_scanning_default_setup = {
        /**
         * Code scanning default setup has been configured or not.
        */
        state?: "configured" | "not-configured";
        /**
         * Languages to be analyzed.
        */
        languages?: ("actions" | "c-cpp" | "csharp" | "go" | "java-kotlin" | "javascript-typescript" | "javascript" | "python" | "ruby" | "typescript" | "swift")[];
        /**
         * Runner type to be used.
        */
        runner_type?: "standard" | "labeled" | null;
        /**
         * Runner label to be used if the runner type is labeled.
        */
        runner_label?: string | null;
        /**
         * CodeQL query suite to be used.
        */
        query_suite?: "default" | "extended";
        /**
         * Timestamp of latest configuration update.
        */
        updated_at?: (string & tags.Format<"date-time">) | null;
        /**
         * The frequency of the periodic analysis.
        */
        schedule?: "weekly" | null;
    };
}
export type AutoViewInput = AutoViewInputSubTypes.code_scanning_default_setup;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

  const configurationState = value.state === "configured" ? "Configured" : "Not configured";

  const languages = Array.isArray(value.languages) && value.languages.length > 0
    ? value.languages
    : [];

  let runnerDisplay: string;
  if (value.runner_type === "standard") {
    runnerDisplay = "Standard runner";
  } else if (value.runner_type === "labeled") {
    runnerDisplay = value.runner_label ? `Runner: ${value.runner_label}` : "Labeled runner";
  } else {
    runnerDisplay = "Runner not specified";
  }

  const querySuite = value.query_suite
    ? `${capitalize(value.query_suite)} suite`
    : "Default suite";

  const scheduleDisplay = value.schedule
    ? capitalize(value.schedule)
    : "Not scheduled";

  const updatedAtDisplay = value.updated_at
    ? new Date(value.updated_at).toLocaleString()
    : "Unknown";

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Code Scanning Configuration
      </h2>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600">State:</span>
          <span className="font-medium text-gray-800">{configurationState}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-600 mb-1">Languages:</span>
          {languages.length > 0 ? (
            <div className="flex flex-wrap">
              {languages.map((lang, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-gray-100 text-gray-800 rounded-full px-2 py-1 mr-2 mb-2"
                >
                  {lang}
                </span>
              ))}
            </div>
          ) : (
            <span className="font-medium text-gray-800">None specified</span>
          )}
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Runner:</span>
          <span className="font-medium text-gray-800">{runnerDisplay}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Query Suite:</span>
          <span className="font-medium text-gray-800">{querySuite}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Schedule:</span>
          <span className="font-medium text-gray-800">{scheduleDisplay}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Last Updated:</span>
          <span className="font-medium text-gray-800">{updatedAtDisplay}</span>
        </div>
      </div>
    </div>
  );
}

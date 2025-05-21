import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    export type code_scanning_sarifs_status = {
        /**
         * `pending` files have not yet been processed, while `complete` means results from the SARIF have been stored. `failed` files have either not been processed at all, or could only be partially processed.
        */
        processing_status?: "pending" | "complete" | "failed";
        /**
         * The REST API URL for getting the analyses associated with the upload.
        */
        analyses_url?: (string & tags.Format<"uri">) | null;
        /**
         * Any errors that ocurred during processing of the delivery.
        */
        errors?: string[] | null;
    };
}
export type AutoViewInput = AutoViewInputSubTypes.code_scanning_sarifs_status;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const statusInfo = (() => {
    switch (value.processing_status) {
      case "pending":
        return { label: "Pending", colorClasses: "bg-yellow-100 text-yellow-800" };
      case "complete":
        return { label: "Complete", colorClasses: "bg-green-100 text-green-800" };
      case "failed":
        return { label: "Failed", colorClasses: "bg-red-100 text-red-800" };
      default:
        return { label: "Unknown", colorClasses: "bg-gray-100 text-gray-800" };
    }
  })();

  const analysesUrl = value.analyses_url ?? "N/A";
  const errors = value.errors ?? [];
  const displayErrors = errors.slice(0, 3);

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">
        SARIF Processing Status
      </h3>

      <div className="mb-4">
        <span
          className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${statusInfo.colorClasses}`}
        >
          {statusInfo.label}
        </span>
      </div>

      <dl className="space-y-4">
        <div>
          <dt className="text-sm font-medium text-gray-500">Analyses URL</dt>
          <dd className="mt-1 text-sm text-blue-600 break-all">
            {analysesUrl}
          </dd>
        </div>

        <div>
          <dt className="text-sm font-medium text-gray-500">Errors</dt>
          {errors.length > 0 ? (
            <dd className="mt-1">
              <ul className="list-disc list-inside text-sm text-red-700 space-y-1 max-h-24 overflow-y-auto">
                {displayErrors.map((err, idx) => (
                  <li key={idx} className="truncate">
                    {err}
                  </li>
                ))}
                {errors.length > 3 && (
                  <li className="text-gray-500">
                    +{errors.length - 3} more
                  </li>
                )}
              </ul>
            </dd>
          ) : (
            <dd className="mt-1 text-sm text-gray-600">None</dd>
          )}
        </div>
      </dl>
    </div>
  );
}

import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export interface code_scanning_sarifs_status {
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
    }
}
export type AutoViewInput = AutoViewInputSubTypes.code_scanning_sarifs_status;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const status = value.processing_status ?? 'unknown';
  let statusIcon: JSX.Element;
  let statusLabel: string;

  switch (status) {
    case 'pending':
      statusIcon = <LucideReact.Clock className="text-amber-500" size={16} />;
      statusLabel = 'Pending';
      break;
    case 'complete':
      statusIcon = <LucideReact.CheckCircle className="text-green-500" size={16} />;
      statusLabel = 'Complete';
      break;
    case 'failed':
      statusIcon = <LucideReact.AlertTriangle className="text-red-500" size={16} />;
      statusLabel = 'Failed';
      break;
    default:
      statusIcon = <LucideReact.HelpCircle className="text-gray-500" size={16} />;
      statusLabel = 'Unknown';
  }

  const hasErrors = Array.isArray(value.errors) && value.errors.length > 0;
  const analysesUrl = value.analyses_url;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="w-full max-w-sm mx-auto p-4 bg-white rounded-lg shadow-md flex flex-col gap-4">
      {/* Status */}
      <div className="flex items-center gap-2">
        {statusIcon}
        <span className="text-gray-700 font-semibold">{statusLabel}</span>
      </div>

      {/* Analyses URL */}
      {analysesUrl ? (
        <div
          className="flex items-center gap-2 text-blue-600 text-sm truncate"
          title={analysesUrl}
        >
          <LucideReact.Link size={16} className="min-w-[16px]" />
          <span className="truncate">{analysesUrl}</span>
        </div>
      ) : null}

      {/* Errors List */}
      {hasErrors ? (
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-red-600 font-medium">
            <LucideReact.AlertOctagon size={16} />
            <span>Errors</span>
          </div>
          <ul className="list-disc list-inside text-red-600 text-sm space-y-1">
            {value.errors!.map((err, idx) => (
              <li key={idx} className="truncate">
                {err}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

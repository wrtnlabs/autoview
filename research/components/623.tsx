import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    export namespace IApiReposAttestations {
        export interface GetResponse {
            attestations?: {
                /**
                 * The attestation's Sigstore Bundle.
                 * Refer to the [Sigstore Bundle Specification](https://github.com/sigstore/protobuf-specs/blob/main/protos/sigstore_bundle.proto) for more information.
                */
                bundle?: {
                    mediaType?: string;
                    verificationMaterial?: {};
                    dsseEnvelope?: {};
                };
                repository_id?: number & tags.Type<"int32">;
                bundle_url?: string;
            }[];
        }
    }
}
export type AutoViewInput = AutoViewInputSubTypes.IApiReposAttestations.GetResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const attestations = value.attestations ?? [];
  const hasAttestations = attestations.length > 0;
  const truncate = (text: string, max = 50): string =>
    text.length > max ? text.slice(0, max) + '…' : text;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4 flex items-center text-gray-800">
        <LucideReact.ListChecks className="mr-2 text-gray-600" size={20} />
        Attestations ({attestations.length})
      </h2>
      {!hasAttestations ? (
        <div className="flex flex-col items-center text-gray-500 py-8">
          <LucideReact.AlertCircle size={48} className="mb-2" />
          <span>No attestations found</span>
        </div>
      ) : (
        <ul className="space-y-4">
          {attestations.map((att, idx) => {
            const isComplete = !!att.bundle;
            return (
              <li key={idx} className="p-4 border border-gray-200 rounded-md">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {isComplete ? (
                      <LucideReact.CheckCircle className="text-green-500" size={16} />
                    ) : (
                      <LucideReact.AlertTriangle className="text-amber-500" size={16} />
                    )}
                    <span className="font-medium text-gray-800">Attestation {idx + 1}</span>
                  </div>
                  {att.repository_id != null && (
                    <span className="text-sm text-gray-600">
                      Repo ID: {att.repository_id}
                    </span>
                  )}
                </div>
                <div className="space-y-1 text-sm text-gray-700">
                  {att.bundle?.mediaType && (
                    <div className="flex items-center gap-1">
                      <LucideReact.FileText size={16} className="text-indigo-500" />
                      <span>{att.bundle.mediaType}</span>
                    </div>
                  )}
                  {att.bundle_url && (
                    <div className="flex items-center gap-1 break-all">
                      <LucideReact.Link size={16} className="text-gray-400" />
                      <span>{truncate(att.bundle_url)}</span>
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

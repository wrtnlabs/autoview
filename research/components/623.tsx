import LucideReact from "lucide-react";
import React, { JSX } from "react";
import { tags } from "typia";

export namespace AutoViewInputSubTypes {
  export namespace IApiReposAttestations {
    export type GetResponse = {
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
    };
  }
}
export type AutoViewInput =
  AutoViewInputSubTypes.IApiReposAttestations.GetResponse;

// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const attestations = value.attestations ?? [];
  const total = attestations.length;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  //    Utilize semantic HTML elements where appropriate.
  if (total === 0) {
    return (
      <div className="flex flex-col items-center p-6 text-gray-500">
        <LucideReact.AlertCircle size={48} />
        <span className="mt-2 text-lg">No attestations available.</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary Header */}
      <div className="flex items-center text-gray-700">
        <LucideReact.List className="text-gray-500" size={20} />
        <span className="ml-2 font-semibold">
          {total} Attestation{total > 1 ? "s" : ""}
        </span>
      </div>

      {/* Attestation Cards */}
      {attestations.map((att, idx) => {
        const bundle = att.bundle;
        const hasVerification = !!bundle?.verificationMaterial;
        const hasDsse = !!bundle?.dsseEnvelope;
        return (
          <div
            key={idx}
            className="p-4 bg-white rounded-lg shadow border border-gray-200"
          >
            <div className="flex items-center mb-2">
              <LucideReact.FileText className="text-indigo-500" size={20} />
              <span className="ml-2 font-medium text-gray-800">
                Attestation {idx + 1}
              </span>
            </div>
            <div className="space-y-1 text-sm text-gray-600">
              {att.repository_id !== undefined && (
                <div className="flex items-center">
                  <LucideReact.Hash className="text-gray-400" size={16} />
                  <span className="ml-1">
                    Repository ID: {att.repository_id}
                  </span>
                </div>
              )}
              {bundle?.mediaType && (
                <div className="flex items-center">
                  <LucideReact.Tag className="text-gray-400" size={16} />
                  <span className="ml-1">Media Type: {bundle.mediaType}</span>
                </div>
              )}
              {att.bundle_url && (
                <div className="flex items-center">
                  <LucideReact.Link className="text-gray-400" size={16} />
                  <span className="ml-1 break-all">{att.bundle_url}</span>
                </div>
              )}
              {/* Verification Material Indicator */}
              <div className="flex items-center">
                {hasVerification ? (
                  <LucideReact.CheckCircle
                    className="text-green-500"
                    size={16}
                  />
                ) : (
                  <LucideReact.XCircle className="text-red-500" size={16} />
                )}
                <span className="ml-1">
                  {hasVerification
                    ? "Verification Material Present"
                    : "No Verification Material"}
                </span>
              </div>
              {/* DSSE Envelope Indicator */}
              <div className="flex items-center">
                {hasDsse ? (
                  <LucideReact.CheckCircle
                    className="text-green-500"
                    size={16}
                  />
                ) : (
                  <LucideReact.XCircle className="text-red-500" size={16} />
                )}
                <span className="ml-1">
                  {hasDsse ? "DSSE Envelope Present" : "No DSSE Envelope"}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

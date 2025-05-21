import { tags } from "typia";
import React from "react";
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
export type AutoViewInput = AutoViewInputSubTypes.IApiReposAttestations.GetResponse;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const attestations = value.attestations ?? [];
  const totalAttestations = attestations.length;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <section className="p-4 bg-white rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold mb-3">
        Attestations ({totalAttestations})
      </h2>
      {totalAttestations === 0 ? (
        <p className="text-gray-500">No attestations available.</p>
      ) : (
        <ul className="space-y-4">
          {attestations.map((att, idx) => {
            const mediaType = att.bundle?.mediaType ?? "Unknown";
            const url = att.bundle_url ?? "N/A";
            const hasVm = att.bundle?.verificationMaterial != null;
            const hasDsse = att.bundle?.dsseEnvelope != null;
            const bundleStatus =
              hasVm && hasDsse ? "Complete Bundle" : "Partial Bundle";

            return (
              <li
                key={idx}
                className="p-3 bg-gray-50 border border-gray-200 rounded-lg"
              >
                <div className="flex justify-between items-start">
                  <span className="text-sm font-medium text-gray-800">
                    {mediaType}
                  </span>
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      hasVm && hasDsse
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {bundleStatus}
                  </span>
                </div>
                <div className="mt-2">
                  <p className="text-xs text-gray-600 font-mono truncate">
                    URL: {url}
                  </p>
                </div>
                <div className="mt-2 flex space-x-2">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      hasVm ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    VM: {hasVm ? "Yes" : "No"}
                  </span>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      hasDsse
                        ? "bg-indigo-100 text-indigo-800"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    DSSE: {hasDsse ? "Yes" : "No"}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

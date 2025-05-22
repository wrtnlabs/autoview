import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * A schema for the SPDX JSON format returned by the Dependency Graph.
     *
     * @title Dependency Graph SPDX SBOM
    */
    export type dependency_graph_spdx_sbom = {
        sbom: {
            /**
             * The SPDX identifier for the SPDX document.
            */
            SPDXID: string;
            /**
             * The version of the SPDX specification that this document conforms to.
            */
            spdxVersion: string;
            /**
             * An optional comment about the SPDX document.
            */
            comment?: string;
            creationInfo: {
                /**
                 * The date and time the SPDX document was created.
                */
                created: string;
                /**
                 * The tools that were used to generate the SPDX document.
                */
                creators: string[];
            };
            /**
             * The name of the SPDX document.
            */
            name: string;
            /**
             * The license under which the SPDX document is licensed.
            */
            dataLicense: string;
            /**
             * The namespace for the SPDX document.
            */
            documentNamespace: string;
            packages: {
                /**
                 * A unique SPDX identifier for the package.
                */
                SPDXID?: string;
                /**
                 * The name of the package.
                */
                name?: string;
                /**
                 * The version of the package. If the package does not have an exact version specified,
                 * a version range is given.
                */
                versionInfo?: string;
                /**
                 * The location where the package can be downloaded,
                 * or NOASSERTION if this has not been determined.
                */
                downloadLocation?: string;
                /**
                 * Whether the package's file content has been subjected to
                 * analysis during the creation of the SPDX document.
                */
                filesAnalyzed?: boolean;
                /**
                 * The license of the package as determined while creating the SPDX document.
                */
                licenseConcluded?: string;
                /**
                 * The license of the package as declared by its author, or NOASSERTION if this information
                 * was not available when the SPDX document was created.
                */
                licenseDeclared?: string;
                /**
                 * The distribution source of this package, or NOASSERTION if this was not determined.
                */
                supplier?: string;
                /**
                 * The copyright holders of the package, and any dates present with those notices, if available.
                */
                copyrightText?: string;
                externalRefs?: {
                    /**
                     * The category of reference to an external resource this reference refers to.
                    */
                    referenceCategory: string;
                    /**
                     * A locator for the particular external resource this reference refers to.
                    */
                    referenceLocator: string;
                    /**
                     * The category of reference to an external resource this reference refers to.
                    */
                    referenceType: string;
                }[];
            }[];
            relationships?: {
                /**
                 * The type of relationship between the two SPDX elements.
                */
                relationshipType?: string;
                /**
                 * The SPDX identifier of the package that is the source of the relationship.
                */
                spdxElementId?: string;
                /**
                 * The SPDX identifier of the package that is the target of the relationship.
                */
                relatedSpdxElement?: string;
            }[];
        };
    };
}
export type AutoViewInput = AutoViewInputSubTypes.dependency_graph_spdx_sbom;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { sbom } = value;
  const createdDate = new Date(sbom.creationInfo.created).toLocaleString();
  const creatorsList = sbom.creationInfo.creators.join(", ");
  const packageCount = sbom.packages.length;
  const relationshipCount = sbom.relationships?.length ?? 0;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md space-y-6">
      {/* Header */}
      <header className="space-y-1">
        <h2 className="text-2xl font-semibold text-gray-800">{sbom.name}</h2>
        <div className="text-sm text-gray-500">
          SPDX {sbom.spdxVersion} • Created {createdDate}
        </div>
      </header>

      {/* Summary Details */}
      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm text-gray-700">
        <div>
          <dt className="font-medium">Document ID</dt>
          <dd className="truncate">{sbom.SPDXID}</dd>
        </div>
        <div>
          <dt className="font-medium">Data License</dt>
          <dd>{sbom.dataLicense}</dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="font-medium">Namespace</dt>
          <dd className="truncate">{sbom.documentNamespace}</dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="font-medium">Creators</dt>
          <dd className="truncate">{creatorsList}</dd>
        </div>
        {sbom.comment && (
          <div className="sm:col-span-2">
            <dt className="font-medium">Comment</dt>
            <dd className="text-gray-600">{sbom.comment}</dd>
          </div>
        )}
        <div>
          <dt className="font-medium">Packages</dt>
          <dd>{packageCount}</dd>
        </div>
        {relationshipCount > 0 && (
          <div>
            <dt className="font-medium">Relationships</dt>
            <dd>{relationshipCount}</dd>
          </div>
        )}
      </dl>

      {/* Packages Table */}
      {packageCount > 0 && (
        <section>
          <h3 className="text-lg font-medium text-gray-800 mb-2">Packages</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Version</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">License (Concluded)</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">License (Declared)</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Files Analyzed</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Download Location</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
                {sbom.packages.map((pkg, idx) => (
                  <tr key={idx}>
                    <td className="px-3 py-2">{pkg.name ?? "-"}</td>
                    <td className="px-3 py-2">{pkg.versionInfo ?? "-"}</td>
                    <td className="px-3 py-2">{pkg.licenseConcluded ?? "-"}</td>
                    <td className="px-3 py-2">{pkg.licenseDeclared ?? "-"}</td>
                    <td className="px-3 py-2">
                      {pkg.filesAnalyzed == null
                        ? "-"
                        : pkg.filesAnalyzed
                        ? <span className="px-2 py-0.5 text-xs font-semibold text-green-800 bg-green-100 rounded-full">Yes</span>
                        : <span className="px-2 py-0.5 text-xs font-semibold text-red-800 bg-red-100 rounded-full">No</span>}
                    </td>
                    <td className="px-3 py-2 max-w-xs truncate">{pkg.downloadLocation ?? "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}

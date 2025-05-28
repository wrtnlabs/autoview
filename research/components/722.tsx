import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * A schema for the SPDX JSON format returned by the Dependency Graph.
     *
     * @title Dependency Graph SPDX SBOM
    */
    export interface dependency_graph_spdx_sbom {
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
    }
}
export type AutoViewInput = AutoViewInputSubTypes.dependency_graph_spdx_sbom;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const sbom = value.sbom;
  const createdDate = new Date(sbom.creationInfo.created);
  const formattedCreated = createdDate.toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
  const creatorsList = sbom.creationInfo.creators.join(', ');
  const packageCount = sbom.packages?.length ?? 0;
  const relationshipCount = sbom.relationships?.length ?? 0;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-6 bg-white rounded-lg shadow-md space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-semibold text-gray-900 truncate">{sbom.name}</h2>
        <div className="flex items-center text-gray-500 text-sm mt-2 sm:mt-0">
          <LucideReact.Calendar size={16} className="mr-1" />
          {formattedCreated}
        </div>
      </div>

      {/* Basic Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
        <div className="flex items-center">
          <LucideReact.Code size={16} className="text-gray-400 mr-1" />
          <span className="font-medium text-gray-700">SPDX Version:</span>
          <span className="ml-1 text-gray-900">{sbom.spdxVersion}</span>
        </div>
        <div className="flex items-center">
          <LucideReact.FileText size={16} className="text-gray-400 mr-1" />
          <span className="font-medium text-gray-700">Data License:</span>
          <span className="ml-1 text-gray-900">{sbom.dataLicense}</span>
        </div>
        <div className="flex items-center">
          <LucideReact.Hash size={16} className="text-gray-400 mr-1" />
          <span className="font-medium text-gray-700">Document ID:</span>
          <span className="ml-1 text-gray-900">{sbom.SPDXID}</span>
        </div>
        <div className="flex items-center">
          <LucideReact.Globe size={16} className="text-gray-400 mr-1" />
          <span className="font-medium text-gray-700">Namespace:</span>
          <span className="ml-1 text-gray-900 truncate">{sbom.documentNamespace}</span>
        </div>
      </div>

      {/* Creators */}
      <div className="text-sm">
        <div className="flex items-start">
          <LucideReact.Users size={16} className="text-gray-400 mr-1 mt-1" />
          <div>
            <span className="font-medium text-gray-700">Creators:</span>
            <p className="text-gray-900 mt-0.5">{creatorsList}</p>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="flex items-center space-x-4 text-sm">
        <div className="flex items-center text-gray-700">
          <LucideReact.Package size={16} className="mr-1 text-gray-400" />
          <span>
            {packageCount} package{packageCount !== 1 ? 's' : ''}
          </span>
        </div>
        <div className="flex items-center text-gray-700">
          <LucideReact.Link size={16} className="mr-1 text-gray-400" />
          <span>
            {relationshipCount} relationship{relationshipCount !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* Packages Table */}
      <div>
        {packageCount > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Package
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    License
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Supplier
                  </th>
                  <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Files Analyzed
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sbom.packages.map((pkg, idx) => {
                  const filesAnalyzed = pkg.filesAnalyzed;
                  return (
                    <tr key={idx}>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                        <div className="font-medium">{pkg.name ?? '—'}</div>
                        <div className="text-gray-500">{pkg.versionInfo ?? ''}</div>
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 flex items-center">
                        <LucideReact.FileText size={16} className="text-gray-400 mr-1" />
                        <span>{pkg.licenseConcluded ?? 'NOASSERTION'}</span>
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 truncate">
                        {pkg.supplier ?? '—'}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-center">
                        {filesAnalyzed ? (
                          <LucideReact.CheckCircle size={16} className="text-green-500 inline" />
                        ) : (
                          <LucideReact.XCircle size={16} className="text-red-500 inline" />
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex items-center justify-center text-gray-400 py-6">
            <LucideReact.AlertCircle size={24} />
            <span className="ml-2">No packages available</span>
          </div>
        )}
      </div>
    </div>
  );
}

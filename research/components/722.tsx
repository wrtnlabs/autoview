import LucideReact from "lucide-react";
import React, { JSX } from "react";

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

export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  const { sbom } = value;
  const {
    name,
    spdxVersion,
    comment,
    dataLicense,
    creationInfo: { created, creators },
    packages,
  } = sbom;

  const formattedDate = new Date(created).toLocaleString();
  const packageCount = packages.length;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md space-y-6">
      <header className="flex flex-col md:flex-row md:justify-between md:items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 truncate">{name}</h2>
          <p className="mt-1 text-sm text-gray-500">
            SPDX Version: {spdxVersion}
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex flex-wrap items-center text-sm text-gray-600 space-x-4">
          <div className="flex items-center">
            <LucideReact.Calendar className="mr-1 text-gray-400" size={16} />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center">
            <LucideReact.Users className="mr-1 text-gray-400" size={16} />
            <span>{creators.join(", ")}</span>
          </div>
          <div className="flex items-center">
            <LucideReact.FileText className="mr-1 text-gray-400" size={16} />
            <span>{dataLicense}</span>
          </div>
        </div>
      </header>

      {comment && (
        <section>
          <p className="text-gray-600 italic line-clamp-3">"{comment}"</p>
        </section>
      )}

      <section>
        <h3 className="text-lg font-medium text-gray-800 mb-2 flex items-center">
          <LucideReact.Package className="mr-2 text-gray-500" size={18} />
          <span>Packages ({packageCount})</span>
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] text-left text-sm text-gray-700">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 font-medium">Name</th>
                <th className="px-4 py-2 font-medium">Version</th>
                <th className="px-4 py-2 font-medium">License</th>
                <th className="px-4 py-2 font-medium">Supplier</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {packages.map((pkg, idx) => {
                const license =
                  pkg.licenseConcluded ?? pkg.licenseDeclared ?? "N/A";
                const displayName = pkg.name ?? pkg.SPDXID ?? "Unknown";
                return (
                  <tr key={idx}>
                    <td className="px-4 py-3 truncate max-w-xs">
                      {displayName}
                    </td>
                    <td className="px-4 py-3">{pkg.versionInfo ?? "-"}</td>
                    <td className="px-4 py-3">{license}</td>
                    <td className="px-4 py-3 truncate max-w-xs">
                      {pkg.supplier ?? "-"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

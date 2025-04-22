import type * as IAutoView from "@autoview/interface";
namespace Schema {
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
type IAutoViewTransformerInputType = Schema.dependency_graph_spdx_sbom;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  const sbom = input.sbom;

  // Build a list of DataListItemProps for each package with key details
  const packageItems: IAutoView.IAutoViewDataListItemProps[] = (sbom.packages || []).map((pkg) => {
    const title = pkg.name || pkg.SPDXID || "Unknown Package";
    // Nest a DataList inside the value cell to show structured details
    const detailsList: IAutoView.IAutoViewDataListProps = {
      type: "DataList",
      childrenProps: [
        {
          type: "DataListItem",
          label: { type: "Text", variant: "body2", content: "Version" },
          value: { type: "Text", variant: "body2", content: pkg.versionInfo || "N/A" },
        },
        {
          type: "DataListItem",
          label: { type: "Text", variant: "body2", content: "License" },
          value: {
            type: "Text",
            variant: "body2",
            content: pkg.licenseConcluded || pkg.licenseDeclared || "N/A",
          },
        },
        {
          type: "DataListItem",
          label: { type: "Text", variant: "body2", content: "Supplier" },
          value: { type: "Text", variant: "body2", content: pkg.supplier || "N/A" },
        },
      ],
    };

    return {
      type: "DataListItem",
      label: { type: "Text", variant: "subtitle1", content: title },
      value: detailsList,
    };
  });

  // Build the relationships list if present
  const relationshipItems: IAutoView.IAutoViewDataListItemProps[] = (sbom.relationships || []).map(
    (rel, idx) => ({
      type: "DataListItem",
      label: { type: "Text", variant: "body2", content: rel.relationshipType || `Relation ${idx + 1}` },
      value: {
        type: "Text",
        variant: "body2",
        content: rel.relatedSpdxElement || rel.spdxElementId || "N/A",
      },
    })
  );

  // Header card showing overall document info
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: sbom.name,
    description: `SPDX Version: ${sbom.spdxVersion}`,
    startElement: {
      type: "Icon",
      id: "archive",         // archive icon from FontAwesome
      color: "blue",
      size: 20,
    },
    endElement: {
      type: "Chip",
      label: sbom.SPDXID,
      size: "small",
      variant: "outlined",
    },
  };

  // Main content: packages and relationships
  const contentChildren: IAutoView.IAutoViewPresentationComponentProps[] = [];

  // Section: Packages
  contentChildren.push({
    type: "Text",
    variant: "h6",
    content: `Packages (${packageItems.length})`,
  });
  if (packageItems.length > 0) {
    contentChildren.push({
      type: "DataList",
      childrenProps: packageItems,
    });
  } else {
    contentChildren.push({
      type: "Text",
      variant: "body1",
      content: "No packages available.",
    });
  }

  // Section: Relationships (if any)
  if (relationshipItems.length > 0) {
    contentChildren.push({
      type: "Text",
      variant: "h6",
      content: `Relationships (${relationshipItems.length})`,
    });
    contentChildren.push({
      type: "DataList",
      childrenProps: relationshipItems,
    });
  }

  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: contentChildren,
  };

  // Assemble the vertical card
  const card: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [header, content],
  };

  return card;
}

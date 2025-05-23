
import Component from "../components/722";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"sbom":{"SPDXID":"SPDXRef-DOCUMENT-TestSBOM","spdxVersion":"SPDX-2.2","comment":"This is a test SPDX SBOM for UI component rendering (Sample).","creationInfo":{"created":"2025-05-19T12:00:00Z","creators":["Tool: SPDX-JS-Test-Generator-1.0","Organization: Sample Components (Test)"]},"name":"Sample SBOM Document (Test)","dataLicense":"CC0-1.0","documentNamespace":"http://example.org/spdxdocs/sample-sbom-2025-05-19","packages":[{"SPDXID":"SPDXRef-PackageLibraryOne","name":"sample-library-foo","versionInfo":"1.2.3","downloadLocation":"https://example.com/downloads/sample-library-foo-1.2.3.tar.gz","filesAnalyzed":false,"licenseConcluded":"MIT","licenseDeclared":"MIT","supplier":"Organization: Example Corp (Test)","copyrightText":"Copyright 2025 Example Corp","externalRefs":[{"referenceCategory":"PACKAGE-MANAGER","referenceLocator":"pkg:maven/org.sample/sample-library-foo@1.2.3","referenceType":"purl"}]},{"SPDXID":"SPDXRef-PackageLibraryTwo","name":"dummy-tool-bar","versionInfo":">=2.0.0 <3.0.0","downloadLocation":"NOASSERTION","filesAnalyzed":true,"licenseConcluded":"Apache-2.0","licenseDeclared":"Apache-2.0","supplier":"Person: Test Developer <test.dev.user@example.com>"}],"relationships":[{"relationshipType":"DEPENDS_ON","spdxElementId":"SPDXRef-PackageLibraryOne","relatedSpdxElement":"SPDXRef-PackageLibraryTwo"}]}};
}

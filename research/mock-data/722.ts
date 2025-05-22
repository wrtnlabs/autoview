
import Component from "../components/722";

export type InputType = Parameters<typeof Component>[0];

export function random(): InputType {
  return {"sbom":{"SPDXID":"SPDXRef-DOCUMENT-SAMPLE","spdxVersion":"SPDX-2.2","comment":"This is a sample SPDX SBOM generated for testing purposes only.","creationInfo":{"created":"2025-05-19T15:00:00Z","creators":["Tool A v1.0 (Test)","Sample Generator v2.5"]},"name":"Sample SBOM Document (Test)","dataLicense":"CC0-1.0","documentNamespace":"http://spdx.org/spdxdocs/sample-sbom-namespace","packages":[{"SPDXID":"SPDXRef-Package-1","name":"sample-package-foo","versionInfo":"1.2.3","downloadLocation":"https://example.com/downloads/sample-package-foo-1.2.3.tar.gz","filesAnalyzed":true,"licenseConcluded":"MIT","licenseDeclared":"Apache-2.0","supplier":"Organization: Sample Corp (Test)","copyrightText":"© 2025 Sample Corp (Test).","externalRefs":[{"referenceCategory":"PACKAGE-MANAGER","referenceLocator":"pkg:maven/com.example/sample-package-foo@1.2.3","referenceType":"purl"},{"referenceCategory":"SECURITY","referenceLocator":"CVE-2025-1234","referenceType":"cve"}]},{"SPDXID":"SPDXRef-Package-2","name":"sample-package-bar","versionInfo":"2.0.0-beta","filesAnalyzed":false,"licenseDeclared":"NOASSERTION"}],"relationships":[{"relationshipType":"DEPENDS_ON","spdxElementId":"SPDXRef-Package-1","relatedSpdxElement":"SPDXRef-Package-2"},{"relationshipType":"CONTAINS","spdxElementId":"SPDXRef-DOCUMENT-SAMPLE","relatedSpdxElement":"SPDXRef-Package-1"}]}};
}

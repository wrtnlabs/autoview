import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * Api Overview
     *
     * @title Api Overview
    */
    export type api_overview = {
        verifiable_password_authentication: boolean;
        ssh_key_fingerprints?: {
            SHA256_RSA?: string;
            SHA256_DSA?: string;
            SHA256_ECDSA?: string;
            SHA256_ED25519?: string;
        };
        ssh_keys?: string[];
        hooks?: string[];
        github_enterprise_importer?: string[];
        web?: string[];
        api?: string[];
        git?: string[];
        packages?: string[];
        pages?: string[];
        importer?: string[];
        actions?: string[];
        actions_macos?: string[];
        codespaces?: string[];
        dependabot?: string[];
        copilot?: string[];
        domains?: {
            website?: string[];
            codespaces?: string[];
            copilot?: string[];
            packages?: string[];
            actions?: string[];
            actions_inbound?: {
                full_domains?: string[];
                wildcard_domains?: string[];
            };
            artifact_attestations?: {
                trust_domain?: string;
                services?: string[];
            };
        };
    };
}
export type AutoViewInput = AutoViewInputSubTypes.api_overview;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const rootArrays = [
    { key: 'ssh_keys', label: 'SSH Keys' },
    { key: 'hooks', label: 'Hooks' },
    { key: 'github_enterprise_importer', label: 'GitHub Enterprise Importer' },
    { key: 'web', label: 'Web Endpoints' },
    { key: 'api', label: 'API Endpoints' },
    { key: 'git', label: 'Git Endpoints' },
    { key: 'packages', label: 'Packages' },
    { key: 'pages', label: 'Pages' },
    { key: 'importer', label: 'Importer' },
    { key: 'actions', label: 'Actions' },
    { key: 'actions_macos', label: 'Actions MacOS' },
    { key: 'codespaces', label: 'Codespaces' },
    { key: 'dependabot', label: 'Dependabot' },
    { key: 'copilot', label: 'Copilot' },
  ] as const;

  const features = rootArrays
    .map(item => {
      const arr = (value as any)[item.key] as string[] | undefined;
      return { label: item.label, count: arr?.length ?? 0 };
    })
    .filter(f => f.count > 0);

  const fingerprints = value.ssh_key_fingerprints
    ? (Object.entries(value.ssh_key_fingerprints) as [keyof typeof value.ssh_key_fingerprints, string?][])
        .filter(([, fp]) => fp)
        .map(([type, fp]) => ({ type, fingerprint: fp! }))
    : [];

  const domains = value.domains;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">API Overview</h2>

      <div className="mb-4 flex items-center">
        <span className="text-sm font-medium mr-2">Password Auth:</span>
        {value.verifiable_password_authentication ? (
          <span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded">
            Enabled
          </span>
        ) : (
          <span className="px-2 py-1 text-xs font-semibold text-red-800 bg-red-100 rounded">
            Disabled
          </span>
        )}
      </div>

      {features.length > 0 && (
        <div className="mb-4">
          <h3 className="text-md font-medium mb-2">Available Features</h3>
          <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {features.map(f => (
              <li
                key={f.label}
                className="flex justify-between text-sm bg-gray-50 p-2 rounded"
              >
                <span className="truncate">{f.label}</span>
                <span className="font-semibold">{f.count}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {fingerprints.length > 0 && (
        <div className="mb-4">
          <h3 className="text-md font-medium mb-2">SSH Key Fingerprints</h3>
          <dl className="text-sm space-y-1">
            {fingerprints.map(fp => (
              <div key={fp.type} className="flex justify-between">
                <dt className="capitalize">{fp.type.replace('SHA256_', '')}</dt>
                <dd className="font-mono truncate max-w-xs">{fp.fingerprint}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      {domains && (
        <div>
          <h3 className="text-md font-medium mb-2">Domains</h3>
          <ul className="space-y-2 text-sm">
            {Object.entries(domains).map(([key, val]) => {
              if (!val) return null;
              // Simple string-array domains
              if (Array.isArray(val)) {
                return (
                  <li key={key}>
                    <span className="font-medium">
                      {key.charAt(0).toUpperCase() + key.slice(1)}:
                    </span>{' '}
                    {val.join(', ')}
                  </li>
                );
              }
              // Nested inbound domains
              if (key === 'actions_inbound' && typeof val === 'object') {
                const inbound = val as {
                  full_domains?: string[];
                  wildcard_domains?: string[];
                };
                return (
                  <li key={key}>
                    <span className="font-medium">Actions Inbound:</span>
                    <div className="ml-4">
                      {inbound.full_domains && (
                        <div>
                          <span className="font-medium">Full:</span>{' '}
                          {inbound.full_domains.join(', ')}
                        </div>
                      )}
                      {inbound.wildcard_domains && (
                        <div>
                          <span className="font-medium">Wildcard:</span>{' '}
                          {inbound.wildcard_domains.join(', ')}
                        </div>
                      )}
                    </div>
                  </li>
                );
              }
              // Artifact attestations
              if (key === 'artifact_attestations' && typeof val === 'object') {
                const att = val as {
                  trust_domain: string;
                  services?: string[];
                };
                return (
                  <li key={key}>
                    <span className="font-medium">Artifact Attestations:</span>
                    <div className="ml-4">
                      <div>
                        <span className="font-medium">Trust Domain:</span>{' '}
                        {att.trust_domain}
                      </div>
                      {att.services && (
                        <div>
                          <span className="font-medium">Services:</span>{' '}
                          {att.services.join(', ')}
                        </div>
                      )}
                    </div>
                  </li>
                );
              }
              return null;
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

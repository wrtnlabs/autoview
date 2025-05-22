import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    /**
     * The configuration for GitHub Pages for a repository.
     *
     * @title GitHub Pages
    */
    export type page = {
        /**
         * The API address for accessing this Page resource.
        */
        url: string;
        /**
         * The status of the most recent build of the Page.
        */
        status: "built" | "building" | "errored" | null;
        /**
         * The Pages site's custom domain
        */
        cname: string | null;
        /**
         * The state if the domain is verified
        */
        protected_domain_state?: "pending" | "verified" | "unverified" | null;
        /**
         * The timestamp when a pending domain becomes unverified.
        */
        pending_domain_unverified_at?: (string & tags.Format<"date-time">) | null;
        /**
         * Whether the Page has a custom 404 page.
        */
        custom_404: boolean;
        /**
         * The web address the Page can be accessed from.
        */
        html_url?: string;
        /**
         * The process in which the Page will be built.
        */
        build_type?: "legacy" | "workflow" | null;
        source?: AutoViewInputSubTypes.pages_source_hash;
        /**
         * Whether the GitHub Pages site is publicly visible. If set to `true`, the site is accessible to anyone on the internet. If set to `false`, the site will only be accessible to users who have at least `read` access to the repository that published the site.
        */
        "public": boolean;
        https_certificate?: AutoViewInputSubTypes.pages_https_certificate;
        /**
         * Whether https is enabled on the domain
        */
        https_enforced?: boolean;
    };
    /**
     * @title Pages Source Hash
    */
    export type pages_source_hash = {
        branch: string;
        path: string;
    };
    /**
     * @title Pages Https Certificate
    */
    export type pages_https_certificate = {
        state: "new" | "authorization_created" | "authorization_pending" | "authorized" | "authorization_revoked" | "issued" | "uploaded" | "approved" | "errored" | "bad_authz" | "destroy_pending" | "dns_changed";
        description: string;
        /**
         * Array of the domain set and its alternate name (if it is configured)
        */
        domains: string[];
        expires_at?: string & tags.Format<"date">;
    };
}
export type AutoViewInput = AutoViewInputSubTypes.page;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formatDateTime = (iso?: string | null): string =>
    iso ? new Date(iso).toLocaleString() : '—';

  const formatDate = (iso?: string | null): string =>
    iso ? new Date(iso).toLocaleDateString() : '—';

  const statusMap: Record<NonNullable<AutoViewInput['status']> | 'null', { label: string; color: string }> = {
    built: { label: 'Built', color: 'bg-green-100 text-green-800' },
    building: { label: 'Building', color: 'bg-blue-100 text-blue-800' },
    errored: { label: 'Errored', color: 'bg-red-100 text-red-800' },
    null: { label: 'Unknown', color: 'bg-gray-100 text-gray-800' },
  };

  const visibilityBadge = value.public
    ? { label: 'Public', color: 'bg-green-100 text-green-800' }
    : { label: 'Private', color: 'bg-gray-100 text-gray-800' };

  const buildTypeBadge = value.build_type
    ? {
        label:
          value.build_type === 'legacy'
            ? 'Legacy Build'
            : value.build_type === 'workflow'
            ? 'Workflow Build'
            : '—',
        color: 'bg-indigo-100 text-indigo-800',
      }
    : null;

  const domainStateMap: Record<
    NonNullable<AutoViewInput['protected_domain_state']> | 'null',
    { label: string; color: string }
  > = {
    pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
    verified: { label: 'Verified', color: 'bg-green-100 text-green-800' },
    unverified: { label: 'Unverified', color: 'bg-red-100 text-red-800' },
    null: { label: 'None', color: 'bg-gray-100 text-gray-800' },
  };

  const certStateMap: Record<
    AutoViewInputSubTypes.pages_https_certificate['state'],
    { label: string; color: string }
  > = {
    new: { label: 'New', color: 'bg-gray-100 text-gray-800' },
    authorization_created: { label: 'Auth Created', color: 'bg-yellow-100 text-yellow-800' },
    authorization_pending: { label: 'Auth Pending', color: 'bg-yellow-100 text-yellow-800' },
    authorized: { label: 'Authorized', color: 'bg-green-100 text-green-800' },
    authorization_revoked: { label: 'Auth Revoked', color: 'bg-red-100 text-red-800' },
    issued: { label: 'Issued', color: 'bg-green-100 text-green-800' },
    uploaded: { label: 'Uploaded', color: 'bg-gray-100 text-gray-800' },
    approved: { label: 'Approved', color: 'bg-green-100 text-green-800' },
    errored: { label: 'Errored', color: 'bg-red-100 text-red-800' },
    bad_authz: { label: 'Bad Authz', color: 'bg-red-100 text-red-800' },
    destroy_pending: { label: 'Destroy Pending', color: 'bg-gray-100 text-gray-800' },
    dns_changed: { label: 'DNS Changed', color: 'bg-blue-100 text-blue-800' },
  };

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <section className="max-w-md w-full mx-auto p-4 bg-white rounded-lg shadow-md">
      {/* Header */}
      <h2 className="text-lg font-medium text-gray-900 mb-3 truncate">{value.url}</h2>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mb-4">
        {/* Status */}
        <span
          className={`px-2 inline-flex text-xs font-semibold leading-5 rounded-full ${
            statusMap[value.status ?? 'null'].color
          }`}
        >
          {statusMap[value.status ?? 'null'].label}
        </span>
        {/* Visibility */}
        <span
          className={`px-2 inline-flex text-xs font-semibold leading-5 rounded-full ${
            visibilityBadge.color
          }`}
        >
          {visibilityBadge.label}
        </span>
        {/* Build Type */}
        {buildTypeBadge && (
          <span
            className={`px-2 inline-flex text-xs font-semibold leading-5 rounded-full ${
              buildTypeBadge.color
            }`}
          >
            {buildTypeBadge.label}
          </span>
        )}
        {/* Custom 404 */}
        {value.custom_404 && (
          <span className="px-2 inline-flex text-xs font-semibold leading-5 rounded-full bg-purple-100 text-purple-800">
            Custom 404
          </span>
        )}
        {/* HTTPS Enforced */}
        {value.https_enforced != null && (
          <span
            className={`px-2 inline-flex text-xs font-semibold leading-5 rounded-full ${
              value.https_enforced ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
            }`}
          >
            {value.https_enforced ? 'HTTPS Enforced' : 'HTTP Allowed'}
          </span>
        )}
      </div>

      {/* Details */}
      <dl className="space-y-2 text-sm text-gray-700">
        {/* Custom Domain */}
        {value.cname != null && (
          <div>
            <dt className="font-semibold">Custom Domain:</dt>
            <dd className="ml-1 truncate">{value.cname || '—'}</dd>
          </div>
        )}

        {/* Protected Domain State */}
        {value.protected_domain_state != null && (
          <div>
            <dt className="font-semibold">Domain Protection:</dt>
            <dd className="ml-1 inline-flex items-center gap-1">
              <span
                className={`px-1 inline-flex text-xs font-semibold leading-4 rounded-full ${
                  domainStateMap[value.protected_domain_state ?? 'null'].color
                }`}
              >
                {domainStateMap[value.protected_domain_state ?? 'null'].label}
              </span>
              {value.protected_domain_state === 'pending' &&
                value.pending_domain_unverified_at && (
                  <span className="text-xs text-gray-500">
                    until {formatDateTime(value.pending_domain_unverified_at)}
                  </span>
                )}
            </dd>
          </div>
        )}

        {/* Pages Source */}
        {value.source && (
          <div>
            <dt className="font-semibold">Source:</dt>
            <dd className="ml-1">
              {value.source.branch}
              <span className="mx-1 text-gray-400">/</span>
              {value.source.path}
            </dd>
          </div>
        )}

        {/* HTML URL */}
        {value.html_url && (
          <div>
            <dt className="font-semibold">Site URL:</dt>
            <dd className="ml-1 truncate">{value.html_url}</dd>
          </div>
        )}
      </dl>

      {/* HTTPS Certificate */}
      {value.https_certificate && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="font-semibold text-gray-800 mb-2">TLS Certificate</div>
          <div className="flex flex-wrap gap-2 mb-3">
            <span
              className={`px-2 inline-flex text-xs font-semibold leading-5 rounded-full ${
                certStateMap[value.https_certificate.state].color
              }`}
            >
              {certStateMap[value.https_certificate.state].label}
            </span>
          </div>
          <dl className="space-y-1 text-sm text-gray-700">
            <div>
              <dt className="font-semibold inline">Domains:</dt>{' '}
              <dd className="inline">{value.https_certificate.domains.join(', ')}</dd>
            </div>
            <div>
              <dt className="font-semibold inline">Expires:</dt>{' '}
              <dd className="inline">{formatDate(value.https_certificate.expires_at)}</dd>
            </div>
            {value.https_certificate.description && (
              <div>
                <dt className="font-semibold">Notes:</dt>
                <dd className="ml-1 line-clamp-2">{value.https_certificate.description}</dd>
              </div>
            )}
          </dl>
        </div>
      )}
    </section>
  );
}

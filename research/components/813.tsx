import { tags } from "typia";
import React, { JSX } from "react";
import * as LucideReact from "lucide-react";
export namespace AutoViewInputSubTypes {
    /**
     * The configuration for GitHub Pages for a repository.
     *
     * @title GitHub Pages
    */
    export interface page {
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
    }
    /**
     * @title Pages Source Hash
    */
    export interface pages_source_hash {
        branch: string;
        path: string;
    }
    /**
     * @title Pages Https Certificate
    */
    export interface pages_https_certificate {
        state: "new" | "authorization_created" | "authorization_pending" | "authorized" | "authorization_revoked" | "issued" | "uploaded" | "approved" | "errored" | "bad_authz" | "destroy_pending" | "dns_changed";
        description: string;
        /**
         * Array of the domain set and its alternate name (if it is configured)
        */
        domains: string[];
        expires_at?: string & tags.Format<"date">;
    }
}
export type AutoViewInput = AutoViewInputSubTypes.page;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const formatDateTime = (iso?: string | null): string =>
    iso ? new Date(iso).toLocaleString() : 'N/A';

  const renderStatusIcon = (): JSX.Element => {
    switch (value.status) {
      case 'built':
        return <LucideReact.CheckCircle className="text-green-500" size={16} aria-label="Built" />;
      case 'building':
        return <LucideReact.Loader className="animate-spin text-amber-500" size={16} aria-label="Building" />;
      case 'errored':
        return <LucideReact.AlertTriangle className="text-red-500" size={16} aria-label="Errored" />;
      default:
        return <LucideReact.AlertCircle className="text-gray-400" size={16} aria-label="Unknown" />;
    }
  };

  const buildType = value.build_type ?? 'N/A';
  const domain = value.cname ?? 'Default GitHub Pages domain';
  const protectedState = value.protected_domain_state ?? 'N/A';
  const hasCustom404 = value.custom_404;
  const publicState = value['public'];
  const httpsEnforced = value.https_enforced ?? false;
  const sourceBranch = value.source?.branch;
  const sourcePath = value.source?.path;
  const cert = value.https_certificate;
  const certState = cert?.state;
  const certDomains = cert?.domains;
  const certExpires = cert?.expires_at;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  // 3. Return the React element.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md max-w-full">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">GitHub Pages Configuration</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Overview */}
        <section className="space-y-2">
          <h3 className="text-sm font-medium text-gray-600 uppercase">Overview</h3>
          <div className="flex items-center space-x-2 text-gray-700">
            {renderStatusIcon()}
            <span>Status: {value.status ?? 'Unknown'}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-700">
            <LucideReact.Link size={16} className="text-gray-400" aria-hidden="true" />
            <span className="truncate">API URL: {value.url}</span>
          </div>
          {value.html_url && (
            <div className="flex items-center space-x-2 text-gray-700">
              <LucideReact.Link size={16} className="text-gray-400" aria-hidden="true" />
              <span className="truncate">HTML URL: {value.html_url}</span>
            </div>
          )}
          <div className="flex items-center space-x-2 text-gray-700">
            <LucideReact.Lock size={16} className="text-gray-400" aria-hidden="true" />
            <span>Public: {publicState ? 'Yes' : 'No'}</span>
          </div>
        </section>

        {/* Domain & Build */}
        <section className="space-y-2">
          <h3 className="text-sm font-medium text-gray-600 uppercase">Domain & Build</h3>
          <div className="flex items-center space-x-2 text-gray-700">
            <LucideReact.Globe size={16} className="text-gray-400" aria-hidden="true" />
            <span>Custom Domain: {domain}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-700">
            <LucideReact.ShieldCheck size={16} className="text-gray-400" aria-hidden="true" />
            <span>Protected State: {protectedState}</span>
          </div>
          {value.pending_domain_unverified_at && (
            <div className="flex items-center space-x-2 text-gray-700">
              <LucideReact.Clock size={16} className="text-amber-500" aria-hidden="true" />
              <span>Unverified At: {formatDateTime(value.pending_domain_unverified_at)}</span>
            </div>
          )}
          <div className="flex items-center space-x-2 text-gray-700">
            <LucideReact.GitBranch size={16} className="text-gray-400" aria-hidden="true" />
            <span>Build Type: {buildType}</span>
          </div>
          {sourceBranch && sourcePath && (
            <div className="flex items-center space-x-2 text-gray-700">
              <LucideReact.Code size={16} className="text-gray-400" aria-hidden="true" />
              <span>Source: {sourceBranch}/{sourcePath}</span>
            </div>
          )}
          <div className="flex items-center space-x-2 text-gray-700">
            {hasCustom404 ? (
              <LucideReact.CheckCircle size={16} className="text-green-500" aria-hidden="true" />
            ) : (
              <LucideReact.XCircle size={16} className="text-red-500" aria-hidden="true" />
            )}
            <span>Custom 404: {hasCustom404 ? 'Enabled' : 'Disabled'}</span>
          </div>
        </section>

        {/* Security */}
        <section className="space-y-2">
          <h3 className="text-sm font-medium text-gray-600 uppercase">Security</h3>
          <div className="flex items-center space-x-2 text-gray-700">
            {httpsEnforced ? (
              <LucideReact.Lock className="text-green-500" size={16} aria-hidden="true" />
            ) : (
              <LucideReact.Unlock className="text-red-500" size={16} aria-hidden="true" />
            )}
            <span>HTTPS Enforced: {httpsEnforced ? 'Yes' : 'No'}</span>
          </div>
          {cert && (
            <>
              <div className="flex items-center space-x-2 text-gray-700">
                {certState === 'issued' ? (
                  <LucideReact.BadgeCheck className="text-green-500" size={16} aria-hidden="true" />
                ) : (
                  <LucideReact.AlertTriangle className="text-amber-500" size={16} aria-hidden="true" />
                )}
                <span>Cert State: {certState}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-700">
                <LucideReact.Users size={16} className="text-gray-400" aria-hidden="true" />
                <span>Domains: {certDomains?.join(', ')}</span>
              </div>
              {certExpires && (
                <div className="flex items-center space-x-2 text-gray-700">
                  <LucideReact.Calendar size={16} className="text-gray-400" aria-hidden="true" />
                  <span>Expires: {formatDateTime(certExpires)}</span>
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </div>
  );
}

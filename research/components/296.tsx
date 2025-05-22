import React from "react";
export namespace AutoViewInputSubTypes {
    export type SELECT_MORE_THAN_ONE_IMAGE = any;
    export type ResponseForm_lt_Array_lt_string_gt__gt_ = any;
}
export type AutoViewInput = any | any;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.

  // Determine if the input is an array of strings
  const isStringArray = Array.isArray(value) && (value as any[]).every(item => typeof item === 'string');

  // If object, extract common fields
  const obj = (typeof value === 'object' && value !== null && !isStringArray) ? (value as Record<string, any>) : null;

  // Helper: format date strings
  const formatDate = (input?: string): string | null => {
    if (!input) return null;
    const date = new Date(input);
    if (isNaN(date.getTime())) return null;
    return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  };

  // Helper: format status codes
  const formatStatus = (raw: any): string | null => {
    if (raw === 0) return 'Pending';
    if (raw === 1) return 'Active';
    if (raw === 2) return 'Inactive';
    if (typeof raw === 'boolean') return raw ? 'Active' : 'Inactive';
    if (typeof raw === 'string') return raw.charAt(0).toUpperCase() + raw.slice(1);
    return null;
  };

  // Derived fields for object
  const title =
    obj?.title ??
    obj?.name ??
    obj?.label ??
    null;

  const subtitle =
    obj?.username ??
    obj?.email ??
    null;

  const description =
    obj?.shortBlurb ??
    obj?.summary ??
    obj?.description ??
    obj?.bio ??
    null;

  const rawDate =
    obj?.publishedAt ??
    obj?.createdAt ??
    obj?.registrationDate ??
    obj?.date ??
    obj?.startTime ??
    null;

  const formattedDate = formatDate(rawDate);

  const statusLabel = obj ? formatStatus(obj.status) : null;

  const tags = Array.isArray(obj?.tags) ? (obj!.tags as string[]) : null;

  // Determine image URL
  const imageUrl =
    obj?.profilePictureUrl ??
    obj?.image ??
    (Array.isArray(obj?.images) && obj!.images.length > 0 ? obj!.images[0] : null) ??
    null;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  if (isStringArray) {
    // Render array of strings as tag badges
    return (
      <div className="flex flex-wrap gap-2 p-4 bg-white rounded-lg shadow-sm">
        {(value as string[]).map((tag, idx) => (
          <span
            key={idx}
            className="text-xs font-medium text-gray-700 bg-gray-100 px-2 py-1 rounded-full truncate"
          >
            {tag}
          </span>
        ))}
      </div>
    );
  }

  if (obj) {
    return (
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        {imageUrl && (
          <div className="w-full h-48 bg-gray-100 overflow-hidden">
            <img
              src={imageUrl}
              alt={title ?? 'image'}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="p-4">
          {title && (
            <h2 className="text-lg font-semibold text-gray-900 truncate">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="mt-1 text-sm text-gray-600 truncate">
              {subtitle}
            </p>
          )}
          <div className="mt-2 flex items-center space-x-2">
            {statusLabel && (
              <span
                className={`text-xs font-semibold px-2 py-1 rounded-full ${
                  statusLabel === 'Active'
                    ? 'bg-green-100 text-green-800'
                    : statusLabel === 'Pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {statusLabel}
              </span>
            )}
            {formattedDate && (
              <time className="text-xs text-gray-500">
                {formattedDate}
              </time>
            )}
          </div>
          {tags && tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {tags.map((t, i) => (
                <span
                  key={i}
                  className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full truncate"
                >
                  {t}
                </span>
              ))}
            </div>
          )}
          {description && (
            <p className="mt-3 text-sm text-gray-700 line-clamp-3">
              {description}
            </p>
          )}
        </div>
      </div>
    );
  }

  // Fallback: render JSON view
  return (
    <pre className="p-4 bg-gray-50 text-xs text-gray-700 rounded-lg overflow-auto">
      {JSON.stringify(value, null, 2)}
    </pre>
  );
}

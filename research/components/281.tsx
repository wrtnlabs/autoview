import { tags } from "typia";
import React from "react";
export namespace AutoViewInputSubTypes {
    export namespace TryPagination_lt_AlarmType {
        export type ReadResponseType_gt_ = {
            result: true;
            code: 1000;
            requestToResponse?: string;
            data: AutoViewInputSubTypes.PaginationResponseType_lt_AlarmType.ReadResponseType_gt_;
        };
    }
    export namespace PaginationResponseType_lt_AlarmType {
        export type ReadResponseType_gt_ = {
            list: AutoViewInputSubTypes.AlarmType.Element[];
            count: number;
            totalResult: number;
            totalPage: number;
            search?: string;
            page: number;
        };
    }
    export namespace AlarmType {
        export type Element = {
            id: number;
            /**
             * 유저의 아이디
            */
            userId: number & tags.Type<"int32">;
            resourceName?: string;
            /**
             * 알람이 가리키는 리소스의 아이디로, 리소스마다 동일한 숫자의 아이디를 가질 수 있기에 유니크한 값이 아니다.
            */
            resourceId?: number & tags.Type<"int32">;
            redirectLink?: number;
        };
    }
}
export type AutoViewInput = AutoViewInputSubTypes.TryPagination_lt_AlarmType.ReadResponseType_gt_;



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const { data } = value;
  const { list, count, totalResult, totalPage, search, page } = data;
  const summaryText = `Showing ${count} of ${totalResult} alarms · Page ${page} of ${totalPage}` + (search ? ` · Search: "${search}"` : "");

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <section className="p-4 bg-gray-50 rounded-lg">
      <header className="mb-4 text-sm text-gray-700">{summaryText}</header>
      <div className="space-y-4">
        {list.map(alarm => (
          <article
            key={alarm.id}
            className="p-4 bg-white rounded-lg shadow flex flex-col space-y-1"
          >
            <h2 className="text-base font-semibold text-gray-900">
              Alarm #{alarm.id}
            </h2>
            <p className="text-sm text-gray-700">User ID: {alarm.userId}</p>
            {alarm.resourceName && (
              <p className="text-sm text-gray-700 truncate">
                Resource: {alarm.resourceName}
              </p>
            )}
            {alarm.resourceId !== undefined && (
              <p className="text-sm text-gray-700">
                Resource ID: {alarm.resourceId}
              </p>
            )}
            {alarm.redirectLink !== undefined && (
              <p className="text-sm text-gray-700">
                Redirect Link: {alarm.redirectLink}
              </p>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

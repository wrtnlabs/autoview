import React from "react";
export namespace AutoViewInputSubTypes {
    export namespace IShoppingDeliveryPiece {
        /**
         * Creation information of the delivery piece.
        */
        export type ICreate = {
            /**
             * Target order's {@link IShoppingOrderPublish.id}.
             *
             * @title Target order's {@link IShoppingOrderPublish.id}
            */
            publish_id: string;
            /**
             * Target good's {@link IShoppingOrderGood.id}.
             *
             * @title Target good's {@link IShoppingOrderGood.id}
            */
            good_id: string;
            /**
             * Target stock's {@link IShoppingSaleUnitStock.id}.
             *
             * @title Target stock's {@link IShoppingSaleUnitStock.id}
            */
            stock_id: string;
            /**
             * Quantity of the stock.
             *
             * It can be precision value to express split shipping.
             *
             * @title Quantity of the stock
            */
            quantity: number;
        };
    }
}
export type AutoViewInput = AutoViewInputSubTypes.IShoppingDeliveryPiece.ICreate[];



// The component name must always be "VisualComponent"
export default function VisualComponent(value: AutoViewInput): React.ReactNode {
  // 1. Define data aggregation/transformation functions or derived constants if necessary.
  const totalPieces = value.length;
  const totalQuantity = value.reduce((sum, piece) => sum + piece.quantity, 0);

  const formatNumber = (num: number): string =>
    Number.isInteger(num) ? `${num}` : num.toFixed(2);

  const maskId = (id: string): string =>
    id.length > 12 ? `${id.slice(0, 8)}...${id.slice(-4)}` : id;

  // 2. Compose the visual structure using JSX and Tailwind CSS.
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* Summary */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <div className="text-sm text-gray-500">Total Pieces</div>
          <div className="mt-1 text-2xl font-semibold text-gray-900">
            {totalPieces}
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-500">Total Quantity</div>
          <div className="mt-1 text-2xl font-semibold text-gray-900">
            {formatNumber(totalQuantity)}
          </div>
        </div>
      </div>

      {/* List of Delivery Pieces */}
      <ul className="divide-y divide-gray-200">
        {value.map((piece, idx) => (
          <li
            key={`piece-${idx}`}
            className="py-4 flex flex-col sm:flex-row sm:justify-between items-start sm:items-center"
          >
            {/* Quantity Badge */}
            <div className="mb-2 sm:mb-0">
              <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                Qty: {formatNumber(piece.quantity)}
              </span>
            </div>
            {/* Details */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-4 text-sm text-gray-700">
              <div>
                <div className="text-gray-500">Order ID</div>
                <div className="mt-0.5 font-medium">{maskId(piece.publish_id)}</div>
              </div>
              <div>
                <div className="text-gray-500">Product ID</div>
                <div className="mt-0.5 font-medium">{maskId(piece.good_id)}</div>
              </div>
              <div>
                <div className="text-gray-500">Stock ID</div>
                <div className="mt-0.5 font-medium">{maskId(piece.stock_id)}</div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

import * as __typia_transform__randomArray from "typia/lib/internal/_randomArray.js";
import typia from "typia";
export function random() {
    return (() => { let _generator; return generator => {
        var _a;
        _generator = generator;
        return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.array) !== null && _a !== void 0 ? _a : __typia_transform__randomArray._randomArray)({
            type: "array",
            element: () => "any type used..."
        });
    }; })()();
}
//# sourceMappingURL=795.js.map
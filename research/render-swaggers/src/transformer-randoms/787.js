import * as __typia_transform__randomInteger from "typia/lib/internal/_randomInteger.js";
import * as __typia_transform__randomString from "typia/lib/internal/_randomString.js";
import * as __typia_transform__randomPick from "typia/lib/internal/_randomPick.js";
import * as __typia_transform__randomBoolean from "typia/lib/internal/_randomBoolean.js";
import * as __typia_transform__randomArray from "typia/lib/internal/_randomArray.js";
import typia from "typia";
export function random() {
    return (() => { const _ro0 = (_recursive = false, _depth = 0) => { var _a, _b, _c, _d, _e, _f; return ({
        id: ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.integer) !== null && _a !== void 0 ? _a : __typia_transform__randomInteger._randomInteger)({
            type: "integer"
        }),
        node_id: ((_b = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _b !== void 0 ? _b : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        url: ((_c = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _c !== void 0 ? _c : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        name: ((_d = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _d !== void 0 ? _d : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        description: __typia_transform__randomPick._randomPick([
            () => null,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _a !== void 0 ? _a : __typia_transform__randomString._randomString)({
                type: "string"
            }); }
        ])(),
        color: ((_e = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _e !== void 0 ? _e : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        "default": ((_f = _generator === null || _generator === void 0 ? void 0 : _generator.boolean) !== null && _f !== void 0 ? _f : __typia_transform__randomBoolean._randomBoolean)({
            type: "boolean"
        })
    }); }; let _generator; return generator => {
        var _a;
        _generator = generator;
        return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.array) !== null && _a !== void 0 ? _a : __typia_transform__randomArray._randomArray)({
            type: "array",
            element: () => _ro0()
        });
    }; })()();
}
//# sourceMappingURL=787.js.map
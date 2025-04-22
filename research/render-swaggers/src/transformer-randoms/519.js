import * as __typia_transform__randomInteger from "typia/lib/internal/_randomInteger.js";
import * as __typia_transform__randomFormatDatetime from "typia/lib/internal/_randomFormatDatetime.js";
import * as __typia_transform__randomPick from "typia/lib/internal/_randomPick.js";
import * as __typia_transform__randomString from "typia/lib/internal/_randomString.js";
import * as __typia_transform__randomArray from "typia/lib/internal/_randomArray.js";
import typia from "typia";
export function random() {
    return (() => { const _ro0 = (_recursive = false, _depth = 0) => { var _a, _b; return ({
        version_id: ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.integer) !== null && _a !== void 0 ? _a : __typia_transform__randomInteger._randomInteger)({
            type: "integer"
        }),
        actor: _ro1(_recursive, _recursive ? 1 + _depth : _depth),
        updated_at: ((_b = _generator === null || _generator === void 0 ? void 0 : _generator.datetime) !== null && _b !== void 0 ? _b : __typia_transform__randomFormatDatetime._randomFormatDatetime)()
    }); }; const _ro1 = (_recursive = false, _depth = 0) => ({
        id: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.integer) !== null && _a !== void 0 ? _a : __typia_transform__randomInteger._randomInteger)({
                type: "integer"
            }); }
        ])(),
        type: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _a !== void 0 ? _a : __typia_transform__randomString._randomString)({
                type: "string"
            }); }
        ])()
    }); let _generator; return generator => {
        var _a;
        _generator = generator;
        return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.array) !== null && _a !== void 0 ? _a : __typia_transform__randomArray._randomArray)({
            type: "array",
            element: () => _ro0()
        });
    }; })()();
}
//# sourceMappingURL=519.js.map
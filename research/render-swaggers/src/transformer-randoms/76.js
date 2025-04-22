import * as __typia_transform__randomString from "typia/lib/internal/_randomString.js";
import * as __typia_transform__randomArray from "typia/lib/internal/_randomArray.js";
import * as __typia_transform__randomInteger from "typia/lib/internal/_randomInteger.js";
import * as __typia_transform__randomBoolean from "typia/lib/internal/_randomBoolean.js";
import * as __typia_transform__randomPick from "typia/lib/internal/_randomPick.js";
import * as __typia_transform__randomNumber from "typia/lib/internal/_randomNumber.js";
import typia from "typia";
export function random() {
    return (() => { const _ro0 = (_recursive = false, _depth = 0) => { var _a, _b, _c; return ({
        sale_id: ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _a !== void 0 ? _a : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        stocks: ((_b = _generator === null || _generator === void 0 ? void 0 : _generator.array) !== null && _b !== void 0 ? _b : __typia_transform__randomArray._randomArray)({
            type: "array",
            element: () => _ro1(_recursive, _recursive ? 1 + _depth : _depth)
        }),
        volume: ((_c = _generator === null || _generator === void 0 ? void 0 : _generator.integer) !== null && _c !== void 0 ? _c : __typia_transform__randomInteger._randomInteger)({
            type: "integer"
        }),
        accumulate: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => null,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.boolean) !== null && _a !== void 0 ? _a : __typia_transform__randomBoolean._randomBoolean)({
                type: "boolean"
            }); }
        ])()
    }); }; const _ro1 = (_recursive = false, _depth = 0) => { var _a, _b, _c, _d; return ({
        unit_id: ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _a !== void 0 ? _a : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        stock_id: ((_b = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _b !== void 0 ? _b : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        choices: ((_c = _generator === null || _generator === void 0 ? void 0 : _generator.array) !== null && _c !== void 0 ? _c : __typia_transform__randomArray._randomArray)({
            type: "array",
            element: () => _ro2(_recursive, _recursive ? 1 + _depth : _depth)
        }),
        quantity: ((_d = _generator === null || _generator === void 0 ? void 0 : _generator.integer) !== null && _d !== void 0 ? _d : __typia_transform__randomInteger._randomInteger)({
            type: "integer"
        })
    }); }; const _ro2 = (_recursive = false, _depth = 0) => { var _a; return ({
        option_id: ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _a !== void 0 ? _a : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        value: __typia_transform__randomPick._randomPick([
            () => null,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _a !== void 0 ? _a : __typia_transform__randomString._randomString)({
                type: "string"
            }); },
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.number) !== null && _a !== void 0 ? _a : __typia_transform__randomNumber._randomNumber)({
                type: "number"
            }); },
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.boolean) !== null && _a !== void 0 ? _a : __typia_transform__randomBoolean._randomBoolean)({
                type: "boolean"
            }); }
        ])()
    }); }; let _generator; return generator => {
        _generator = generator;
        return _ro0();
    }; })()();
}
//# sourceMappingURL=76.js.map
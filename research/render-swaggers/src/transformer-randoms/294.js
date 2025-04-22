import * as __typia_transform__randomString from "typia/lib/internal/_randomString.js";
import * as __typia_transform__randomPick from "typia/lib/internal/_randomPick.js";
import * as __typia_transform__randomArray from "typia/lib/internal/_randomArray.js";
import * as __typia_transform__randomNumber from "typia/lib/internal/_randomNumber.js";
import typia from "typia";
export function random() {
    return (() => { const _ro0 = (_recursive = false, _depth = 0) => ({
        result: true,
        code: 1000,
        requestToResponse: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _a !== void 0 ? _a : __typia_transform__randomString._randomString)({
                type: "string"
            }); }
        ])(),
        data: _ro1(_recursive, _recursive ? 1 + _depth : _depth)
    }); const _ro1 = (_recursive = false, _depth = 0) => { var _a, _b, _c, _d, _e; return ({
        list: ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.array) !== null && _a !== void 0 ? _a : __typia_transform__randomArray._randomArray)({
            type: "array",
            element: () => _ro2(_recursive, _recursive ? 1 + _depth : _depth)
        }),
        count: ((_b = _generator === null || _generator === void 0 ? void 0 : _generator.number) !== null && _b !== void 0 ? _b : __typia_transform__randomNumber._randomNumber)({
            type: "number"
        }),
        totalResult: ((_c = _generator === null || _generator === void 0 ? void 0 : _generator.number) !== null && _c !== void 0 ? _c : __typia_transform__randomNumber._randomNumber)({
            type: "number"
        }),
        totalPage: ((_d = _generator === null || _generator === void 0 ? void 0 : _generator.number) !== null && _d !== void 0 ? _d : __typia_transform__randomNumber._randomNumber)({
            type: "number"
        }),
        search: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _a !== void 0 ? _a : __typia_transform__randomString._randomString)({
                type: "string"
            }); }
        ])(),
        page: ((_e = _generator === null || _generator === void 0 ? void 0 : _generator.number) !== null && _e !== void 0 ? _e : __typia_transform__randomNumber._randomNumber)({
            type: "number"
        })
    }); }; const _ro2 = (_recursive = false, _depth = 0) => { var _a, _b; return ({
        nickname: ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _a !== void 0 ? _a : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        id: ((_b = _generator === null || _generator === void 0 ? void 0 : _generator.number) !== null && _b !== void 0 ? _b : __typia_transform__randomNumber._randomNumber)({
            type: "number"
        }),
        profileImage: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => null,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _a !== void 0 ? _a : __typia_transform__randomString._randomString)({
                type: "string"
            }); }
        ])(),
        reason: __typia_transform__randomPick._randomPick([
            () => "\uB098\uB97C \uD314\uB85C\uC6B0\uD55C \uC0AC\uB78C",
            () => "\uB0B4\uAC00 \uD314\uB85C\uC6B0\uD55C \uC0AC\uB78C"
        ])()
    }); }; let _generator; return generator => {
        _generator = generator;
        return _ro0();
    }; })()();
}
//# sourceMappingURL=294.js.map
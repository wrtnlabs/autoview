import * as __typia_transform__randomString from "typia/lib/internal/_randomString.js";
import * as __typia_transform__randomInteger from "typia/lib/internal/_randomInteger.js";
import * as __typia_transform__randomPick from "typia/lib/internal/_randomPick.js";
import * as __typia_transform__randomBoolean from "typia/lib/internal/_randomBoolean.js";
import * as __typia_transform__randomFormatUri from "typia/lib/internal/_randomFormatUri.js";
import * as __typia_transform__randomArray from "typia/lib/internal/_randomArray.js";
import typia from "typia";
export function random() {
    return (() => { const _ro0 = (_recursive = false, _depth = 0) => { var _a, _b, _c, _d; return ({
        url: ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _a !== void 0 ? _a : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        type: ((_b = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _b !== void 0 ? _b : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        id: ((_c = _generator === null || _generator === void 0 ? void 0 : _generator.integer) !== null && _c !== void 0 ? _c : __typia_transform__randomInteger._randomInteger)({
            type: "integer"
        }),
        login: ((_d = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _d !== void 0 ? _d : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        organization_billing_email: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _a !== void 0 ? _a : __typia_transform__randomString._randomString)({
                type: "string"
            }); }
        ])(),
        email: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => null,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _a !== void 0 ? _a : __typia_transform__randomString._randomString)({
                type: "string"
            }); }
        ])(),
        marketplace_pending_change: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => null,
            () => _ro1(_recursive, _recursive ? 1 + _depth : _depth)
        ])(),
        marketplace_purchase: _ro2(_recursive, _recursive ? 1 + _depth : _depth)
    }); }; const _ro1 = (_recursive = false, _depth = 0) => ({
        is_installed: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.boolean) !== null && _a !== void 0 ? _a : __typia_transform__randomBoolean._randomBoolean)({
                type: "boolean"
            }); }
        ])(),
        effective_date: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _a !== void 0 ? _a : __typia_transform__randomString._randomString)({
                type: "string"
            }); }
        ])(),
        unit_count: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => null,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.integer) !== null && _a !== void 0 ? _a : __typia_transform__randomInteger._randomInteger)({
                type: "integer"
            }); }
        ])(),
        id: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.integer) !== null && _a !== void 0 ? _a : __typia_transform__randomInteger._randomInteger)({
                type: "integer"
            }); }
        ])(),
        plan: __typia_transform__randomPick._randomPick([
            () => "any type used...",
            () => undefined
        ])()
    }); const _ro2 = (_recursive = false, _depth = 0) => ({
        billing_cycle: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _a !== void 0 ? _a : __typia_transform__randomString._randomString)({
                type: "string"
            }); }
        ])(),
        next_billing_date: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => null,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _a !== void 0 ? _a : __typia_transform__randomString._randomString)({
                type: "string"
            }); }
        ])(),
        is_installed: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.boolean) !== null && _a !== void 0 ? _a : __typia_transform__randomBoolean._randomBoolean)({
                type: "boolean"
            }); }
        ])(),
        unit_count: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => null,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.integer) !== null && _a !== void 0 ? _a : __typia_transform__randomInteger._randomInteger)({
                type: "integer"
            }); }
        ])(),
        on_free_trial: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.boolean) !== null && _a !== void 0 ? _a : __typia_transform__randomBoolean._randomBoolean)({
                type: "boolean"
            }); }
        ])(),
        free_trial_ends_on: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => null,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _a !== void 0 ? _a : __typia_transform__randomString._randomString)({
                type: "string"
            }); }
        ])(),
        updated_at: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _a !== void 0 ? _a : __typia_transform__randomString._randomString)({
                type: "string"
            }); }
        ])(),
        plan: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => _ro3(_recursive, _recursive ? 1 + _depth : _depth)
        ])()
    }); const _ro3 = (_recursive = false, _depth = 0) => { var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l; return ({
        url: ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.uri) !== null && _a !== void 0 ? _a : __typia_transform__randomFormatUri._randomFormatUri)(),
        accounts_url: ((_b = _generator === null || _generator === void 0 ? void 0 : _generator.uri) !== null && _b !== void 0 ? _b : __typia_transform__randomFormatUri._randomFormatUri)(),
        id: ((_c = _generator === null || _generator === void 0 ? void 0 : _generator.integer) !== null && _c !== void 0 ? _c : __typia_transform__randomInteger._randomInteger)({
            type: "integer"
        }),
        number: ((_d = _generator === null || _generator === void 0 ? void 0 : _generator.integer) !== null && _d !== void 0 ? _d : __typia_transform__randomInteger._randomInteger)({
            type: "integer"
        }),
        name: ((_e = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _e !== void 0 ? _e : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        description: ((_f = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _f !== void 0 ? _f : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        monthly_price_in_cents: ((_g = _generator === null || _generator === void 0 ? void 0 : _generator.integer) !== null && _g !== void 0 ? _g : __typia_transform__randomInteger._randomInteger)({
            type: "integer"
        }),
        yearly_price_in_cents: ((_h = _generator === null || _generator === void 0 ? void 0 : _generator.integer) !== null && _h !== void 0 ? _h : __typia_transform__randomInteger._randomInteger)({
            type: "integer"
        }),
        price_model: __typia_transform__randomPick._randomPick([
            () => "FREE",
            () => "FLAT_RATE",
            () => "PER_UNIT"
        ])(),
        has_free_trial: ((_j = _generator === null || _generator === void 0 ? void 0 : _generator.boolean) !== null && _j !== void 0 ? _j : __typia_transform__randomBoolean._randomBoolean)({
            type: "boolean"
        }),
        unit_name: __typia_transform__randomPick._randomPick([
            () => null,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _a !== void 0 ? _a : __typia_transform__randomString._randomString)({
                type: "string"
            }); }
        ])(),
        state: ((_k = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _k !== void 0 ? _k : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        bullets: ((_l = _generator === null || _generator === void 0 ? void 0 : _generator.array) !== null && _l !== void 0 ? _l : __typia_transform__randomArray._randomArray)({
            type: "array",
            element: () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _a !== void 0 ? _a : __typia_transform__randomString._randomString)({
                type: "string"
            }); }
        })
    }); }; let _generator; return generator => {
        _generator = generator;
        return _ro0();
    }; })()();
}
//# sourceMappingURL=360.js.map
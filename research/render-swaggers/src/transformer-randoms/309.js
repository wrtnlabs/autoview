import * as __typia_transform__randomString from "typia/lib/internal/_randomString.js";
import * as __typia_transform__randomPick from "typia/lib/internal/_randomPick.js";
import * as __typia_transform__randomFormatUri from "typia/lib/internal/_randomFormatUri.js";
import * as __typia_transform__randomArray from "typia/lib/internal/_randomArray.js";
import * as __typia_transform__randomFormatDatetime from "typia/lib/internal/_randomFormatDatetime.js";
import * as __typia_transform__randomNumber from "typia/lib/internal/_randomNumber.js";
import typia from "typia";
export function random() {
    return (() => { const _ro0 = (_recursive = false, _depth = 0) => { var _a, _b, _c, _d, _e, _f; return ({
        ghsa_id: ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _a !== void 0 ? _a : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        cve_id: __typia_transform__randomPick._randomPick([
            () => null,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _a !== void 0 ? _a : __typia_transform__randomString._randomString)({
                type: "string"
            }); }
        ])(),
        url: ((_b = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _b !== void 0 ? _b : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        html_url: ((_c = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _c !== void 0 ? _c : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        repository_advisory_url: __typia_transform__randomPick._randomPick([
            () => null,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.uri) !== null && _a !== void 0 ? _a : __typia_transform__randomFormatUri._randomFormatUri)(); }
        ])(),
        summary: ((_d = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _d !== void 0 ? _d : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        description: __typia_transform__randomPick._randomPick([
            () => null,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _a !== void 0 ? _a : __typia_transform__randomString._randomString)({
                type: "string",
                maxLength: 65535
            }); }
        ])(),
        type: __typia_transform__randomPick._randomPick([
            () => "reviewed",
            () => "unreviewed",
            () => "malware"
        ])(),
        severity: __typia_transform__randomPick._randomPick([
            () => "medium",
            () => "unknown",
            () => "low",
            () => "high",
            () => "critical"
        ])(),
        source_code_location: __typia_transform__randomPick._randomPick([
            () => null,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.uri) !== null && _a !== void 0 ? _a : __typia_transform__randomFormatUri._randomFormatUri)(); }
        ])(),
        identifiers: __typia_transform__randomPick._randomPick([
            () => null,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.array) !== null && _a !== void 0 ? _a : __typia_transform__randomArray._randomArray)({
                type: "array",
                element: () => _ro1(_recursive, _recursive ? 1 + _depth : _depth)
            }); }
        ])(),
        references: __typia_transform__randomPick._randomPick([
            () => null,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.array) !== null && _a !== void 0 ? _a : __typia_transform__randomArray._randomArray)({
                type: "array",
                element: () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _a !== void 0 ? _a : __typia_transform__randomString._randomString)({
                    type: "string"
                }); }
            }); }
        ])(),
        published_at: ((_e = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _e !== void 0 ? _e : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        updated_at: ((_f = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _f !== void 0 ? _f : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        github_reviewed_at: __typia_transform__randomPick._randomPick([
            () => null,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.datetime) !== null && _a !== void 0 ? _a : __typia_transform__randomFormatDatetime._randomFormatDatetime)(); }
        ])(),
        nvd_published_at: __typia_transform__randomPick._randomPick([
            () => null,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.datetime) !== null && _a !== void 0 ? _a : __typia_transform__randomFormatDatetime._randomFormatDatetime)(); }
        ])(),
        withdrawn_at: __typia_transform__randomPick._randomPick([
            () => null,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.datetime) !== null && _a !== void 0 ? _a : __typia_transform__randomFormatDatetime._randomFormatDatetime)(); }
        ])(),
        vulnerabilities: __typia_transform__randomPick._randomPick([
            () => null,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.array) !== null && _a !== void 0 ? _a : __typia_transform__randomArray._randomArray)({
                type: "array",
                element: () => "any type used..."
            }); }
        ])(),
        cvss: __typia_transform__randomPick._randomPick([
            () => null,
            () => _ro2(_recursive, _recursive ? 1 + _depth : _depth)
        ])(),
        cvss_severities: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => null,
            () => _ro3(_recursive, _recursive ? 1 + _depth : _depth)
        ])(),
        epss: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => null,
            () => _ro6(_recursive, _recursive ? 1 + _depth : _depth)
        ])(),
        cwes: __typia_transform__randomPick._randomPick([
            () => null,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.array) !== null && _a !== void 0 ? _a : __typia_transform__randomArray._randomArray)({
                type: "array",
                element: () => _ro7(_recursive, _recursive ? 1 + _depth : _depth)
            }); }
        ])(),
        credits: __typia_transform__randomPick._randomPick([
            () => null,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.array) !== null && _a !== void 0 ? _a : __typia_transform__randomArray._randomArray)({
                type: "array",
                element: () => _ro8(_recursive, _recursive ? 1 + _depth : _depth)
            }); }
        ])()
    }); }; const _ro1 = (_recursive = false, _depth = 0) => { var _a; return ({
        type: __typia_transform__randomPick._randomPick([
            () => "CVE",
            () => "GHSA"
        ])(),
        value: ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _a !== void 0 ? _a : __typia_transform__randomString._randomString)({
            type: "string"
        })
    }); }; const _ro2 = (_recursive = false, _depth = 0) => ({
        vector_string: __typia_transform__randomPick._randomPick([
            () => null,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _a !== void 0 ? _a : __typia_transform__randomString._randomString)({
                type: "string"
            }); }
        ])(),
        score: __typia_transform__randomPick._randomPick([
            () => null,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.number) !== null && _a !== void 0 ? _a : __typia_transform__randomNumber._randomNumber)({
                type: "number",
                minimum: 0,
                maximum: 10
            }); }
        ])()
    }); const _ro3 = (_recursive = false, _depth = 0) => ({
        cvss_v3: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => null,
            () => _ro4(_recursive, _recursive ? 1 + _depth : _depth)
        ])(),
        cvss_v4: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => null,
            () => _ro5(_recursive, _recursive ? 1 + _depth : _depth)
        ])()
    }); const _ro4 = (_recursive = false, _depth = 0) => ({
        vector_string: __typia_transform__randomPick._randomPick([
            () => null,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _a !== void 0 ? _a : __typia_transform__randomString._randomString)({
                type: "string"
            }); }
        ])(),
        score: __typia_transform__randomPick._randomPick([
            () => null,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.number) !== null && _a !== void 0 ? _a : __typia_transform__randomNumber._randomNumber)({
                type: "number",
                minimum: 0,
                maximum: 10
            }); }
        ])()
    }); const _ro5 = (_recursive = false, _depth = 0) => ({
        vector_string: __typia_transform__randomPick._randomPick([
            () => null,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _a !== void 0 ? _a : __typia_transform__randomString._randomString)({
                type: "string"
            }); }
        ])(),
        score: __typia_transform__randomPick._randomPick([
            () => null,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.number) !== null && _a !== void 0 ? _a : __typia_transform__randomNumber._randomNumber)({
                type: "number",
                minimum: 0,
                maximum: 10
            }); }
        ])()
    }); const _ro6 = (_recursive = false, _depth = 0) => ({
        percentage: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.number) !== null && _a !== void 0 ? _a : __typia_transform__randomNumber._randomNumber)({
                type: "number",
                minimum: 0,
                maximum: 100
            }); }
        ])(),
        percentile: __typia_transform__randomPick._randomPick([
            () => undefined,
            () => { var _a; return ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.number) !== null && _a !== void 0 ? _a : __typia_transform__randomNumber._randomNumber)({
                type: "number",
                minimum: 0,
                maximum: 100
            }); }
        ])()
    }); const _ro7 = (_recursive = false, _depth = 0) => { var _a, _b; return ({
        cwe_id: ((_a = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _a !== void 0 ? _a : __typia_transform__randomString._randomString)({
            type: "string"
        }),
        name: ((_b = _generator === null || _generator === void 0 ? void 0 : _generator.string) !== null && _b !== void 0 ? _b : __typia_transform__randomString._randomString)({
            type: "string"
        })
    }); }; const _ro8 = (_recursive = false, _depth = 0) => ({
        user: "any type used...",
        type: "any type used..."
    }); let _generator; return generator => {
        _generator = generator;
        return _ro0();
    }; })()();
}
//# sourceMappingURL=309.js.map
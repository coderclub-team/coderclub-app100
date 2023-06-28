"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.oneMonthAgo = exports.omitUndefined = void 0;
function omitUndefined(obj) {
    const result = {};
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key) &&
            obj[key] !== undefined) {
            result[key] = obj[key];
        }
    }
    return result;
}
exports.omitUndefined = omitUndefined;
exports.oneMonthAgo = new Date();
exports.oneMonthAgo.setMonth(exports.oneMonthAgo.getMonth() - 1);

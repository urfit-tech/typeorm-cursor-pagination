"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pascalToUnderscore = exports.camelOrPascalToUnderscore = exports.decodeByType = exports.encodeByType = exports.btoa = exports.atob = void 0;
function atob(value) {
    return Buffer.from(value, 'base64').toString();
}
exports.atob = atob;
function btoa(value) {
    return Buffer.from(value).toString('base64');
}
exports.btoa = btoa;
function encodeByType(type, value) {
    if (value === null)
        return null;
    switch (type) {
        case 'date': {
            return value.getTime().toString();
        }
        case 'number': {
            return `${value}`;
        }
        case 'string': {
            return encodeURIComponent(value);
        }
        case 'object': {
            /**
             * if reflection type is Object, check whether an object is a date.
             * see: https://github.com/rbuckton/reflect-metadata/issues/84
             */
            if (typeof value.getTime === 'function') {
                return value.getTime().toString();
            }
            break;
        }
        default: break;
    }
    throw new Error(`unknown type in cursor: [${type}]${value}`);
}
exports.encodeByType = encodeByType;
function decodeByType(type, value) {
    switch (type) {
        case 'object':
        case 'date': {
            const timestamp = parseInt(value, 10);
            if (Number.isNaN(timestamp)) {
                throw new Error('date column in cursor should be a valid timestamp');
            }
            return new Date(timestamp);
        }
        case 'number': {
            const num = parseFloat(value);
            if (Number.isNaN(num)) {
                throw new Error('number column in cursor should be a valid number');
            }
            return num;
        }
        case 'string': {
            return decodeURIComponent(value);
        }
        default: {
            throw new Error(`unknown type in cursor: [${type}]${value}`);
        }
    }
}
exports.decodeByType = decodeByType;
function camelOrPascalToUnderscore(str) {
    return str.split(/(?=[A-Z])/).join('_').toLowerCase();
}
exports.camelOrPascalToUnderscore = camelOrPascalToUnderscore;
function pascalToUnderscore(str) {
    return camelOrPascalToUnderscore(str);
}
exports.pascalToUnderscore = pascalToUnderscore;
//# sourceMappingURL=utils.js.map
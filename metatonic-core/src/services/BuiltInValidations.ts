import {SchemaType} from "../domain/Schema/Records";
import {Validation} from "../domain/Schema/Validation";
import {SchemaTypeCategory} from "../domain/Schema/SchemaEnums";
import {QuantityTypeParameters} from "../domain/Schema/Quantities";
import {hasValue} from "../extensions/hasValue";

export const min: Validation = (value, type, field) => {
    if (!value['lessThan']) return [];

    let min = field.min;

    return hasValue(min) && value.lessThan(min) ? [`${field.label} must be greater than ${min}`] : []
}

export const max: Validation = (value, type, field) => {
    if (!value['greaterThan']) return [];

    let max = field.max;

    return hasValue(max) && value.greaterThan(max) ? [`${field.label} must be greater than ${max}`] : []
}
export const required: Validation = (value, type, field) =>  {
    if (!value['hasValue']) return [];

    let required = field.required;

    let $hasValue = typeof value === "string" || value === null ? hasValue(value) : value.hasValue();

    return required && !$hasValue ? [`${field.label} is required`] : [];
}

export const maxLength: Validation = (value, type, field) =>  {
    if (!(typeof value === "string")) return [];

    let maxLength = field.maxLength;

    let length = value ? value.length : 0;

    return maxLength && length > maxLength ? [`${field.label} is must be shorter than ${maxLength} characters`] : [];
}

export const regexValidaiton: Validation<any> = (value, type, field, config, params) =>  {
    if (!(typeof value === "string")) return [];

    let regex = params.regex;
    let matches = val => new RegExp(regex).test(val);
    let message = typeof params.message === "string" ? () => params.message :
                  typeof params.message === "function" ? params.message :
                      () => `${field.label} must match`

    return regex && !matches(value) ? [message(field, value)] : [];
}

export const builtInValidations:  Validation[] = [
    min, max, maxLength, required
]
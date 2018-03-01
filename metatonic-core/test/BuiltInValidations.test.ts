import {max, min, required} from "../src/services/BuiltInValidations";
import {SchemaField} from "../src/domain/Schema/Records";
import {OptionalProps} from "../src/CoreTypes";
import {Integer} from "../src/Data/Integer";

let smaller = "1";
let bigger = "2";
let val = Integer.fromData;

describe('min', () => {
    it('return messages when value less than min', () => {
        let field = { min: bigger, name: "a", label: "ABC" } as OptionalProps<SchemaField> as any
        let messages = min(val(smaller), {} as any, field);
        expect(messages).toHaveLength(1);
    })
    it('return a message containing min val when value less than min', () => {
        let field = { min: bigger, name: "a", label: "ABC" } as OptionalProps<SchemaField> as any
        let messages = min(val(smaller), {} as any, field);
        expect(messages[0]).toContain(bigger);
    })
    it('return empty when value greater than min', () => {
        let field = { min: smaller, name: "a", label: "ABC" } as OptionalProps<SchemaField> as any
        let messages = min(val(bigger), {} as any, field);
        expect(messages).toHaveLength(0);
    })
    it('return empty when value equal to min', () => {
        let field = { min: smaller, name: "a", label: "ABC" } as OptionalProps<SchemaField> as any
        let messages = min(val(smaller), {} as any, field);
        expect(messages).toHaveLength(0);
    })
})

describe('max', () => {
    it('return messages when value greater than max', () => {
        let field = { max: smaller, name: "a", label: "ABC" } as OptionalProps<SchemaField> as any
        let messages = max(val(bigger), {} as any, field);
        expect(messages).toHaveLength(1);
    })
    it('return message containing max val when value greater than max', () => {
        let field = { max: smaller, name: "a", label: "ABC" } as OptionalProps<SchemaField> as any
        let messages = max(val(bigger), {} as any, field);
        expect(messages[0]).toContain(smaller);
    })
    it('return empty when value less than max', () => {
        let field = { max: bigger, name: "a", label: "ABC" } as OptionalProps<SchemaField> as any
        let messages = max(val(smaller), {} as any, field);
        expect(messages).toHaveLength(0);
    })
    it('return empty when value equal to max', () => {
        let field = { max: smaller, name: "a", label: "ABC" } as OptionalProps<SchemaField> as any
        let messages = max(val(smaller), {} as any, field);
        expect(messages).toHaveLength(0);
    })
})

describe('required', () => {
    it('should return messages when string is null', () => {
        let messages = required(null, {} as any, { required: true, name: 'a', label: 'ABC'} as any);
        expect(messages).toHaveLength(1);
    })
    it('should return messages when string is empty', () => {
        let messages = required('', {} as any, { required: true, name: 'a', label: 'ABC'} as any);
        expect(messages).toHaveLength(1);
    })
    it('should return pass when string is full', () => {
        let messages = required('123', {} as any, { required: true, name: 'a', label: 'ABC'} as any);
        expect(messages).toHaveLength(0);
    })
    it('should return messages when value data type is empty', () => {
        let value = val("");
        let messages = required(value, {} as any, { required: true, name: 'a', label: 'ABC'} as any);
        expect(messages).toHaveLength(1);
    })
    it('should return pass when value data type is full', () => {
        let value = val("1");
        let messages = required(value, {} as any, { required: true, name: 'a', label: 'ABC'} as any);
        expect(messages).toHaveLength(0);
    })
})
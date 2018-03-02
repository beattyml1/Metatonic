export class Transformer<T> {
	public $: T;
	constructor(value: T) {
		this.$ = value;
	}
	with<Tout>(transform: (T)=>Tout): Transformer<Tout> {
		return new Transformer(transform(this.$));
	}
	value() {
		return this.$;
	}
}

export function __<T>(value: T):Transformer<T> {
	return new Transformer(value);
}
export function transfrom<T>(value: T):Transformer<T> {
	return new Transformer(value);
}

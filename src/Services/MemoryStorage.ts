const MAX_SIZE = 500;

class MemoryStorage {
	private items: Map<string, string>;
	private readonly maxSize: number;

	constructor(maxSize: number = MAX_SIZE) {
		this.items = new Map<string, string>();
		this.maxSize = maxSize;
	}

	add(key: string, item: any) {
		const stringified = typeof item === "string" ? item : JSON.stringify(item);
		if (this.items.size >= this.maxSize) {
			const firstKey = this.items.keys().next().value;
			this.items.delete(firstKey);
		}
		this.items.set(key, stringified);
	}

	get(key: string): string | undefined {
		const item = this.items.get(key);
		this.items.delete(key);
		return item;
	}

	getAll(): Map<string, string> {
		return new Map(this.items);
	}
}

export const createStorage = () => new MemoryStorage(MAX_SIZE);

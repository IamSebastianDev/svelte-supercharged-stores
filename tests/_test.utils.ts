/** @format */

export const noop = () => {};

export const createMockStorage = () => {
    const _storage: Record<string, any> = {};
    (global as any).window = {
        localStorage: {
            getItem: (key: string) => {
                return _storage[key] ?? null;
            },
            setItem: (key: string, value: any) => {
                _storage[key] = value;
            },
            removeItem: (key: string) => {
                delete _storage[key];
            },
        },
    };
};

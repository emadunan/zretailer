export function arrayFromNumbr(len: number) {
    return Array.from({ length: len }, (_, idx) => idx + 1);
}

export function getMiddleThreeNumbrs(n: number, total: number) {
    const middle = Math.floor(n / 2);
    if (middle < 4) {
        return [2, 3, 4];
    }

    if (middle > total - 2) {
        return [middle - 2, middle - 1, middle];
    }
    return [middle - 1, middle, middle + 1];
}

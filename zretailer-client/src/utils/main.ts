export function arrayFromNumbr(len: number) {
    return Array.from({ length: len }, (_, idx) => idx + 1);
}

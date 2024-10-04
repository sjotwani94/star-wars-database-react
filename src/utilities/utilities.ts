export function convertToRomanNumber(value: number): string {
    if (value < 1) {
        return '';
    }
    if (value >= 40) {
        return 'XL' + convertToRomanNumber(value - 40);
    }
    if (value >= 10) {
        return 'X' + convertToRomanNumber(value - 10);
    }
    if (value >= 9) {
        return 'IX' + convertToRomanNumber(value - 9);
    }
    if (value >= 5) {
        return 'V' + convertToRomanNumber(value - 5);
    }
    if (value >= 4) {
        return 'IV' + convertToRomanNumber(value - 4);
    }
    if (value >= 1) {
        return 'I' + convertToRomanNumber(value - 1);
    }
}

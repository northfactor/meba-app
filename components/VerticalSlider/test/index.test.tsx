import { getDisplayValue, getValueRange } from '..';

describe('VerticalSlider', () => {
    it('getValueRange should calculate the correct range', () => {
        const height = 250;
        const textCircleRadius = 20;
        const valueRange = getValueRange(textCircleRadius, height);
        expect(valueRange).toEqual({ min: 20, max: 230 });
    });
    it('getDisplayValue should present correct values for min', () => {
        const height = 250;
        const textCircleRadius = 20;
        const valueRange = getValueRange(textCircleRadius, height);
        const maxValue = 100;
        const value = valueRange.min;

        const displayValue = getDisplayValue(maxValue, value, valueRange);
        expect(displayValue).toEqual(maxValue);
    });
    it('getDisplayValue should present correct values for max', () => {
        const height = 250;
        const textCircleRadius = 20;
        const valueRange = getValueRange(textCircleRadius, height);

        const maxValue = 100,
            value = valueRange.max;

        const displayValue = getDisplayValue(maxValue, value, valueRange);
        expect(displayValue).toEqual(0);
    });
    it('getDisplayValue should present correct values for median', () => {
        const height = 250;
        const textCircleRadius = 20;
        const valueRange = getValueRange(textCircleRadius, height);

        const maxValue = 100,
            value = height / 2;

        const displayValue = getDisplayValue(maxValue, value, valueRange);
        expect(displayValue).toEqual(50);
    });
});

import React, { useState } from 'react';
import { PanResponder } from 'react-native';
import Svg, { Circle, G, Path, Text as SvgText } from 'react-native-svg';

interface ValueRange {
    min: number;
    max: number;
}

interface VerticalSliderProps {
    height: number;
    maxValue: number;
    meterColor: string;
    textColor: string;
    onValueChange: (value: number) => void;
}

/**
 *
 * Calculate the range of possible values based on the svg height minus the size
 * of the circle diameter
 *
 * @param textCircleRadius Radius of the circle we show the displayvalue in
 * @param height height of the svg
 */
export const getValueRange = (textCircleRadius: number, height: number) => {
    return { min: 20, max: height - textCircleRadius };
};

/**
 *
 * Convert our slider values and human readable max to a display string
 *
 * https://stackoverflow.com/questions/5731863/mapping-a-numeric-range-onto-another
 *
 * @param maxValue Maximum value for human readable display
 * @param value position of the slider
 * @param valueRange adjustment for min and max value range based on the circle text icon
 */
export const getDisplayValue = (maxValue: number, value: number, valueRange: ValueRange) => {
    const { min, max } = valueRange;
    const transformRange = { min: 0, max: maxValue };
    const slope = (transformRange.max - transformRange.min) / (max - min);
    const output = transformRange.min + slope * (value - min);
    return maxValue - Math.ceil(output);
};

const VerticalSlider = (props: VerticalSliderProps) => {
    const { height, maxValue, meterColor, onValueChange, textColor } = props;

    const width = 50;
    const textCircleRadius = 20;
    const valueRange = getValueRange(textCircleRadius, height);
    const [value, setValue] = useState(0);

    const staticPathStart = { x: width / 2, y: textCircleRadius };
    const staticPathEnd = { x: width / 2, y: valueRange.max };
    const startCoord = { x: width / 2, y: textCircleRadius };
    const endCoord = { x: width / 2, y: value };

    const handlePanResponderMove = ({ nativeEvent: { locationY } }: any) => {
        const { min, max } = valueRange;
        console.log('locationY', locationY);
        if (locationY < min - 1 || locationY > max) {
            return;
        }
        const roundedLocation = Math.ceil(locationY);
        setValue(roundedLocation);

        const actualValue = 1 - (roundedLocation - min) / (max - min);
        console.log('actualValue', actualValue);
        onValueChange(actualValue);
    };

    const _panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: handlePanResponderMove
        // onPanResponderRelease: (evt, gestureState) => {
        //     // The user has released all touches while this view is the
        //     // responder. This typically means a gesture has succeeded
        //     console.log('Release', gestureState);
        // },
        // onPanResponderTerminate: (evt, gestureState) => {
        //     // Another component has become the responder, so this gesture
        //     // should be cancelled
        //     console.log('Terminate', gestureState);
        // }
    });

    return (
        <Svg width={width} height={height} preserveAspectRatio="xMaxYMin meet" {..._panResponder.panHandlers}>
            <Path
                stroke={meterColor}
                strokeWidth={10}
                fill="none"
                d={`M${staticPathStart.x} ${staticPathStart.y} L ${staticPathEnd.x} ${staticPathEnd.y}`}
            />
            <Path
                stroke={'#fff'}
                strokeWidth={10}
                fill="none"
                d={`M${startCoord.x} ${startCoord.y} L ${endCoord.x} ${endCoord.y}`}
            />
            <G x={endCoord.x} y={endCoord.y}>
                <Circle r={textCircleRadius} fill={meterColor} />
                <SvgText key={value + ''} y={4} fontSize={14} fill={textColor} textAnchor="middle">
                    {getDisplayValue(maxValue, value, valueRange) + ''}
                </SvgText>
            </G>
        </Svg>
    );
};

export default VerticalSlider;

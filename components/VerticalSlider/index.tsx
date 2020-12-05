import React, { useState } from 'react';
import { PanResponder } from 'react-native';
import Svg, { Circle, G, Path, Text as SvgText } from 'react-native-svg';
import useLayout from '../../hooks/useLayout';

interface ValueRange {
    min: number;
    max: number;
}

interface VerticalSliderProps {
    height: number;
    maxValue: number;
    meterColor: string;
    textColor: string;
}

/**
 *
 * Convert our slider values and human readable max to a display string
 *
 * @param maxValue Maximum value for human readable display
 * @param value position of the slider
 * @param valueRange adjustment for min and max value range based on the circle text icon
 */
const getDisplayValue = (maxValue: number, value: number, valueRange: ValueRange) => {
    const { min, max } = valueRange;
    return maxValue - Math.ceil(((value - min) / (max - min)) * maxValue);
};

const VerticalSlider = (props: VerticalSliderProps) => {
    const { height, maxValue, meterColor, textColor } = props;
    const [value, setValue] = useState(0);

    const width = 50;
    const textCircleRadius = 20;

    const staticPathStart = { x: width / 2, y: textCircleRadius };
    const staticPathEnd = { x: width / 2, y: height - textCircleRadius - 10 };
    const startCoord = { x: width / 2, y: textCircleRadius };
    const endCoord = { x: width / 2, y: value };

    // Using textCircleRadius to adjust the slider height and fit the circle icon on the screen
    const valueRange = { min: textCircleRadius, max: height - textCircleRadius * 2 };

    const [size, onLayout] = useLayout();

    const handlePanResponderMove = ({ nativeEvent: { locationY } }: any) => {
        const { min, max } = valueRange;
        console.log('locationY', locationY);
        if (locationY < min || locationY > max) {
            return;
        }

        setValue(Math.ceil(locationY));
    };

    const _panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: handlePanResponderMove,
        onPanResponderRelease: (evt, gestureState) => {
            // The user has released all touches while this view is the
            // responder. This typically means a gesture has succeeded
            console.log('Release', gestureState);
        },
        onPanResponderTerminate: (evt, gestureState) => {
            // Another component has become the responder, so this gesture
            // should be cancelled
            console.log('Terminate', gestureState);
        }
    });

    return (
        <Svg
            onLayout={onLayout}
            width={width}
            height={height}
            preserveAspectRatio="xMaxYMin meet"
            {..._panResponder.panHandlers}
        >
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

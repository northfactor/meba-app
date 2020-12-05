import React, { useCallback, useState } from 'react';
import { PanResponder, LayoutChangeEvent } from 'react-native';
import Svg, { Path, Circle, G, Text } from 'react-native-svg';
import useLayout from '../../hooks/useLayout';

interface XYCoordinate {
    x: number;
    y: number;
}

interface CircularSliderProps {
    width: number;
    height: number;
    onValueChange: (value: number) => void;
    value: number;
    meterColor: string;
    textColor: string;
}

const CircularSlider = (props: CircularSliderProps) => {
    const { height, meterColor, onValueChange, textColor, value, width } = props;
    const smallestSide = Math.min(width, height);

    const cx = width / 2;
    const cy = height / 2;
    const r = (smallestSide / 2) * 0.8;

    const [size, onLayout] = useLayout();

    const polarToCartesian = (angle: number) => {
        const a = ((angle - 270) * Math.PI) / 180.0;
        const x = cx + r * Math.cos(a);
        const y = cy + r * Math.sin(a);
        return { x, y };
    };
    const cartesianToPolar = (x: number, y: number) => {
        return Math.round(Math.atan((y - cy) / (x - cx)) / (Math.PI / 180) + (x > cx ? 270 : 90));
    };
    const handlePanResponderMove = ({ nativeEvent: { locationX, locationY } }: any) => {
        const value = cartesianToPolar(locationX, locationY);
        onValueChange(value);
    };

    const _panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: handlePanResponderMove
    });

    const startCoord = polarToCartesian(0);
    const endCoord = polarToCartesian(value);

    console.log(size);

    return (
        <Svg onLayout={onLayout} width={width} height={height} {..._panResponder.panHandlers}>
            <Circle cx={cx} cy={cy} r={r} stroke="#eee" strokeWidth={2} fill="none" />
            <Path
                stroke={meterColor}
                strokeWidth={10}
                fill="none"
                d={`M${startCoord.x} ${startCoord.y} A ${r} ${r} 0 ${value > 180 ? 1 : 0} 1 ${endCoord.x} ${
                    endCoord.y
                }`}
            />
            <G x={endCoord.x - 7.5} y={endCoord.y - 7.5}>
                <Circle cx={7.5} cy={7.5} r={20} fill={meterColor} />
                <Text key={value + ''} x={7.5} y={12} fontSize={14} fill={textColor} textAnchor="middle">
                    {value + ''}
                </Text>
            </G>
        </Svg>
    );
};

export default CircularSlider;

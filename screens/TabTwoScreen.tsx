import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import CircularSlider from '../components/CircularSlider';
import VerticalSlider from '../components/VerticalSlider';

export default function TabTwoScreen() {
    const [circleState, setCircleState] = useState(0);
    const [volumeState, setVolumeState] = useState(0);
    const [constrastState, setContrastState] = useState(0);

    console.log('volumeState', volumeState);
    return (
        <View style={styles.container}>
            <CircularSlider
                width={200}
                height={200}
                meterColor="#0cd"
                textColor="#fff"
                value={circleState}
                onValueChange={setCircleState}
            />
            <VerticalSlider
                maxValue={100}
                height={250}
                meterColor="#0cd"
                textColor="#fff"
                onValueChange={setVolumeState}
            />
            <VerticalSlider
                maxValue={100}
                height={250}
                meterColor="#0cd"
                textColor="#fff"
                onValueChange={setContrastState}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'green'
    }
});

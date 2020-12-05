import React, { useCallback, useState } from 'react';
import { LayoutChangeEvent } from 'react-native';

const useLayout = (): [
    {
        height: number;
        width: number;
    },
    (event: LayoutChangeEvent) => void
] => {
    const [size, setSize] = useState<{
        height: number;
        width: number;
    }>({ height: 0, width: 0 });

    const onLayout = useCallback((event: LayoutChangeEvent) => {
        const { width, height } = event.nativeEvent.layout;
        setSize({ width, height });
    }, []);

    return [size, onLayout];
};

export default useLayout;

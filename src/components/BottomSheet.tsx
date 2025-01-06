import { View, Text, Button, StyleSheet } from 'react-native'
import React, { useMemo, useRef } from 'react';
import BottomSheetComponent from '@gorhom/bottom-sheet';

const BottomSheet = () => {
    const bottomSheetRef = useRef<any>(null);

    // Define snap points for the Bottom Sheet
    const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);

    // Function to open the bottom sheet
    const openBottomSheet = () => {
        bottomSheetRef.current?.expand();
    };

    return (
        <>
            <Button title="Open Bottom Sheet" onPress={openBottomSheet} />

            <BottomSheetComponent
                ref={bottomSheetRef}
                index={-1} 
                snapPoints={snapPoints}
                enablePanDownToClose={true} 
            >
                <View style={styles.contentContainer}>
                    <Text style={styles.title}>Hello from Bottom Sheet!</Text>
                    <Text style={styles.text}>
                        You can add any content here, such as lists, forms, or custom views.
                    </Text>
                </View>
            </BottomSheetComponent>
        </>
    )
}

export default BottomSheet

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        padding: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    text: {
        fontSize: 16,
        textAlign: 'center',
    },
});
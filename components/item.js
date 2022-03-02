import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

import globalStyles from '../global-styles';

const Item = ({ darkMode, setFormData, data }) => {

    const styles = StyleSheet.create({
        container: {
            backgroundColor: globalStyles.container[darkMode ? "darkMode" : "lightMode"],
            borderRadius: 10,
            padding: 10,
            marginVertical: 2,
            marginHorizontal: 10,
        },
        row: {
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        name: {
            fontSize: 23,
            fontWeight: "bold",
            color: globalStyles.title[darkMode ? "darkMode" : "lightMode"],
            marginBottom: 5,
            maxWidth: "90%",
        },
        editIcon: {
            width: 30,
            height: 30,
            resizeMode: "contain",
        },
        infoTitle: {
            fontSize: 15,
            fontWeight: 'bold',
            color: globalStyles.title[darkMode ? "darkMode" : "lightMode"],
        },
        infoValue: {
            fontSize: 15,
            color: globalStyles.text[darkMode ? "darkMode" : "lightMode"],
        }
    });

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Text style={styles.name}>{data.name}</Text>
                <TouchableOpacity onPress={() => setFormData(data)}>
                    <Image
                        source={darkMode ? require("../assets/icons/edit-dark-mode.png") : require("../assets/icons/edit-light-mode.png")}
                        style={styles.editIcon}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.row}>
                <View style={styles.quantityContainer}>
                    <Text style={styles.infoTitle}>Quantidade:</Text>
                    <Text style={styles.infoValue}>{data.quantity}</Text>
                </View>
                <View style={styles.validityContainer}>
                    <Text style={styles.infoTitle}>Validade:</Text>
                    <Text style={styles.infoValue}>{data.validity}</Text>
                </View>
            </View>
        </View>
    );
};

export default Item;
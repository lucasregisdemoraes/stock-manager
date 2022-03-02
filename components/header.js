import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

import globalStyles from '../global-styles';

const Header = ({ setDarkMode, darkMode, setOrderBy, orderBy }) => {

    const [menuVisibility, setMenuVisibility] = useState(false);

    const orderByOptions = [
        { id: "name", name: "Nome" },
        { id: "quantity", name: "Quantidade" },
        { id: "validity", name: "Validade" },
    ]

    const styles = StyleSheet.create({
        container: {
            justifyContent: "space-between",
            alignItems: "center",
            marginVertical: 10,
            flexDirection: "row",
            zIndex: 5,
        },
        emptyHeaderView: {
            width: 30,
            marginLeft: 15,
        },
        headerLogo: {
            fontSize: 40,
            fontWeight: "bold",
            color: darkMode ? "#fff" : "#000",
        },
        menuIcon: {
            marginRight: 15,
            height: 30,
            width: 30,
            resizeMode: "contain",
            opacity: menuVisibility ? 0.4 : 1,
        },
        menuContainer: {
            backgroundColor: globalStyles.container[darkMode ? "darkMode" : "lightMode"],
            display: menuVisibility ? 'flex' : 'none',
            borderRadius: 10,
            padding: 10,
            position: 'absolute',
            right: 45,
            top: 10,
            elevation: 10,
        },
        menuItem: {
            fontSize: 14.5,
            color: globalStyles.title[darkMode ? "darkMode" : "lightMode"],
            lineHeight: 23,
        },
        darkModeItem: {
            marginBottom: 5,
            fontWeight: darkMode ? "bold" : "normal",
        },
        orderOption: {
            marginLeft: 20,
        },
        orderOptionActive: {
            fontWeight: "bold",
            marginLeft: 20,
        },
    });

    return (
        <View style={styles.container}>
            <View style={styles.emptyHeaderView}></View>
            <Text style={styles.headerLogo}>stock</Text>
            <TouchableOpacity onPress={() => setMenuVisibility(menuVisibility => !menuVisibility)}>
                <Image
                    source={darkMode ? require("../assets/icons/menu-dark-mode.png") : require("../assets/icons/menu-light-mode.png")}
                    style={styles.menuIcon}
                />
            </TouchableOpacity>

            <View style={styles.menuContainer}>
                <TouchableOpacity onPress={() => {
                    setDarkMode(darkMode => !darkMode)
                    setMenuVisibility(menuVisibility => !menuVisibility)
                }}>
                    <Text style={[styles.menuItem, styles.darkModeItem]}>DarkMode</Text>
                </TouchableOpacity>
                <Text style={styles.menuItem}>Ordenar por:</Text>
                {
                    orderByOptions.map(option => {
                        return (
                            <TouchableOpacity key={option.id} onPress={() => {
                                setOrderBy(option.id)
                                setMenuVisibility(false)
                            }}>
                                <Text
                                    style={[styles.menuItem, orderBy === option.id ? styles.orderOptionActive : styles.orderOption]}>
                                    {option.name}
                                </Text>
                            </TouchableOpacity>
                        );
                    })
                }
            </View>
        </View>
    );
};

export default Header;
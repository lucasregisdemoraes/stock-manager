import React, { useEffect, useState, useRef } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Image, Keyboard } from 'react-native';

import globalStyles from '../global-styles';

const ItemsMenu = ({ darkMode, items, setList, list, setFormData, formData, orderBy }) => {

    const [searchFieldVisibility, setSearchFieldVisibility] = useState(false);

    const [searchText, setSearchText] = useState("");

    const [orderList, setOrderList] = useState(false);

    const refSearchInput = useRef()

    useEffect(() => {
        handleList(items.filter(item => (item.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ? true : false)))
        // ou

        // handleList(    
        // items.filter(item => {

        /*  verifica em cada um dos itens se o index da palavra digitada é maior que -1
            se sim quer dizer que esse item tem a palavra digitada inclusa nele */
        // if (item.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1) {

        /* retorna true para adicionar o item ao resultado do filtro */
        // return true
        // } else {

        /* retorna false para não adicionar o item ao resultado do filtro */
        // return false
        // }
        // })
        // )
    }, [searchText]);

    useEffect(() => {
        // ao fechar o modal volta a lista completa e apaga o searchText
        if (formData === "none") {
            handleList(items)
            setSearchText("")
        }
    }, [formData]);
    
    useEffect(() => {
        setOrderList(true)
    }, [orderBy]);

    useEffect(() => {
        handleList(list)
    }, [orderList, orderBy]);

    const handleList = (data) => {
        orderList ? handleOrderList(data) 
        : searchText === "" ? setList(items) 
        : setList(items.filter(item => (item.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ? true : false)))

        // ou

        // if (orderList) {
            // handleOrderList(data)
        // } else {
            // if (searchText === "") {
                // setList(items)
            // } else {
                // setList(items.filter(item => (item.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ? true : false)))
            // }
        // }
    }

    const handleOrderList = (data) => {
        // cria um novo array porque a função sort modifica o array
        let newList = [...data]

        if (orderBy === "name") {
            newList.sort((a, b) => a.name > b.name ? 1 : b.name > a.name ? -1 : 0)

            // ou
    
            // newList.sort((a, b) => {
            //   if (a.name > b.name) {
                /* se o nome a é maior que o nome b ele sobe uma posição */
            //     return 1
            //   } else {
                //     if (b.name > a.name) {
                /* se o nome b é maior que o nome a ele desce uma posição */
            //       return -1
            //     } else {
                /* senão mantém a mesma posição */
            //       return 0
            //     }
            //   }
            // })
        } else if (orderBy === "quantity") {
            // transforma a quantidade em número para não ordenar de forma errada
            newList.sort((a, b) => Number(a.quantity) > Number(b.quantity) ? 1 : Number(b.quantity) > Number(a.quantity) ? -1 : 0)
        } else if(orderBy === "validity"){
            // inverte a data de lugar para não ordernar de forma errada
            newList.sort((a, b) => {
                a = a.validity.split("/")
                b = b.validity.split("/")                
                a = Number(a[2] + a[1] + a[0])
                b = Number(b[2] + b[1] + b[0])
                return a > b ? 1 : b > a ? -1 : 0
            })
        }
        setList(newList)
    }

    const styles = StyleSheet.create({
        container: {
            backgroundColor: globalStyles.container[darkMode ? "darkMode" : "lightMode"],
            borderRadius: 10,
            padding: 10,
            justifyContent: "center",
            height: 70,
            marginBottom: 2,
            marginHorizontal: 10,
        },
        searchIcon: {
            opacity: searchText !== "" ? 0.4 : 1,
        },
        searchView: {
            flexDirection: "row",
            alignItems: "center",
            display: searchFieldVisibility ? "flex" : "none",
        },
        backArrow: {
            width: 22,
            height: 22,
            resizeMode: "contain",
            marginRight: 10,
        },
        searchInput: {
            backgroundColor: globalStyles.input[darkMode ? "darkMode" : "lightMode"],
            color: globalStyles.inputText[darkMode ? "darkMode" : "lightMode"],
            fontSize: 17,
            padding: 12,
            flex: 1,
            borderRadius: 10,
        },
        optionsView: {
            display: searchFieldVisibility ? "none" : "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: 'space-evenly',
        },
        icon: {
            width: 33,
            height: 33,
            resizeMode: "contain",
        },
        orderIcon: {
            opacity: orderList ? 0.4 : 1,
        }
    });

    return (
        <View style={styles.container}>
            {/* Search View */}
            <View style={styles.searchView}>
                <TouchableOpacity onPress={() => {
                    setSearchFieldVisibility(searchFieldVisibility => !searchFieldVisibility)
                    Keyboard.dismiss()
                }}>
                    <Image
                        style={styles.backArrow}
                        source={darkMode ? require("../assets/icons/arrow-dark-mode.png") : require("../assets/icons/arrow-light-mode.png")}
                    />
                </TouchableOpacity>
                <TextInput
                    style={styles.searchInput}
                    onChangeText={text => setSearchText(text)}
                    value={searchText}
                    placeholder={"Pesquisar"}
                    placeholderTextColor={globalStyles.inputPlaceholder[darkMode ? "darkMode" : "lightMode"]}
                    selectionColor={globalStyles.inputSelectionColor[darkMode ? "darkMode" : "lightMode"]}
                    ref={refSearchInput}
                />
            </View>

            {/* OptionsView */}
            <View style={styles.optionsView}>
                <TouchableOpacity
                    onPress={() => {
                        setSearchFieldVisibility(searchFieldVisibility => !searchFieldVisibility)
                        setSearchText("")
                        refSearchInput.current.focus()
                    }}>
                    <Image
                        style={[styles.icon, styles.searchIcon]}
                        source={darkMode ? require("../assets/icons/search-dark-mode.png") : require("../assets/icons/search-light-mode.png")}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setFormData('add')} >
                    <Image
                        style={styles.icon}
                        source={darkMode ? require("../assets/icons/add-item-dark-mode.png") : require("../assets/icons/add-item-light-mode.png")}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setOrderList(orderList => !orderList)}>
                    <Image
                        style={[styles.icon, styles.orderIcon]}
                        source={darkMode ? require("../assets/icons/order-dark-mode.png") : require("../assets/icons/order-light-mode.png")}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ItemsMenu;
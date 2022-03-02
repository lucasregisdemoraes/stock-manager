import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, TextInput, Pressable, Keyboard, Modal, Image, StyleSheet } from 'react-native';

import globalStyles from '../global-styles';

const Form = ({ darkMode, setFormData, formData, setItems, items }) => {

    const [name, setName] = formData === "add" ? useState("") : useState(formData.name)
    const [quantity, setQuantity] = useState("")
    const [validity, setValidity] = useState("")
    const [day, setDay] = useState("")
    const [month, setMonth] = useState("")
    const [year, setYear] = useState("")

    const refQuantityInput = useRef()
    const refDayInput = useRef()
    const refMonthInput = useRef()
    const refYearInput = useRef()

    const [errorModalVisibility, setErrorModalVisibility] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    const [removeConfirmationVisibility, setRemoveConfirmationVisibility] = useState(false)

    useEffect(() => {
        setValidity((day.length === 1 ? "0" + day : day) + "/" + (month.length === 1 ? "0" + month : month) + "/" + (year.length === 1 ? "200" + year : "20" + year))
        validateDate.day(day)
    }, [day, month, year])

    useEffect(() => {
        // se o valor passado na variável formData é um objeto significa que esta editando um item
        if (typeof formData === 'object') {
            setName(formData.name)
            setQuantity(formData.quantity)
            setDay(formData.validity.split("/")[0])
            setMonth(formData.validity.split("/")[1])
            setYear(formData.validity.split("/")[2].substring(2))
        }
    }, [formData]);

    const validateDate = {
        // day: (text) => Number(text) > 29 && month === "2" || Number(text) > 29 && month === "02" ? setDay("29") : Number(text) > 31 ? setDay("31") : setDay(text.replace(/\D/g, "")),
        // ou
        day: text => {
            // se o mês for Fevereiro limita até o dia 29
            if (Number(text) > 29 && month === "2" || Number(text) > 29 && month === "02") {
                setDay("29")
            } else if (Number(text) > 31) { // limita até o dia 31
                setDay("31")
            } else {
                setDay(text.replace(/\D/g, "")) // permite ser inserido somente números
            }
        },
        //  limita até o mês 12
        month: text => Number(text) > 12 ? setMonth("12") : setMonth(text.replace(/\D/g, "")),
        year: text => setYear(text.replace(/\D/g, ""))
    }

    function validateFields(index) {
        // dispara um erro para cada situação
        // a função Keyboard.dismiss() evita o erro de não abrir o teclado na próxima vez que tocar no mesmo input
        if (name === "" || name === " ") {
            Keyboard.dismiss()
            throw new Error("O campo NOME está vazio!")
        } else if (quantity === "" || quantity === " ") {
            Keyboard.dismiss()
            throw new Error("O campo QUANTIDADE está vazio!")
        } else if (day === "" || day === " ") {
            Keyboard.dismiss()
            throw new Error("O campo DIA está vazio!")
        } else if (month === "" || month === " ") {
            Keyboard.dismiss()
            throw new Error("O campo MÊS está vazio!")
        } else if (year === "" || year === " ") {
            Keyboard.dismiss()
            throw new Error("O campo ANO está vazio!")
        } else if (day === "0" || day === "00") {
            Keyboard.dismiss()
            throw new Error("Insira um DIA válido!")
        } else if (month === "0" || month === "00") {
            Keyboard.dismiss()
            throw new Error("Insira um Mês válido!")
        } else if (repeatedItem(index)) {
            Keyboard.dismiss()
            throw new Error("item já existente em sua lista!")
        }
    }

    function repeatedItem(index) {
        let alreadyHasThisItem = false
        // ̣pesquisa em cada item por um nome igual ao inserido
        items.forEach(item => {
            if (item.name === name) {
                alreadyHasThisItem = true
            }
        });

        /*
            se o index é diferente de "" significa que esta editando um item
            e se o nome do item que esta editando é igual o nome que foi inserido
            define a variável alreadyHasThisItem como false 
        */
        if (index !== "" && items[index].name === name) {
            alreadyHasThisItem = false
        }
        return alreadyHasThisItem
    }

    function addItem() {
        try {
            // valida os campos
            validateFields("")
        } catch (error) {
            // se tiver algum erro mostra a mensagem dele com a função showError
            showError(error.message)
            // e retorna para parar de executar nessa função
            return
        }
        // define o state items como todos os itens anteriores mais o atual
        setItems([...items, {
            name,
            quantity,
            validity
        }])
        closeForm()
    }

    function editItem(index) {
        try {
            /*
                passa o index do item que está editando para poder fazer a validação(verificar 
                se o nome do item que esta sendo editado é o mesmo que o inserido 
                e as outras validações)
            */
            validateFields(index)
        } catch (error) {
            // se tiver algum erro mostra a mensagem dele com a função showError
            showError(error.message)
            // e retorna para parar de executar nessa função
            return
        }
        // no state items define o item que esta sendo editado com as novas informaçẽs colocadas no formulário
        items[index] = {
            name: name !== "" ? name : items[index].name,
            quantity: quantity !== "" ? quantity : items[index].quantity,
            validity: validity !== "" ? validity : items[index].validity
        }
        closeForm()
    }

    function removeItem(index) {
        // remove o item posicionado no index selecionado do state items
        items.splice(index, 1)
        setRemoveConfirmationVisibility(false)
        closeForm()
    }

    function closeForm() {
        Keyboard.dismiss()
        setFormData('none') // fecha o modal
        setName("")
        setQuantity("")
        setValidity("")
        setDay("")
        setMonth("")
        setYear("")
    }

    function showError(error) {
        // define a mensagem do erro conforme o erro disparado
        setErrorMessage(error)
        // abre o modal de erros
        setErrorModalVisibility(true)
    }

    const styles = StyleSheet.create({
        background: {
            flex: 1,
            justifyContent: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
        container: {
            backgroundColor: globalStyles.container[darkMode ? "darkMode" : "lightMode"],
            padding: 10,
            borderRadius: 10,
            width: '90%',
            alignSelf: 'center',
            elevation: 10,
        },
        header: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
        },
        title: {
            fontSize: 19,
            lineHeight: 19,
            color: globalStyles.title[darkMode ? "darkMode" : "lightMode"],
            width: "90%",
            fontWeight: "bold",
        },
        removeIcon: {
            width: 27,
            height: 27,
            resizeMode: "contain",
        },
        input: {
            backgroundColor: globalStyles.input[darkMode ? "darkMode" : "lightMode"],
            color: globalStyles.inputText[darkMode ? "darkMode" : "lightMode"],
            borderRadius: 10,
            fontSize: 17,
            marginTop: 5,
            padding: 12,
        },
        quantityView: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
        },
        quantityButton: {
            width: 40,
            marginHorizontal: 10,
            alignItems: "center",
        },
        quantityButtonText: {
            color: globalStyles.inputText[darkMode ? "darkMode" : "lightMode"],
            fontSize: 40,
        },
        validityView: {
            flexDirection: "row",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
        },
        validityField: {
            width: "19%",
        },
        validitySeparator: {
            color: globalStyles.inputText[darkMode ? "darkMode" : "lightMode"],
            fontSize: 22,
            marginHorizontal: 5,
        },
        buttonContainer: {
            width: "100%",
            height: 50,
            borderRadius: 25,
            marginTop: 5,
            justifyContent: "center",
            alignItems: "center",
        },
        greenButton: {
            backgroundColor: globalStyles.greenButton[darkMode ? "darkMode" : "lightMode"],
        },
        redButton: {
            backgroundColor: globalStyles.redButton[darkMode ? "darkMode" : "lightMode"],
        },
        buttonText: {
            color: globalStyles.buttonText[darkMode ? "darkMode" : "lightMode"],
            fontSize: 23,
            fontWeight: "bold",
        },
        messageView: {
            marginTop: 5,
            marginBottom: 15,
        },
        messageText: {
            color: globalStyles.title[darkMode ? "darkMode" : "lightMode"],
            fontSize: 18,
            textAlign: "center",
            display: "flex",
        },
        itemName: {
            fontWeight: "bold",
            marginVertical: 5,
            fontSize: 22,
        }
    });

    return (
        // Main Modal
        <Modal
            visible={formData === "none" ? false : true}
            animationType='fade'
            transparent={true}
        >
            <View style={styles.background}>
                <KeyboardAvoidingView style={styles.container}>
                    {
                        formData === "add" ?
                            <View style={styles.header}>
                                <Text style={styles.title}>Adicionar item</Text>
                            </View>
                            :
                            <View style={styles.header}>
                                <Text style={styles.title}>{"Editar " + formData.name}</Text>
                                <TouchableOpacity onPress={() => setRemoveConfirmationVisibility(true)}>
                                    <Image
                                        style={styles.removeIcon}
                                        source={darkMode ? require("../assets/icons/remove-dark-mode.png") : require("../assets/icons/remove-light-mode.png")}
                                    />
                                </TouchableOpacity>
                            </View>
                    }
                    <TextInput
                        style={styles.input}
                        onChangeText={text => setName(text)}
                        value={name}
                        maxLength={30}
                        placeholder={"Nome do produto"}
                        placeholderTextColor={globalStyles.inputPlaceholder[darkMode ? "darkMode" : "lightMode"]}
                        selectionColor={globalStyles.inputSelectionColor[darkMode ? "darkMode" : "lightMode"]}
                        onSubmitEditing={() => refQuantityInput.current.focus()}
                        blurOnSubmit={false}
                    />
                    <View style={styles.quantityView}>
                        <TouchableOpacity
                            style={styles.quantityButton}
                            onPress={() => setQuantity(Number(quantity) - 1)}
                        >
                            <Text style={styles.quantityButtonText}>-</Text>
                        </TouchableOpacity>
                        <TextInput
                            style={[styles.input, styles.quantityInput]}
                            onChangeText={text => setQuantity(text)}
                            keyboardType={'numeric'}
                            value={String(quantity)}
                            maxLength={4}
                            placeholder={"Quantidade"}
                            placeholderTextColor={globalStyles.inputPlaceholder[darkMode ? "darkMode" : "lightMode"]}
                            selectionColor={globalStyles.inputSelectionColor[darkMode ? "darkMode" : "lightMode"]}
                            ref={refQuantityInput}
                            onSubmitEditing={() => refDayInput.current.focus()}
                            blurOnSubmit={false}
                        />
                        <TouchableOpacity
                            style={styles.quantityButton}
                            onPress={() => setQuantity(Number(quantity) + 1)}
                        >
                            <Text style={styles.quantityButtonText}>+</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.validityView}>
                        <TextInput
                            style={[styles.input, styles.validityField]}
                            onChangeText={text => {
                                validateDate.day(text)
                                if (text.length === 2) refMonthInput.current.focus()
                            }}
                            value={String(day)}
                            maxLength={2}
                            keyboardType={'numeric'}
                            placeholder={"Dia"}
                            placeholderTextColor={globalStyles.inputPlaceholder[darkMode ? "darkMode" : "lightMode"]}
                            selectionColor={globalStyles.inputSelectionColor[darkMode ? "darkMode" : "lightMode"]}
                            ref={refDayInput}
                            onSubmitEditing={() => refMonthInput.current.focus()}
                            blurOnSubmit={false}
                        />
                        <Text style={styles.validitySeparator}>/</Text>
                        <TextInput
                            style={[styles.input, styles.validityField]}
                            onChangeText={text => {
                                validateDate.month(text)
                                if (text.length === 2) refYearInput.current.focus()
                            }}
                            value={String(month)}
                            maxLength={2}
                            keyboardType={'numeric'}
                            placeholder={"Mês"}
                            placeholderTextColor={globalStyles.inputPlaceholder[darkMode ? "darkMode" : "lightMode"]}
                            selectionColor={globalStyles.inputSelectionColor[darkMode ? "darkMode" : "lightMode"]}
                            ref={refMonthInput}
                            onSubmitEditing={() => refYearInput.current.focus()}
                            blurOnSubmit={false}
                        />
                        <Text style={styles.validitySeparator}>/</Text>
                        <TextInput
                            style={[styles.input, styles.validityField]}
                            onChangeText={text => {
                                validateDate.year(text)
                                if (text.length === 2) Keyboard.dismiss()
                            }}
                            value={String(year)}
                            maxLength={2}
                            keyboardType={'numeric'}
                            placeholder={"Ano"}
                            placeholderTextColor={globalStyles.inputPlaceholder[darkMode ? "darkMode" : "lightMode"]}
                            selectionColor={globalStyles.inputSelectionColor[darkMode ? "darkMode" : "lightMode"]}
                            ref={refYearInput}
                        />
                    </View>
                    <View style={styles.buttonsView}>
                        <Pressable
                            style={[styles.buttonContainer, styles.greenButton]}
                            onPress={() => formData === 'add' ? addItem() : editItem(items.indexOf(formData))}
                        >
                            <Text style={styles.buttonText}>Confirmar</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.buttonContainer, styles.redButton]}
                            onPress={() => closeForm()}
                        >
                            <Text style={styles.buttonText}>Cancelar</Text>
                        </Pressable>
                    </View>

                    {/* Error Modal */}
                    <Modal
                        visible={errorModalVisibility ? true : false}
                        animationType='fade'
                        transparent={true}
                    >
                        <View style={styles.background}>
                            <View style={styles.container}>
                                <View style={styles.messageView}>
                                    <Text style={styles.messageText}>{errorMessage}</Text>
                                </View>
                                <Pressable
                                    style={[styles.buttonContainer, styles.greenButton]}
                                    onPress={() => setErrorModalVisibility(false)}
                                >
                                    <Text style={styles.buttonText}>OK</Text>
                                </Pressable>
                            </View>
                        </View>
                    </Modal>

                    {/* Remove Confirmation Modal */}
                    <Modal
                        visible={removeConfirmationVisibility ? true : false}
                        animationType='fade'
                        transparent={true}
                    >
                        <View style={styles.background}>
                            <View style={styles.container}>
                                <View style={styles.messageView}>
                                    <Text style={styles.messageText}>Você deseja remover </Text>
                                    <Text style={[styles.messageText, styles.itemName]}>{'" ' + name + ' "'}</Text>
                                    <Text style={styles.messageText}> da sua lista?</Text>
                                </View>
                                <Pressable
                                    style={[styles.buttonContainer, styles.greenButton]}
                                    onPress={() => removeItem(items.indexOf(formData))}
                                >
                                    <Text style={styles.buttonText}>Sim</Text>
                                </Pressable>
                                <Pressable
                                    style={[styles.buttonContainer, styles.redButton]}
                                    onPress={() => setRemoveConfirmationVisibility(false)}
                                >
                                    <Text style={styles.buttonText}>Não</Text>
                                </Pressable>
                            </View>
                        </View>
                    </Modal>
                </KeyboardAvoidingView>
            </View>
        </Modal>
    );
};

export default Form;
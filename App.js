import React, { useState } from 'react';
import { View, FlatList, StyleSheet, SafeAreaView } from 'react-native';

import Item from './components/item';
import Header from './components/header';
import ItemsMenu from './components/itemsMenu';
import Form from './components/form';

const App = () => {
  const [darkMode, setDarkMode] = useState(true);

  const [items, setItems] = useState([]);

  const [list, setList] = useState([]);

  const [formData, setFormData] = useState('none');

  const [orderBy, setOrderBy] = useState("name");

  const styles = StyleSheet.create({
    container: {
      backgroundColor: darkMode ? "#444" : "#ccc",
      flex: 1,
    },
    itemsContainer: {
      flex: 1,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <Header
        setDarkMode={setDarkMode} darkMode={darkMode}
        setOrderBy={setOrderBy} orderBy={orderBy}
      />

      <ItemsMenu
        darkMode={darkMode}
        items={items}
        setList={setList} list={list}
        setFormData={setFormData} formData={formData}
        orderBy={orderBy}
      />

      <View style={styles.itemsContainer}>
        <FlatList
          contentContainerStyle={{ paddingBottom: 10 }}
          data={list}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <Item
              darkMode={darkMode}
              setFormData={setFormData}
              data={item}
            />
          )}
        />
      </View>

      <Form
        darkMode={darkMode}
        setFormData={setFormData} formData={formData}
        setItems={setItems} items={items}
      />
    </SafeAreaView>
  );
};

export default App;
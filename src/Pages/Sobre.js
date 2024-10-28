import React, { useDebugValue, useEffect, useState } from "react";
import { View, Image, Text, StyleSheet, Button, ScrollView, Alert } from "react-native";
import axios from 'axios';

export default function () {
  const [contatos, setContatos] = useState([]);

  //função para buscar contatos
  const listContatos = () => {
    axios
      .get("http://10.0.2.2:3000/contatos") //android tem bloqueio com localhost, por isso colocamos o ip do localhost
      .then((resposta) => {
        setContatos(resposta.data)
      })
      .catch((error) => {
        console.error("Erro ao buscar contatos", error)
      })
  }

  //Função para exlcuir um contato
  const deleteContato = (id) => {
    axios
    .delete(`http://10.0.2.2:3000/contatos/${id}`)
    .then(() => {
      // Atuazlizar a lista de contato
      setContatos(contatos.filter((contato) => contato.id !== id));
      Alert.alert("Sucesso, contato excluido com sucesso!");
    })
    .catch((error) => {
      console.error("Erro ao excluir", error);
      Alert.alert("Erro, não foi possível excluir");
    });
  }

  // Função para editar o contato
  // const editarContato = (id) => {

  // }

  useEffect(() => {
    listContatos();
  }, [])

  return (
    <ScrollView>
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Contatos</Text>
      {contatos.length > 0 ? (
        contatos.map((contato, index) => (
          <View key={index} style={styles.contatoItem}>
            <Text>{contato.nome}</Text>
            <Text>{contato.telefone}</Text>
            <Button 
            title="Excluir" 
            color="black"
            onPress={() => deleteContato(contato.id)}
            />
          </View>
        ))
      ) : (
        <Text style={styles.noContacts}>Nenhum contato disponivel</Text>
      )}
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10
  },
  contatoItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc"
  },
  noContacts: {
    fontSize: 16,
    color: "gray",
    textAlign: "center",
    marginTop: 20
  }
})
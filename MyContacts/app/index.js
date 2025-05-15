import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  Modal,
  TextInput,
  FlatList,
  StyleSheet,
} from "react-native";
import { Dialog, Button } from "react-native-paper";

export default function HomeScreen() {
  // Estado dos contatos
  const [contacts, setContacts] = useState([
    { name: "Jéssica Prestelo", phone: "1234", category: "pessoal" },
    { name: "Alexandra Aversani", phone: "5678", category: "trabalho" },
    { name: "Jéssica Prestelo", phone: "5678", category: "família" },
  ]);

  // Estados para o modal de edição
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [category, setCategory] = useState("pessoal");
  const [editIndex, setEditIndex] = useState(null);

  // Estado para o dialog de exclusão
  const [deleteId, setDeleteId] = useState(null);

  // Função para adicionar ou editar contato
  const addOrEditContact = () => {
    if (!name.trim() || !phone.trim()) return;

    const newContact = { name: name.trim(), phone: phone.trim(), category };

    if (editIndex !== null) {
      // Editar contato existente
      setContacts(prevContacts =>
        prevContacts.map((contact, index) =>
          index === editIndex ? newContact : contact
        )
      );
    } else {
      // Adicionar novo contato
      setContacts(prevContacts => [...prevContacts, newContact]);
    }

    resetForm();
  };

  // Função para excluir contato
  const handleDelete = (id) => {
    setContacts(prevContacts => 
      prevContacts.filter((_, index) => index !== id)
    );
    setDeleteId(null);
  };

  // Abrir modal de edição
  const openEditModal = (index) => {
    const contact = contacts[index];
    setName(contact.name);
    setPhone(contact.phone);
    setCategory(contact.category);
    setEditIndex(index);
    setModalVisible(true);
  };

  // Limpar formulário
  const resetForm = () => {
    setName("");
    setPhone("");
    setCategory("pessoal");
    setEditIndex(null);
    setModalVisible(false);
  };

  // Obter emoji para a categoria
  const getCategoryEmoji = (cat) => {
    switch (cat) {
      case "trabalho": return "💼";
      case "família": return "👨‍👩‍👧‍👦";
      default: return "👤";
    }
  };

  return (
    <View style={styles.container}>
      {/* Botão para adicionar novo contato */}
      <Pressable
        onPress={() => setModalVisible(true)}
        style={styles.addButton}
      >
        <Text style={styles.addButtonText}>＋ Novo Contato</Text>
      </Pressable>

      {/* Lista de contatos */}
      <FlatList
        data={contacts}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.contactItem}>
            <View style={styles.contactInfo}>
              <Text style={styles.contactName}>
                {getCategoryEmoji(item.category)} {item.name}
              </Text>
              <Text style={styles.contactPhone}>{item.phone}</Text>
            </View>
            <View style={styles.contactActions}>
              <Pressable
                onPress={() => openEditModal(index)}
                style={[styles.actionButton, styles.editButton]}
              >
                <Text style={styles.actionButtonText}>✏️ Editar</Text>
              </Pressable>
              <Pressable
                onPress={() => setDeleteId(index)}
                style={[styles.actionButton, styles.deleteButton]}
              >
                <Text style={styles.actionButtonText}>🗑️ Excluir</Text>
              </Pressable>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhum contato cadastrado</Text>
        }
      />

      {/* Modal para adicionar/editar contatos */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={resetForm}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {editIndex !== null ? "Editar Contato" : "Novo Contato"}
            </Text>
            
            <TextInput
              placeholder="Nome"
              value={name}
              onChangeText={setName}
              style={styles.input}
            />
            
            <TextInput
              placeholder="Telefone"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              style={styles.input}
            />
            
            <TextInput
              placeholder="Categoria (pessoal, trabalho, família)"
              value={category}
              onChangeText={setCategory}
              style={styles.input}
            />

            <View style={styles.modalButtons}>
              <Pressable 
                onPress={resetForm}
                style={[styles.modalButton, styles.cancelButton]}
              >
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </Pressable>
              <Pressable 
                onPress={addOrEditContact}
                style={[styles.modalButton, styles.saveButton]}
              >
                <Text style={styles.modalButtonText}>
                  {editIndex !== null ? "Salvar" : "Adicionar"}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* Dialog de confirmação de exclusão */}
      <Dialog visible={deleteId !== null} onDismiss={() => setDeleteId(null)}>
        <Dialog.Title>Confirmar exclusão</Dialog.Title>
        <Dialog.Content>
          <Text>
            Tem certeza que deseja excluir o contato "{contacts[deleteId]?.name}"?
          </Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => setDeleteId(null)}>Cancelar</Button>
          <Button 
            textColor="#FF3B30" 
            onPress={() => handleDelete(deleteId)}
          >
            Excluir
          </Button>
        </Dialog.Actions>
      </Dialog>
    </View>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  addButton: {
    backgroundColor: '#e30613',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  contactItem: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  contactPhone: {
    fontSize: 14,
    color: '#666',
  },
  contactActions: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: 8,
    borderRadius: 4,
    marginLeft: 8,
  },
  editButton: {
    backgroundColor: '#ffc107',
  },
  deleteButton: {
    backgroundColor: '#f44336',
  },
  actionButtonText: {
    color: 'white',
    fontSize: 14,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 32,
    fontSize: 16,
    color: '#888',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  cancelButton: {
    backgroundColor: '#ccc',
  },
  saveButton: {
    backgroundColor: '#e30613',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
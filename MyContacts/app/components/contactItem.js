
import { View, StyleSheet } from 'react-native';
import { List, Avatar, IconButton } from 'react-native-paper';

export default function ContactItem({ contact, onEdit, onDelete }) {
  const getAvatarColor = () => {
    switch (contact.category) {
      case 'trabalho':
        return '#6200ee';
      case 'família':
        return '#03dac6';
      default:
        return '#ff5722';
    }
  };

  return (
    <List.Item
      title={contact.name}
      description={contact.phone}
      left={() => (
        <Avatar.Text 
          size={48} 
          label={contact.name.charAt(0).toUpperCase()} 
          style={{ backgroundColor: getAvatarColor() }} 
        />
      )}
      right={() => (
        <View style={styles.actions}>
          <IconButton icon="pencil" onPress={onEdit} />
          <IconButton icon="delete" onPress={onDelete} />
        </View>
      )}
      style={styles.item}
    />
  );
}

const styles = StyleSheet.create({
  item: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
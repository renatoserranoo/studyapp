import { View, Text, Button, TextInput, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import StudyCardsContext from '../contexts/StudyCardsContext'
import { Picker } from '@react-native-picker/picker'
import DateTimePickerModal from 'react-native-modal-datetime-picker'

const CardEditScreen = ({ route, navigation }) => {

    const { id } = route.params || {}
    const { cards, createCard, updateCard } = useContext(StudyCardsContext)
    const card = cards.find(c => c.id === id) || {}

    const [title, setTitle] = useState(card.title || '')
    const [notes, setNotes] = useState(card.notes || '')
    const [status, setStatus] = useState(card.status || 'backlog')
    const [dueDate, setDueDate] = useState(card.
      dueDate ? new Date(card.dueDate) : new Date())
    const [isDatePickerVisible, setDatePickerVisible] = useState(false)

    useEffect(() => {
      if(id) {
        setTitle(card.title)
        setStatus(card.status)
        setNotes(card.notes)
        setDueDate(new Date(card.dueDate))
      }
    }, [id, card])

    const handleSave = () => {
      const cardData = { title, notes, status, dueDate: dueDate.toISOString() }

      if(id){
        updateCard(id, cardData)
      }else{
        createCard(cardData)
      }

      navigation.goBack()
    }

    const showDatePicker = () => {
      setDatePickerVisible(true)
    }

    const hideDatePicker = () => {
      setDatePickerVisible(false)
    }

    const handleConfirm = (date) => {
      setDueDate(date)
      hideDatePicker()
    }

    const formatDate = (date) => {
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
          <Text style={styles.label}>Título:</Text>
          <TextInput
              style={styles.input}
              value={title}
              onChangeText={setTitle}
              placeholder="Título do Card..."
              placeholderTextColor="gray"
          />
          <Text style={styles.label}>Notas:</Text>
          <TextInput
              style={styles.input}
              value={notes}
              onChangeText={setNotes}
              placeholder="Insira uma descrição..."
              placeholderTextColor="gray"
              multiline
          />
          <Text style={styles.label}>Data/Hora de 
          Término:</Text>
          <Text style={styles.selectedDateLabel}>
            Data Selecionada:{formatDate(dueDate)}
          </Text>
          <Button title='Escolher Data' onPress={showDatePicker} color={'#32cd32'}/>
          <DateTimePickerModal 
              isVisible={isDatePickerVisible}
              mode='datetime'
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
              textColor='black'
          />
          <Text style={styles.label}>Status:</Text>
          <Picker
              selectedValue={status}
              style={styles.input}
              itemStyle={styles.pickerItem}
              onValueChange={(itemValue, itemIndex) => setStatus(itemValue)}
              placeholderTextColor="gray">  
              <Picker.Item label="Backlog" value="backlog" />
              <Picker.Item label="Concluído" value="done" />
              <Picker.Item label="Em Progresso" value="in_progress" />
          </Picker>
          <Button title="Save" onPress={handleSave} color="#32cd32" />
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      paddingTop: 30,
      padding: 20,
      backgroundColor: '#000000',
  },
  label: {
      fontSize: 26,
      fontWeight: '700',
      marginBottom: 10,
      color: '#ffffff',
      alignItems: 'center',
      justifyContent: 'center'
  },
  selectedDateLabel: {
    fontSize: 16,
    marginBottom: 15,
    color: '#555555',
  },
  input: {
      backgroundColor: '#333333',
      color:'#ffffff',
      fontSize: 15,
      padding: 13,
      marginBottom: 30,
      borderRadius: 20,
      width: '100%',
  },
  pickerItem: {
    backgroundColor: '#333333',
    borderRadius: 20,
    fontSize: 24,
    fontWeight: '400',
    marginBottom: 10,
    color: 'gray'
  }
});

export default CardEditScreen
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import StudyCardsContext from '../contexts/StudyCardsContext'

const CardListScreen = ({ navigation }) => {

    const { cards, deleteCard } = useContext(StudyCardsContext)

    // filtrar cards por status
    const inProgressCards = cards.filter(card => card.status === 'in_progress')
    const concludedCards = cards.filter(card => card.status === 'done')
    const backlogCards = cards.filter(card => card.status === 'backlog')

    const today = new Date()
    const dueSoonCards = cards.filter(card => {
      const dueDate = new Date(card.dueDate)
      const diffInDays = (dueDate - today) / (1000 * 60 * 60 * 24)
      return diffInDays >= 0 && diffInDays <= 15
    })

    const renderCard = ({ item }) => (
      <View style={styles.card}> 
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={{ color: '#ffffff', marginBottom: 4 }}>{item.notes}</Text>
        <Text style={{ color: '#ffffff', marginBottom: 4 }}>Data/Hora de Término: {new Date(item.dueDate).toLocaleDateString()}</Text>
        <View style={styles.buttons}>
          <Button title='Editar' onPress={() => navigation.navigate('CardEdit', { id: item.id })}/>
          <Button title='Deletar' onPress={() => deleteCard (item.id)}
          color={'#ff6347'}/>
        </View>
      </View>
    )

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.dueSoonButton} onPress={() => navigation.navigate('TasksDueSoon')}>
        <Text style= {styles.dueSoonButtonText}>Tasks a Vencer: {dueSoonCards.length}</Text>
      </TouchableOpacity>
      <Text style= {styles.sectionTitle}>Em progresso</Text>
      <FlatList
        data={inProgressCards}
        keyExtractor={item => item.id.toString()}
        renderItem={renderCard}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
      <View style={styles.divider}/>

      <Text style= {styles.sectionTitle}>Backlog</Text>
      <FlatList
        data={backlogCards}
        keyExtractor={item => item.id.toString()}
        renderItem={renderCard}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
      <View style={styles.divider}/>

      <Text style= {styles.sectionTitle}>Concluído</Text>
      <FlatList
        data={concludedCards}
        keyExtractor={item => item.id}
        renderItem={renderCard}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
      
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('CardEdit')}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      padding: 10,
      backgroundColor: '#000000',
  },
  card: {
      backgroundColor: '#1b1b1b',
      padding: 20,
      margin: 8,
      borderRadius: 20,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 3,
      minWidth: 200,
  },
  dueSoonButton: {
      backgroundColor: '#ff6347',
      padding: 10,
      borderRadius: 15,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
    },
  dueSoonButtonText: {
      color: '#ffffff',
      fontSize: 16,
      fontWeight: 'bold',
  },
  cardTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#ffffff',
      marginBottom: 5
  },
  buttons: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 10,
  },
  addButton: {
      backgroundColor: '#ffc200',
      zIndex: 99,
      display: 'flex',
      position: 'absolute',
      right: 35,
      bottom: 50,
      width: 60,
      height: 60,
      borderRadius: 50,
      justifyContent: 'center',
      alignItems: 'center',
  },
  addButtonText: {
      fontSize: 30,
      height: 43,
      fontWeight: '400',
  },
  sectionTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      marginTop: 10,
      marginBottom: 10,
      marginLeft: 10,
      color: '#ffffff',
  },
  divider: {
      borderBottomColor: '#333333',
      borderBottomWidth: 1,
      marginVertical: 5,
  }
});

export default CardListScreen
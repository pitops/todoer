import React, { useState, useContext } from 'react'
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet
} from 'react-native'

import { AntDesign } from '@expo/vector-icons'

import { TodosContext } from '../Context'
import AsyncStorage from '../AsyncStorage'

export default function AddTodo () {
  const [todo, setTodo] = useState()
  const { state, dispatch } = useContext(TodosContext)

  const addTodo = _ => {
    if (!todo) return

    dispatch(state, {
      type: 'ADD_TODO',
      payload: { text: todo, createdAt: Date.now(), isComplete: false }
    })
    setTodo()
  }

  return (
    <View style={styles.root}>
      <TextInput
        style={styles.input}
        placeholder='What would like to do?'
        value={todo}
        onChangeText={todo => setTodo(todo)}
      />
      <TouchableOpacity style={styles.button} onPress={addTodo}>
        <AntDesign name='pluscircleo' size={32} color='#0066CC' />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  input: {
    flex: 1,
    padding: 10,
    color: '#0066CC',
    borderWidth: 1,
    borderColor: '#CCCCCC'
  },
  button: {
    marginLeft: 10
  }
})

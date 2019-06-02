import React, { useState, useEffect, useContext } from 'react'
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from 'react-native'

import { AntDesign } from '@expo/vector-icons'

import { TodosContext } from '../Context'

import AsyncStorage from '../AsyncStorage'

import TodoItem from './TodoItem'

export default function TodosList () {
  const { state, dispatch } = useContext(TodosContext)

  useEffect(() => {
    readOrInitFromStorage()
  }, [])

  const readOrInitFromStorage = async () => {
    const todos = await AsyncStorage.getItem('todos', true)
    dispatch(state, { type: 'INIT_TODOS', payload: todos })
  }

  return (
    <View style={styles.root}>
      <Text style={styles.heading}>Todos:</Text>
      <ScrollView contentContainerStyle={styles.innerContainer}>
        <View style={{ flex: 1 }}>
          {state.todos.map((todo, index) => (
            <TodoItem key={todo.createdAt} todo={todo} index={index} />
          ))}
          {!state.todos.length && <Text>No todos - good job, right? </Text>}
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    padding: 20,
    flex: 1
  },
  heading: {
    fontSize: 24
  },
  innerContainer: {
    paddingTop: 20,
    flexGrow: 1
  }
})

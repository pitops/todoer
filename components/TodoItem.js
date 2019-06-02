import React, { useContext } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons'

import { TodosContext } from '../Context'

export default function TodoItem ({ todo, index }) {
  const { state, dispatch } = useContext(TodosContext)

  return (
    <View
      style={[
        styles.root,
        { backgroundColor: index % 2 === 0 ? 'white' : '#EFEFEF' }
      ]}
    >
      {todo.isComplete && (
        <AntDesign
          style={styles.check}
          name='checkcircleo'
          size={24}
          color='green'
        />
      )}
      <TouchableOpacity
        style={styles.text}
        onPress={_ =>
          dispatch(state, { type: 'TOGGLE_TODO', payload: todo.createdAt })
        }
      >
        <Text
          style={{
            textDecorationLine: todo.isComplete ? 'line-through' : null
          }}
        >
          {todo.text}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={_ =>
          dispatch(state, { type: 'DELETE_TODO', payload: todo.createdAt })
        }
      >
        <AntDesign name='delete' size={24} color='red' />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10
  },
  text: {
    flex: 1
  },
  check: {
    marginRight: 10
  }
})

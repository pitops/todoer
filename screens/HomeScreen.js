import React from 'react'
import { View, Text } from 'react-native'

import AddTodo from 'components/AddTodo'
import TodosList from 'components/TodosList'

export default function HomeScreen () {
  return (
    <View style={{ flex: 1 }}>
      <AddTodo />
      <TodosList />
    </View>
  )
}

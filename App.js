import React, { useEffect, useContext } from 'react'
import { StyleSheet, Text, SafeAreaView } from 'react-native'
import HomeScreen from 'screens/HomeScreen'
import { TodosProvider, TodosContext } from './Context'
import AsyncStorage from './AsyncStorage'

export default () => {
  return (
    <TodosProvider>
      <SafeAreaView style={styles.container}>
        <HomeScreen />
      </SafeAreaView>
    </TodosProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
})

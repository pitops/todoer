import { AsyncStorage } from 'react-native'

const setItem = async (key, value) => {
  try {
    return await AsyncStorage.setItem(`@todoer: ${key}`, JSON.stringify(value))
  } catch (err) {
    console.log(err)
  }
}

const mergeItem = async (key, value) => {
  try {
    const Item = await getItem(key)

    if (Array.isArray(Item)) {
      Item.push(value)
    }
    return await AsyncStorage.setItem(`@todoer: ${key}`, JSON.stringify(Item))
  } catch (err) {
    console.log(err)
  }
}

const getItem = async (key, init = false, initValue = []) => {
  try {
    const item = await AsyncStorage.getItem(`@todoer: ${key}`)

    if (!item && init) {
      await AsyncStorage.setItem(`@todoer: ${key}`, JSON.stringify(initValue))

      return initValue
    }

    return JSON.parse(item)
  } catch (err) {
    console.log(error)
  }
}

const clear = () => AsyncStorage.clear()

export default {
  setItem,
  mergeItem,
  getItem,
  clear
}

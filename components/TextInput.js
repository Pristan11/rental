import React from 'react'
import { View, StyleSheet, Text, TextInput as Input  } from 'react-native'

export default function TextInput({ errorText, description, ...props }) {
  return (
    <View style={styles.container}>
      <Input
          placeholder={props.placeholder}
        style={styles.input}
        selectionColor={'blue'}
        underlineColor="transparent"
        mode="outlined"
        {...props}
          placeholderTextColor='red'
      />
      {description && !errorText ? (
        <Text style={styles.description}>{description}</Text>
      ) : null}
      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 12,
  },
  input: {
    backgroundColor: 'white',
    paddingVertical: 10,
    borderRadius: 15,
    paddingHorizontal: 25
  },
  description: {
    fontSize: 13,
    color: 'blue',
    paddingTop: 8,
  },
  error: {
    fontSize: 13,
    color: 'red',
    paddingTop: 8,
  },
})

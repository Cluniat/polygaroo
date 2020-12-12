import Colors from 'App/Theme/Colors'
import { medium, normal } from './Metrics'

/**
 * This file defines the base application styles.
 *
 * Use it to define generic component styles (e.g. the default text styles, default button styles...).
 */

export default {
  screen: {
    container: {
      flex: 1,
    },
    primaryContainer: {
      padding: 30,
      backgroundColor: Colors.primary,
    },
    blackContainer: {
      backgroundColor: Colors.accent,
    },
  },
  inputContainer: {
    backgroundColor: Colors.accent,
    borderRadius: 20,
    height: 40,
    paddingLeft: 10,
    paddingRight: 10,
    width: '100%',
    marginVertical: 10,
  },
  input: {
    color: Colors.text,
  },
  inputContainerError: {
    backgroundColor: Colors.accent,
    borderColor: Colors.error,
    borderWidth: 2,
    borderRadius: 20,
    height: 40,
    paddingLeft: 10,
    paddingRight: 10,
    width: '100%',
    marginVertical: 10,
  },
  inputError: {
    color: Colors.text,
  },
  inputErrorMsg: {
    fontSize: 10,
    color: Colors.error,
    textAlign: 'left',
    paddingLeft: 20,
    marginTop: -10,
  },
  touchable: {
    borderRadius: 10,
    padding: 10,
    margin: 10,
    primary: {
      backgroundColor: Colors.primary,
    },
    secondary: {
      backgroundColor: Colors.secondary,
    },
    accent: {
      backgroundColor: Colors.accent,
    },
  },
  touchableText: {
    fontWeight: 'bold',
    color: Colors.text,
    minWidth: 15,
  },
  datePicker: {
    dateInput: {
      backgroundColor: Colors.accent,
      borderRadius: 20,
      height: 40,
      paddingLeft: 10,
      paddingRight: 10,
      width: '100%',
      borderColor: Colors.accent,
      alignItems: 'flex-start',
      marginVertical: 10,
    },
    placeholderText: {
      color: Colors.primary,
    },
    dateText: {
      color: Colors.text,
    },
  },
  title1: {
    fontSize: medium,
    color: Colors.text,
  },
  title2: {
    fontSize: normal,
    color: Colors.text,
  },
  titleAccent: {
    fontSize: medium,
    color: Colors.secondary,
  },
  line: {
    width: '90%',
    borderWidth: 0.5,
    borderColor: Colors.primary,
    margin: 10,
  },
  highlightText: {
    fontWeight: 'bold',
    color: Colors.primary,
  },
  logoContainer: {
    width: '100%',
    height: 150,
    marginBottom: 10,
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  modalContent: {
    backgroundColor: Colors.primary,
    width: '90%',
    padding: 10,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',

    title: {
      fontSize: medium,
      color: Colors.secondary,
      textAlign: 'center',
    },
    body: {
      fontSize: normal,
      color: Colors.text,
      textAlign: 'center',
    },
  },
}

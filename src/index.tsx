import * as React from 'react'
import styles from './styles.module.css'
import SQLite from "react-native-sqlite-storage";

interface Props {
  text: string
}

export const InitialComponent = ({ text }: Props) => {
  return <div className={styles.test}>Example Component: {text}</div>
}

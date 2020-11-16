import * as React from 'react'
import styles from './styles.module.css'
import SQLite from "react-native-sqlite-storage";

interface Props {
  text: string
}

export const InitialComponent = ({ text }: Props) => {
  React.useEffect(function() {
    SQLite.DEBUG(true);
    SQLite.enablePromise(true);
    SQLite.openDatabase({
      name: 'OfflineStorage',
      location: "default"
    }).then((db) => {
      console.log("Database open!");
  });
  }, [])
  return 
}

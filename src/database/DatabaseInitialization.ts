import SQLite from "react-native-sqlite-storage";

export class DatabaseInitialization {
  // Perform any updates to the database schema. These can occur during initial configuration, or after an app store update.
  // This should be called each time the database is opened.
  public updateDatabaseTables(database: SQLite.SQLiteDatabase): Promise<void> {
    let dbVersion: number = 0;
    console.log("Beginning database updates...");

    // First: create tables if they do not already exist
    return database
      .transaction(this.createTables)
      .then(() => {
        // Get the current database version
        return this.getDatabaseVersion(database);
      })
      .then((version) => {
        dbVersion = version;
        console.log("Current database version is: " + dbVersion);

        // Perform DB updates based on this version

        // This is included as an example of how you make database schema changes once the app has been shipped
        if (dbVersion < 1) {
          // Uncomment the next line, and the referenced function below, to enable this
          // return database.transaction(this.preVersion1Inserts);
        }
        // otherwise,
        return;
      })
      .then(() => {
        if (dbVersion < 2) {
          // Uncomment the next line, and the referenced function below, to enable this
          // return database.transaction(this.preVersion2Inserts);
        }
        // otherwise,
        return;
      });
  }

  public createTable(){

  }

  private  transformJsontoCreateStatement(tableDescriptions: any[]): any{
    let statementsArray: string[] = [];
    tableDescriptions.forEach(table => {
      var createFieldString = "";
      var element_fields: [] = table['fields'];
      element_fields.forEach(field => {
        createFieldString += `${field["field_name"]} ${field["field_description_sqlite"]},`
      });
      statementsArray.push(`CREATE TABLE IF NOT EXISTS ${table["table_name"]}(
        ${createFieldString}
      )`)
    });

    console.log(statementsArray);
    return statementsArray;
    
  }


  // Perform initial setup of the database tables
  public createTables(transaction: SQLite.Transaction, tableDescriptions: any[]) {
    // DANGER! For dev only
   
    const dropAllTables = false;
    if (dropAllTables) {
      transaction.executeSql("DROP TABLE IF EXISTS List;");
      transaction.executeSql("DROP TABLE IF EXISTS ListItem;");
      transaction.executeSql("DROP TABLE IF EXISTS Version;");
    }
    this.transformJsontoCreateStatement(tableDescriptions).forEach((statement: string) => {
      transaction.executeSql(statement);
    });
  }

  // Get the version of the database, as specified in the Version table
  private getDatabaseVersion(database: SQLite.SQLiteDatabase): Promise<number> {
    // Select the highest version number from the version table
    return database
      .executeSql("SELECT version FROM Version ORDER BY version DESC LIMIT 1;")
      .then(([results]) => {
        if (results.rows && results.rows.length > 0) {
          const version = results.rows.item(0).version;
          return version;
        } else {
          return 0;
        }
      })
      .catch((error) => {
        console.log(`No version set. Returning 0. Details: ${error}`);
        return 0;
      });
  }

  // Once the app has shipped, use the following functions as a template for updating the database:
  /*
    // This function should be called when the version of the db is < 1
    private preVersion1Inserts(transaction: SQLite.Transaction) {
        console.log("Running pre-version 1 DB inserts");
        // Make schema changes
        transaction.executeSql("ALTER TABLE ...");
        // Lastly, update the database version
        transaction.executeSql("INSERT INTO Version (version) VALUES (1);");
    }
    // This function should be called when the version of the db is < 2
    private preVersion2Inserts(transaction: SQLite.Transaction) {
        console.log("Running pre-version 2 DB inserts");
        
        // Make schema changes
        transaction.executeSql("ALTER TABLE ...");
        // Lastly, update the database version
        transaction.executeSql("INSERT INTO Version (version) VALUES (2);");
    }
    */
}
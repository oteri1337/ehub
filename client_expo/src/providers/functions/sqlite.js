import * as SQLite from "expo-sqlite";

export const savePdfToDatabase = (pdf_id, title, blob, onSuccess) => {
  // prettier-ignore
  const db = SQLite.openDatabase("pdfs", 1);

  const createTable = (tx) => {
    // prettier-ignore
    tx.executeSql("CREATE TABLE IF NOT EXISTS pdfs (id integer primary key not null, pdf_id integer, data text, blob text)");

    // prettier-ignore
    tx.executeSql("INSERT INTO pdfs (pdf_id, data, blob) values (?,?,?)", [pdf_id,title,blob]);

    // prettier-ignore
    tx.executeSql("SELECT * FROM pdfs", [], (_, { rows }) => console.log("list", rows));
  };

  // prettier-ignore
  db.transaction(createTable, (error) => {console.log("tx error", error)}, onSuccess);
};

export const removePdfFromDatabase = (pdf_id, onSuccess) => {
  // prettier-ignore
  const db = SQLite.openDatabase("pdfs", 1);

  const createTable = (tx) => {
    // prettier-ignore
    tx.executeSql("CREATE TABLE IF NOT EXISTS pdfs (id integer primary key not null, pdf_id integer, data text, blob text)");

    // prettier-ignore
    tx.executeSql("DELETE FROM pdfs WHERE (pdf_id) = (?)", [pdf_id]);

    // prettier-ignore
    tx.executeSql("SELECT * FROM pdfs", [], (_, { rows }) => console.log("list", rows));
  };

  // prettier-ignore
  db.transaction(createTable, (error) => {console.log("tx error", error)}, onSuccess);
};

export const readPdfFromDatabase = (pdf_id, onSuccess) => {
  // prettier-ignore
  const db = SQLite.openDatabase("pdfs", 1);

  const createTable = (tx) => {
    // prettier-ignore
    tx.executeSql("CREATE TABLE IF NOT EXISTS pdfs (id integer primary key not null, pdf_id integer, data text, blob text)");

    // prettier-ignore
    tx.executeSql("SELECT * FROM pdfs WHERE (pdf_id) = (?)", [pdf_id], onSuccess);
  };

  // prettier-ignore
  db.transaction(createTable, (error) => {console.log("tx error", error)}, () => {console.log("tx success")});
};

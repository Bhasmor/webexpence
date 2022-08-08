import { useState, useEffect } from "react";
import { auth, db } from "./Firebase";

export default function CureencyRenderer() {
  const [incoexpence, setIncoexpence] = useState({});
  const [currencyBalance, setCurrencyBalance] = useState(0);

  const data = () => {
    db.collection("incoexpence")
      .where("userUid", "==", auth.currentUser.uid)
      .onSnapshot((snapshot) => {
        setIncoexpence(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
        snapshot.docs.map((doc) => {
          if (doc.data().incoexp === "Income") {
            setCurrencyBalance(prev => prev + doc.data().amount);
          } else {
            setCurrencyBalance(prev => prev - doc.data().amount);
          }
        });
      });
  };

  const getData = () => {
    if (incoexpence.length === undefined) {
      data();
    }
  };
  
  useEffect(() => {
    getData();
    console.log(currencyBalance);
  }, [getData]);

  return <div><h1>{incoexpence.length !== undefined ? currencyBalance : null}</h1></div>;
}



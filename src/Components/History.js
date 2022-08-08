import React from 'react'
import { auth, db } from './Firebase'

export default function History() {

    const [incoexpence, setIncoexpence] = React.useState({});

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
            });
    }
    React.useEffect(() => {
        data();
        console.log("history")
    } , []);


    const renderer = () => {
        if (incoexpence.length !== undefined) {
            return incoexpence.map((item) => {
                return (
                <div>
                    <h1>{item.incoexp === "Income" ? item.amount : -item.amount}</h1>
                    <h2>{item.date}</h2>
                    <h2>{item.category === "" ? "Category Undefined" : item.category}</h2>
                    <h2>{item.description}</h2>
                </div>
                )
            } )
        }
    }

  return (
    <div>
        <h1>History</h1>
        <div>
            {renderer()}
        </div>
    </div>
  )
}

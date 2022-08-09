import { useState, useEffect } from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { auth, db } from "../Firebase";

function Data() {
  
    const [incoexpence, setIncoexpence] = useState({});
    const [currencyBalance, setCurrencyBalance] = useState({});

    const data = () => {
        db.collection("incoexpence")
        .where("userUid", "==", auth.currentUser.uid)
        .orderBy("date", "asc")
            .onSnapshot((snapshot) => {
                setIncoexpence(
                    snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }))
                );

            });
    };

    const getData = () => {
        if (incoexpence.length === undefined) {
            data();
        }
    };

    useEffect(() => {
        getData();
    } , [getData]);


    // TODO: add a filter for the data to be displayed

  Chart.defaults.color = "#fff";

  const pointData = {
    labels: incoexpence.length !== undefined ? incoexpence.map(item => item.date) : "wtf",
    datasets: [
        {
            label: "Income",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: incoexpence.length !== undefined ? incoexpence.map(item => (item.incoexp === "Income" ? item.amount : 0)) : "wtf",
        },
        {
            label: "Expence",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "#fff",
            borderColor: "#fff",
            borderJoinStyle: "miter",
            pointBorderColor: "#fff",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: incoexpence.length !== undefined ? incoexpence.map(item => (item.incoexp === "Expence" ? item.amount : 0)) : "wtf",
        },
    ],
};



  return (
    <div className="all-data">
      <Line data={pointData} />
    </div>
  );
}

export default Data;

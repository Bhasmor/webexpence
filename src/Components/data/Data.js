import { useState, useEffect } from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { auth, db } from "../Firebase";

function Data() {
  const [incoexpence, setIncoexpence] = useState({});
  const [values, setValues] = useState({});

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

  // check if incoexpence is have same date

  const checkIfSameDate = (incoexpence) => {
    let newIncoexpence = [];

    incoexpence.length !== undefined && incoexpence.forEach((item) => {
      if (newIncoexpence.length === 0) {
        newIncoexpence.push({ date: item.date, amount: item.amount });
      } else {
        let found = false;
        newIncoexpence.forEach((newItem) => {
          if (newItem.date === item.date) {
            if (item.incoexp === "Expence") {
              newItem.amount -= item.amount;
            } else {
              newItem.amount += item.amount;
            }
            found = true;
          }
        });
        if (!found) {
          newIncoexpence.push({ date: item.date, amount: item.amount });
        }
      }
    });
    return newIncoexpence;
  };

  const getData = () => {
    if (incoexpence.length === undefined) {
      data();
    }
  };

  const ded = async () => {
    await getData();
  };

  useEffect(() => {
    ded();
  }, [getData]);

  Chart.defaults.color = "#fff";

  const pointData = {
    labels:
      incoexpence.length !== undefined
        ? incoexpence.map((item) => item.date)
        : "wtf",
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
        data:
          incoexpence.length !== undefined
            ? incoexpence.map((item) =>
                item.incoexp === "Income" ? item.amount : 0
              )
            : "empty",
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
        data:
          incoexpence.length !== undefined
            ? incoexpence.map((item) =>
                item.incoexp === "Expence" ? item.amount : 0
              )
            : "empty",
      },
    ],
  };

  const datam = {
    labels:
      checkIfSameDate(incoexpence).length !== undefined
        ? checkIfSameDate(incoexpence).map((item) => item.date)
        : "empty",
    datasets: [
      {
        label: "Daily Profit",
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
        data:
          checkIfSameDate(incoexpence).length !== undefined
            ? checkIfSameDate(incoexpence).map((item) => item.amount)
            : "empty",
      },
    ],
  };

  return (
    <div className="data-container">
      <div className="all-data">
        <Line data={pointData} />
      </div>
      <div className="all-data">
        <Line data={datam} />
      </div>
    </div>
  );
}

export default Data;

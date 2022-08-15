import { useState, useEffect } from "react";
import Chart from "chart.js/auto";
import { Line, Doughnut } from "react-chartjs-2";
import { auth, db } from "../Firebase";

function Data() {
  const [incoexpence, setIncoexpence] = useState({});

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

  const sameCategory = (incoexpence) => {
    let categories = [];
    incoexpence.length !== undefined && incoexpence.forEach((item) => {
      if (categories.length === 0) {
        if (item.incoexp === "Expence") {
        categories.push({ category: item.category, amount: item.amount });
        }
      } else {
        let found = false;
        categories.forEach((newItem) => {
          if (newItem.category === item.category) {
            if (item.incoexp === "Expence") {
              newItem.amount += item.amount;
            } 
            found = true;
          }
        });
        if (!found) {
          if (item.incoexp === "Expence") {
          categories.push({ category: item.category, amount: item.amount });
          }
        }
      }
    } );
    return categories;
  }


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
        pointRadius: 5,
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
        pointRadius: 5,
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

  
  const categoryData = {
    labels:
      sameCategory(incoexpence).length !== undefined
        ? sameCategory(incoexpence).map((item) => item.category !== "" ? item.category : "Other")
        : "empty",
    datasets: [
      {
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 99, 132, 0.2)",
        ],
        data:
          sameCategory(incoexpence).length !== undefined
            ? sameCategory(incoexpence).map((item) => item.amount)
            : "empty",
      },
    ],
  };

  return (
    <div className="data-container">
      <div className="all-data">
        <Line data={pointData} />
      </div>
      <div className="doug-data">
        <h2>Expence Details</h2>
        <Doughnut data={categoryData} />
      </div>
    </div>
  );
}

export default Data;

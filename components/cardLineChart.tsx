"use client";
import React, { useEffect } from "react";
import Chart from "chart.js";

export const CardLineChart = () => {
  useEffect(() => {
    var config = {
      type: "line",
      aspectRatio: 3 / 5,
      data: {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "Mei",
          "Jun",
          "Jul",
          "Agu",
          "Sep",
          "Okt",
          "Nov",
          "Des",
        ],
        asoectRation: 5,
        datasets: [
          {
            label: new Date().getFullYear(),
            backgroundColor: "#3182ce",
            borderColor: "#3182ce",
            data: [1, 4, 5, 1, 4, 5, 1, 4, 5],
            fill: false,
          },
          {
            label: new Date().getFullYear() - 1,
            fill: false,
            backgroundColor: "#edf2f7",
            borderColor: "#edf2f7",
            data: [2, 3, 5, 1, 4, 5, 1, 4, 5],
          },
          {
            label: new Date().getFullYear() - 1,
            fill: false,
            backgroundColor: "#edf2f7",
            borderColor: "#edf2f7",
            data: [2, 10, 7, 1, 4, 5, 1, 4, 5],
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        animations: {
          tension: {
            duration: 1000,
            easing: "linear",
            from: 1,
            to: 0,
            loop: true,
          },
        },
        title: {
          display: false,
          text: "Transaction Charts",
          fontColor: "white",
        },
        legend: {
          labels: {
            fontColor: "white",
          },
          align: "end",
          position: "bottom",
        },
        tooltips: {
          mode: "index",
          intersect: false,
        },
        hover: {
          mode: "nearest",
          intersect: true,
        },
        scales: {
          y: {
            // defining min and max so hiding the dataset does not change scale range
            min: 0,
            max: 100,
          },
          xAxes: [
            {
              ticks: {
                fontColor: "rgba(255,255,255,.7)",
              },
              display: true,
              scaleLabel: {
                display: false,
                labelString: "Month",
                fontColor: "white",
              },
              gridLines: {
                display: true,
                borderDash: [2],
                borderDashOffset: [2],
                color: "rgba(33, 37, 41, 0.3)",
                zeroLineColor: "rgba(0, 0, 0, 0)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                fontColor: "white",
                height: [4],
                fontSize: [15],
              },

              display: true,
              scaleLabel: {
                display: false,
                labelString: "Value",
                fontColor: "white",
              },
              gridLines: {
                borderDash: [3],
                borderDashOffset: [3],
                drawBorder: true,
                color: "rgba(255, 255, 255, 0.15)",
                zeroLineColor: "rgba(33, 37, 41, 0)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
        },
      },
    };
    var ctx = document.getElementById("line-chart").getContext("2d");
    window.myLine = new Chart(ctx, config);
  }, []);
  return (
    <div className="relative flex flex-col min-w-0 break-words w-full h-60 mb-6 shadow-lg rounded bg-blueGray-700">
      <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
        <div className="flex flex-wrap items-center">
          <div className="relative w-full max-w-full flex-grow flex-1">
            <h2 className="text-white text-xl font-semibold text-center">
              Transaction Chart
            </h2>
          </div>
        </div>
      </div>
      <div className="">
        {/* Chart */}
        <div className="relative">
          <canvas id="line-chart"></canvas>
        </div>
      </div>
    </div>
  );
};

export default CardLineChart;

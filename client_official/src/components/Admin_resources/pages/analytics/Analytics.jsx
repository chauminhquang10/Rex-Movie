import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./Analytics.scss";

import PackagePieChart from "../../Admin_components/pie_chart/PackagePieChart.js";

import DiscountBarChart from "../../Admin_components/bar_chart/DiscountBarChart.js";

import DiscountPriceChart from "../../Admin_components/composed_chart/DiscountPriceChart.js";

import DiscountQuantityLineChart from "../../Admin_components/line_chart/DiscountQuantityLineChart.js";

import TopUsersList from "../../Admin_components/top_users_table/TopUsersList.js";

import { GlobalState } from "../../../../GlobalState";

const Analytics = () => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Agu",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const state = useContext(GlobalState);
  const [token] = state.token;

  const [userStats, setUserStats] = useState([]);

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await axios.get("/user/stats", {
          headers: {
            Authorization: token,
          },
        });
        const statsList = res.data.sort(function (a, b) {
          return a._id - b._id;
        });
        statsList.map((item) =>
          setUserStats((prev) => [
            ...prev,
            { name: months[item._id - 1], "New User": item.total },
          ])
        );
      } catch (error) {
        console.log(error);
      }
    };
    getStats();
  }, []);

  return (
    <div className="admin-home">
      <h3 className="chartTitle">Discount Analytics</h3>
      <DiscountPriceChart />
      <DiscountQuantityLineChart />
      <h3 className="chartTitle">Sale Analytics</h3>
      <PackagePieChart />

      {/* Tạm thời comment để chừa chỗ hiển thị , nhớ chuyển vài cái chart ra page khác, không để chung hết 1 chỗ như bây h */}
      {/* <PackagePieChart />

      <DiscountBarChart />

      */}

      <TopUsersList />
    </div>
  );
};

export default Analytics;

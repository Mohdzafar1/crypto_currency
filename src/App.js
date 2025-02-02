import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaChevronLeft, FaChevronRight, FaDollarSign, FaChartLine, FaRegUser, FaBars } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

const App = () => {
  const [prices, setPrices] = useState({});
  const [page, setPage] = useState(4);
  const [tablePage, setTablePage] = useState(9);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const socket = new WebSocket("wss://stream.binance.com:9443/ws/!ticker@arr");

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setPrices(
        data.reduce((acc, crypto) => {
          acc[crypto.s] = {
            price: parseFloat(crypto.c).toFixed(2),
            change: parseFloat(crypto.p).toFixed(2),
            volume: parseFloat(crypto.v).toFixed(2),
          };
          return acc;
        }, {})
      );
    };

    return () => {
      socket.close();
    };
  }, []);

  const handleNext = () => {
    setPage(page + 4);
  };

  const handlePrev = () => {
    setPage(page - 4);
  };

  const handleTableNext = () => {
    setTablePage(tablePage + 10);
  };

  const handleTablePrev = () => {
    setTablePage(tablePage - 10);
  };

  // Toggle sidebar state
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Close sidebar when cross icon is clicked
  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="container-fluid" style={{ minHeight: "100vh", background: "#f7f7f7" }}>
      {/* Sidebar */}
      <div
        className={`col-md-2 bg-dark text-white p-4 d-md-block ${sidebarOpen ? "d-block" : "d-none"} d-md-block`}
        style={{ position: "fixed", height: "100vh", top: 0, left: 0, zIndex: 100 }}
      >
        <button className="d-lg-none btn btn-outline-light" onClick={closeSidebar} style={{ position: "absolute", top: 10, right: 10 }}>
          <RxCross2 />
        </button>
        <h2 className="text-center pt-5">CryptoTrade</h2>
        <ul className="list-unstyled">
          <li className="mb-4">
            <FaChartLine /> Market Overview
          </li>
          <li className="mb-4">
            <FaDollarSign /> Trade
          </li>
          <li className="mb-4">
            <FaRegUser /> Profile
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className={`col-md-10 ms-auto p-5 ${sidebarOpen ? "ps-0" : ""}`}>
        {/* Hamburger Button for Smaller Screens */}
        <div className="d-md-none text-right mb-3">
          <button className="btn btn-black" onClick={toggleSidebar}>
            <FaBars />
          </button>
        </div>

        <div className="row mb-4">
          <div className="col">
            <h1 style={{ fontSize: "2rem", color: "#333" }}>Live Crypto Prices</h1>
          </div>
        </div>

        {/* Trading Data */}
        <div className="row">
          {Object.entries(prices).slice(0, page).map(([symbol, data]) => (
            <div className="col-md-3 mb-4" key={symbol}>
              <div className="card text-white bg-dark shadow-lg rounded-lg">
                <div className="card-body">
                  <h5 className="card-title">{symbol}</h5>
                  <p className="card-text">
                    <strong>Price:</strong> ${data.price}
                  </p>
                  <p
                    className="card-text"
                    style={{ color: data.change >= 0 ? "lightgreen" : "red" }}
                  >
                    <strong>Change:</strong> {data.change}
                  </p>
                  <p className="card-text">
                    <strong>Volume:</strong> {data.volume}
                  </p>
                  {/* Buy/Sell Buttons */}
                  <div className="d-flex justify-content-between mt-3">
                    <button className="btn btn-success">Buy</button>
                    <button className="btn btn-danger">Sell</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination for Data */}
        <div className="d-flex justify-content-center py-4">
          {page >= 5 && (
            <div className="me-3">
              <button className="btn btn-outline-danger" onClick={handlePrev}>
                <FaChevronLeft /> Previous
              </button>
            </div>
          )}
          <div>
            <button className="btn btn-outline-primary" onClick={handleNext}>
              More Currencies <FaChevronRight />
            </button>
          </div>
        </div>

        {/* table */}
        <div className="table-responsive mt-5">
          <table className="table table-dark table-striped table-hover shadow-lg rounded">
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Price ($)</th>
                <th> Change ($)</th>
                <th>Volume</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(prices)
                .slice(0, tablePage)
                .map(([symbol, data]) => (
                  <tr key={symbol}>
                    <td>{symbol}</td>
                    <td>${data.price}</td>
                    <td style={{ color: data.change >= 0 ? "lightgreen" : "red" }}>
                      {data.change}
                    </td>
                    <td>{data.volume}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* Pagination for Table */}
        <div className="d-flex justify-content-center py-4">
          {tablePage >= 10 && (
            <div className="me-3">
              <button className="btn btn-outline-danger" onClick={handleTablePrev}>
                <FaChevronLeft /> Previous Currency
              </button>
            </div>
          )}
          <div>
            <button className="btn btn-outline-primary" onClick={handleTableNext}>
              More Currency <FaChevronRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

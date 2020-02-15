import React, { useState, useEffect } from "react";
import Head from "next/head";
import ResultsRoute from "../components/ResultsRoute";
import generateResults from "../lib/generateResults";
import DataInputForm from "../components/DataInputForm";

const initial: Inputs = {
  income: 0,
  savings: 0,
  employerMatch: 0,
  expensesEssential: 0,
  debts: [{ principal: 0, minimum: 0, rate: 0 }]
};

const Home = () => {
  const [route, setRoute] = useState<Route>("HOME");
  const [inputs, setInputs] = useState<Inputs>(initial);
  const [results, setResults] = useState<null | Results>(null);

  const handleSubmitForm = () => {
    setInputs(inputs);
    setResults(generateResults(inputs));
    setRoute("RESULTS");
  };

  const handleNewInputs = async (i: Inputs) => {
    console.log("got new inputs", i);
    setInputs(i);
    window.localStorage.setItem("inputs", JSON.stringify(i));
  };

  useEffect(() => {
    const data = window.localStorage.getItem("inputs");
    if (data) {
      console.log("fetched data", data);
      setInputs(JSON.parse(data));
    }
  }, []);

  return (
    <div className="container">
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="mainContainer">
        {route === "HOME" && (
          <DataInputForm
            handleSubmit={handleSubmitForm}
            inputs={inputs}
            onNewInputs={handleNewInputs}
          />
        )}
        {route === "RESULTS" && !!inputs && !!results && (
          <ResultsRoute
            validInputs={inputs}
            results={results}
            handleEditMode={() => setRoute("HOME")}
          />
        )}
      </div>

      <style jsx>{`
        .container {
          padding: 8px;
        }
      `}</style>
    </div>
  );
};

export default Home;

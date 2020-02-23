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
    const results = generateResults(inputs);
    setResults(results);
    setRoute("RESULTS");
    window.scrollTo(0, 0);
  };

  const handleNewInputs = async (i: Inputs) => {
    setInputs(i);
    window.localStorage.setItem("inputs", JSON.stringify(i));
  };

  useEffect(() => {
    const data = window.localStorage.getItem("inputs");
    if (data) {
      setInputs(JSON.parse(data));
    }
  }, []);

  return (
    <div>
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
        .mainContainer {
          padding: 8px;
          max-width: 800px;
          margin: 0px auto 64px auto;
        }
      `}</style>
    </div>
  );
};

export default Home;

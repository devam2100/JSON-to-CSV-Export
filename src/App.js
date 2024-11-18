import React, { useState } from "react";
import { saveAs } from "file-saver";
import Papa from "papaparse"; 

const JsonToCsv = () => {
  const [jsonInput, setJsonInput] = useState(""); 
  const [error, setError] = useState(""); 
  const handleInputChange = (event) => {
    setJsonInput(event.target.value);
    setError(""); 
  };
  const exportToCSV = () => {
    try {  
      const jsonData = JSON.parse(jsonInput);
      const flattenedData = [
        {
          recipeTitle: jsonData.recipeTitle,
          description: jsonData.description,
          cuisine: jsonData.cuisine,
          type: jsonData.type,
          servings: jsonData.servings,
          prepTime: jsonData.cookingTime.prepTime,
          cookTime: jsonData.cookingTime.cookTime,
          totalTime: jsonData.cookingTime.totalTime,
          ingredients: jsonData.ingredients.detailedList
            .map((item) => `${item.name} (${item.size})`)
            .join(", "),
          instructions: jsonData.instructions.join(" | "),
          notes: jsonData.notes,
        },
      ];     
      const csv = Papa.unparse(flattenedData);    
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      saveAs(blob, `csv${Date.now()}`);
    } catch (error) {
      setError(`Invalid JSON: ${error.message}`);
      console.error("Error--->", error);
    }
  };
  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>json to csv exporter</h2>
      <textarea
        placeholder="Paste your JSON data here"
        value={jsonInput}
        onChange={handleInputChange}
        rows="15"
        style={{ width: "100%", marginBottom: "10px", fontSize: "16px" }}
      ></textarea>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button
        onClick={exportToCSV}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          border: "none",
          cursor: "pointer",
        }}
      >
        Export to CSV
      </button>
    </div>
  );
};

export default JsonToCsv;

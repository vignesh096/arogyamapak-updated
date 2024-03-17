import React from 'react'
import healthSuggestions from "../data/sugg2.json"
const Suggection = () => {
    const data =healthSuggestions.healthSuggestions;
    if (!data){
        return "Loading..."
    }
    return (
        <div className="health-suggestions-container">
      {data?data.map((category, index) => (
        <div key={index} className="category">
          <h2 className="category-title">{category.topic}</h2>
          <ul className="suggestions-list">
            {category.suggestions.map((suggestion, idx) => (
              <li key={idx} className="suggestion">
                <span className="suggestion-number">{idx + 1}.</span> {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )):"Loading..."}
    </div>
      );
}

export default Suggection
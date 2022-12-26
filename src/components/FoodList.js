import { useState, useEffect, useCallback } from "react";
import FoodCard from "./FoodCard.js";
import loadingCircle from "../images/LoadingCircle.gif";

function FoodList() {
  // Store the food list
  const [foodList, setFoodList] = useState([]);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const serverUrl = process.env.REACT_APP_BACKEND_URL;

  // Get a list of as many food items as possible
  const fetchFoodList = useCallback(async () => {
    setIsLoading(true);
    let data;
    try {
      console.log(`Fetch request from this url: ${serverUrl}/foodlist`);
      const response = await fetch(`${serverUrl}/foodlist`);
      data = await response.json();

      if (!response.ok) {
        throw new Error(
          "Error: food list could not be retrieved from the database."
        );
      }

      // Put food items into an array (weed out any experimental entries)
      const foodArray = [];
      for (const item in data) {
        if (data[item].dataType !== "Experimental") {
          foodArray.push({
            id: item,
            title: data[item].description,
            fdcId: data[item].fdcId,
            publicationDate: data[item].publicationDate,
            nutrients: data[item].foodNutrients,
          });
        }
      }
      setFoodList(foodArray);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);
  // Fetch the food data when the page loads
  useEffect(() => {
    fetchFoodList();
  }, [fetchFoodList]);

  // Return the food list if there is no error and it's not loading
  if (!error && !isLoading) {
    return foodList.map((item) => (
      <FoodCard
        key={item.id}
        title={item.title}
        nutrients={item.nutrients}
        fdcId={item.fdcId}
      />
    ));
  } else if (error && !isLoading) {
    return (
      <div className="error">
        <div className="notification is-danger is-light">{error}</div>
      </div>
    );
  } else {
    return (
      <div className="loading-circle">
        <img src={loadingCircle} width="100" alt="via Icons8.com" />
      </div>
    );
  }
}
export default FoodList;

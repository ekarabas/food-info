import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import sortNutrients from "../functions/sortNutrients.js";
import NutrientTable from "../components/views/NutrientTable.js";
import loadingCircle from "../images/LoadingCircle.gif";

function FoodPage(props) {
  const [foodItem, setFoodItem] = useState({});
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [calories, setCalories] = useState();
  const serverUrl = process.env.REACT_APP_BACKEND_URL;

  // Prepare the fdcId parameter in the URL for use in the fetch request
  const { fdcId } = useParams();

  // Get info about this food item from the DB
  const fetchFoodItem = useCallback(async () => {
    setIsLoading(true);
    let data;

    try {
      console.log(
        `Fetch request from this url: ${serverUrl}foodpage?fdcId=${fdcId}!`
      );
      const response = await fetch(`${serverUrl}foodpage?fdcId=${fdcId}`);

      data = await response.json();
      if (!response.ok) {
        throw new Error("Error: food could not be fetched from the database.");
      }
    } catch (error) {
      setError(error.message);
    }

    // Create an array of nutrients, and store the calorie info separately
    let nutrientArray = [];
    for (const item in data.foodNutrients) {
      if (
        data.foodNutrients[item].nutrient.name === "Energy" &&
        data.foodNutrients[item].nutrient.unitName === "kcal"
      ) {
        setCalories(data.foodNutrients[item].nutrient.number);
      } else if (
        data.foodNutrients[item].amount &&
        data.foodNutrients[item].nutrient.name !== "Energy"
      ) {
        nutrientArray.push(data.foodNutrients[item]);
      }
    }

    // Sort the nutrients in descending order of amount
    nutrientArray = sortNutrients(nutrientArray);

    // Create an object with all the desired properties
    const thisFood = {
      name: data.description,
      nutrients: nutrientArray,
    };
    setFoodItem(thisFood);
    setIsLoading(false);
  }, [fdcId]);

  // Fetch the food data when the page loads
  useEffect(() => {
    fetchFoodItem();
  }, [fetchFoodItem]);

  if (!error && !isLoading) {
    return (
      <>
        <section className="hero is-medium is-link">
          <div className="hero-body">
            <p className="title">{foodItem.name}</p>
            <p className="subtitle">
              {calories} calories ({calories * 4.2} kJ)
            </p>
          </div>
        </section>
        <NutrientTable nutrients={foodItem.nutrients} />
      </>
    );
  } else if (error & !isLoading) {
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

export default FoodPage;

import convertToMg from "./convertToMg.js";

// Sort the nutrient array in descending order
export default function sortNutrients(nutrientArray) {
  nutrientArray.sort((a, b) => {
    let aInMg = a.amount;
    let bInMg = b.amount;

    // If there is no amount available, set it to 0
    if (!a.amount) {
      aInMg = 0;
    }
    if (!b.amount) {
      bInMg = 0;
    }

    // Convert all amounts into mg for comparison
    aInMg = convertToMg(a.amount, a.nutrient.unitName);
    bInMg = convertToMg(b.amount, b.nutrient.unitName);

    // Sort based on value in mg
    if (aInMg > bInMg) {
      return -1;
    }
    if (bInMg > aInMg) {
      return 1;
    }
    return 0;
  });

  return nutrientArray;
}

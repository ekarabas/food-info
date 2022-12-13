// Convert a nutrient's quantity to mg for comparison purposes
export default function convertToMg(amount, unit) {
  let amountInMg = 0;

  switch (unit) {
    case "g":
      amountInMg = amount * 1000;
      break;
    case "µg":
      amountInMg = amount / 1000;
      break;
    default:
      amountInMg = amount;
      break;
  }

  return amountInMg;
}

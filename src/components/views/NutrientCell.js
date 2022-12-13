import convertToMg from "../../functions/convertToMg.js";

function NutrientCell(props) {
  // If there's no amount for this nutrient, make it zero
  let amount = props.amount;
  if (!props.amount) {
    amount = 0;
  }

  // Convert to mg so the bars can be compared
  let amountMg = convertToMg(props.amount, props.unit);

  return (
    <tr>
      <td>{props.name}</td>
      <td>
        {amount} {props.unit}
      </td>
      <td className="table-bar">
        <progress
          className="progress is-info"
          value={amountMg}
          max={props.totalMg}
        ></progress>
      </td>
    </tr>
  );
}

export default NutrientCell;

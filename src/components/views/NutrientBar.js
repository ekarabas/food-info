import convertToMg from "../../functions/convertToMg.js";

function NutrientBar(props) {
  // Convert to mg so the bars can be compared
  let amount = convertToMg(props.amount, props.unit);
  return (
    <tr>
      <td>{props.name}</td>
      <td>
        <progress
          className="progress is-info"
          value={amount}
          max={props.totalMg}
        ></progress>
      </td>
    </tr>
  );
}

export default NutrientBar;

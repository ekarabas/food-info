import NutrientCell from "./NutrientCell.js";
import convertToMg from "../../functions/convertToMg.js";

function NutrientTable(props) {
  // Calculate total mg to use as bar maximum value
  let totalMg = 0;
  for (let item in props.nutrients) {
    totalMg += convertToMg(
      props.nutrients[item].amount,
      props.nutrients[item].nutrient.unitName
    );
  }

  return (
    <div className="table-wrapper">
      <table className="table is-fullwidth">
        <thead>
          <tr>
            <th>Nutrient</th>
            <th>Amount</th>
            <th>%</th>
          </tr>
        </thead>
        <tbody>
          {props.nutrients?.map((item) => (
            <NutrientCell
              key={item.nutrient.id}
              name={item.nutrient.name}
              amount={item.amount}
              unit={item.nutrient.unitName}
              totalMg={totalMg}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default NutrientTable;

import { useNavigate } from "react-router-dom";

function FoodCard(props) {
  //console.log(`${props.nutrients[0].name}`);
  const navigate = useNavigate();
  return (
    <div
      className="food-item"
      onClick={() => navigate(`/${props.fdcId}`, { replace: true })}
    >
      <div className="box clickable">
        <div className="content">
          <h5>{props.title}</h5>
        </div>
      </div>
    </div>
  );
}

export default FoodCard;

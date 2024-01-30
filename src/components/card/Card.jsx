import { useNavigate } from "react-router-dom";
import "./Card.css";

const Card = ({name, img, types, id}) => {

  const navigate = useNavigate()

  return (
    <div className="col">
      <div className="card">
        <div className="card2" onClick={() => navigate(`pokemon/${name}`)}>
          <span>#{id}</span>
          <h4>{name}</h4>
          <div className="d-flex">
            <img
              src={img}
              alt=""
            />
            <div className="type">
              {types.map(type => <h5 key={type.slot}>{type.type.name}</h5>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;

import React from "react";

function ViewCard(props) {
  return (
    <div className="viwers">
      <h1>Card</h1>
      {props.handelCard.map((item) => {
        return (
          <>
            <h1>{item.name}</h1>
            <img src={item.img} alt="" />
            <div className="base_statss">
              <p>DEFENSE : {item.defense} </p>
              <p>ATTACK : {item.attack} </p>
              <p>HP : {item.hp} </p>
              <b>Type : {item.type}</b>
            </div>
          </>
        );
      })}
    </div>
  );
}

export default ViewCard;

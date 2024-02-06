import PropTypes from "prop-types";
import React from "react";

function Maincard({ id, image, name, openBigCard }) {
  return (
    <div
      className="h-56 w-52 p-2 bg-grayTheme cursor-pointer"
      onClick={() => openBigCard(id, image)}
    >
      <div className="h-full w-full ">
        <div className="w-full h-3/5 flex items-center justify-center">
          <img
            className=" h-full"
            src={image}
            alt={name}
            draggable="false"
          ></img>
        </div>

        <div className="h-2/5 px-3 text-sm">
          <p className="">ID: { id }</p>

          <div className="h-1/6 w-full "></div>

          <div>
            <h2 className="text-lg capitalize font-bold">{name}</h2>
          </div>

        </div>
      </div>
    </div>
  );
}

Maincard.propTypes = {
  height: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  weight: PropTypes.number.isRequired,
  openBigCard: PropTypes.func,
};

export default React.memo(Maincard);

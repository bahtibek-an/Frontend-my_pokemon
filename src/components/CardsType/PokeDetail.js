import { PropTypes } from "prop-types";
import { useQuery } from "@tanstack/react-query";
import Axios from "axios";
import Loader from "../Loader/Loader";

function PokeDetail({ closeBigCard, id, image, children }) {
  const { isLoading, data } = useQuery(["pokemon", id], () =>
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) => res.data)
  );

  if (isLoading) {
    return (
      <div
        onClick={closeBigCard}
        className=""
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Loader>Loading</Loader>
      </div>
    );
  }

  const { abilities, base_experience, height, name } = data;

  return (
    <div
      onClick={closeBigCard}
      className="shadow-md rounded-3xl bg-grayTheme p-2 xl:p-8 text-center z-10 fixed top-20 left-1/2 transform -translate-x-1/2 overflow-auto"
    >
      <div className="mt-2">
        <a
          href="/"
          className="capitalize p-2 text-md xl:text-md text-blueTheme cursor-pointer xl:w-full"
          style={{ width: "300px", height: "50px" }}
        >
          Cancel
        </a>
      </div>
      <div className="items-center justify-center">
        <h1 className="text-3xl capitalize font-bold text-gray-800 xl:text-5xl">
          {name}
        </h1>
      </div>
      <div className=" container flex flex-col items-center justify-start">
        <img src={image} alt="Pokemon" className="max-h-48 "></img>
        <div className="mt-4">
          <p>Abilities: {abilities.map((ability) => ability.ability.name).join(", ")}</p>
          <p>Base Experience: {base_experience}</p>
          <p>Height: {height}</p>
        </div>
      </div>
      {children}
    </div>
  );
}

PokeDetail.propTypes = {
  closeBigCard: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default PokeDetail;

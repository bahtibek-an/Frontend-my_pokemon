import "./Not-Found.css";

const NotFound = () => {
  return (
    <>
      <div className=" d-flex justify-content-center">
        <h1 className="fw-bold">Not Found 404</h1>
      </div>
      <div className="d-flex justify-content-center gap-5">
        <img
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg"
          alt=""
        />
        <img
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/26.svg"
          alt=""
        />
        <img
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/18.svg"
          alt=""
        />
        <img
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/4.svg"
          alt=""
        />
      </div>
    </>
  );
};

export default NotFound;

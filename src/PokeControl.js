import Navbar from "./Navbar";
import PropTypes from "prop-types";

function PokeControl({ children, onSearch }) {
  return (
    <div>
      <Navbar onSearch={onSearch} />
      <main className="mx-auto my-12 w-90 max-w-40">{children}</main>
    </div>
  );
}

PokeControl.propTypes = {
  onSearch: PropTypes.func,
};

export default PokeControl;

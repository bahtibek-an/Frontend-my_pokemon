import { PropTypes } from "prop-types";

function BigCardButton({ name }) {
  return (
    <div className="h-min mt-2 xl:mt-8 ">
      <a href="/"
        className="capitalize rounded-3xl p-2 text-sm xl:text-md bg-purpleTheme text-yellowTheme shadow-2xl cursor-pointer hover:bg-purple-900 xl:w-full"
        style={{ width: "300px", height: "50px" }}
      >
        Cancel
      </a>
    </div>
  );
}

BigCardButton.propTypes = {
  name: PropTypes.string.isRequired,
};

export default BigCardButton;

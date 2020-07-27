import React from "react"
import PropTypes from "prop-types"

const Controls = ({ flyTo, usCenter, jaCenter }) => (
  <div className="controls">
    <button onClick={() => flyTo(jaCenter.coord, jaCenter.zoom)}>
      Fly to Japan
    </button>
    <button onClick={() => flyTo(usCenter.coord, usCenter.zoom)}>
      Fly to Oregon/SW Washington
    </button>
  </div>
)

Controls.propTypes = {
  flyTo: PropTypes.func.isRequired,
  usCenter: PropTypes.shape({
    coord: PropTypes.arrayOf(PropTypes.number),
    zoom: PropTypes.number,
  }).isRequired,
  jaCenter: PropTypes.shape({
    coord: PropTypes.arrayOf(PropTypes.number),
    zoom: PropTypes.number,
  }).isRequired,
}
export default Controls

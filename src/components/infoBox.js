import React from "react"
import PropTypes from "prop-types"

const InfoBox = ({ info, flyTo, closeInfoBox, infoIsVisible }) => {
  const { thisCity, sisterCity } = info
  const handleFly = () => {
    flyTo(sisterCity.coords, 8)
    closeInfoBox()
  }
  if (!info) return null
  return (
    <div
      className="info-box"
      style={{
        display: infoIsVisible ? "block" : "none",
      }}
    >
      <button onClick={closeInfoBox}>X</button>
      <h2>
        {thisCity.name} - {sisterCity.name}
      </h2>
      <button onClick={handleFly}>
        Fly to {sisterCity.name}
        {sisterCity.name_j}へ飛ぶ
      </button>
    </div>
  )
}

InfoBox.propTypes = {
  thisCity: PropTypes.shape({
    name: PropTypes.string.isRequired,
    name_j: PropTypes.string.isRequired,
    region: PropTypes.string.isRequired,
    region_j: PropTypes.string.isRequired,
    coords: PropTypes.arrayOf(PropTypes.number).isRequired,
  }),
  sisterCity: PropTypes.shape({
    name: PropTypes.string.isRequired,
    name_j: PropTypes.string.isRequired,
    region: PropTypes.string.isRequired,
    region_j: PropTypes.string.isRequired,
    coords: PropTypes.arrayOf(PropTypes.number).isRequired,
  }),
}

export default InfoBox

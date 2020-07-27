import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"

const InfoBox = ({ info, flyTo, closeInfoBox, infoIsVisible }) => {
  const [curInfo, setCurInfo] = useState(info)

  useEffect(() => {
    setCurInfo(info)
  }, [info])

  const handleFly = () => {
    flyTo(curInfo.sisterCity.coords, 8)
    switchCities()
  }
  const switchCities = () => {
    setCurInfo({
      thisCity: curInfo.sisterCity,
      sisterCity: curInfo.thisCity,
    })
  }
  if (!curInfo.thisCity) return null
  return (
    <div
      className="info-box"
      style={{
        display: infoIsVisible ? "block" : "none",
      }}
    >
      <button onClick={closeInfoBox}>X</button>
      <h2>
        {curInfo.thisCity.name}, {curInfo.thisCity.region} -{" "}
        {curInfo.sisterCity.name}, {curInfo.sisterCity.region}
      </h2>
      <h2>
        {curInfo.thisCity.region_j}
        {curInfo.thisCity.name_j}- {curInfo.sisterCity.region_j}
        {curInfo.sisterCity.name_j}
      </h2>
      <p></p>
      <button onClick={handleFly}>
        Fly to {curInfo.sisterCity.name}
        {curInfo.sisterCity.name_j}へ飛ぶ
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

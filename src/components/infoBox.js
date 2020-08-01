import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"

const InfoBox = ({ info, flyTo, closeInfoBox, infoIsVisible, type }) => {
  const [curInfo, setCurInfo] = useState(info)

  useEffect(() => {
    setCurInfo(info)
  }, [info])

  const handleFly = () => {
    flyTo(curInfo.sisterItem.coords, 8)
    switchCities()
  }
  const switchCities = () => {
    setCurInfo({
      thisItem: curInfo.sisterItem,
      sisterItem: curInfo.thisItem,
    })
  }

  const titleInfo =
    type === "region" ? (
      <>
        <h2>
          {curInfo.thisItem.name} / {curInfo.sisterItem.name}
        </h2>
        <h2>
          {curInfo.thisItem.name_j} / {curInfo.sisterItem.name_j}
        </h2>
      </>
    ) : (
      <>
        <h2>
          {curInfo.thisItem.name}, {curInfo.thisItem.region} /{" "}
          {curInfo.sisterItem.name}, {curInfo.sisterItem.region}
        </h2>
        <h2>
          {curInfo.thisItem.region_j}
          {curInfo.thisItem.name_j} / {curInfo.sisterItem.region_j}
          {curInfo.sisterItem.name_j}
        </h2>
      </>
    )

  if (!curInfo.thisItem) return null

  return (
    <div
      className="info-box"
      style={{
        display: infoIsVisible ? "flex" : "none",
      }}
    >
      <button onClick={closeInfoBox} className="info-close">
        X
      </button>
      <div className="info-title">{titleInfo}</div>
      <br />
      <button onClick={handleFly}>
        Fly to {curInfo.sisterItem.name} <br />
        {curInfo.sisterItem.name_j}へ飛ぶ
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

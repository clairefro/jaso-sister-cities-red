import React from "react"

const Region = ({ data, type, flyTo, populateInfoBox }) => {
  const thisRegion =
    type === "us"
      ? {
          name: data.us_region,
          name_j: data.us_region_j,
          coords: [data.us_lon, data.us_lat],
        }
      : {
          name: data.ja_region,
          name_j: data.ja_region_j,
          coords: [data.ja_lon, data.ja_lat],
        }
  const sisterRegion =
    type === "us"
      ? {
          name: data.ja_region,
          name_j: data.ja_region_j,
          coords: [data.ja_lon, data.ja_lat],
        }
      : {
          name: data.us_region,
          name_j: data.us_region_j,
          coords: [data.us_lon, data.us_lat],
        }

  const handleClick = () => {
    const info = {
      thisItem: thisRegion,
      sisterItem: sisterRegion,
      isRegion: true,
    }
    populateInfoBox(info)
  }
  return (
    <div onClick={handleClick} className="region-marker">
      <div className="marker-name">
        <p>
          {thisRegion.name}/{sisterRegion.name}
        </p>
      </div>
    </div>
  )
}

export default Region
import React from "react"

const City = ({ data, type }) => {
  const onClick = e => {
    console.log(data)
  }
  if (type === "us") {
    return (
      <div onClick={onClick} className="city-marker">
        <div className="city-marker-info">
          <h2>
            {data.us_city}, {data.us_region}
          </h2>
        </div>
      </div>
    )
  }
}

export default City

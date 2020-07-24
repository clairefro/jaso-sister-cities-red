import React, { useState } from "react"
import { graphql } from "gatsby"
import ReactMapboxGl, { Marker } from "react-mapbox-gl"

import "../styles/index.scss"

import City from "../components/city"

const Map = ReactMapboxGl({
  accessToken: process.env.GATSBY_MAPBOX_KEY,
})

export default function Home({ data }) {
  const [mapData, setData] = useState(
    (data && data.allAirtable && data.allAirtable.nodes) || []
  )
  const center = [-171.64753268900358, 41.90061518253366]

  console.log(mapData)
  return (
    <div>
      <div className="container">
        <h1 className="text-center">Sister Cities</h1>
        <div className="map">
          <Map
            style="mapbox://styles/mapbox/light-v10"
            containerStyle={{
              height: "100%",
              width: "100%",
            }}
            center={center}
            zoom={[2.7]}
          >
            {mapData.map((d, i) => {
              const city = d.data
              const jaCoords = [city.ja_lon, city.ja_lat]
              const usCoords = [city.us_lon, city.us_lat]
              return (
                <div className="city-pair" key={i}>
                  <Marker key={`${i}-us`} coordinates={usCoords}>
                    <City data={d.data} type="us"></City>
                  </Marker>
                </div>
              )
            })}
          </Map>
        </div>
      </div>
    </div>
  )
}

export const query = graphql`
  query mapDataQuery {
    allAirtable {
      nodes {
        data {
          us_region
          us_lon
          us_lat
          us_city
          ja_region_j
          ja_region
          ja_lon
          ja_lat
          ja_city_j
          ja_city
        }
      }
    }
  }
`

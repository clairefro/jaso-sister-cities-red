import React, { useState, useRef } from "react"
import { graphql } from "gatsby"
import ReactMapboxGl, { Marker } from "react-mapbox-gl"

import "../styles/index.scss"

import City from "../components/city"

const Map = ReactMapboxGl({
  accessToken: process.env.GATSBY_MAPBOX_KEY,
})

const usDefaultCenter = { coord: [-122.676483, 44.023064], zoom: 5.3 }
const jaDefaultCenter = { coord: [139.839478, 35.652832], zoom: 4 }

export default function Home({ data }) {
  const [mapData, setData] = useState(
    (data && data.allAirtable && data.allAirtable.nodes) || []
  )
  const [center, setCenter] = useState(usDefaultCenter.coord)
  const [zoom, setZoom] = useState(usDefaultCenter.zoom)
  const mapRef = useRef()

  const flyTo = (coors, zm) => {
    mapRef.current.state.map.flyTo({ center: coors, essential: true, zoom: zm })
  }

  // const changeCenter = () => {
  //   const newCenter = mapRef.current.state.map.transform._center
  //   setCenter(newCenter)
  // }

  console.log(mapData)
  return (
    <div>
      <div className="container">
        <h1 className="text-center">Sister Cities</h1>
        <div className="map">
          <div className="controls">
            <button
              onClick={() => flyTo(jaDefaultCenter.coord, jaDefaultCenter.zoom)}
            >
              Go to Japan
            </button>
            <button
              onClick={() => flyTo(usDefaultCenter.coord, usDefaultCenter.zoom)}
            >
              Go to Oregon/SW Washington
            </button>
          </div>
          <Map
            style="mapbox://styles/mapbox/light-v10"
            containerStyle={{
              height: "100%",
              width: "100%",
            }}
            center={center}
            zoom={[zoom]}
            flyToOptions={{ speed: 0.8 }}
            ref={mapRef}
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

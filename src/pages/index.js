import React, { useState, useRef } from "react"
import { graphql } from "gatsby"
import ReactMapboxGl, { Marker } from "react-mapbox-gl"

import "../styles/index.scss"

import City from "../components/city"
import InfoBox from "../components/infoBox"
import Controls from "../components/controls"

const Map = ReactMapboxGl({
  accessToken: process.env.GATSBY_MAPBOX_KEY,
})

const US_DEFAULT_CENTER = { coord: [-122.676483, 44.023064], zoom: 5.3 }
const JA_DEFAULT_CENTER = { coord: [139.839478, 35.652832], zoom: 4 }

export default function Home({ data }) {
  const [mapData, setData] = useState(
    (data && data.allAirtable && data.allAirtable.nodes) || []
  )
  const [center, setCenter] = useState(US_DEFAULT_CENTER.coord)
  const [zoom, setZoom] = useState(US_DEFAULT_CENTER.zoom)
  const [isLight, setIsLight] = useState(false)
  const [infoBoxData, setInfoBoxData] = useState(null)
  const [infoIsVisible, setInfoIsVisible] = useState(false)
  const mapRef = useRef()

  const flyTo = (coors, zm) => {
    mapRef.current.state.map.flyTo({
      center: coors,
      essential: true,
      zoom: zm || 5,
    })
  }

  const populateInfoBox = info => {
    setInfoBoxData(info)
    setInfoIsVisible(true)
  }
  const closeInfoBox = () => {
    setInfoIsVisible(false)
  }

  // TODO remove. for QA purpose only
  const changeTheme = () => {
    setIsLight(!isLight)
  }

  return (
    <div>
      <div className="container">
        <h1 className="text-center">JASO Sister Cities</h1>
        <button onClick={changeTheme}>Change map theme</button>
        <div className="map">
          {infoBoxData && (
            <InfoBox
              info={infoBoxData}
              infoIsVisible={infoIsVisible}
              closeInfoBox={closeInfoBox}
              flyTo={flyTo}
            />
          )}
          <Controls
            flyTo={flyTo}
            jaCenter={JA_DEFAULT_CENTER}
            usCenter={US_DEFAULT_CENTER}
          />
          <Map
            style={
              isLight
                ? "mapbox://styles/mapbox/light-v10"
                : "mapbox://styles/mapbox/streets-v11"
            }
            containerStyle={{
              height: "100%",
              width: "100%",
            }}
            center={US_DEFAULT_CENTER.coord}
            zoom={[US_DEFAULT_CENTER.zoom]}
            flyToOptions={{ speed: 0.8 }}
            ref={mapRef}
          >
            {mapData.map((d, i) => {
              const city = d.data
              const isInvalid =
                city.isInvalid === "true" || city.isInvalid === undefined
              if (isInvalid) return null

              return (
                <div className="city" key={i}>
                  <Marker
                    key={`${i}-us`}
                    coordinates={[city.us_lon, city.us_lat]}
                  >
                    <City
                      data={d.data}
                      flyTo={flyTo}
                      populateInfoBox={populateInfoBox}
                      type="us"
                    ></City>
                  </Marker>
                </div>
              )
            })}
            {mapData.map((d, i) => {
              const city = d.data
              return (
                <div className="city" key={i}>
                  <Marker
                    key={`${i}-ja`}
                    coordinates={[city.ja_lon, city.ja_lat]}
                  >
                    <City
                      data={d.data}
                      flyTo={flyTo}
                      populateInfoBox={populateInfoBox}
                      type="ja"
                    ></City>
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
          us_region_j
          us_lon
          us_lat
          us_city_j
          us_city
          ja_region_j
          ja_region
          ja_lon
          ja_lat
          ja_city_j
          ja_city
          isInvalid
        }
      }
    }
  }
`

// light style : mapbox://styles/mapbox/light-v10

// onStyleLoad={() =>
//   flyTo(US_DEFAULT_CENTER.coord, US_DEFAULT_CENTER.zoom)
// }

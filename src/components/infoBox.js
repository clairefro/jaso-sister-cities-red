import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import SVG from "react-inlinesvg"

import flag_us from "../../static/icons/flag-us.svg"
import flag_ja from "../../static/icons/flag-ja.svg"

const InfoBox = ({ info, flyTo, closeInfoBox, infoIsVisible, type }) => {
  const [curInfo, setCurInfo] = useState(info)

  useEffect(() => {
    setCurInfo(info)
  }, [info])

  if (!curInfo.thisItem) return null

  const handleFly = () => {
    flyTo(curInfo.sisterItem.coords, 8)
    switchCities()
  }
  const switchCities = () => {
    setCurInfo({
      thisItem: curInfo.sisterItem,
      sisterItem: curInfo.thisItem,
      shared: curInfo.shared,
    })
  }

  const linksToArray = linkStr => {
    if (!!!linkStr) return []
    return linkStr.replace(/\s/, "").split(",")
  }

  const en_links =
    curInfo.shared && curInfo.shared.en_links
      ? linksToArray(curInfo.shared.en_links)
      : []

  const ja_links =
    curInfo.shared && curInfo.shared.ja_links
      ? linksToArray(curInfo.shared.ja_links)
      : []

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

  const prettyUrl = url => {
    return url.replace(/^https?:\/\/(www\.)?/, "")
  }

  const truncate = str => {
    const maxLength = 24
    if (str.length < maxLength) {
      return str
    } else {
      return str.substring(0, maxLength) + " (...) "
    }
  }

  const LinkItem = ({ link, flagSrc }) => (
    <div className="link-item dont-break-out">
      <SVG src={flagSrc} />
      <a href={link} target="_blank" rel="noreferrer noopener">
        {truncate(prettyUrl(link))}
      </a>
    </div>
  )

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
      {curInfo.shared.year_established && (
        <p>Established {curInfo.shared.year_established}年提携</p>
      )}

      {curInfo.shared.description && (
        <p style={{ whiteSpace: "pre-line" }}>
          {curInfo.shared.description.replace(/\\n/g, <br />)}
        </p>
      )}
      <div className="info-links">
        {en_links.map((l, i) => (
          <LinkItem key={i} flagSrc={flag_us} link={l} />
        ))}
      </div>
      <div className="info-links">
        {ja_links.map((l, i) => (
          <LinkItem key={i} flagSrc={flag_ja} link={l} />
        ))}
      </div>
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

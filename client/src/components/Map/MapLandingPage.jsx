import React, { useState, useEffect } from "react";
import "./Map.css";
import axios from "axios";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import { formatRelative } from "date-fns";

import "@reach/combobox/styles.css";
import mapStyles from "./mapStyles";

const libraries = ["places"];
const mapContainerStyle = {
  height: "70vh",
  width: "70vw",
};
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};
const center = {
  lat: 43.6532,
  lng: -79.3832,
};

const getAllEvents = axios.create({
  withCredentials: true,
});

export function MapLandingPage(props) {
  const [count, setCount] = useState();
  const [data, setData] = useState([]);
  const [widthstate, setWidthstate] = useState("100vw");
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const baseURL = `http://localhost:5000/api/event/getEvents`;
    getAllEvents.get(baseURL).then((events) => {
      setMarkers(events.data);
    });
  }, []);

  // const [formVisibility, setFormVisibility] = useState(false);
  const DUMMYmARKERS = [
    { lat: 28.0939367, lng: 15.5391733, info: "bla" },
    { lat: 28.036808, lng: -15.6287684, info: "bla2" },
    { lat: 28.136808, lng: -15.4287684, info: "bla3" },
    { lat: 28.236808, lng: -15.3287684, info: "bla4" },
    { lat: 28.336808, lng: -15.787684, info: "bla5" },
  ];

  // const botoncillo = () => {
  //   // setWidthstate("50vw");
  //   console.log("click en el boton");
  //   //   useEffect(() => {
  //   //     debugger;
  //   // Axios.get("http://localhost:2345/Api/employee/DemoData").then((result) =>
  //   //   setData(result.data)
  //   // );
  //   // console.log(data);
  //   axios
  //     .get("https://ufab-project3.herokuapp.com/api")
  //     .then((response) => console.log(response))
  //     .catch((err) => console.log(err));
  //   //     debugger;
  //   //   }, []);
  //   //  }
  // };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,

    libraries,
  });
  // const [markers, setMarkers] = React.useState();
  const [selected, setSelected] = useState(null);
  const onMapClick = React.useCallback((e) => {
    //  setMarkers((current) => [
    //   ...current,
    //   {
    //     lat: e.latLng.lat(),
    //     lng: e.latLng.lng(),
    //     //time: new Date(),
    //   },
    // ]);
    //console.log(e.latLng.lat())
  }, []);

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
    navigator.geolocation.getCurrentPosition(
      (position) => {
        panTo({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => null
    );
  }, []);

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return (
    <>
      <div className="Map">
        {/*     <Locate panTo={panTo} />
       <Search panTo={panTo} /> */}

        <GoogleMap
          id="map"
          mapContainerStyle={mapContainerStyle}
          zoom={11}
          center={center}
          options={options}
          onClick={onMapClick}
          onLoad={onMapLoad}
        >
          {markers.map((marker) => (
            <Marker
              position={{ lat: marker.lat, lng: marker.lng }}
              onClick={() => {
                // props.formVisibilityFunctionProp();
                setSelected(marker); /// comentando esta linea no sale el infowindows
                // props.markerWindowContentFunction(marker.lat, marker.info);
                // console.log(marker);
              }}
            />
          ))}

          {/* {markers.map((marker) => (
          <Marker
            key={`${marker.lat}-${marker.lng}`}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => {
              setSelected(marker);

              //    console.log("marker", markers);
              // setWidthstate("50vw");
              //  props.formVisibilityFunctionProp();
              //   props.markerWindowContentFunction(marker.lat, marker.lat);
            }}
            icon={{
              // url: `/bear.svg`,
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
              scaledSize: new window.google.maps.Size(30, 30),
            }}
          />
        ))} */}

          {selected ? (
            <InfoWindow
              position={{ lat: selected.lat, lng: selected.lng }}
              onCloseClick={() => {
                setSelected(null);
              }}
            >
              <div>
                <h2>{selected.sportName}</h2>
                <p> {selected.description}</p>
              </div>
            </InfoWindow>
          ) : null}
        </GoogleMap>
        <button
          className="bt"
          onClick={() => {
            console.log("markers", markers);
            navigator.geolocation.getCurrentPosition(
              (position) => {
                panTo({
                  lat: position.coords.latitude,
                  lng: position.coords.longitude,
                });
              },
              () => null
            );
          }}
        >
          Center
        </button>
      </div>
      {selected ? (
        <div className="event">
          {" "}
          <h3>{selected.sportName} </h3>
          <p>{selected.description}</p>
        </div>
      ) : null}
    </>
  );
}

function Locate({ panTo }) {
  return (
    <button
      className="locate"
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            panTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          () => null
        );
      }}
    >
      <img src="/compass.svg" alt="compass" />
    </button>
  );
}

function Search({ panTo }) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 43.6532, lng: () => -79.3832 },
      radius: 100 * 1000,
    },
  });

  // https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletionRequest

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      panTo({ lat, lng });
    } catch (error) {
      console.log("😱 Error: ", error);
    }
  };

  return (
    <div className="search">
      <Combobox onSelect={handleSelect}>
        <ComboboxInput
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder="Search your location"
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" &&
              data.map(({ id, description }) => (
                <ComboboxOption key={id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
}

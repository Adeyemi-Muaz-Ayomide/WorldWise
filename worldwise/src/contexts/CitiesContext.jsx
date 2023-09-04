/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect } from "react";

const CitiesContext = createContext();

const BASE_URL = "http://localhost:8000";

import { useReducer } from "react";

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_CITIES_START":
      return { ...state, isLoading: true };
    case "FETCH_CITIES_SUCCESS":
      return {
        ...state,
        cities: action.payload,
        isLoading: false,
      };
    case "FETCH_CITIES_ERROR":
      alert("There was an error fetching cities");
      return { ...state, isLoading: false };
    case "GET_CITY_START":
      return { ...state, isLoading: true };
    case "GET_CITY_SUCCESS":
      return {
        ...state,
        currentCity: action.payload,
        isLoading: false,
      };
    case "GET_CITY_ERROR":
      alert("There was an error loading cities");
      return { ...state, isLoading: false };
    case "CREATE_CITY_START":
      return { ...state, isLoading: true };
    case "CREATE_CITY_SUCCESS":
      return {
        ...state,
        cities: [...state.cities, action.payload],
        isLoading: false,
      };
    case "CREATE_CITY_ERROR":
      alert("There was an error creating city");
      return { ...state, isLoading: false };
    case "DELETE_CITY_START":
      return {
        ...state,
        isLoading: true,
      };
    case "DELETE_CITY_SUCCESS":
      return {
        ...state,
        cities: state.cities.filter((city) => city.id !== action.payload),
        isLoading: false,
      };
    case "DELETE_CITY_ERROR":
      alert("There was an error deleting city");
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

const CitiesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        dispatch({ type: "FETCH_CITIES_START" });
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({ type: "FETCH_CITIES_SUCCESS", payload: data });
      } catch (error) {
        dispatch({ type: "FETCH_CITIES_ERROR" });
      }
    };
    fetchCities()
  }, []);

  const getCity = async (id) => {
    try {
      dispatch({ type: "GET_CITY_START" });
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      dispatch({ type: "GET_CITY_SUCCESS", payload: data });
    } catch (error) {
      dispatch({ type: "GET_CITY_ERROR" });
    }
  };

  const createCity = async (newCity) => {
    try {
      dispatch({ type: "CREATE_CITY_START" });
      const res = await fetch(`${BASE_URL}/cities/`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      dispatch({ type: "CREATE_CITY_SUCCESS", payload: data });
    } catch (error) {
      dispatch({ type: "CREATE_CITY_ERROR" });
    }
  };

  const deleteCity = async (id) => {
    try {
      dispatch({ type: "DELETE_CITY_START" });
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "DELETE_CITY_SUCCESS", payload: id });
    } catch (error) {
      dispatch({ type: "DELETE_CITY_ERROR" });
    }
  };

  return (
    <CitiesContext.Provider
      value={{
        cities: state.cities,
        isLoading: state.isLoading,
        currentCity: state.currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
};

const useCities = () => {
  const context = useContext(CitiesContext);
  if (context === undefined) {
    throw new Error("useCities must be used within a CitiesProvider");
  }
  return context;
};

export { CitiesContext, CitiesProvider, useCities };

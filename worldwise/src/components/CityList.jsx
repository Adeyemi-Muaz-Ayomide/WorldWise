import PropTypes from "prop-types";
// eslint-disable-next-line react/prop-types
import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import CityItem from "./CityItem";
import Message from './Message'

const CityList = ({ cities, isLoading }) => {
  if (isLoading) return <Spinner />;

  if(!cities.length) return <Message message='Add your first city by clicking on a city on the map.' />
  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
};

CityList.propTypes = {
  cities: PropTypes.array.isRequired, // 'cities' prop is required and should be an array
  isLoading: PropTypes.bool.isRequired, // 'isLoading' prop is required and should be a boolean
};

export default CityList;

import React, { useState, useEffect } from "react";
import './App.css';
import {MenuItem,FormControl,Select,Card,CardContent,} from "@material-ui/core";
import InfoBox from './InfoBox.js'
import Maps from './Maps'
import Table from './Table.js'
import { prettyPrintStat, sortData } from "./util";
import LineGraph from "./LineGraph";
import "leaflet/dist/leaflet.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [country,setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData]= useState([]);
  const [mapCenter, setMapCenter]= useState({lat: 34.80746,lng: -40.4796 });
  const [mapZoom, setMapZoom]= useState(3);
  const [mapCountries, setMapCountries]= useState([]);

  useEffect(()=>{
    fetch("https://disease.sh/v3/covid-19/all")
    .then(response => response.json())
    .then(data => {
      setCountryInfo(data);
    })
  },[])

  useEffect(() => {
   const getCountriesData = async () =>{
     await fetch ("https://disease.sh/v3/covid-19/countries")
     .then((response)=> response.json())
     .then((data) => {
       const countries = data.map((country)=>(
         {
           name: country.country,
           value: country.countryInfo.iso2
         }
       ));
       const sortedData = sortData(data);
       setTableData(sortedData);
       setMapCountries(data);
       setCountries(countries);
     });
   };
   getCountriesData();
  }, []);

  const onCountryChange = async (event) =>{
    const countryCode = event.target.value;
    // console.log(countryCode);
    // setCountry(countryCode);
    const url = countryCode === 'worldwide' 
    ? "https://disease.sh/v3/covid-19/all" 
    : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
    .then(response => response.json())
    .then(data =>{
      setCountry(countryCode);
      setCountryInfo(data);
      setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
      setMapZoom(4);

    })
  };

  console.log("hellooooo",countryInfo);

  return (
    <div className="app">
      <div className='app_left'>
      <div className="app_header">
      <h1>COVID-19 TRACKER</h1>
      <FormControl className="app_dropdown">
        <Select variant="outlined" onChange={onCountryChange} value={country}>
        <MenuItem value="worldwide">Worldwide</MenuItem>
          {countries.map((country)=>(
            <MenuItem value={country.value}>{country.name}</MenuItem>
          ))}
        
        </Select>
      </FormControl>
      </div>

      <div className="app_stats">
          <InfoBox title="Coronavirus Case" total={prettyPrintStat(countryInfo.cases)} cases={prettyPrintStat(countryInfo.todayCases)}/>
          <InfoBox title="Recovered" total={prettyPrintStat(countryInfo.recovered)} cases={prettyPrintStat(countryInfo.todayRecovered)}/>
          <InfoBox title="Deaths" total={prettyPrintStat(countryInfo.deaths)} cases={prettyPrintStat(countryInfo.todayDeaths)}/>

      </div>

      <Maps countries={mapCountries} center={mapCenter} zoom={mapZoom} />
      </div>
      <Card className='app_right'>
          <CardContent>
          <h3>Live Cases by Country</h3>
          <Table countries={tableData}/>


          <h3>Worldwide new cases</h3>
          <LineGraph />

             {/* graph */}
          </CardContent>
      </Card>
    </div>
  );
}

export default App;


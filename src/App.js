import React, { useEffect, useState } from 'react';
import { Card, CardContent, FormControl, MenuItem, Select} from '@material-ui/core';
import './App.css';
import Infobox from './Infobox/Infobox'
import Map from './Map/Map'
import Table from './Table/Table'
import {sortData} from './util'
import LineGraph from './Graph/LineGraph'
function App() {

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("Worldwide")
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  useEffect(()=>{
    fetch("https://disease.sh/v3/covid-19/all")
    .then(response => response.json())
    .then(data => setCountryInfo(data))
  },[])

  useEffect(()=>{
    //async send a request wait for it and then do something with the information
    const getCountryData = async() =>{
        await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data)=>{
            const countries = data.map((country)=>(
              {
              name: country.country,
              value:country.countryInfo.iso2,
              }
            ))
            const sortedData = sortData(data)
            setCountries(countries);
            setTableData(sortedData);
        })

    }
      getCountryData();
  },[]);

  const onCountryChange = async(event) =>{
    const countryCode = event.target.value; //  to get the value of the dropdown
    
    const url = countryCode === 'worldwide' ? 'https://disease.sh/v3/covid-19/all' : 
    `https://disease.sh/v3/covid-19/countries/${countryCode}`

    await fetch(url)
    .then(response=> response.json())
    .then(data =>{
      setCountry(countryCode); 
        setCountryInfo(data)
    })
  }

  return (
    <div className="app">


      <div className="app__left">
        {/**Header */}
          <div className="app__header">
            <h1>Covid Tracker</h1>
            <FormControl className="app__dropdown">
              <Select variant="outlined" value={country} onChange={onCountryChange}>
                    <MenuItem value="Worldwide">Worldwide</MenuItem>
                {
                  countries.map((country)=>(
                  <MenuItem value={country.value}>{country.name}</MenuItem>
                  ))
                }
                
                
              </Select>
            </FormControl>
          </div>
        {/**info */}
        <div className="app__stats">
          <Infobox title="Coronavirus cases" total={countryInfo.cases} cases={countryInfo.todayCases}/>
          <Infobox title="Recovered" total={countryInfo.recovered} cases={countryInfo.todayRecovered}/>
          <Infobox title="Deaths" total={countryInfo.deaths} cases={countryInfo.todayDeaths}/>
        </div>
        {/**Map */}
        <Map/>
      </div>


      <div>
        <Card className="app__right">
          <CardContent>
              {/**Table */}
              <h3>Live Cases</h3>
              <Table countries={tableData}/>
             {/**Graph */}
             <h3>Worldwide Cases</h3>
             <LineGraph/>
          </CardContent>
        </Card>
             
      </div>
      
      
     
    
      
    </div>
  );
}

export default App;

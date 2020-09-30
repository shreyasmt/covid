import React, { useEffect, useState } from 'react';
import { Card, CardContent, FormControl, MenuItem, Select} from '@material-ui/core';
import './App.css';
import Infobox from './Infobox/Infobox'
import Map from './Map/Map'
import Table from './Table/Table'
import {sortData, prettyPrintStat} from './util'
import LineGraph from './Graph/LineGraph'
import "leaflet/dist/leaflet.css"
function App() {

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("Worldwide")
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, SetMapCenter] = useState({lat:34.8076, lng:-40.4796})
  const [zoomCenter, SetZoomCenter] = useState(3)
  const [mapCountries, setMapCountries] = useState([])
  const [casesType, setCasesType]=useState("cases");
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
            setMapCountries(data);
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
        setCountryInfo(data);
        SetMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        SetZoomCenter(4);
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
          <Infobox isRed active={casesType === "cases"} onClick={(e)=>setCasesType('cases')} title="Coronavirus cases" total={prettyPrintStat(countryInfo.cases)} cases={prettyPrintStat(countryInfo.todayCases)}/>
          <Infobox active={casesType === "recovered"} onClick={(e)=>setCasesType('recovered')} title="Recovered" total={prettyPrintStat(countryInfo.recovered)} cases={prettyPrintStat(countryInfo.todayRecovered)}/>
          <Infobox isRed active={casesType === "deaths"} onClick={(e)=>setCasesType('deaths')} title="Deaths" total={prettyPrintStat(countryInfo.deaths)} cases={prettyPrintStat(countryInfo.todayDeaths)}/>
        </div>
        {/**Map */}
        <Map casesType={casesType} countries={mapCountries} center={mapCenter} zoom={zoomCenter}/>
      </div>


      <div>
        <Card className="app__right">
          <CardContent>
              {/**Table */}
              <h3>Live Cases</h3>
              <Table countries={tableData}/>
             {/**Graph */}
              <h3 className="app__graphtitle">Worldwide Cases {casesType}</h3>
             <LineGraph className="app__graph" casesType={casesType}/>
          </CardContent>
        </Card>
             
      </div>
      
      
     
    
      
    </div>
  );
}

export default App;

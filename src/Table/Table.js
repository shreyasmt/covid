import React from 'react'
import './Table.css'
import numeral from 'numeral'

const Table = ({countries}) => {
    return (
        <div className="table"> 
              <div className="table">
                    {countries.map((country) => (
                        <tr>
                        <td>{country.country}</td>
                        <td>
                            <strong>{numeral(country.cases).format("0,0")}</strong>
                        </td>
                        </tr>
                    ))}
                </div>
        </div>
    )
}

export default Table

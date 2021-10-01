import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';


export const Home = () => {
	const [drugName, setDrugName] = useState('');
	const [resultData, setResultData] = useState(null);


	const handleClick = () => {
		axios
	      .get(`https://rxnav.nlm.nih.gov/REST/drugs.json?name=${drugName}`)
	      .then(function (response) {
	        // handle success
	        console.log(response.data.drugGroup);
	        setResultData(response.data.drugGroup.conceptGroup);
	      })
	      .catch(function (error) {
	        // handle error
	        console.log(error);
	      });
	}

	const handleChange = (event) => {
		setDrugName(event.target.value);
	}

	const getListItem = (name, rxcui, synonym) => {
		return (
			<li>
				<Link to={ {pathname: `/drugs/${name}`, state: {name: name, rxcui: rxcui, synonym: synonym} }}
					className="list-item">
					{name}
				</Link>
			</li>);
	}

	const getResultList = () => {
		let listItems = [];

		if (resultData) {
			resultData.forEach((result) => {
				if (result.conceptProperties) {
					result.conceptProperties.forEach((property) => {
						listItems.push(getListItem(property.name, property.rxcui, property.synonym));
					}); 
				}
			});
		}
		
		return listItems;
	}

	return (
		<div className="home-page">
			<div className="search-bar">
				<input type="text" placeholder="Type to begin search" onKeyDown={event => handleClick(event)} onChange={event => handleChange(event)}/>
				<button onClick={handleClick}>Search</button>
			</div>
			<ul>
				{getResultList()}
			</ul>
		</div>
	);
}

export default Home;
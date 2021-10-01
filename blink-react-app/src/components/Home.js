import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';
import '../bootstrap.min.css';


export const Home = () => {
	const [drugName, setDrugName] = useState('');
	const [resultData, setResultData] = useState([]);
	const [resultList, setResultList] = useState([]);
	const [suggList, setSuggList] = useState([]);

	const showSuggestions = () => {
		axios
	      .get(`https://rxnav.nlm.nih.gov/REST/spellingsuggestions.json?name=${drugName}`)
	      .then(function (response) {
	 
	        if (response.data.suggestionGroup.suggestionList) {
	        	setSuggList(response.data.suggestionGroup.suggestionList.suggestion);
	        }
	        
	      })
	      .catch(function (error) {
	        // handle error
	        console.log(error);
	      });
	}


	const handleClick = (event) => {
		setDrugName(event.target.value);
		axios
	      .get(`https://rxnav.nlm.nih.gov/REST/drugs.json?name=${drugName}`)
	      .then(function (response) {
	        
	        if (response.data.drugGroup.conceptGroup) {
	        	setResultData(response.data.drugGroup.conceptGroup);
	        } else {
	        	showSuggestions();
	        }
	        
	      })
	      .catch(function (error) {
	        // handle error
	        console.log(error);
	      });
	}

	const getListItem = (name, rxcui, synonym) => {
		return (
			<li>
				<Link to={ {pathname: `/drugs/${name}`, state: {name: name, rxcui: rxcui, synonym: synonym} }}
					className="list-group-item">
					{name}
				</Link>
			</li>);
	}

	// TODO: debug to understand why this keeps returning 0
	const hasConceptProperties = (resultData) => {
		
		resultData.forEach((result) => {
			if ('conceptProperties' in result) {
				return 1;
			}
		});

		return 0;
	}

	const getResultList = () => {
		let listItems = [];

		const hasData = hasConceptProperties(resultData);

		if (resultData) {
			resultData.forEach((result) => {
				if (result.conceptProperties) {
					result.conceptProperties.forEach((property) => {
						listItems.push(getListItem(property.name, property.rxcui, property.synonym));
					}); 
				}
			});
		} 
		else if (suggList) {
			suggList.forEach((sugg) => {
				listItems.push((<li>{sugg}</li>));
			})
		} 

		return listItems;
	}

	return (
		<div className="container">
			<div className="home-page">
				<div className="home-title">Search for Drugs !</div>
				<div className="search-bar">
					<input type="text" placeholder="Type to begin search" onKeyPress={event => handleClick(event)} onKeyDown={event => handleClick(event)} onChange={event => handleClick(event)}/>
					<button onClick={event => handleClick(event)}>Search</button>
				</div>
				<ul className="list-group">
					{getResultList()}
				</ul>
			</div>
		</div>
	);
}

export default Home;
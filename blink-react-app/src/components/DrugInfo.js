import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

export const DrugInfo = () => {
	const { drugName } = useParams();
	const location = useLocation();
	const { name, rxcui, synonym } = location.state;
	const [drugData, setDrugData] = useState(null);


	useEffect(() => {
		axios
	      .get(`https://rxnav.nlm.nih.gov/REST/rxcui/${rxcui}/ndcs.json`)
	      .then(function (response) {
	        // handle success
	        setDrugData(response.data.ndcGroup.ndcList.ndc);
	      })
	      .catch(function (error) {
	        // handle error
	        console.log(error);
	      });
	}, [rxcui]);

	

	const getNdcList = () => {
		let listItems = [];
		if (drugData) {
			drugData.forEach (ndc => {
				listItems.push(<li>{ndc}</li>);
			})
		}

		return listItems;
	}


	return (
	<div className="container">
		<div className="drug-info-page">
			<div className="card">
			  <div class="card-body">
			  	<h5 class="card-title">{drugName}</h5>
			    <h6 class="card-title">NAME: {drugName}</h6>
			    <h6 class="card-subtitle mb-2 text-muted">SYNONYM: {synonym}</h6>
			    <p class="card-text">RXCUI: {rxcui}</p>
			  </div>
			</div>

			<div className="card" >
			  <h5 class="card-title">NDC List:</h5>
			  <ul class="list-group list-group-flush">
			    {getNdcList()}
			  </ul>
			</div>
		</div>
	</div>
	);
}

export default DrugInfo; 
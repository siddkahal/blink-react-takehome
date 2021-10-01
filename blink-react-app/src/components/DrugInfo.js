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
		<div className="drug-info-page">
			{drugName}
			{rxcui}
			{synonym}
			<div className="ndc-list">
				<ul>
					{getNdcList()}
				</ul>
			</div>
		</div>
	);
}

export default DrugInfo; 
import type { NextApiRequest, NextApiResponse } from 'next'
import fetch from 'node-fetch';
const API_KEY = process.env.API_KEY || '';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
	try {
		const {lat, lon} = req.query;
		const response = await fetch(`https://api.api-ninjas.com/v1/weather?lat=${lat}&lon=${lon}`, {
			headers: {
				'X-Api-Key': API_KEY
			}
		});
		const weather = await response.json();
		res.send({weather});
	} catch(_err) {
		res.status(404).send({error: 'City not found'});
	}

}

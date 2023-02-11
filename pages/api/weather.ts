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
		const responseTime = await fetch(`https://api.api-ninjas.com/v1/worldtime?lat=${lat}&lon=${lon}`, {
			headers: {
				'X-Api-Key': API_KEY
			}
		});
		const timeJson : any = await responseTime.json();
		const weather = await response.json();
		res.send({weather, timezone: timeJson?.timezone});
	} catch(_err) {
		res.status(404).send({error: 'City not found'});
	}

}

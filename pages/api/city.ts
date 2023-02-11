import type { NextApiRequest, NextApiResponse } from 'next'
import fetch from 'node-fetch';
const API_KEY = process.env.API_KEY || '';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
	try {
		const name = req.query.name;
		const response = await fetch(`https://api.api-ninjas.com/v1/city?name=${name}`, {
			headers: {
				'X-Api-Key': API_KEY
			}
		});
		const cities = await response.json();
		res.send({cities});
	} catch(_err) {
		res.status(404).send({error: 'City not found'});
	}

}

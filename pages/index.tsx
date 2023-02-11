import { Fragment, useState } from 'react';
import axios from 'axios';
import CitySelector, { City } from "@/components/atoms/citySelector";
import WeatherCard, { Weather } from "@/components/atoms/weatherCard";
import Toggle from 'react-toggle';
import Image from 'next/image';
import { format } from 'date-fns';

const formatCurrentDate = (date : number) => format(date, 'MMMM do, u - hh:mm a');

export default function Home() {
	
	const [weather, setWeather] = useState<Weather | undefined>();
	const [isLoading, setIsLoading] = useState(false);
	const [isCelsius, setIsCelsius] = useState(true);
	const [city, setCity] = useState<City>();
	const [time, setTime] = useState(Date.now());

	const lookupWeather = async (city : City) => {
		try {
			setCity(city);
			setIsLoading(true);
			const response = await axios.get('/api/weather', {
				params: {
					lat: city.latitude,
					lon: city.longitude
				}
			});

			setWeather(response.data.weather);
			setTime(Date.now());

		} finally {
			setIsLoading(false);
		}


	}
	return (
		<div className='flex flex-col items-center py-4'>
			<Image priority width={200} height={200} src='/weather.png' alt='Weather Icon'/>
			<h1 className='font-bold text-2xl m-4'>Simple weather app</h1>
			<CitySelector onChange={city => lookupWeather(city)}/>
			<div className='flex items-center gap-2 m-4'>
				<span className={!isCelsius ? 'font-semibold' : 'text-gray-400'}>Fahrenheit</span>
				<Toggle 
					checked={isCelsius} 
					onChange={() => setIsCelsius(s => !s)}
					icons={false}
				/>
				<span className={isCelsius ? 'font-semibold' : 'text-gray-400'}>Celsius</span>
			</div>
			{isLoading ? (
				<p>loading...</p>
			) : (
				<Fragment>
					{time && city && (
						<div className='flex flex-col item-center m-4'>
							<h2 className='font-bold text-center text-lg'>{city?.name}</h2>
							<h3 className='text-center'>{formatCurrentDate(time)}</h3>
						</div>
					)}
					<WeatherCard isCelsius={isCelsius} weather={weather}/>
				</Fragment>
			)}
		</div>
	);
}

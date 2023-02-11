import { Fragment, useCallback } from "react"; 
import { utcToZonedTime, format } from "date-fns-tz";


export interface Weather { 
	wind_speed: number; 
	wind_degrees: number; 
	temp: number; 
	humidity: number;
	sunset: number;
	min_temp: number;
	cloud_pct: number;
	feels_like: number;
	sunrise: number;
	max_temp: number;
}

interface WeatherCardProps {
	weather?: Weather;
	timeZone?: string;
	isCelsius: boolean;
}

export default function WeatherCard({weather, timeZone, isCelsius = true} : WeatherCardProps) : JSX.Element {

	const temp = useCallback((t : number) => {
		if (isCelsius) {
			return `${t} C`;
		} else {
			const f = Math.round((t * (9/5)) + 32);
			return `${f} F`;
		}

	}, [isCelsius]);

	const formatTime = useCallback((time : number) => {
		if (!timeZone) return '';
		const zonedTime = utcToZonedTime(time * 1000, timeZone);
		return format(zonedTime, 'hh:mm aaa', {timeZone});
	}, [timeZone]);

	return (
		<div className='grid grid-cols-2 p-2 rounded gap-5 bg-[#F2F3F8] shadow'>
			{weather ? (
				<Fragment>
					<Row label='Temperature' value={temp(weather.temp)}/>
					<Row label='Wind degrees' value={`${weather.wind_degrees}°`}/>
					<Row label='Wind speed' value={`${weather.wind_speed} Km/h`}/>
					<Row label='Humidity' value={`${weather.humidity} %`}/>
					<Row label='Sunset' value={formatTime(weather.sunset)}/>
					<Row label='Sunrise' value={formatTime(weather.sunrise)}/>
					<Row label='Min temp' value={temp(weather.min_temp)}/>
					<Row label='Max temp' value={temp(weather.max_temp)}/>
					<Row label='Feels like' value={temp(weather.feels_like)}/>
				</Fragment>
			) : (
				<div className='col-span-2'>
					You have to select a city first
				</div>
			)}
		</div>
	);
}
function Row({label, value} : {label: string, value: string}) : JSX.Element {
	return (
		<Fragment>
			<span className='font-semibold'>{label}</span>
			<span>{value}</span>
		</Fragment>
	);
}

import AsyncSelect from 'react-select/async';
import axios from 'axios';

export interface City {
	country: string;
	is_capital: boolean;
	latitude: number;
	longitude: number;
	name: string;
	population: number;
}
interface CitySelectorProps {
	onChange: (_city : City) => void;
}
export default function CitySelector({onChange} : CitySelectorProps) : JSX.Element {
	const loadOptions = async (value : string) => {
		const response = await axios.get<{cities: City[]}>('/api/city', {
			params: {
				name: value
			}
		});
		const cities = response.data.cities;
		return cities.map(city => ({
			label: city.name,
			value: city
		}))
	}
	return (
		<div>
			<AsyncSelect 
				placeholder='Search a city...'
				styles={{control: (base) => ({...base, width: 250})}} 
				instanceId='city-selector' 
				onChange={(option) => !!option?.value && onChange(option.value)} 
				loadOptions={loadOptions}
			/>
		</div>
	);
}

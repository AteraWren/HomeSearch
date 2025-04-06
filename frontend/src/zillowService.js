import axios from "axios";

const zillowService = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL, // Use the environment variable
	headers: {
		"Content-Type": "application/json",
	},
});

export const getProperties = async (query) => {
	try {
		const response = await zillowService.get(`/propertyExtendedSearch`, {
			params: { location: query },
		});
		return response.data.properties;
	} catch (error) {
		console.error("Error searching properties:", error);
		throw error;
	}
};

export const getPropertiesByURL = async (url) => {
	const options = {
		method: "GET",
		url: `${BASE_URL}/properties_list.php`,
		params: {
			url: url,
		},
		headers: {
			"x-rapidapi-key": import.meta.env.VITE_API_KEY, // Use the environment variable
			"x-rapidapi-host": "zillow-com-property-data.p.rapidapi.com",
		},
	};

	try {
		const response = await axios.request(options);
		return response.data;
	} catch (error) {
		console.error("Error searching properties by URL:", error);
		throw error;
	}
};

export const getPropertiesByAddress = async (address) => {
	const url = `${import.meta.env.VITE_API_BASE_URL}/pro/byaddress`;

	const options = {
		method: "GET",
		url: url,
		params: {
			propertyaddress: address,
		},
		headers: {
			"x-rapidapi-key": import.meta.env.VITE_API_KEY,
			"x-rapidapi-host": "zillow-working-api.p.rapidapi.com",
		},
	};

	try {
		const response = await axios.request(options);
		return response.data.propertyDetails; // Return the propertyDetails field
	} catch (error) {
		console.error("Error searching properties by address:", error);
		throw error;
	}
};

export const getPropertyDetails = async (propertyId) => {
	try {
		const response = await zillowService.get(`/property/${propertyId}`);
		return response.data;
	} catch (error) {
		console.error("Error getting property details:", error);
		throw error;
	}
};

export const register = async (username, email, password) => {
	try {
		const response = await axios.post(
			`${import.meta.env.VITE_API_BASE_URL}/register`,
			{
				username,
				email,
				password,
			}
		);
		return response.data;
	} catch (error) {
		console.error("Registration failed:", error);
		throw error;
	}
};

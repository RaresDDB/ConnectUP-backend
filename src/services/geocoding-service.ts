import axios from "axios";

class GeocodingService {
    async getDetailsByCoords(lat: number, lng: number) {
        const apiKey = process.env.GOOGLE_API_KEY;

        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;

        const response = await axios.get(url);

        if (response.data && response.data.results && response.data.results.length > 0) {
            return response.data.results[0].formatted_address;
        }

        return "Address not found";
    }

    async getCoordsByAddress(address: string): Promise<{ lat: number, lng: number }> {
        const apiKey = process.env.GOOGLE_API_KEY;

        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`;

        const response = await axios.get(url);

        if (response.data && response.data.results && response.data.results.length > 0) {
            return response.data.results[0].geometry.location;
        }

        return { lat: 0, lng: 0 };
    }
}

export default GeocodingService;

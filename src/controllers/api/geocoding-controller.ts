import asyncHandler from "express-async-handler"
import GeocodingService from "../../services/geocoding-service";

class GeocodingController {
    private geocodingService: GeocodingService;

    constructor(geocodingService: GeocodingService) {
        this.geocodingService = geocodingService;
    }

    getCoordsByAddress = asyncHandler(async (req, res) => {
        const coords = await this.geocodingService.getCoordsByAddress(req.params.address);
        res.json(coords);
    })
}

export default GeocodingController;
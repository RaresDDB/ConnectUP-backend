import PaidEventRepository from "../repositories/paid-event-repository";
import { PaidEventCreateServiceDto } from "../types/paid-event-types";

class PaidEventService {
    private repository: PaidEventRepository;

    constructor(repository: PaidEventRepository) {
        this.repository = repository;
    }

    async create(data: PaidEventCreateServiceDto) {
        return this.repository.create(data);
    }
}

export default PaidEventService;

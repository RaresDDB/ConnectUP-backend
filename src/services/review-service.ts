import NotFoundException from "../exceptions/not-found-exception";
import ReviewMapper from "../mappers/review-mapper";
import ReviewRepository from "../repositories/review-repository";
import { ReviewCreateServiceDto } from "../types/review-types";

class ReviewService {
    private repository: ReviewRepository;

    constructor(repository: ReviewRepository) {
        this.repository = repository;
    }

    async create(data: ReviewCreateServiceDto) {
        const review = await this.repository.create(data);
        return ReviewMapper.repoToService(review);
    }

    async getAll() {
        return this.repository.findAll();
    }

    async getById(id: string) {
        const review = await this.repository.findById(id);

        if (!review) {
            throw new NotFoundException('Review not found');
        }

        return review;
    }
}

export default ReviewService;
import util from "util";
import asyncHandler from "express-async-handler";
import GeneratorService from "../../services/generator-service";
import { MessageResponsePayload } from "../../responses/message-response-payload";

class GeneratorController {
    private generatorService: GeneratorService;

    constructor(generatorService: GeneratorService) {
        this.generatorService = generatorService;
    }

    generateAll = asyncHandler(async (_req, res) => {
        await this.generatorService.generateAll();
        res.status(201).json(MessageResponsePayload.success("All data has been generated"));
    })

    generateTags = asyncHandler(async (_req, res) => {
        const count = await this.generatorService.generateTags();
        res.status(201).json(MessageResponsePayload.success(util.format("Successfully generated %d tags", count)));
    })

    generateAdmins = asyncHandler(async (_req, res) => {
        const count = await this.generatorService.generateAdmins();
        res.status(201).json(MessageResponsePayload.success(util.format("Successfully generated %d admins", count)));
    })
}

export default GeneratorController;
import TagService from "../../services/tag-service";
import asyncHandler from "express-async-handler"

class TagController {
    private tagService: TagService;

    constructor(tagService: TagService) {
        this.tagService = tagService;
    }

    getAll = asyncHandler(async (_req, res) => {
        const tags = await this.tagService.getAll();
        res.json({ tags });
    })
}

export default TagController;
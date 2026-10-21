import asyncHandler from "express-async-handler"
import MemberService from "../../services/member-service";

class MemberController {
    private memberService: MemberService;

    constructor(memberService: MemberService) {
        this.memberService = memberService;
    }

    getAll = asyncHandler(async (req, res) => {
        const members = await this.memberService.getAll();
        res.json({ members });
    })
}

export default MemberController;
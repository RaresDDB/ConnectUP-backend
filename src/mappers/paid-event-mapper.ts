import { PaidEvent } from "@prisma/client";

class PaidEventMapper {
    public static repoToService(paidEvent: PaidEvent) {
        return paidEvent;
    }
}

export default PaidEventMapper;
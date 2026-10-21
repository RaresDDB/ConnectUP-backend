import { PrismaClient } from '@prisma/client';
import { EventCreateRepoDto } from '../types/event-types';

const INCLUDE = {
    host: {
        include: {
            user: {
                include: {
                    role: true,
                    userTags: {
                        include: {
                            tag: true
                        }
                    }
                }
            }
        }
    },
    eventTags: {
        include: {
            tag: true
        }
    },
    reviews: {
        include: {
            member: {
                include: {
                    user: {
                        include: {
                            role: true,
                            userTags: {
                                include: {
                                    tag: true
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    paidEvent: true,
    questions: {
        include: {
            member: {
                include: {
                    user: {
                        include: {
                            role: true,
                            userTags: {
                                include: {
                                    tag: true
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    eventAttendees: {
        include: {
            member: {
                include: {
                    user: {
                        include: {
                            role: true,
                            userTags: {
                                include: {
                                    tag: true
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};

class EventRepository {
    private client: PrismaClient;

    constructor(client: PrismaClient) {
        this.client = client;
    }

    async create(data: EventCreateRepoDto) {
        return this.client.event.create({
            data,
            include: INCLUDE
        });
    }

    async findAll() {
        return this.client.event.findMany({
            include: INCLUDE
        });
    }

    async findById(id: string) {
        return this.client.event.findUnique({
            where: { id },
            include: INCLUDE
        });
    }

    async findUpcoming(date: Date) {
        return this.client.event.findMany({
            where: {
                startDate: {
                    gte: new Date(),
                    lte: date
                }
            },
            include: INCLUDE
        });
    }

    async findByAttendeeId(attendeeId: string) {
        return this.client.event.findMany({
            where: {
                eventAttendees: {
                    some: {
                        memberId: attendeeId
                    }
                }
            },
            include: INCLUDE
        });
    }

    async deleteById(id: string) {
        return this.client.event.delete({ where: { id } });
    }
}

export default EventRepository;
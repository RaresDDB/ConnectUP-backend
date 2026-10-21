import TagService from './tag-service';
import UserService from './user-service';
import AuthService from './auth-service';
import RoleService from './role-service';
import AdminService from './admin-service';
import EventService from './event-service';
import MemberService from './member-service';
import ReviewService from './review-service';
import UserTagService from './user-tag-service';
import FavoriteService from './favorite-service';
import QuestionService from './question-service';
import EventTagService from './event-tag-service';
import GeneratorService from './generator-service';
import GeocodingService from './geocoding-service';
import SchedulerService from './scheduler-service';
import PaidEventService from './paid-event-service';
import EventAttendeeService from './event-attendee-service';
import PendingMemberService from './pending-member-service';
import NotificationLogService from './notification-log-service';
import ChangeEmailRequestService from './change-email-request-service';
import ResetPasswordRequestService from './reset-password-request-service';
import ChangePasswordRequestService from './change-password-request-service';
import {
    tagRepository,
    roleRepository,
    userRepository,
    adminRepository,
    eventRepository,
    memberRepository,
    reviewRepository,
    userTagRepository,
    favoriteRepository,
    eventTagRepository,
    questionRepository,
    paidEventRepository,
    pendingMemberRepository,
    eventAttendeeRepository,
    notificationLogRepository,
    resetPasswordRequestRepository,
    changeEmailRequestRepository,
    changePasswordRequestRepository
} from '../repositories';

export const geocodingService = new GeocodingService();

export const tagService = new TagService(
    tagRepository
);

export const roleService = new RoleService(
    roleRepository
);

export const reviewService = new ReviewService(
    reviewRepository
);

export const favoriteService = new FavoriteService(
    favoriteRepository
)

export const eventTagService = new EventTagService(
    eventTagRepository
);

export const changeEmailRequestService = new ChangeEmailRequestService(
    changeEmailRequestRepository
);

export const resetPasswordRequestService = new ResetPasswordRequestService(
    resetPasswordRequestRepository
);

export const changePasswordRequestService = new ChangePasswordRequestService(
    changePasswordRequestRepository
);

export const userTagService = new UserTagService(
    userTagRepository
);

export const userService = new UserService(
    tagService,
    roleService,
    userTagService,
    userRepository
);

export const adminService = new AdminService(
    tagService,
    userService,
    userTagService,
    adminRepository
);

export const memberService = new MemberService(
    tagService,
    userService,
    userTagService,
    memberRepository
);

export const questionService = new QuestionService(
    memberService,
    questionRepository
);

export const generatorService = new GeneratorService(
    tagService,
    adminService
);

export const paidEventService = new PaidEventService(
    paidEventRepository
);

export const eventAttendeeService = new EventAttendeeService(
    eventAttendeeRepository
);

export const eventService = new EventService(
    tagService,
    eventTagService,
    favoriteService,
    geocodingService,
    paidEventService,
    eventAttendeeService,
    eventRepository
);

export const notificationLogService = new NotificationLogService(
    notificationLogRepository
);

export const schedulerService = new SchedulerService(
    eventService,
    notificationLogService
);

export const pendingMemberService = new PendingMemberService(
    userService,
    pendingMemberRepository
);

export const authService = new AuthService(
    userService,
    memberService,
    pendingMemberService,
    changeEmailRequestService,
    resetPasswordRequestService,
    changePasswordRequestService
);
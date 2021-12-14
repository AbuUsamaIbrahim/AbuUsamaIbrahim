package com.mahadi.restapi.util;

public final class UrlConstants {
    private UrlConstants() {

    }

    private static final String API = "/api";
    private static final String VERSION = "/v1";

    public static class UserManagement {
        public static final String ROOT = API + VERSION + "/users";
        public static final String CREATE = "/create";
        public static final String UPDATE = "/{id}";
        public static final String DELETE = "/{id}";
        public static final String GET = "/{id}";
        public static final String GET_ALL = "/all";
        public static final String LOGOUT = "/logout";
        public static final String MATCH_PASSWORD = "/matchPassword";
        public static final String RESET_PASSWORD = "/resetPassword";
    }

    public static class FileManagement {
        public static final String ROOT = API + VERSION + "/files";
        public static final String DOWNLOAD_FILE = "/download";
        public static final String DOWNLOAD_FILE_BY_PARAMS = "/download/params";
    }

    public static class MenuManagement {
        public static final String ROOT = API + VERSION + "/menus";
        public static final String CREATE = "/create";
        public static final String UPDATE = "/{id}";
        public static final String DELETE = "/{id}";
        public static final String GET = "/{id}";
        public static final String GET_ALL = "/all";
    }

    public static class RecipeManagement {
        public static final String ROOT = API + VERSION + "/recipes";
        public static final String CREATE = "/create";
        public static final String UPDATE = "/{id}";
        public static final String DELETE = "/{id}";
        public static final String GET = "/{id}";
        public static final String GET_ALL = "/all";
    }

    public static class IngredientsManagement {
        public static final String ROOT = API + VERSION + "/ingredients";
        public static final String CREATE = "/create";
        public static final String UPDATE = "/{id}";
        public static final String DELETE = "/{id}";
        public static final String GET = "/{id}";
        public static final String GET_ALL = "/all";
    }

    public static class UrlManagement {
        public static final String ROOT = API + VERSION + "/urls";
        public static final String GET = "/{id}";
        public static final String GET_ALL = "/all";
    }

    public static class ActionLogManagement {
        public static final String ROOT = API + VERSION + "/actionLogs";
        public static final String GET_ALL = "/all";
    }

    public static class RoleManagement {
        public static final String ROOT = API + VERSION + "/roles";
        public static final String CREATE = "/create";
        public static final String UPDATE = "/{id}";
        public static final String DELETE = "/{id}";
        public static final String GET = "/{id}";
        public static final String GET_ALL = "/all";
        public static final String GET_ALL_UNDER_LEVEL = "/allUnderLevel/{level}";
        public static final String ASSIGN_URL = "/assignUrl/{id}";
        public static final String ASSIGN_USERS = "/assignUsers/{id}";
    }

    public static class AuthManagement {
        public static final String ROOT = API + "/auth";
        public static final String LOGIN = "/login";
        public static final String FORGOT_PASSWORD = "/forgotPassword";
        public static final String RESET = "/reset";
        public static final String CREATE = "/create";
        public static final String VERIFY_OTP = "/verifyOtp";
        public static final String CHANGE_PASSWORD = "/changePassword";
    }

    public static String getVersion() {
        return VERSION;
    }
}
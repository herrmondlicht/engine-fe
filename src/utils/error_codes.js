export const ERROR_CODES = {
  DUP00001: "DUP00001",
  AUTH00001: "AUTH00001",
  INTERNAL_ERROR: "INTERNAL_ERROR",
};

export const MAPPED_ERROR = {
  ER_DUP_ENTRY: {
    status: 400,
    code: ERROR_CODES.DUP00001,
    error: "Duplicated object in database.",
  },
  UnauthorizedError: {
    status: 401,
    code: ERROR_CODES.AUTH00001,
    error: "Invalid token",
  },
  invalid_token: {
    status: 401,
    code: ERROR_CODES.AUTH00001,
    error: "Invalid token",
  },
  INTERNAL_ERROR: {
    status: 500,
    code: ERROR_CODES.INTERNAL_ERROR,
    error: "Something went wrong",
  },
};

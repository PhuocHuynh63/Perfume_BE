module.exports = {
    SUCCESS: {
        OK: { code: 200, message: "Thành công!" },
        CREATED: { code: 201, message: "Tạo dữ liệu thành công!" }
    },
    ERROR: {
        BAD_REQUEST: { code: 400, message: "Yêu cầu không hợp lệ!" },
        UNAUTHORIZED: { code: 401, message: "Bạn chưa đăng nhập!" },
        FORBIDDEN: { code: 403, message: "Bạn không có quyền truy cập!" },
        NOT_FOUND: { code: 404, message: "Không tìm thấy dữ liệu!" },
        SERVER_ERROR: { code: 500, message: "Lỗi máy chủ!" }
    }
};
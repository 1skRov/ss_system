import http from "@/api/http";

class AuthService {
  login(login, password) {
    const params = {
      login: login,
      password: password,
    };
    return http.post("/mobile/login", params, {});
  }
}

export default new AuthService();

export default function auth(obj) {
  return new Promise((resolve, reject) => {
    if (
      obj.email === "admin@admin.com" &&
      String(obj.password) === "12345678"
    ) {
      resolve({
        status: "ok",
        data: {
          token: "true",
          infoUser: {
            email: obj.email,
            password: obj.password,
            country: "ua",
          },
        },
      });
    }
    reject({
      status: "error",
      textError: "Не каоректные данные",
    });
  });
}

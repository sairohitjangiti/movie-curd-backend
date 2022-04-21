import Jwt from "jsonwebtoken";

export const auth = (request, response,next) => {
  try {
    const token = request.header("X-auth-token");
    Jwt.verify(token, process.env.SECRET_KEY);
    next();
  } catch (err) {
    response.status(401).send({ error: err.message });
  }
};

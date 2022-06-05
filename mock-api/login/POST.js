module.exports = (request, response) => {
  const email = request.body.email;
  const password = request.body.password;
  if (email === "trang.nguyen@gmail.com" && password !== "123") {
    return response.status(403).send({ message: "Password wrong!" });
  }
  return response.status(201).send({
    token: generateJwt({ email: request.body.email, exp: 2147483647 }),
  });
};

const crypto = require("crypto");
const generateJwt = (data) => {
  let bs64header = bs64encode({
    alg: "HS256",
    typ: "JWT",
  });

  let bs64payload = bs64encode(data);

  const secret = "super_secret_society";
  const signature = createSignature(bs64header, bs64payload, secret);

  let jwt = bs64header + "." + bs64payload + "." + signature;

  return jwt;
};

const bs64encode = (data) => {
  if (typeof data === "object") {
    data = JSON.stringify(data);
  }
  return bs64escape(Buffer.from(data).toString("base64"));
};

const bs64escape = (b64String) =>
  b64String.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");

const createSignature = (jwtB64Header, jwtB64Payload, secret) => {
  let siginature = crypto.createHmac("sha256", secret);
  siginature.update(jwtB64Header + "." + jwtB64Payload);
  siginature = siginature.digest("base64");
  siginature = bs64escape(siginature);
  return siginature;
};

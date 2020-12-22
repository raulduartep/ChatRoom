import jwt from 'jsonwebtoken';

export default {
  create(payload: object | string) {
    const token = jwt.sign(
      payload,
      process.env.SECRET_KEY,
      { expiresIn: '1d' },
    );

    return token;
  },

  validate(token: string) {
    const payload = jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          throw new Error('Token expired');
        }

        throw new Error('Token invalid');
      }

      return decoded;
    });

    return Object(payload);
  },
};

import jwt from 'jsonwebtoken';

export default {
  create(username: string) {
    const token = jwt.sign(
      { username },
      process.env.SECRET_KEY,
      { expiresIn: '1d' },
    );

    return token;
  },

  validate(token: string) {
    const usernameDecoded = jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          throw new Error('Token expired');
        }

        throw new Error('Token invalid');
      }

      return (<any>decoded).username;
    });

    return String(usernameDecoded+);
  },
};

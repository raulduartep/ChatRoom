import User from '@models/UserModel';

export default {
  render(user: User) {
    return {
      username: user.username,
    };
  },

  renderMany(users: User[]) {
    return users.map((user) => this.render(user));
  },
};

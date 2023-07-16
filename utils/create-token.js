const createTokenUser = ({ user }) => {
  const tokenUser = { name: user.name, userId: user._id, roles: user.roles,surname: user.surname,
    userProfile: user.userProfile,
    email:user.email, };
  return tokenUser;
};

module.exports = createTokenUser;
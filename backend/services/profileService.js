const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getProfile = async (id) => {
  return await prisma.profile.findUnique({
    where: {
      id: Number(id),
    },
  });
};

const updateProfile = async (id, data) => {
  return await prisma.profile.update({
    where: {
      id: Number(id),
    },
    data: {
      name: data.name,
      phone: data.phone,
      bio: data.bio,
    },
  });
};

module.exports = {
  getProfile,
  updateProfile,
};
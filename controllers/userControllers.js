const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const registerUser = async (req, res) => {
  try {
    const user = await prisma.users.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        profile: {
          create: {
            identity_number: req.body.identity_number,
            identity_type: req.body.identity_type,
            address: req.body.address,
          },
        },
      },
    });

    return res.status(200).json({
      message: 'User registration successful',
      data: user,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await prisma.users.findMany();
    return res.status(200).json({
      message: 'Get all users success',
      data: users,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.users.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        profile: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        error: true,
        message: "User not found",
      });
    }

    return res.status(200).json({
      error: false,
      message: "Successfully fetched data user by id",
      data: user,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  registerUser,
  getUsers,
  getUserById,
};

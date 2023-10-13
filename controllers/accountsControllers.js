const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createAccount = async (req, res) => {
  try {
    const user_id = req.body.user_id;
    const account = await prisma.bank_accounts.create({
      data: {
        user_id,
        bank_name: req.body.bank_name,
        bank_account_number: req.body.bank_account_number,
        balance: BigInt(parseInt(req.body.balance)),
      },
    });

    return res.status(200).json({
      message: `create bank account for user id ${user_id} success`,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getAccounts = async (req, res) => {
  try {
    const accounts = await prisma.bank_accounts.findMany();
    const response = accounts.map((data) => {
      return {
        ...data,
        balance: parseInt(data.balance),
      };
    });
    return res.status(200).json({
      message: 'Get all users success',
      data: response,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getAccountById = async (req, res) => {
  try {
    const { id } = req.params;
    const account = await prisma.bank_accounts.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        user: true,
        profile: true,
        },
      })
    if (!account) {
      return res.status(404).json({
        error: true,
        message: `bank account with id ${id} not found`,
      });
    }

    account.balance = parseInt(account.balance);

    return res.status(200).json({
      data: account,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
const updateAccount = async (req, res) => {
  try {
    const { accountId } = req.params;
    const { bank_name, bank_account_number, balance } = req.body;

    const updatedAccount = await prisma.bank_accounts.update({
      where: {
        id: parseInt(accountId),
      },
      data: {
        bank_name,
        bank_account_number,
        balance: BigInt(balance),
      },
    });

    return res.status(200).json({
      message: 'Account update successful',
      data: updatedAccount,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a bank account by ID
const deleteAccount = async (req, res) => {
  try {
    const { accountId } = req.params;

    await prisma.bank_accounts.delete({
      where: {
        id: parseInt(accountId),
      },
    });

    return res.status(200).json({
      message: 'Account deletion successful',
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createAccount,
  getAccounts,
  getAccountById,
  deleteAccount,
  updateAccount,
};

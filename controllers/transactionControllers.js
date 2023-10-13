const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createTransaction = async (req, res) => {
  try {
    const { source_account_id, destination_account_id, amount } = req.body;
    const transaction = await prisma.transactions.create({
      data: {
        source_account:  source_account_id,
        destination_account: destination_account_id,
        amount: BigInt(amount),
      },
    });

    return res.status(201).json({
      message: "Transaction created successfully",
      data: transaction,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getTransactions = async (req, res) => {
  try {
    const transactions = await prisma.transactions.findMany({
      include: {
        source_account: true,
        destination_account: true,
      },
    });

    return res.status(200).json({
      message: "Get all transactions success",
      data: transactions,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const updateTransaction = async (req, res) => {
  try {
    const { transactionId } = req.params;
    const { amount, source_account_id, destination_account_id } = req.body;

    const updatedTransaction = await prisma.transactions.update({
      where: {
        id: parseInt(transactionId),
      },
      data: {
        amount: BigInt(amount),
        source_account: {
          connect: {
            id: source_account_id,
          },
        },
        destination_account: {
          connect: {
            id: destination_account_id,
          },
        },
      },
    });

    return res.status(200).json({
      message: 'Transaction update successful',
      data: updatedTransaction,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a transaction by ID
const deleteTransaction = async (req, res) => {
  try {
    const { transactionId } = req.params;

    await prisma.transactions.delete({
      where: {
        id: parseInt(transactionId),
      },
    });

    return res.status(200).json({
      message: 'Transaction deletion successful',
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
module.exports = {
  createTransaction,
  getTransactions,
  deleteTransaction,
  updateTransaction,
};

const express = require('express')
const router = express.Router()
const { getAccountById, createAccount, getAccounts,updateAccount, deleteAccount} = require('./controllers/accountsControllers')
const {registerUser, getUsers, getUserById,} = require ('./controllers/userControllers')
const { createTransaction, getTransactions, updateTransaction, deleteTransaction} = require('./controllers/transactionControllers')

router.get('/', (req, res) => {
    return res.json({
        message: "Hello World"
    })
})



router.post('/users', registerUser)
router.get('/users', getUsers)
router.get('/users/:id',getUserById);

router.post('/accounts', createAccount);
router.get('/accounts', getAccounts);
router.put('/accounts/:accountId', updateAccount); 
router.delete('/accounts/:accountId', deleteAccount);

router.post('/transactions', createTransaction);
router.get('/transactions', getTransactions);
router.put('/transactions/',updateTransaction);
router.delete('/transactions/',deleteTransaction);

module.exports = router
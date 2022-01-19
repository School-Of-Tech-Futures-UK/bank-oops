//Bank model with classes

// -> Track what branches of the bank exist
// -> Let customers open a bank account in a branch ?this.customer.push(customer)? something similar for sure
// -> Support savings accounts, which accrue interest 
// -> Support current accounts, with charged overdraft
// -> Store peoples account balances and transactions
// -> Support joint accounts

// • Bank
// • Branch
// • Customer
// • Account
// • Current Account
// • Savings Account
// • Transaction

// • Bank has many Branches
// • Branch has many Accounts and Customers
// • Accounts have one or more Customers
// • Customers have zero or more Accounts
// • Account contains transactions
// • CurrentAccount extends Account
// • SavingsAccount extends Account

class Bank{
    branches = []
    name = 'AccentureBank'
    constructor(name){
        this.name = name
    }
    openBranch(location){
        const newBranch = new Branch(location)
        this.branches.push(newBranch)
    }
}

class Branch{
    address = "30 Fenchurch"
    customers = []
    accounts = []
    constructor(address){
        this.address = address
    }
    addCustomer(customer){
        this.customers.push(customer)
    }
    addAccount(customerList, accountNumber, accountType, balance) {
        
        if (accountType === 'savings') {
            const newAccount = new savingsAccount(customerList, accountNumber, accountType, balance)
            this.accounts.push(newAccount)

        } else if (accountType === 'current') {
            const newAccount = new currentAccount(customerList, accountNumber, accountType, balance)
            this.accounts.push(newAccount)

        }
    }
    
}

class Account{
    accountNumber
    customers = []
    accountType
    balance
    constructor(customers, accountNumber, accountType, balance){
        this.accountNumber = accountNumber
        this.accountType = accountType
        this.customers = customers
        this.balance = balance
    }
    addNewCustomerToAccount(customer){
        this.customers.push(customer)
    }

    showBalance(){
        return this.balance               
    }
}

class currentAccount extends Account{
    overdraftCharge = 0.05 
    constructor (customers, accountNumber, accountType, balance) {
        super(customers, accountNumber, accountType, balance)
    }
    passTime(){
        if (this.balance < 0){
            this.balance -= this.balance*this.overdraftCharge
        }
    }
}

class savingsAccount extends Account{
    interest = 0.02
    constructor (customers, accountNumber, accountType, balance) {
        super(customers, accountNumber, accountType, balance)
    }
    passTime(){
        if (this.balance > 0){
            this.balance += this.balance*this.interest
        }
    }
}



const bank = new Bank('Accenture-Bank')
bank.openBranch('London')
const branch1 = bank.branches.find(x => x['address']==='London')
branch1.addCustomer('Amy')
branch1.addCustomer('Adam')
branch1.addAccount(['Amy'], 'A123456', 'savings', 100)

const account1 = branch1.accounts.find(x => x['accountNumber'] === 'A123456')
account1.addNewCustomerToAccount('Adam')

console.log(branch1)
console.log(account1)
// console.log(bank.name)

// console.log(bank.branches)



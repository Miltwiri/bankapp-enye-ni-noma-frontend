import { useEffect, useState } from 'react';
import { getUserProfile, getMyAccounts, createNewAccount, depositFunds, withdrawFunds, transferFunds, getUserTransactions} from '../service/authService';

function Home({ token, onLogout }) {
  const [user, setUser] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]); 
  const [newAccountDetails, setNewAccountDetails] = useState({ card_number: '', cvv: '' });
  const [depositDetails, setDepositDetails] = useState({ card_number: '', amount: '' });
  const [withdrawDetails, setWithdrawDetails] = useState({ card_number: '', cvv: '', amount: '' });
  const [transferDetails, setTransferDetails] = useState({ sourceCardNumber: '', destinationCardNumber: '', amount: '' });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await getUserProfile(token);
        setUser(response.data.data);
      } catch (error) {
        console.error('Failed to fetch user profile', error);
      }
    };

    const fetchUserAccounts = async () => {
      try {
        const response = await getMyAccounts(token);
        setAccounts(response.data.data);
      } catch (error) {
        console.error('Failed to fetch user accounts', error);
      }
    };

    const fetchTransactions = async () => {
      try {
        const response = await getUserTransactions(token);
        setTransactions(response.data.data); // Assuming the API returns a 'data' object
      } catch (error) {
        console.error('Failed to fetch transactions', error);
      }
    };


    if (token) {
      fetchUserProfile();
      fetchUserAccounts();
      fetchTransactions();
    }
  }, [token]);

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    try {
      const response = await createNewAccount(token, {
        ...newAccountDetails,
        balance: 0
      });
      setAccounts([...accounts, response.data.data]);
      setNewAccountDetails({ card_number: '', cvv: '' }); // Reset form
    } catch (error) {
      console.error('Failed to create new account', error);
    }
  };

  const handleDeposit = async (e) => {
    e.preventDefault();
    try {
      const response = await depositFunds(token, depositDetails);
      console.log('Deposit successful:', response);
      const accountsResponse = await getMyAccounts(token);
      setAccounts(accountsResponse.data.data);
      setDepositDetails({ card_number: '', amount: '' });
    } catch (error) {
      console.error('Failed to deposit', error.response ? error.response.data : error.message);
    }
  };

  const handleWithdraw = async (e) => {
    e.preventDefault();
    try {
      const response = await withdrawFunds(token, withdrawDetails);
      console.log('Withdrawal successful:', response);
      const accountsResponse = await getMyAccounts(token);
      setAccounts(accountsResponse.data.data);
      setWithdrawDetails({ card_number: '', cvv: '', amount: '' });
    } catch (error) {
      console.error('Failed to withdraw', error.response ? error.response.data : error.message);
    }
  };

  const handleTransfer = async (e) => {
    e.preventDefault();
    try {
      const response = await transferFunds(token, transferDetails);
      console.log('Transfer successful:', response);
      const accountsResponse = await getMyAccounts(token);
      setAccounts(accountsResponse.data.data);
      setTransferDetails({ sourceCardNumber: '', destinationCardNumber: '', amount: '' });
    } catch (error) {
      console.error('Failed to transfer', error.response ? error.response.data : error.message);
    }
  };

  if (!token) {
    return <div>Please login or register</div>;
  }

  return (
    <div>
      <h1>Home</h1>
      {user ? (
        <div>
          <p>Welcome, {user.name}!</p>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
          <button onClick={onLogout}>Logout</button>
        </div>
      ) : (
        <p>Loading user details...</p>
      )}
      <h2>Transactions</h2>
      {transactions.length > 0 ? (
        <ul>
          {transactions.map(transaction => (
            <li key={transaction.id}>
               - Amount: ${transaction.amount}
            </li>
          ))}
        </ul>
      ) : (
        <p>No recent transactions available.</p>
      )}
      <form onSubmit={handleDeposit}>
        <input
          type="text"
          placeholder="Card Number"
          value={depositDetails.card_number}
          onChange={(e) => setDepositDetails({ ...depositDetails, card_number: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Amount"
          value={depositDetails.amount}
          onChange={(e) => setDepositDetails({ ...depositDetails, amount: e.target.value })}
          required
        />
        <button type="submit">Deposit</button>
      </form>
      {' '}
      <form onSubmit={handleWithdraw}>
        <input
          type="text"
          placeholder="Card Number"
          value={withdrawDetails.card_number}
          onChange={(e) => setWithdrawDetails({ ...withdrawDetails, card_number: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="CVV"
          value={withdrawDetails.cvv}
          onChange={(e) => setWithdrawDetails({ ...withdrawDetails, cvv: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Amount"
          value={withdrawDetails.amount}
          onChange={(e) => setWithdrawDetails({ ...withdrawDetails, amount: e.target.value })}
          required
        />
        <button type="submit">Withdraw</button>
      </form>
      {' '}
      <form onSubmit={handleTransfer}>
        <input
          type="text"
          placeholder="Source Card Number"
          value={transferDetails.sourceCardNumber}
          onChange={(e) => setTransferDetails({ ...transferDetails, sourceCardNumber: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Destination Card Number"
          value={transferDetails.destinationCardNumber}
          onChange={(e) => setTransferDetails({ ...transferDetails, destinationCardNumber: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Amount"
          value={transferDetails.amount}
          onChange={(e) => setTransferDetails({ ...transferDetails, amount: e.target.value })}
          required
        />
        <button type="submit">Transfer</button>
      </form>

      <h2>Your Accounts</h2>
      {accounts.length > 0 ? (
        <>
          <ul>
            {accounts.map(account => (
              <li key={account.id}>
                Card Number: {account.card_number} - CVV: {account.cvv} - Balance: ${account.balance}
              </li>
            ))}
          </ul>
          <button onClick={handleCreateAccount}>Add Account</button>
        </>
      ) : (
        <div>
          <p>You have no accounts.</p>
          <button onClick={handleCreateAccount}>Create New Account</button>
        </div>
      )}
    </div>
  );
}

export default Home;

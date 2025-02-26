// src/components/History/History.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../Header/Header';
import '../../styles/History.css'; // Import the CSS file for styling

function History() {
    const [history, setHistory] = useState([]);
    const [deleteCount, setDeleteCount] = useState(0);
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        fetchHistory();
    }, [userId, deleteCount]);

    const fetchHistory = () => {
        if (userId) {
            axios.get(`http://localhost:8080/api/translations/user/${userId}`)
                .then(response => {
                    console.log('Translation data structure:', response.data[0]);
                    setHistory(response.data);
                })
                .catch(err => console.log(err));
        }
    };

    const handleDelete = (translationId) => {
        axios.delete(`http://localhost:8080/api/translations/delete/${translationId}`)
            .then(() => {
                setDeleteCount(prevCount => prevCount + 1);
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="history-container">
            <Header />
            <h1>Your Translation History</h1>
            {history.length > 0 ? (
                <ul className="history-list">
                    {history.map((item) => (
                        <li key={item.translationId} className="history-item">
                            <div className="history-item-content">
                                <p><strong>From:</strong> {item.fromLanguage}</p>
                                <p><strong>To:</strong> {item.toLanguage}</p>
                                <p><strong>Original:</strong> {item.fromTranslation}</p>
                                <p><strong>Translated:</strong> {item.toTranslation}</p>
                                <p><strong>Date:</strong> {item.date}</p>
                                <button onClick={() => handleDelete(item.translationId)} className="delete-btn">Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="no-history">No history found.</p>
            )}
        </div>
    );
}

export default History;

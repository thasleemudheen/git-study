import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AxiosInstance from '../AxiosInstance';

export default function UserDashBoard() {
    const userName = useSelector(state => state.user.userName);
    const userId = useSelector(state => state.user.userId);
    const [userDetails, setUserDetails] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDetails = async () => {
            const response = await AxiosInstance.get(`/transaction/${userId}`, {
                withCredentials: true
            });
            setUserDetails(response.data.payment);
        };
        if (userId) {
            fetchDetails();
        }
    }, [userId]);

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                {/* User Profile Header */}
                <div className="bg-teal-400 p-6">
                    <div className="flex items-center">
                        <div className="ml-6">
                            <h1 className="text-4xl font-bold text-white">Welcome back, {userName}</h1>
                            <p className="mt-2 text-gray-200"></p>
                            <p className="text-gray-200 text-sm">User ID: {userId}</p>
                        </div>
                    </div>
                </div>

                {/* Back to Home Button */}
                <div className="p-4">
                    <button
                        onClick={() => navigate('/')}
                        className="mb-8 bg-teal-400 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
                    >
                        Back to Home
                    </button>
                </div>

                {/* Payment History Section */}
                <div className="p-6">
                    <h3 className="text-3xl font-semibold text-gray-800 mb-6">Payment History</h3>
                    {userDetails.length === 0 ? (
                        <p className="text-gray-500 text-lg">No payment history available.</p>
                    ) : (
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {userDetails.map((val, ind) => (
                                <div key={ind} className="bg-white shadow-lg rounded-lg p-6">
                                    <h4 className="text-xl font-semibold text-gray-900">{val.organizationName}</h4>
                                    <p className="text-4xl font-bold text-green-600 mt-4">${val.amount}</p>
                                    <p className="text-sm text-gray-500 mt-2">Payment ID: {val.paymentId}</p>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Date: {new Date(val.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

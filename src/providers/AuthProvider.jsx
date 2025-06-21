// src/providers/AuthProvider.jsx
import React, { useState, useEffect, createContext, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { getProfileData, updateProfile, deleteAccoutn } from '../api/user/profile.api';
import { checkIfTokenValid } from '../api/user/token.api';
import FunctionalBarLoader from '../components/Loaders/FunctionalBarLoader/FunctionalBarLoader'; // Або інший лоадер на всю сторінку // TO DO

// 1. Створюємо контекст
const AuthContext = createContext(null);

// 2. Створюємо компонент-провайдер
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null); // Тут будуть дані профілю
    const [status, setStatus] = useState('loading'); // 'loading', 'authenticated', 'unauthenticated'
    const navigate = useNavigate();

    // 3. Переносимо логіку перевірки токена та завантаження юзера з MainScreen сюди
    const validateUser = useCallback(async () => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            setStatus('unauthenticated');
            navigate('/login');
            return;
        }

        try {
            // Перевіряємо токен
            const tokenStatus = await checkIfTokenValid();
            if (!tokenStatus?.tokenStatus) {
                throw new Error('Session expired');
            }

            // Якщо токен валідний, завантажуємо дані профілю
            const userData = await getProfileData();
            if (userData.success && userData.data.profile) {
                setUser(userData.data.profile);
                setStatus('authenticated');
            } else {
                // Якщо профіль не знайдено, можливо, це новий юзер
                navigate('/createProfile');
            }
        } catch (error) {
            localStorage.removeItem('authToken');
            toast.error('Session expired, please log in again', { id: 'expired-token' });
            navigate('/login');
            setStatus('unauthenticated');
        }
    }, [navigate]);

    useEffect(() => {
        validateUser();
    }, [validateUser]);

    const updateUser = async (newProfileData) => {
        try {
            // Можна додати статус 'submitting' для блокування кнопки "Save"
            const response = await updateProfile(newProfileData);

            if (response.success) {
                toast.info('Profile updated successfully');
                // ✅ Оновлюємо стан юзера в контексті новими даними
                // Можна взяти дані з відповіді сервера або з newProfileData
                setUser(prevUser => ({ ...prevUser, ...newProfileData }));
                return true; // Повертаємо true в разі успіху
            } else {
                toast.error(response.message || 'Updating profile data failed');
                return false;
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Updating profile data failed');
            return false;
        }
    };

    const deleteAccount = async () => {
        try {
            const response = await deleteAccoutn();

            if (response.success) {
                localStorage.removeItem('authToken');
                navigate('/login')
                return;
            } else toast.error(response?.message || 'Account has not been deleted');
        } catch (error) {
            toast.error(error.response?.message || 'Deleting account failed');
        }
    }

    // 4. Створюємо функцію для виходу
    const logout = () => {
        localStorage.removeItem('authToken');
        setUser(null);
        setStatus('unauthenticated');
        navigate('/login');
    };

    // 5. Формуємо об'єкт `value`
    const value = {
        user,
        status,
        logout,
        updateUser,
        deleteAccount,
    };

    // 6. поки йде перевірка, показуємо глобальний лоадер
    if (status === 'loading') {
        return <FunctionalBarLoader />; // або <LoaderPage />
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

// 7. Створюємо кастомний хук useAuth
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
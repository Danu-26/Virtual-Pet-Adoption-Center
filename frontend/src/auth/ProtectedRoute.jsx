import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';

const ProtectedRoute = ({ allowedRoles, children }) => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
        } else if (allowedRoles && !allowedRoles.includes(user.role)) {
            navigate('/');
        }
    }, [user, allowedRoles, navigate]);

    if (!user || (allowedRoles && !allowedRoles.includes(user.role))) {
        return null; 
    }

    return children;
};

export default ProtectedRoute;

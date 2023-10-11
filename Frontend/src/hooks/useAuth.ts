import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../redux/auth/authSlice'

export const useAuth = () => {
    const user = useSelector(selectCurrentUser)
    console.log(user);
    return useMemo(() => ({ user }), [user])
}

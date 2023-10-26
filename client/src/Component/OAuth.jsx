import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'
import { app } from '../Firebase'
import { useDispatch } from 'react-redux'
import { signInSuccess, signInFaliure} from '../Redux/user/userSlice'
import { useNavigate } from 'react-router-dom'

export const OAuth = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleGoogleClick = async () =>{
        try {
            const provider = new GoogleAuthProvider()
            const auth = getAuth(app);

            const result = await signInWithPopup(auth, provider)
            // console.log(result)

            const response = await fetch('/api/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: result.user.displayName,
                    email: result.user.email,
                    photo: result.user.photoURL
                })
            })
            const data = await response.json()
            dispatch(signInSuccess(data))
            navigate('/')

        } catch (error) {
            dispatch(signInFaliure(error))
        }
    }

  return (
    <div onClick={handleGoogleClick}  className='text-green-500 mx-3 hover:bg-green-500 hover:text-white transition-all duration-200 rounded-full text-center gap-2'>
        <button type='button' className='w-full p-3 hover:font-semibold'>CONTINUE WITH GOOGLE</button>
    </div>
  )
}

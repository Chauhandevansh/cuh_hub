import styles from '../styles/Username.module.css';
import toast, {Toaster} from 'react-hot-toast';
import {useFormik} from 'formik';
import { resetPasswordValidate } from '../helper/validate.js';
import { resetPassword } from '../helper/helper.js';
import { useAuthStore } from '../store/store.js';
import { useNavigate, Navigate } from 'react-router-dom';
import useFetch from '../hooks/fetch.hooks.js';

function Reset() {

    const { username } = useAuthStore(state=>state.auth);
    const navigate = useNavigate();
    const [{ isLoading, status, serverError }] = useFetch('user/checkResetSession');

    const formik = useFormik({
        initialValues: {
            password: '',
            confirm_pwd: '',
        },
        validate: resetPasswordValidate,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async values => {
            let resetPromise = resetPassword({ username, password: values.password });

            toast.promise(resetPromise, {
                loading: "Updating...",
                success: <b>Reset Successfully!</b>,
                error: <b>Could not Reset!</b>
            });

            resetPromise.then(function(){ navigate('/password')});
        }
    })

    if(isLoading) return <h1 className='text-2xl font-bold'>is loading</h1>;
    if(serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>
    if(status && status !== 201) return <Navigate to={'/password'}></Navigate>

    return (
        <div className='container mx-auto'>
        <Toaster position='top-center' reverseOrder={false}></Toaster>
            <div className='flex justify-center items-center h-screen'>
                <div className={styles.glass} style={{width: "45%"}}>
                    <div className='title flex flex-col items-center'>
                        <h4 className='text-5xl font-bold'>Reset</h4>
                        <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
                            Enter new password.
                        </span>
                    </div>

                    <form className='py-20' onSubmit={formik.handleSubmit}>
                        <div className='textbox flex flex-col items-center gap-6'>
                            <input {...formik.getFieldProps('password')} className={styles.textbox} type='password' placeholder='New Password' />
                            <input {...formik.getFieldProps('confirm_pwd')} className={styles.textbox} type='text' placeholder='Repeat Password' />
                            <button type='submit' className={styles.btn}>Reset</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Reset;
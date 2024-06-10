import { FC, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { usePostUserLoginMutation } from '../api/authApi'
import Cookies from 'js-cookie'
type FormInterface = {
    email: string
    password: string
}

const LoginPage: FC = () => {
    const navigate = useNavigate()
    const { handleSubmit, watch, setValue } = useForm<FormInterface>({
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const [postUserLogin, { isError, isLoading, isSuccess, data: dataUserLogin }] = usePostUserLoginMutation()

    useEffect(() => {
        if (isSuccess) {
            Cookies.set('loginToken', dataUserLogin.data.login_token)
            navigate('/')
        }
    }, [isSuccess])


    if (isLoading) {
        return <div>Loading...</div>;
    }

    // Handle error state
    if (isError) {
        return <div>Error while login</div>;
    }

    const email = watch('email')
    const password = watch('password')

    const onsubmit = (data: FormInterface) => {
        console.log("onsubmited", data);

        postUserLogin(data)
    }



    return (
        <>
            <section className="hero is-fullheight is-full-width">
                <div className="hero-body">
                    <div className="container ">
                        <div className="columns is-centered">
                            <div className="column is-4">
                                <form className="box" onSubmit={handleSubmit(onsubmit)}>
                                    <h1 className='title is-3'>Sign In</h1>
                                    <div className="field">
                                        <label htmlFor="" className="label">Email</label>
                                        <div className="control">
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => {
                                                    setValue('email', e.target.value)
                                                }}
                                                placeholder='example@domain.tld'
                                                className="input"
                                                required
                                                autoComplete='email' />
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label htmlFor="" className="label">Password</label>
                                        <div className="control">
                                            <input
                                                type="password"
                                                value={password}
                                                onChange={(e) => {
                                                    setValue('password', e.target.value)
                                                }}
                                                placeholder='****'
                                                className="input"
                                                required />
                                        </div>
                                    </div>
                                    <div className="field">
                                        <button className="button is-success is-fullwidth" type='submit'>Login</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default LoginPage
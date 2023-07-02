import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { Link } from "react-router-dom";

const Navbar = () => {
    const { authState, signOut, } = useContext(AuthContext);
    console.log(authState.user?.email)

    return (
        <header className='bg-slate-800 py-2 px-4 text-center text-white gap-4 flex items-center justify-between flex-wrap'>
            <h1 className='text-2xl font-bold title-form'>AHORCADO G1</h1>
            <nav className="left-Navbar flex items-center gap-4">
                {authState.token ? (
                    <div className="flex flex-wrap gap-4">
                        <Link to="/game" className="text-slate-400 title-form hover:text-blue-500 duration-300">Jugar</Link>
                        <Link to="/dashboard" className="text-slate-400 hover:text-blue-500 duration-300">Dashboard</Link>
                        <span className="text-slate-400">{authState.user?.fullName}</span>
                        <button className="border rounded-full border-red-400 px-2 lowercase py-1 hover:text-white hover:bg-red-600 duration-500" onClick={() => signOut()}>Logout</button>
                    </div>
                ) : (
                    <>
                        <Link to="/sign-in" className="btn btn-primary">Inicia sesíon</Link>
                        <Link to="/sign-up" className="btn btn-primary">Crear cuenta</Link>
                    </>
                )
                }
            </nav>
        </header>

    )
}

export default Navbar
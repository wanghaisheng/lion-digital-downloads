import { createContext, useState, useEffect, useContext } from "react";
import { DB } from "~/lib/db/api";
import { useRouter } from "next/router";

const Context = createContext();

const Provider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(DB.auth.user());
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const getUserProfile = async () => {
      const sessionUser = DB.auth.user();
      if(sessionUser) {
        setUser(sessionUser)
        if(sessionUser.user_metadata.isAdmin) setIsAdmin(true);
      }
    };

    getUserProfile();

    DB.auth.onAuthStateChange(() => {
      getUserProfile();
    });
  }, []);

  const login = async (email, password, redirect) => {
    const { user, session, error } = await DB.auth.signIn({
      email: email,
      password: password,
    })

    if(error) return error;

    if(!redirect) {
      router.push('/account');
      return;
    }

    router.push(redirect);
    return user;
  };

  const register = async (email, password) => {
    const { user, session, error } = await DB.auth.signUp({
      email: email,
      password: password,
    })

    if(error) return error;

    router.push("/account/confirm");
    return;
  };

  const logout = async () => {
    await DB.auth.signOut();
    setUser(null);
    router.push("/");
  };

  const exposed = {
    user,
    isAdmin,
    login,
    logout,
    register
  };

  return <Context.Provider value={exposed}>{children}</Context.Provider>;
};

export const useUser = () => useContext(Context);

export default Provider;
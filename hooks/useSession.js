import React, { useState, useEffect } from 'react'
import Router from "next/router";

import { DB } from '~/lib/db/api'

export async function useSession({
    redirectTo = "/account/login",
    redirectIfFound = false,
} = {}) {
    const [session, setSession] = useState(null)

    async function getSession() {
        let fetchSession = DB.auth.session();
        setSession(fetchSession)

        DB.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
    }

    useEffect(() => {
        getSession()
        if (!session) {
            Router.push(redirectTo);
        }
    },[])

    return session;
}
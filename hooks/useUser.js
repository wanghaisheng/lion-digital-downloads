import { useState, useEffect } from 'react'
import Router from "next/router";

import { DB } from '~/lib/db/api'

export const useUser = async () => {
    return await DB.auth.user();
}
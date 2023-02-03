import React from 'react'

export default function SignOut() {
    // Clear the user's session
    localStorage.removeItem('user');
    sessionStorage.clear();
    window.location.replace('/');
}

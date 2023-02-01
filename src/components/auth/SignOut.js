import React from 'react'

export default function SignOut() {
    // Clear the user's session
    localStorage.removeItem('user');
    localStorage.removeItem('type');
    localStorage.removeItem('email');
    sessionStorage.clear();
    window.location.replace('/');
}

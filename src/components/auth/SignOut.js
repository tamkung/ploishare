import React from 'react'

export default function SignOut() {
    // Clear the user's session
    localStorage.removeItem('user');
    localStorage.removeItem('type');
    sessionStorage.clear();
    window.location.replace('/');
}

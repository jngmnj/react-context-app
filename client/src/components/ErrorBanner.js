import React from 'react'

const ErrorBanner = ({ message }) => {
    let errorMessage = message || "에러입니다."; // default
    return (
        <div
            style={{ background: "red" }}
        >
            {errorMessage}
        </div>
    )
}

export default ErrorBanner
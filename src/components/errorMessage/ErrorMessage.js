import error from './error.gif'

function ErrorMessage() {
    return (
        <img src={error} alt='error' style={{ display: 'block', width: '250px', height: '250px', objectFit: 'contain', margin: 'o auto' }} />
    )
}

export default ErrorMessage;
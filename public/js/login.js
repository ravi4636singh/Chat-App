const loginForm = document.querySelector('#login_form')
const loginUser = document.querySelector('#login_input')

loginForm.addEventListener('submit', () => {
    let username = loginUser.value
    
    localStorage.setItem('username', username)
})
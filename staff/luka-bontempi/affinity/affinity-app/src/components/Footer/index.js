import React from 'react'
import { withRouter } from 'react-router-dom'

function Footer({ history }) {

    function handleGoToChats(event) {
        event.preventDefault()
        history.push('/chats')
    }
    function handleGoToMyProfile(event) {
        event.preventDefault()
        history.push('/myprofile')
    }
    function handleGoToCandidates(event) {
        event.preventDefault()
        history.push('/candidates')
    }
    
    function handleGoToEditProfile(event) {
        event.preventDefault()
        history.push('/editprofile')
    }
    
    function handleLogout() {
    
        sessionStorage.clear()
    
        handleGoBack()
    }
    function handleGoBack() {
    
        history.push('/')
    }

    return <footer className="footer">
                <button  onClick={handleGoToMyProfile}><img className="icon" src="/images/icons/profile.png" /></button>
                <button  onClick={handleGoToEditProfile} type="button" ><img className="icon" src="/images/icons/edit.png" /></button>
                <button  onClick={handleGoToCandidates} type="button"><img className="icon" src="/images/icons/connect.png" /></button>
                <button  onClick={handleGoToChats} type="button"><img className="icon" src="/images/icons/chat.png" /></button>
                <button  onClick={handleLogout}><img className="icon" src="/images/icons/logout.png" /></button>
        </footer>
}
export default withRouter(Footer)

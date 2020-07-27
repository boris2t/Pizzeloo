const getLinks = (currentUser) => {

    const authLinks = [
      {
        title: "Menu",
        link: "/menu"
      },
      {
        title: "Logout",
        link: "/logout"
      },
    ]
  
    const guestLinks = [
      {
        title: "Menu",
        link: "/menu"
      },
      {
        title: "Login",
        link: "/login"
      },
    ]
  
    return currentUser ? authLinks : guestLinks
  }
  
  export default getLinks
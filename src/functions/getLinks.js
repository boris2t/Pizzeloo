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

  if (currentUser && currentUser.isAdmin) {
    authLinks.push({
      title: "Admin",
      link: "/admin"
    })
  }

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
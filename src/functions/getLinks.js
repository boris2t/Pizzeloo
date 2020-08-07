const getLinks = (currentUser) => {

  const authLinks = [
    {
      title: "",
      basket: true,
      link: "/basket"
    },
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
    authLinks.unshift({
      title: "Admin",
      link: "/admin"
    })
  }

  const guestLinks = [
    {
      title: "",
      basket: true,
      link: "/basket"
    },
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
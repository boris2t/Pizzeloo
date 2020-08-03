import fire from '../fire'

const checkAdmin = async (currentUser) => {
    if (currentUser) {
        const db = fire.firestore()
        const response = await db.collection('admins').get()
        const admins = response.docs.map(doc => doc.data().uid)
        const isAdmin = admins.includes(currentUser.uid)

        return isAdmin
    } else {
        return false
    }
}

export default checkAdmin
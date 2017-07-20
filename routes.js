// prettier-ignore
const routingTable = {
    "home": args => 'Home',
    "users": [ args => 'All users', {
        ":user_id": [ args => `User ${args.userId}`, {
            "edit": args => `Edit user ${args.userId}`,
            "books": args => `Books of user ${args.userId}`
        }],
        "new": args => 'New user'
    }]
}

const currentPage = router(routingTable);

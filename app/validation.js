Mesosphere({
    id: 'newGameForm',
    fields: {
        name: {
            required: true,
            rules:{
                maxLength:40,
                minLength:3
            },
            message: "3 characters min, 40 characters max"
        },
        description: {
            required: false
        }
    }
});
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

Mesosphere({
    id: 'newLadderForm',
    fields: {
        name: {
            required: true,
            rules:{
                maxLength:40,
                minLength:3
            },
            message: "3 characters min, 20 characters max"
        },
        description: {
            required: false,
            rules:{
                minLength:5,
                maxLength: 200
            },
            message: "5 characters min, 200 characters max"
        },
        game: {
            required: true
        }
    }
});
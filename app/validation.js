Mesosphere({
    id: 'newGameForm',
    fields: {
        name: {
            docProperty: 'name',
            required: true,
            rules:{
                maxLength:40,
                minLength:3
            },
            message: "3 characters min, 40 characters max"
        },
        description: {
            docProperty: 'description',
            required: false,
            rules:{
                minLength:5,
                maxLength: 200
            },
            message: "5 characters min, 200 characters max"
        },
        userId: {
            docProperty: 'userId'
        }
    }
});

Mesosphere({
    id: 'newPlayerForm',
    fields: {
        nickname: {
            required: true,
            rules:{
                maxLength:20,
                minLength:3
            },
            message: "3 characters min, 20 characters max"
        },
        email: {
            required: false,
            format: 'email',
            message: 'Please enter a valid email address'
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
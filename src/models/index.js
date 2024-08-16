export const schema = {
    models: {
        GiftForm: {
            name: 'GiftForm',
            fields: {
                id: {
                    name: 'id',
                    isArray: false,
                    type: 'ID',
                    isRequired: true,
                    attributes: [],
                },
                name: {
                    name: 'name',
                    type: 'String',
                    isRequired: true,
                },
                surname: {
                    name: 'phone',
                    type: 'AWSPhone',
                    isRequired: true,
                },
                email: {
                    name: 'email',
                    type: 'AWSEmail',
                    isRequired: true,
                },
                size: {
                    name: 'size',
                    type: 'String',
                    isRequired: true,
                },
                notes: {
                    name: 'notes',
                    type: 'String',
                },
            },
        },
    },
};

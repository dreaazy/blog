db.createCollection("Users", {
    "capped": false,
    "validator": {
        "$jsonSchema": {
            "bsonType": "object",
            "title": "Users",
            "properties": {
                "_id": {
                    "bsonType": "objectId"
                },
                "name": {
                    "bsonType": "string"
                },
                "surname": {
                    "bsonType": "string"
                },
                "email": {
                    "bsonType": "string"
                },
                "password": {
                    "bsonType": "string"
                },
                "createdAt": {
                    "bsonType": "date"
                },
                "updatedAt": {
                    "bsonType": "date"
                },
                "ProfilePicture": {
                    "bsonType": "string"
                }
            },
            "additionalProperties": false,
            "required": [
                "_id",
                "name",
                "surname",
                "email",
                "password"
            ]
        }
    },
    "validationLevel": "off",
    "validationAction": "warn"
});




db.createCollection("Posts", {
    "capped": false,
    "validator": {
        "$jsonSchema": {
            "bsonType": "object",
            "title": "Posts",
            "properties": {
                "_id": {
                    "bsonType": "objectId"
                },
                "title": {
                    "bsonType": "string"
                },
                "content": {
                    "bsonType": "string"
                },
                "author": {
                    "bsonType": "objectId"
                },
                "categoryIds": {
                    "bsonType": "array",
                    "additionalItems": true,
                    "items": {
                        "bsonType": "string"
                    },
                    "minItems": 0,
                    "uniqueItems": true
                },
                "createdAt": {
                    "bsonType": "date"
                },
                "updatedAt": {
                    "bsonType": "date"
                }
            },
            "additionalProperties": false,
            "required": [
                "_id",
                "title",
                "content",
                "author",
                "createdAt"
            ]
        }
    },
    "validationLevel": "off",
    "validationAction": "warn"
});




db.createCollection("Comments", {
    "capped": false,
    "validator": {
        "$jsonSchema": {
            "bsonType": "object",
            "title": "Comments",
            "properties": {
                "_id": {
                    "bsonType": "objectId"
                },
                "parentId": {
                    "bsonType": "objectId"
                },
                "postId": {
                    "bsonType": "objectId"
                },
                "author": {
                    "bsonType": "objectId"
                },
                "content": {
                    "bsonType": "string"
                },
                "createdAt": {
                    "bsonType": "date"
                },
                "updatedAt": {
                    "bsonType": "date"
                }
            },
            "additionalProperties": false,
            "required": [
                "_id",
                "postId",
                "author",
                "content",
                "createdAt"
            ]
        }
    },
    "validationLevel": "off",
    "validationAction": "warn"
});




db.createCollection("Categories", {
    "capped": false,
    "validator": {
        "$jsonSchema": {
            "bsonType": "object",
            "title": "Categories",
            "properties": {
                "_id": {
                    "bsonType": "objectId"
                },
                "parentId": {
                    "bsonType": "objectId"
                },
                "name": {
                    "bsonType": "string"
                },
                "description": {
                    "bsonType": "string"
                },
                "createdAt": {
                    "bsonType": "date"
                },
                "updatedAt": {
                    "bsonType": "date"
                }
            },
            "additionalProperties": false,
            "required": [
                "_id",
                "name"
            ]
        }
    },
    "validationLevel": "off",
    "validationAction": "warn"
});
{
  "name": "ContactMessage",
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "description": "Sender's Name"
    },
    "email": {
      "type": "string",
      "format": "email",
      "description": "Sender's Email"
    },
    "phone": {
      "type": "string",
      "description": "Sender's Phone Number"
    },
    "message": {
      "type": "string",
      "description": "The message content"
    },
    "status": {
      "type": "string",
      "enum": [
        "new",
        "read",
        "archived"
      ],
      "default": "new"
    }
  },
  "required": [
    "name",
    "email",
    "message"
  ]
}
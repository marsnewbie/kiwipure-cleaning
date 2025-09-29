{
  "name": "Review",
  "type": "object",
  "properties": {
    "client_name": {
      "type": "string",
      "description": "客户姓名"
    },
    "company_name": {
      "type": "string",
      "description": "公司名称"
    },
    "rating": {
      "type": "number",
      "minimum": 1,
      "maximum": 5,
      "description": "评分（1-5星）"
    },
    "review_text": {
      "type": "string",
      "description": "评价内容"
    },
    "service_type": {
      "type": "string",
      "description": "服务类型"
    },
    "date": {
      "type": "string",
      "format": "date",
      "description": "评价日期"
    },
    "location": {
      "type": "string",
      "description": "服务地点"
    },
    "verified": {
      "type": "boolean",
      "default": true,
      "description": "是否验证客户"
    }
  },
  "required": [
    "client_name",
    "rating",
    "review_text",
    "service_type"
  ]
}
{
  "name": "Quote",
  "type": "object",
  "properties": {
    "client_name": {
      "type": "string",
      "description": "客户姓名"
    },
    "client_email": {
      "type": "string",
      "description": "客户邮箱"
    },
    "client_phone": {
      "type": "string",
      "description": "客户电话"
    },
    "company_name": {
      "type": "string",
      "description": "公司名称"
    },
    "service_type": {
      "type": "string",
      "description": "服务类型"
    },
    "building_type": {
      "type": "string",
      "enum": [
        "office",
        "retail",
        "warehouse",
        "medical",
        "restaurant",
        "other"
      ],
      "description": "建筑类型"
    },
    "area_size": {
      "type": "number",
      "description": "面积大小（平方米）"
    },
    "frequency": {
      "type": "string",
      "enum": [
        "weekly",
        "bi_weekly",
        "monthly",
        "one_time"
      ],
      "description": "清洁频率"
    },
    "special_requirements": {
      "type": "string",
      "description": "特殊要求"
    },
    "estimated_price": {
      "type": "number",
      "description": "预估价格"
    },
    "status": {
      "type": "string",
      "enum": [
        "pending",
        "quoted",
        "accepted",
        "declined"
      ],
      "default": "pending",
      "description": "报价状态"
    },
    "location": {
      "type": "string",
      "description": "服务地址"
    }
  },
  "required": [
    "client_name",
    "client_email",
    "service_type",
    "building_type",
    "area_size",
    "frequency"
  ]
}
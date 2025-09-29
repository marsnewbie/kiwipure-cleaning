{
  "name": "Service",
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "description": "服务名称"
    },
    "description": {
      "type": "string",
      "description": "服务详细描述"
    },
    "price_type": {
      "type": "string",
      "enum": [
        "per_hour",
        "per_sqm",
        "fixed",
        "custom"
      ],
      "description": "定价类型"
    },
    "base_price": {
      "type": "number",
      "description": "基础价格"
    },
    "features": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "服务特色"
    },
    "category": {
      "type": "string",
      "enum": [
        "office",
        "retail",
        "medical",
        "industrial",
        "residential"
      ],
      "description": "服务类别"
    },
    "duration": {
      "type": "string",
      "description": "预估时长"
    },
    "icon": {
      "type": "string",
      "description": "服务图标"
    }
  },
  "required": [
    "name",
    "description",
    "price_type"
  ]
}
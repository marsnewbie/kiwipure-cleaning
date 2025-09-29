export class Quote {
  constructor(data = {}) {
    this.client_name = data.client_name || '';
    this.client_email = data.client_email || '';
    this.client_phone = data.client_phone || '';
    this.company_name = data.company_name || '';
    this.service_type = data.service_type || '';
    this.building_type = data.building_type || 'office';
    this.area_size = data.area_size || 0;
    this.frequency = data.frequency || 'monthly';
    this.special_requirements = data.special_requirements || '';
    this.estimated_price = data.estimated_price || 0;
    this.status = data.status || 'pending';
    this.location = data.location || '';
    this.created_at = data.created_at || new Date().toISOString();
  }

  // 验证数据
  validate() {
    const errors = [];
    
    if (!this.client_name?.trim()) {
      errors.push('Client name is required');
    }
    
    if (!this.client_email?.trim()) {
      errors.push('Client email is required');
    } else if (!this.isValidEmail(this.client_email)) {
      errors.push('Client email format is invalid');
    }
    
    if (!this.service_type?.trim()) {
      errors.push('Service type is required');
    }
    
    if (!this.building_type?.trim()) {
      errors.push('Building type is required');
    }
    
    if (!this.area_size || this.area_size <= 0) {
      errors.push('Area size must be greater than 0');
    }
    
    if (!this.frequency?.trim()) {
      errors.push('Frequency is required');
    }
    
    return errors;
  }

  // 简单的邮箱验证
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // 计算价格
  calculatePrice() {
    const baseRate = 3; // NZD per square meter
    const area = parseFloat(this.area_size) || 0;


    
    // 频率折扣系数
    const frequencyMultipliers = {
      'weekly': 0.85,
      'bi_weekly': 0.9,
      'monthly': 0.95,
      'one_time': 1.0
    };
    
    let basePrice = area * baseRate;
    
    // 应用频率折扣
    basePrice = basePrice * (frequencyMultipliers[this.frequency] || 1.0);
    
    // 特殊要求额外费用
    if (this.special_requirements?.trim()) {
      basePrice = basePrice * 1.1; // 增加10%
    }
    
    return Math.round(basePrice * 100) / 100;
  }

  // 获取建筑类型显示文本
  getBuildingTypeText() {
    const buildingTypes = {
      'office': 'Office',
      'retail': 'Retail',
      'warehouse': 'Warehouse',
      'medical': 'Medical',
      'restaurant': 'Restaurant',
      'other': 'Other'
    };
    return buildingTypes[this.building_type] || 'Other';
  }

  // 获取频率显示文本
  getFrequencyText() {
    const frequencies = {
      'weekly': 'Weekly',
      'bi_weekly': 'Bi-weekly',
      'monthly': 'Monthly',
      'one_time': 'One-time'
    };
    return frequencies[this.frequency] || 'Monthly';
  }

  // 获取状态显示文本
  getStatusText() {
    const statuses = {
      'pending': 'Pending',
      'quoted': 'Quoted',
      'accepted': 'Accepted',
      'declined': 'Declined'
    };
    return statuses[this.status] || 'Unknown';
  }

  // 提交报价的模拟方法
  static async create(data) {
    try {
      const quote = new Quote(data);
      const errors = quote.validate();
      
      if (errors.length > 0) {
        throw new Error(errors.join(', '));
      }
      
      // 计算价格
      quote.estimated_price = quote.calculatePrice();
      
      // 模拟API调用延迟
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 在实际项目中，这里会调用真实的API
      console.log('Quote submitted:', quote);
      
      return {
        success: true,
        message: 'Quote request submitted successfully! We will contact you within 24 hours.',
        data: quote
      };
      
    } catch (error) {
      console.error('Error submitting quote:', error);
      throw error;
    }
  }
}
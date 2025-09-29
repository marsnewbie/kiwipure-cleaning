import React from 'react';

export class ContactMessage {
  constructor(data = {}) {
    this.name = data.name || '';
    this.email = data.email || '';
    this.phone = data.phone || '';
    this.message = data.message || '';
    this.status = data.status || 'new';
    this.created_at = data.created_at || new Date().toISOString();
  }

  // 验证数据
  validate() {
    const errors = [];
    
    if (!this.name?.trim()) {
      errors.push('Name is required');
    }
    
    if (!this.email?.trim()) {
      errors.push('Email is required');
    } else if (!this.isValidEmail(this.email)) {
      errors.push('Email format is invalid');
    }
    
    if (!this.message?.trim()) {
      errors.push('Message is required');
    }
    
    return errors;
  }

  // 简单的邮箱验证
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // 提交消息的模拟方法
  static async create(data) {
    try {
      const contactMessage = new ContactMessage(data);
      const errors = contactMessage.validate();
      
      if (errors.length > 0) {
        throw new Error(errors.join(', '));
      }
      
      // 模拟API调用延迟
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 在实际项目中，这里会调用真实的API
      console.log('Contact message submitted:', contactMessage);
      
      return {
        success: true,
        message: 'Thank you for your message! We will get back to you soon.',
        data: contactMessage
      };
      
    } catch (error) {
      console.error('Error submitting contact message:', error);
      throw error;
    }
  }

  // 获取状态显示文本
  getStatusText() {
    const statusMap = {
      'new': 'New',
      'read': 'Read',
      'archived': 'Archived'
    };
    return statusMap[this.status] || 'Unknown';
  }
}
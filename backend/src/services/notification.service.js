const Notification = require('../models/Notification');
const emailService = require('./email.service');

class NotificationService {
  async createNotification(data) {
    try {
      const notification = new Notification({
        recipient: data.recipientId,
        type: data.type,
        title: data.title,
        message: data.message,
        data: data.data || {}
      });

      await notification.save();

      // Send email notification if enabled
      if (data.sendEmail) {
        await emailService.sendEmail(
          data.recipientEmail,
          data.title,
          'notification',
          { message: data.message }
        );
      }

      return notification;
    } catch (error) {
      console.error('Create notification error:', error);
      throw error;
    }
  }

  async getUserNotifications(userId) {
    try {
      const notifications = await Notification.find({ recipient: userId })
        .sort('-createdAt')
        .limit(20);

      return notifications;
    } catch (error) {
      console.error('Get user notifications error:', error);
      throw error;
    }
  }

  async markAsRead(notificationId) {
    try {
      const notification = await Notification.findByIdAndUpdate(
        notificationId,
        { read: true },
        { new: true }
      );

      return notification;
    } catch (error) {
      console.error('Mark notification as read error:', error);
      throw error;
    }
  }
}

module.exports = new NotificationService(); 
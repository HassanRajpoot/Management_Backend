import express from 'express';
import { Notification } from '../db/employee';

export const Creatnotification = async (req:express.Request, res:express.Response) => {
    try {
      const notificationData = req.body; // Assuming the request body contains the notification data
      const notification = await Notification.create(notificationData);
      res.status(201).json(notification);
    } catch (error) {
      res.status(500).json({ error: 'Error creating notification' });
    }
  };
  
  // Read notifications
export const Readnotification =async (req:express.Request, res:express.Response) => {
    try {
      const notificationRecords = await Notification.find().populate('employeeId');
      res.status(200).json(notificationRecords);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching notifications' });
    }
  };
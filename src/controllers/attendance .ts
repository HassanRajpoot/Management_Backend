import express from 'express';
import { Attendance } from '../db/employee';
import { isAuthenticated } from '../middleware/authentication';

const router = express.Router();
// Create attendance record
router.post('/new' ,isAuthenticated, async (req:express.Request, res:express.Response) => {
  try {
    const attendanceData = req.body; // Assuming the request body contains the attendance data
    const attendance = await Attendance.create(attendanceData);
    res.status(201).json(attendance);
  } catch (error) {
    res.status(500).json({ error: 'Error creating attendance record' });
  }
}); 

// Read attendance records
router.get('/read_attendance',isAuthenticated,async (req:express.Request, res:express.Response) => {
  try {
    const attendanceRecords = await Attendance.find().populate('employeeId');
    res.status(200).json(attendanceRecords);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching attendance records' });
  }
});

// Update attendance record
router.put('/:id', isAuthenticated,async (req:express.Request, res:express.Response) => {
  try {
    const attendanceId = req.params.id;
    const updatedData = req.body;
    const updatedAttendance = await Attendance.findByIdAndUpdate(attendanceId, updatedData, { new: true });
    res.status(200).json(updatedAttendance);
  } catch (error) {
    res.status(500).json({ error: 'Error updating attendance record' });
  }
});

// Delete attendance record
router.delete('/delete_attendance/:id', isAuthenticated,async (req:express.Request, res:express.Response) => {
  try {
    const attendanceId = req.params.id;
    await Attendance.findByIdAndDelete(attendanceId);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error deleting attendance record' });
  }
});
module.exports = router;
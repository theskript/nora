# Zoom Link Setup Instructions

## ⚠️ Important: Update Zoom Link

The website currently has a placeholder Zoom link. You need to replace it with your actual Zoom meeting link.

### Where to Update:

1. **In `script.js`** - Two locations:
   
   **Line ~110** (in `generateCalendarInvite` function):
   ```javascript
   const zoomLink = "https://zoom.us/j/YOUR_MEETING_ID"; // Replace with actual Zoom link
   ```
   
   **Line ~80** (in `addToCalendar` function):
   ```javascript
   const zoomLink = "https://zoom.us/j/YOUR_MEETING_ID"; // Replace with actual Zoom link
   ```

### Steps to Get Your Zoom Link:

1. Go to https://zoom.us and sign in
2. Click "Schedule a Meeting"
3. Set the meeting details:
   - Topic: "Nora's 1st Birthday Party - Hybrid Celebration"
   - Date: December 30, 2025
   - Time: 5:00 PM (set for 30 minutes)
   - Enable "Waiting Room" (optional)
   - Enable "Video" for both host and participants
4. Save the meeting and copy the join URL
5. Replace `https://zoom.us/j/YOUR_MEETING_ID` in the code with your actual link

### Example:
If your Zoom link is: `https://zoom.us/j/123456789?pwd=abc123`

Replace in both locations:
```javascript
const zoomLink = "https://zoom.us/j/123456789?pwd=abc123";
```

### Testing:
After updating:
1. Submit a test RSVP
2. Check the downloaded calendar invite (.ics file)
3. Verify the Zoom link appears correctly
4. Test clicking the "Add to Calendar" button to ensure it opens with the correct link

---

**Note:** The Zoom link will be automatically included in:
- Calendar invites downloaded after RSVP submission
- Google Calendar events created via "Add to Calendar" button
- Auto-response emails sent to attendees

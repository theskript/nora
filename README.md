# 🎉 First Birthday Party Invitation

A beautiful, interactive birthday invitation website for your child's 1st birthday party on December 30th, 2025.

## Features

- ✨ **Animated Hero Section** with floating balloons and confetti
- 📅 **Party Details** with date, location, and theme
- 📝 **RSVP Functionality** using Google Forms (embedded)
- 🎁 **Gift Registry** with links to Amazon, Target, and digital payment options
- 📸 **Photo Gallery** to showcase first-year memories
- 🎨 **Beautiful Gradients** and smooth animations
- 📱 **Fully Responsive** design for mobile and desktop

## Setup Instructions

### 1. Customize the Content

Edit `index.html` and replace the following placeholders:
- `[Child's Name]` - Your child's name
- `[Time, e.g., 2:00 PM - 5:00 PM]` - Party time
- `[Venue Name]` - Party location name
- `[Address]` - Full address
- `[Party Theme]` - Theme (e.g., "Circus", "Safari", "Rainbow")
- `[your-email@example.com]` - Your contact email
- `[phone-number]` - Your phone number

### 2. Set Up RSVP (Google Forms)

1. Go to [Google Forms](https://forms.google.com)
2. Create a new form with these fields:
   - Name (Short answer)
   - Email (Email)
   - Number of Guests (Number)
   - Dietary Restrictions (Paragraph)
   - Message (Paragraph)
3. Click "Send" → Click the `<>` (Embed HTML) icon
4. Copy the iframe code
5. Replace the iframe in `index.html` (line 70) with your form's embed code

### 3. Set Up Gift Registry

Edit the registry links in `index.html`:
- Amazon Registry: Replace `[your-registry-id]` with your actual registry ID
- Target Registry: Replace `[your-registry-id]` with your actual registry ID
- Update Venmo/Cash App handles with your actual usernames

### 4. Add Photos

Replace placeholder images in the Photo Gallery section:
1. Add your child's photos to the `birthday-invite` folder
2. Update the `src` attributes in the `.photo-item` divs
3. Example: `<img src="photo1.jpg" alt="Baby's first smile">`

### 5. Deploy

You can host this website for free on:
- **GitHub Pages**: Push to a GitHub repo and enable Pages
- **Netlify**: Drag and drop the folder to netlify.com
- **Vercel**: Connect your GitHub repo to vercel.com

## Third-Party Tools Used

- **AOS (Animate On Scroll)**: Smooth scroll animations
- **Google Fonts**: Fredoka and Quicksand fonts
- **Google Forms**: RSVP functionality (you need to create your own form)

## Customization Tips

- Change colors in `styles.css` by modifying the gradient values
- Adjust animation speeds in the `@keyframes` sections
- Add more confetti pieces by duplicating `.confetti-piece` divs
- Modify the countdown timer in `script.js` to match your party date

## Browser Support

Works on all modern browsers:
- Chrome, Firefox, Safari, Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## Questions?

Contact the parents at the email/phone provided on the invitation!

---

Made with ❤️ for a special first birthday celebration! 🎂
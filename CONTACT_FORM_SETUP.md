# Contact Form Setup Instructions

The portfolio now includes a modern contact form that uses Formspree for serverless form handling. Follow these steps to set it up:

## Step 1: Create a Formspree Account

1. Go to [Formspree.io](https://formspree.io/)
2. Sign up for a free account
3. Create a new form project
4. Copy your form endpoint URL (it looks like: `https://formspree.io/f/YOUR_FORM_ID`)

## Step 2: Update the Form Configuration

1. Open `assets/js/main.js`
2. Find the `initModernContactForm()` function (around line 200)
3. Replace `YOUR_FORM_ID` with your actual Formspree form ID:

```javascript
form.setAttribute('action', 'https://formspree.io/f/YOUR_ACTUAL_FORM_ID');
```

## Step 3: Test the Form

1. Open your portfolio website
2. Navigate to the Contact section
3. Fill out the form and submit
4. Check your email and Formspree dashboard for the submission

## Features Included

- **Serverless**: No backend required
- **Spam Protection**: Built-in spam filtering
- **Email Notifications**: Automatic email forwarding
- **Modern UX**: Loading states, success/error messages
- **Mobile Friendly**: Responsive design

## Alternative Services

If you prefer other services, you can easily modify the form to work with:

- **Netlify Forms**: Change action to `netlify`
- **EmailJS**: Replace with EmailJS SDK calls
- **Custom Backend**: Point to your own API endpoint

## Fallback

If you don't set up Formspree, the form will still work but show an error message. The styling and UX improvements will still be active. 
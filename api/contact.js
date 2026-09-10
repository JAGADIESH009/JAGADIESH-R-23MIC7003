module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { name, email, subject, message, time } = req.body;

    const SERVICE_ID = process.env.EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = process.env.EMAILJS_TEMPLATE_ID;
    const PUBLIC_KEY = process.env.EMAILJS_PUBLIC_KEY;

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      console.error('EmailJS credentials are not fully configured in environment variables.');
      return res.status(500).json({ message: 'Server configuration error' });
    }

    const payload = {
      service_id: SERVICE_ID,
      template_id: TEMPLATE_ID,
      user_id: PUBLIC_KEY,
      template_params: {
        name,
        email,
        subject,
        message,
        time
      }
    };

    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Origin': req.headers.origin || 'https://jagadiesh.me'
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      return res.status(200).json({ message: 'Email sent successfully' });
    } else {
      const errorText = await response.text();
      console.error('EmailJS error:', errorText);
      return res.status(response.status).json({ message: 'Failed to send email' });
    }
  } catch (error) {
    console.error('API endpoint error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

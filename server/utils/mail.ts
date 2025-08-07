// interface SendEmailOptions {
//   to: string
//   subject: string
//   text: string
//   html?: string
// }

// export async function sendEmail(env: Env, options: SendEmailOptions) {
//   if (!env.MAILCHANNELS_API_KEY) {
//     throw new Error('MailChannels API key not configured')
//   }
//
//   const response = await fetch('https://api.mailchannels.net/tx/v1/send', {
//     method: 'POST',
//     headers: {
//       'content-type': 'application/json',
//       'authorization': `Bearer ${env.MAILCHANNELS_API_KEY}`
//     },
//     body: JSON.stringify({
//       from: {
//         email: 'noreply@yourdomain.com',
//         name: 'Your App Name'
//       },
//       personalizations: [
//         {
//           to: [{ email: options.to }]
//         }
//       ],
//       subject: options.subject,
//       content: [
//         {
//           type: 'text/plain',
//           value: options.text
//         },
//         ...(options.html ? [{
//           type: 'text/html',
//           value: options.html
//         }] : [])
//       ]
//     })
//   })
//
//   if (!response.ok) {
//     throw new Error(`Failed to send email: ${await response.text()}`)
//   }
// }

// export async function sendVerificationEmail(env: Env, email: string, code: string) {
//   const subject = 'Your Verification Code'
//   const text = `Your verification code is: ${code}`
//   const html = `<p>Your verification code is: <strong>${code}</strong></p>`
//
//   await sendEmail(env, { to: email, subject, text, html })
// }

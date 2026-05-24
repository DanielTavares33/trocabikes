<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset your password</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #fafaf9;">
    <div style="max-width: 480px; margin: 40px auto; background-color: #ffffff; border-radius: 4px; overflow: hidden; border: 1px solid #e4e4e7;">
        <div style="background-color: #ea580c; padding: 32px; text-align: center;">
            <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600;">
                Trocabikes
            </h1>
        </div>

        <div style="padding: 32px;">
            <h2 style="margin: 0 0 16px; color: #18181b; font-size: 20px; font-weight: 600;">
                Reset your password
            </h2>

            <p style="margin: 0 0 24px; color: #71717a; font-size: 16px; line-height: 1.5;">
                Hi there,<br><br>
                We received a request to reset your password. Click the button below to set a new one.
            </p>

            <div style="text-align: center; margin: 32px 0;">
                <a href="{{ $resetUrl }}"
                    style="display: inline-block; padding: 14px 32px; background-color: #ea580c; color: #ffffff; text-decoration: none; font-weight: 600; border-radius: 4px;">
                    Reset Password
                </a>
            </div>

            <p style="margin: 0; color: #a1a1aa; font-size: 14px;">
                If you didn't request a password reset, you can safely ignore this email.
            </p>
        </div>

        <div style="background-color: #f5f5f4; padding: 24px; text-align: center; border-top: 1px solid #e4e4e7;">
            <p style="margin: 0; color: #a1a1aa; font-size: 12px;">
                &copy; {{ date('Y') }} Trocabikes. All rights reserved.
            </p>
        </div>
    </div>
</body>
</html>
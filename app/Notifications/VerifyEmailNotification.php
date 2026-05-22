<?php

namespace App\Notifications;

use App\Mail\VerifyEmailMailable;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class VerifyEmailNotification extends Notification
{
    use Queueable;

    public function __construct(
        public readonly ?string $verificationUrl = null
    ) {
        //
    }

    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(object $notifiable): VerifyEmailMailable
    {
        return (new VerifyEmailMailable($notifiable))
            ->to($notifiable->email, $notifiable->name);
    }
}

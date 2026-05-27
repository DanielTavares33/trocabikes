<?php

namespace App\Notifications;

use App\Mail\ResetPasswordMailable;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class ResetPasswordNotification extends Notification
{
    use Queueable;

    public function __construct(
        public readonly string $resetUrl
    ) {
        //
    }

    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(object $notifiable): ResetPasswordMailable
    {
        return (new ResetPasswordMailable($this->resetUrl, $notifiable->email))
            ->to($notifiable->email, $notifiable->name);
    }
}

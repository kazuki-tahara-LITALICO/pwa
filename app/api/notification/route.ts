import { type NextRequest, NextResponse } from 'next/server';
import webPush from 'web-push';

export const POST = async (req: NextRequest) => {
  // 環境変数の存在を確認
  if (
    !process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY ||
    !process.env.WEB_PUSH_EMAIL ||
    !process.env.WEB_PUSH_PRIVATE_KEY
  ) {
    throw new Error('Environment variables supplied not sufficient.');
  }

  const { subscription } = (await req.json()) as {
    subscription: webPush.PushSubscription;
  };

  try {
    // VAPIDの設定
    webPush.setVapidDetails(
      `mailto:${process.env.WEB_PUSH_EMAIL}`,
      process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY,
      process.env.WEB_PUSH_PRIVATE_KEY
    );

    // プッシュ通知の送信
    const payload = JSON.stringify({
      title: 'Hello Web Push',
      message: 'Your web push notification is here!',
      badgeCount: 1,
    });

    const response = await webPush.sendNotification(subscription, payload);

    return new NextResponse(payload, {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
        ...response.headers,
      },
    });
  } catch (err) {
    if (err instanceof webPush.WebPushError) {
      return new NextResponse(err.body, {
        status: err.statusCode,
        headers: {
          'Content-Type': 'application/json',
          ...err.headers,
        },
      });
    }

    console.error('Error sending web push notification:', err);

    return new NextResponse(
      JSON.stringify({
        message: 'Internal Server Error',
        error: 'error message',
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
};

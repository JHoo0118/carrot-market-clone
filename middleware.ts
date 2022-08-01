import { NextRequest, NextFetchEvent, userAgent } from 'next/server';
import { NextResponse } from 'next/server';
export function middleware(req: NextRequest, ev: NextFetchEvent) {
  // if (req.ua?.isBot) {
  //   return new Response("Plz don't be a bot. Be human.", { status: 403 });
  // }
  const ua = userAgent(req);
  if (ua?.isBot) {
    // return new Response("Plz don't be a bot. Be human.", { status: 403 });
  }
  if (
    !req.nextUrl.pathname.startsWith('/api') &&
    !req.nextUrl.pathname.startsWith('/favicon') &&
    !req.nextUrl.pathname.startsWith('/_next/static')
  ) {
    if (!req.nextUrl.pathname.startsWith('/enter') && !req.cookies.get('carrotsession')) {
      const url = req.nextUrl.clone();
      url.pathname = '/enter';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

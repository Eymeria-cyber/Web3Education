export function middleware(request) {
  const currentUser = request.cookies.get('currentUser')?.value

  if (currentUser && !request.nextUrl.pathname.startsWith('/dashboard')) {
    return Response.redirect(new URL('/dashboard', request.url))
  }

  if (!currentUser && !request.nextUrl.pathname.startsWith('/login')) {
    return Response.redirect(new URL('/login', request.url))
  }
}

export const config = {
  //matchr用正则表达式建立protect router
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}

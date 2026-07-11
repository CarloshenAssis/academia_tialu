import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const PROTECTED_PREFIXES = [
  "/home",
  "/cursos",
  "/materiais",
  "/comunidade",
  "/perfil",
  "/admin",
  "/assinatura",
];
const AUTH_PREFIXES = ["/login", "/cadastro"];
// /admin tem seu próprio guard de role (redireciona não-admin pra /home,
// que por sua vez passa pela trava abaixo). /assinatura precisa ficar
// acessível pra quem ainda não pagou, senão gera loop de redirect.
const PAYWALL_EXEMPT_PREFIXES = ["/admin", "/assinatura"];

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;
  const isProtected = PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(prefix));
  const isAuthPage = AUTH_PREFIXES.some((prefix) => pathname.startsWith(prefix));

  if (!user && isProtected) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (user && isAuthPage) {
    const url = request.nextUrl.clone();
    url.pathname = "/home";
    return NextResponse.redirect(url);
  }

  if (user && isProtected && !PAYWALL_EXEMPT_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("plan_status, role")
      .eq("id", user.id)
      .single();

    if (profile && profile.role !== "admin" && profile.plan_status !== "ativo") {
      const url = request.nextUrl.clone();
      url.pathname = "/assinatura";
      return NextResponse.redirect(url);
    }
  }

  return response;
}

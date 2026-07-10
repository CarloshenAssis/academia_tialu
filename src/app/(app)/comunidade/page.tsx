import { Heart, MessageCircle } from "lucide-react";
import { communityPosts } from "@/lib/mock-data";

export default function ComunidadePage() {
  return (
    <div className="flex flex-col gap-5">
      <h1 className="font-display text-xl font-bold text-ink">Comunidade</h1>

      <ul className="flex flex-col gap-4">
        {communityPosts.map((post) => (
          <li
            key={post.id}
            className="rounded-xl bg-card p-4 shadow-[0_2px_10px_rgba(22,33,62,0.06)]"
          >
            <div className="flex items-center gap-2.5">
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
                  post.role ? "bg-gold text-navy" : "bg-navy text-cream"
                }`}
              >
                {post.author.charAt(0)}
              </span>
              <div>
                <p className="text-sm font-semibold leading-snug text-ink">
                  {post.author}
                  {post.role && (
                    <span className="ml-1.5 rounded-full bg-gold/20 px-2 py-0.5 text-[10px] font-semibold text-gold-dark">
                      {post.role}
                    </span>
                  )}
                </p>
                <p className="text-xs text-ink-soft">{post.timeAgo}</p>
              </div>
            </div>

            <p className="mt-3 text-sm leading-relaxed text-ink">{post.content}</p>

            <div className="mt-3 flex items-center gap-4 text-xs text-ink-soft">
              <span className="flex items-center gap-1.5">
                <Heart size={15} /> {post.likes}
              </span>
              <span className="flex items-center gap-1.5">
                <MessageCircle size={15} /> {post.replies} respostas
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

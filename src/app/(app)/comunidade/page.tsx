import { getComunidadePosts } from "@/lib/queries";
import { NovoPost } from "./NovoPost";
import { PostCard } from "./PostCard";

export default async function ComunidadePage() {
  const posts = await getComunidadePosts();

  return (
    <div className="flex flex-col gap-5 md:mx-auto md:max-w-2xl">
      <h1 className="font-display text-xl font-bold text-ink">Comunidade</h1>

      <NovoPost />

      {posts.length === 0 ? (
        <p className="rounded-xl bg-card p-6 text-center text-sm text-ink-soft shadow-[0_2px_10px_rgba(22,33,62,0.06)]">
          Ainda não há publicações. Seja a primeira!
        </p>
      ) : (
        <ul className="flex flex-col gap-4">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </ul>
      )}
    </div>
  );
}

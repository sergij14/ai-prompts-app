import Feed from "@/components/Feed";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <div>
      <Hero />
      <Feed fetchUrl="/api/prompts" />
    </div>
  );
}

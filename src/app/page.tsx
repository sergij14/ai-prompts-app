import Feed from "@/components/Feed";

export default function Home() {
  return (
    <div>
      <Feed fetchUrl="/api/prompts" />
    </div>
  );
}

"use client";

const getLetter = (str: string) => str.charAt(0).toUpperCase();

const Avatar = ({ author }: { author: string }) => {
  const letter = getLetter(author);

  return (
    <div className="relative w-8 h-8 bg-gray-200 rounded-full">
      <span className="absolute top-2/4 left-2/4 tranform  -translate-y-2/4 -translate-x-2/4 text-sm">
        {letter}
      </span>
    </div>
  );
};

export default Avatar;

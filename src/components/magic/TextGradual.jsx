import GradualSpacing from "../ui/gradual-spacing";

export function GradualSpacingDemo({content}) {
  return (
    <GradualSpacing
      className="font-display text-center text-base font-bold -tracking-widest  text-strong dark:text-white md:text-base"
      text={content}
    />
  );
}


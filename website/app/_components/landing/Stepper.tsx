import { STEPPER_CONTENTS } from "@/app/_constants/landing";

export const Stepper = () => {
  return (
    <div className="flex flex-col rounded-3xl border border-zinc-700 md:flex-row">
      {STEPPER_CONTENTS.map(({ title, description }, index) => (
        <div key={title + index} className="flex flex-col gap-3">
          <div className="flex flex-col gap-3 px-8 pt-5 pb-2">
            <p className="text-lg text-zinc-500">
              {(index + 1).toString().padStart(2, "0")}
            </p>
            <h3 className="text-2xl text-zinc-50">{title}</h3>
          </div>
          <hr />
          <p className="text-base text-zinc-400 px-8 pt-2 pb-5">
            {description}
          </p>
        </div>
      ))}
    </div>
  );
};

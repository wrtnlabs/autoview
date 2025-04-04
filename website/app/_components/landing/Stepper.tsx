import { STEPPER_CONTENTS } from "@/app/_constants/landing";
import { cva } from "class-variance-authority";

const stepCardVariants = cva("flex flex-col gap-3 relative", {
  variants: {
    status: {
      complete: "md:bg-[#030303]",
      "in-progress":
        "md:bg-zinc-[#030303] md:bg-radial-[300%_300%_at_300%_50%] md:from-[#97F7E2] md:to-[#97F7E2]/0",
      "not-started": "md:bg-[#030303]",
    },
  },
});

const stepDividerVariants = cva("hidden md:block", {
  variants: {
    status: {
      complete: "border-[#86FFD9]",
      "in-progress": "border-[#86FFD9]",
      "not-started": "border-[#3F3F46]",
    },
  },
});

interface StepperProps {
  // MEMO: step 상수로 정의?
  currentStep?: number;
}

export const Stepper = ({ currentStep = -1 }: StepperProps) => {
  return (
    <div className="flex flex-col rounded-3xl pb-2 md:border overflow-hidden border-zinc-700 md:flex-row md:pb-0">
      {STEPPER_CONTENTS.map(({ title, description }, index) => {
        const isLast = index === STEPPER_CONTENTS.length - 1;
        const status =
          index < currentStep
            ? "complete"
            : index === currentStep
              ? "in-progress"
              : "not-started";

        return (
          <div key={title + index} className={stepCardVariants({ status })}>
            <div className="absolute left-3.5 h-full top-8 md:hidden">
              <div className="rounded-full border-2 bg-[#030303] border-[#86FFD9] w-2.5 h-2.5" />
              <div
                className={`w-px mx-auto ${isLast ? "bg-linear-to-t from-0 to-[#3F3F46] h-[calc(100%-12px)]" : "bg-[#3F3F46] h-full"}`}
              />
            </div>

            <div className="flex md:flex-col gap-3 px-8 pt-5 pb-2">
              <p className="text-lg text-zinc-500 hidden md:block">
                {(index + 1).toString().padStart(2, "0")}
              </p>
              <h3 className="text-2xl text-zinc-50">{title}</h3>
            </div>
            <hr className={stepDividerVariants({ status })} />
            <p className="text-base text-zinc-400 px-8 pt-2 pb-5">
              {description}
            </p>
          </div>
        );
      })}
    </div>
  );
};

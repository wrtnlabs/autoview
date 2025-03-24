import { STEPPER_CONTENTS } from "@/app/_constants/landing";
import { cva } from "class-variance-authority";

const stepCardVariants = cva("flex flex-col gap-3", {
  variants: {
    status: {
      complete: "bg-zinc-900",
      "in-progress":
        "bg-zinc-900 bg-radial-[300%_300%_at_300%_50%] from-[#97F7E2] to-[#97F7E2]/0",
      "not-started": "bg-[#030303]",
    },
  },
});

const stepDividerVariants = cva("", {
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
    <div className="flex flex-col rounded-3xl border overflow-hidden border-zinc-700 md:flex-row">
      {STEPPER_CONTENTS.map(({ title, description }, index) => {
        const status =
          index < currentStep
            ? "complete"
            : index === currentStep
              ? "in-progress"
              : "not-started";

        return (
          <div key={title + index} className={stepCardVariants({ status })}>
            <div className="flex flex-col gap-3 px-8 pt-5 pb-2">
              <p className="text-lg text-zinc-500">
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

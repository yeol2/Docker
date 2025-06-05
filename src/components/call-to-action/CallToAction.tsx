'use client';

import { Button } from '../button';

type CallToActionProps = {
  text: string;
  buttonText: string;
  action: () => void;
};

export function CallToAction({ text, buttonText, action }: CallToActionProps) {
  return (
    <article className="flex justify-between items-center w-full bg-light-grey rounded-md px-4 py-3">
      <p className="font-semibold text-sm xs:text-base">{text}</p>
      <Button size="sm" onClick={action}>
        {buttonText}
      </Button>
    </article>
  );
}

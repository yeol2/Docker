import { COURSE } from '@/constants';
import { useOutsideClick } from '@/hooks';
import { authAtom } from '@/store';
import { dateDistance } from '@/utils/date';
import { useAtomValue } from 'jotai';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { CommentItem as CommentItemType } from '../../schemas';
import { CommentMenu } from './CommentMenu';

type CommentItemProps = {
  comment: CommentItemType;
};

export function CommentItem({ comment }: CommentItemProps) {
  const { author, content, createdAt, id: commentId } = comment;
  const { nickname, name, course, profileImageUrl, id } = author;

  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const auth = useAtomValue(authAtom);

  useOutsideClick([menuRef, menuButtonRef], () => setIsMenuOpen(false));
  return (
    <li className="border-b border-light-grey last:border-b-0">
      <div className="flex justify-start items-start gap-4 pt-3 pb-6 mx-1">
        <div className="relative w-10 h-10 shrink-0">
          <Image
            src={profileImageUrl}
            alt={name}
            fill
            sizes="100%"
            className="rounded-full object-cover"
          />
        </div>
        <div className="flex flex-col w-full">
          <div className="w-full">
            <div className="relative flex justify-between items-center">
              <div className="flex items-center gap-1">
                <p className="font-medium">
                  {nickname}({name})
                </p>
                <p className="text-sm text-dark-grey font-light">
                  {course ? COURSE[course] : '외부인'}
                </p>
              </div>
              {auth?.id === id && (
                <CommentMenu
                  ref={menuRef}
                  menuButtonRef={menuButtonRef}
                  commentId={commentId}
                  commentContent={content}
                  isMenuOpen={isMenuOpen}
                  onToggleMenu={() => setIsMenuOpen((prev) => !prev)}
                />
              )}
            </div>
            <p className="text-sm font-light text-grey">
              {dateDistance(createdAt)}
            </p>
          </div>
          <p className="whitespace-pre-wrap break-all">{content}</p>
        </div>
      </div>
    </li>
  );
}

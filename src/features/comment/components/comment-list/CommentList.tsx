import { SpinnerIcon } from '@/components/icons';
import { RefObject } from 'react';
import { CommentItem as CommentItemType } from '../../schemas';
import { CommentItem } from '../comment-item';

type CommentListProps = {
  ref: RefObject<HTMLDivElement | null>;
  isFetchingNextPage: boolean;
  comments: CommentItemType[];
};

export function CommentList({
  ref,
  isFetchingNextPage,
  comments,
}: CommentListProps) {
  return (
    <>
      <ul className="flex flex-col gap-4">
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </ul>
      <div ref={ref}>
        {isFetchingNextPage && (
          <div className="flex justify-center items-center gap-2 h-12 bg-blue-white text-blue">
            <SpinnerIcon
              width={20}
              height={20}
              className="animate-spin"
              fill="var(--color-blue)"
            />
            <p>잠시만 기다려주세요...</p>
          </div>
        )}
      </div>
    </>
  );
}

import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setComment } from "./commentSlice";
import { useEffect } from "react";
export const useSortComment = () => {
  const commentData = useSelector((state) => state.comment.comment);
  const dispatch = useDispatch();

  // Memoize the sorted data to prevent unnecessary recalculations
  const sortedData = useMemo(() => {
    if (!commentData?.items) return commentData;

    return {
      ...commentData,
      items: [...commentData.items].sort((a, b) => {
        return (b?.snippet?.totalReplyCount || 0) - (a?.snippet?.totalReplyCount || 0);
      }),
    };
  }, [commentData]); // Recompute only when `commentData` changes

  // Dispatch the sorted data only once
  useEffect(() => {
    if (sortedData) {
      dispatch(setComment(sortedData));
    }
  }, [sortedData, dispatch]);

  return sortedData;
};

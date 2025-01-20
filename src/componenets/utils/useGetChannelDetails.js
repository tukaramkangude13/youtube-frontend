  export const useGetChannelDetails=(commentData)=>{
    if (!commentData?.items) return commentData;

    return {
      ...commentData,
      items: [...commentData.items].sort((a, b) => {
        return (b?.snippet?.totalReplyCount || 0) - (a?.snippet?.totalReplyCount || 0);
      }),
    };
  }

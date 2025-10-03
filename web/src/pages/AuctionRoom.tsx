import React from 'react';
import { useParams } from 'react-router-dom';
import { AuctionRoom } from '@/features/live/AuctionRoom';

export const AuctionRoomPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  if (!id) {
    return <div className="text-center py-8">Auction not found</div>;
  }

  return <AuctionRoom auctionId={id} />;
};
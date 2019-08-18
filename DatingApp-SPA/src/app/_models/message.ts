export interface Message {
  id: number;
  senderId: number;
  senderKnownAs: string;
  senderPhtoUrl: string;
  recipientId: number;
  recipientKnownAs: string;
  recipientPhotoUrl: string;
  content: string;
  isRead: boolean;
  dateRead: Date;
  messageSent: Date;
}

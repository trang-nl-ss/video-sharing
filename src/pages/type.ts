export interface Video {
    id: number;
    url: string;
    title: string;
    creator: string;
    description: string;
    votedUp: number;
    votedDown: number;
}
export interface ShareVideoPayload {
    url: string;
}
export interface VoteVideoPayload {
    id: number;
    voteType: string;
}
